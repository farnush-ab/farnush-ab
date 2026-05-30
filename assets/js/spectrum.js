// Spectrum — color-temperature scrubber that broadcasts to the lighting bus.
// Move pointer across .spectrum__track or click a fixture in .spectrum__fixtures.

(function () {
  const track = document.querySelector('.spectrum__track');
  if (!track) return;

  const pointer = track.querySelector('.spectrum__pointer');
  const readout = track.querySelector('.spectrum__readout');
  const fixtures = document.querySelectorAll('.spectrum__fixtures button');

  // Fixture kelvin/lumen pairs — match the data-k attribute in the HTML
  const STATE = { kelvin: 3500, intensity: 0.7 };

  // Register with the lighting bus
  if (window.DSBus) {
    window.DSBus.register('spectrum', { kelvin: 3500, intensity: 0, visibility: 0 });
  }

  function updateReadout() {
    if (readout) {
      readout.innerHTML = `${Math.round(STATE.kelvin)}K<small>color temperature</small>`;
    }
    // Position pointer
    if (pointer) {
      // Map 1800K..6500K -> 0..100%
      const pct = ((STATE.kelvin - 1800) / (6500 - 1800)) * 100;
      pointer.style.left = Math.max(0, Math.min(100, pct)) + '%';
    }
  }

  // Visibility tracking via IntersectionObserver
  let visibility = 0;
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      const rect = e.target.getBoundingClientRect();
      const vh = window.innerHeight;
      const center = rect.top + rect.height / 2;
      const dist = Math.abs(center - vh / 2);
      visibility = e.isIntersecting ? Math.max(0, 1 - dist / vh) : 0;
      broadcast();
    }
  }, { threshold: [0, 0.25, 0.5, 0.75, 1] });
  io.observe(track);
  window.addEventListener('scroll', () => {
    const rect = track.getBoundingClientRect();
    const vh = window.innerHeight;
    const center = rect.top + rect.height / 2;
    const dist = Math.abs(center - vh / 2);
    visibility = Math.max(0, 1 - dist / vh);
    broadcast();
  }, { passive: true });

  function broadcast() {
    if (!window.DSBus) return;
    window.DSBus.update('spectrum', {
      kelvin: STATE.kelvin,
      intensity: STATE.intensity,
      visibility: visibility
    });
  }

  function setKelvinFromX(x) {
    const rect = track.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (x - rect.left) / rect.width));
    STATE.kelvin = 1800 + pct * (6500 - 1800);
    updateReadout();
    broadcast();
    // Sync fixture highlight
    fixtures.forEach((b) => {
      const k = Number(b.dataset.k);
      b.classList.toggle('is-active', Math.abs(k - STATE.kelvin) < 250);
    });
  }

  track.addEventListener('pointermove', (e) => setKelvinFromX(e.clientX));
  track.addEventListener('pointerdown', (e) => setKelvinFromX(e.clientX));

  fixtures.forEach((b) => {
    b.addEventListener('click', () => {
      STATE.kelvin = Number(b.dataset.k) || 3500;
      updateReadout();
      broadcast();
      fixtures.forEach((x) => x.classList.toggle('is-active', x === b));
    });
  });

  updateReadout();
})();
