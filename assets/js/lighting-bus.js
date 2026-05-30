// Lighting Bus — aggregates active fixture state and writes CSS variables
// that the rest of the DOM responds to (body tint, shadow length, type breath).
//
// Public API exposed on window.DSBus:
//   register(id, { kelvin, intensity, visibility })
//   update(id, patch)
//   remove(id)
//
// Subscribers update {kelvin, intensity, visibility} in the source-of-truth map.
// On every animation frame (throttled), the bus emits a weighted average to CSS.

(function () {
  const sources = new Map();
  const html = document.documentElement;
  let scheduled = false;

  function kelvinToRGB(k) {
    k = Math.max(1000, Math.min(10000, k)) / 100;
    let r, g, b;
    if (k <= 66) {
      r = 255;
      g = 99.4708025861 * Math.log(k) - 161.1195681661;
      b = k <= 19 ? 0 : 138.5177312231 * Math.log(k - 10) - 305.0447927307;
    } else {
      r = 329.698727446 * Math.pow(k - 60, -0.1332047592);
      g = 288.1221695283 * Math.pow(k - 60, -0.0755148492);
      b = 255;
    }
    return [
      Math.max(0, Math.min(255, r)),
      Math.max(0, Math.min(255, g)),
      Math.max(0, Math.min(255, b))
    ];
  }

  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(emit);
  }

  // Smoothed state
  let curR = 255, curG = 235, curB = 200;
  let curI = 0, curWarm = 0, curShadow = 1;

  function emit() {
    scheduled = false;
    let total = 0;
    let r = 0, g = 0, b = 0;
    let avgKelvin = 0;

    for (const s of sources.values()) {
      const w = (s.intensity || 0) * (s.visibility || 0);
      if (w <= 0) continue;
      total += w;
      const [sr, sg, sb] = kelvinToRGB(s.kelvin || 3500);
      r += sr * w; g += sg * w; b += sb * w;
      avgKelvin += (s.kelvin || 3500) * w;
    }

    let tR = 255, tG = 235, tB = 200;
    let tI = 0, tWarm = 0, tShadow = 1;
    if (total > 0) {
      tR = r / total; tG = g / total; tB = b / total;
      avgKelvin = avgKelvin / total;
      tI = Math.min(1, total * 0.55);
      tWarm = (3500 - avgKelvin) / 2500;
      tWarm = Math.max(-1, Math.min(1, tWarm));
      tShadow = 1 + tI * 1.4;
    }

    // Smooth toward target
    const k = 0.06;
    curR += (tR - curR) * k;
    curG += (tG - curG) * k;
    curB += (tB - curB) * k;
    curI += (tI - curI) * k;
    curWarm += (tWarm - curWarm) * k;
    curShadow += (tShadow - curShadow) * k;

    html.style.setProperty('--bus-r', Math.round(curR));
    html.style.setProperty('--bus-g', Math.round(curG));
    html.style.setProperty('--bus-b', Math.round(curB));
    html.style.setProperty('--bus-intensity', curI.toFixed(3));
    html.style.setProperty('--bus-warm', curWarm.toFixed(3));
    html.style.setProperty('--bus-shadow-len', curShadow.toFixed(3));

    // Keep ticking while there's drift
    if (Math.abs(tI - curI) > 0.001 || Math.abs(tR - curR) > 0.3) {
      schedule();
    }
  }

  const DSBus = {
    register(id, init) {
      sources.set(id, Object.assign({ kelvin: 3500, intensity: 0, visibility: 0 }, init));
      schedule();
    },
    update(id, patch) {
      const s = sources.get(id);
      if (!s) return;
      Object.assign(s, patch);
      schedule();
    },
    remove(id) {
      sources.delete(id);
      schedule();
    }
  };

  // Start a ticker so the bus always smooths toward zero when nothing is firing
  function tick() {
    schedule();
    setTimeout(tick, 120);
  }
  tick();

  window.DSBus = DSBus;
})();
