import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

// Convert Kelvin (1000–10000) to approximate RGB (Tanner Helland method, simplified)
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
  return new THREE.Color(
    Math.max(0, Math.min(255, r)) / 255,
    Math.max(0, Math.min(255, g)) / 255,
    Math.max(0, Math.min(255, b)) / 255
  );
}

function buildPendant(container) {
  if (!container) return;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a0a0c);
  scene.fog = new THREE.Fog(0x0a0a0c, 6, 16);

  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(0, 0, 6);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);
  const resize = () => {
    renderer.setSize(container.clientWidth, container.clientHeight, false);
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
  };
  resize();
  window.addEventListener('resize', resize);

  scene.add(new THREE.HemisphereLight(0x6e6e6e, 0x1a1a1c, 0.18));
  const rim = new THREE.DirectionalLight(0xffffff, 0.08);
  rim.position.set(-3, 2, 4);
  scene.add(rim);

  // Pendant cord (thin line from top)
  const cord = new THREE.Mesh(
    new THREE.CylinderGeometry(0.01, 0.01, 4, 8),
    new THREE.MeshStandardMaterial({ color: 0x1a1a1c, roughness: 1 })
  );
  cord.position.set(0, 2, 0);
  scene.add(cord);

  // Pendant shade — large brass dome
  const shadeGroup = new THREE.Group();
  const shade = new THREE.Mesh(
    new THREE.SphereGeometry(0.9, 64, 32, 0, Math.PI * 2, 0, Math.PI * 0.55),
    new THREE.MeshStandardMaterial({
      color: 0x8b6f47,
      roughness: 0.32,
      metalness: 0.85,
      side: THREE.DoubleSide
    })
  );
  shade.position.y = 0;
  shadeGroup.add(shade);

  // Bulb (the light source itself)
  const bulbMat = new THREE.MeshStandardMaterial({
    color: 0xfff3d4,
    roughness: 0.2,
    metalness: 0.0,
    emissive: 0xffd89a,
    emissiveIntensity: 0.5
  });
  const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.32, 32, 24), bulbMat);
  bulb.position.y = -0.25;
  shadeGroup.add(bulb);

  scene.add(shadeGroup);
  shadeGroup.position.y = -0.3;

  // Floor (catches the cast)
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.95 })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -3.2;
  scene.add(floor);

  // The light itself — point light under the bulb
  const point = new THREE.PointLight(0xffd89a, 0, 14, 1.4);
  point.position.copy(bulb.position).add(shadeGroup.position);
  point.position.y -= 0.4;
  scene.add(point);

  // Bottom cast — a soft ring on the floor (subtle, geometric)
  const cast = new THREE.Mesh(
    new THREE.RingGeometry(0.5, 2.4, 64),
    new THREE.MeshBasicMaterial({
      color: 0xffd89a,
      transparent: true,
      opacity: 0.0,
      side: THREE.DoubleSide,
      depthWrite: false
    })
  );
  cast.rotation.x = -Math.PI / 2;
  cast.position.y = -3.18;
  scene.add(cast);

  // Soft volumetric beam — single transparent cone
  const beam = new THREE.Mesh(
    new THREE.ConeGeometry(2.0, 3.0, 32, 1, true),
    new THREE.MeshBasicMaterial({
      color: 0xffd89a,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })
  );
  beam.position.set(0, -1.9, 0);
  scene.add(beam);

  // Target state (driven by mood & scroll)
  let targetKelvin = 3500;
  let targetEmit = 0.5;
  let kelvin = 3500;
  let emit = 0.5;
  let scrollVisibility = 0;

  // Register with the global lighting bus (if loaded)
  const BUS_ID = 'live-light';
  if (window.DSBus) {
    window.DSBus.register(BUS_ID, { kelvin: 3500, intensity: 0, visibility: 0 });
  }

  function moodToTarget(mood) {
    const map = {
      morning: { k: 4500, e: 0.18 },
      studio:  { k: 3500, e: 0.50 },
      evening: { k: 2700, e: 0.95 },
      late:    { k: 2200, e: 0.30 }
    };
    const m = map[mood] || map.studio;
    targetKelvin = m.k;
    targetEmit = m.e;
  }
  moodToTarget(document.documentElement.dataset.mood || 'studio');
  window.addEventListener('moodchange', (e) => moodToTarget(e.detail.mood));

  // Scroll modulation — visibility = proximity to viewport center
  let scrollMul = 1;
  const section = container.closest('.livelight');
  if (section) {
    window.addEventListener('scroll', () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const center = rect.top + rect.height / 2;
      const dist = Math.abs(center - vh / 2);
      const prox = Math.max(0, 1 - dist / vh);
      scrollMul = 0.6 + prox * 0.7;
      scrollVisibility = prox;
    }, { passive: true });
  }

  let t = 0;
  function animate() {
    if (document.documentElement.dataset.quiet === 'true') {
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
      return;
    }
    t += 0.005;
    kelvin += (targetKelvin - kelvin) * 0.018;
    emit   += (targetEmit   - emit)   * 0.018;

    const color = kelvinToRGB(kelvin);
    const e = emit * scrollMul;
    bulbMat.emissive.copy(color);
    bulbMat.emissiveIntensity = 0.4 + e * 1.6 + Math.sin(t * 6) * 0.02;
    point.color.copy(color);
    point.intensity = e * 8;
    cast.material.color.copy(color);
    cast.material.opacity = e * 0.32;
    beam.material.color.copy(color);
    beam.material.opacity = e * 0.18;

    // Broadcast to lighting bus — visibility-weighted intensity
    if (window.DSBus) {
      window.DSBus.update(BUS_ID, {
        kelvin: kelvin,
        intensity: emit,
        visibility: scrollVisibility
      });
    }

    shadeGroup.rotation.y += 0.0008;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();
}

const el = document.getElementById('livelight-canvas');
if (el) buildPendant(el);
