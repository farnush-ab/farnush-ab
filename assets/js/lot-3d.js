import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

const container = document.getElementById('lot-canvas');
if (container) {

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xEFEBE4);
  scene.fog = new THREE.Fog(0xEFEBE4, 6, 16);

  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(2.5, 1.2, 4);
  camera.lookAt(0, 0.5, 0);

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

  // Lights
  scene.add(new THREE.HemisphereLight(0xfff3d4, 0x6b5436, 0.45));
  const key = new THREE.DirectionalLight(0xffe8c8, 1.1);
  key.position.set(4, 6, 3);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xb8a888, 0.35);
  fill.position.set(-3, 2, -2);
  scene.add(fill);

  // ---- Faucet, built from primitives ----
  // Materials
  const brassMat = new THREE.MeshStandardMaterial({ color: 0x8b6f47, roughness: 0.28, metalness: 0.88 });
  const brassDark = new THREE.MeshStandardMaterial({ color: 0x6b5436, roughness: 0.4, metalness: 0.8 });
  const ceramic = new THREE.MeshStandardMaterial({ color: 0xe8e3d5, roughness: 0.32, metalness: 0.0 });
  const rubber = new THREE.MeshStandardMaterial({ color: 0x1a1a1c, roughness: 0.8, metalness: 0.0 });
  const splineMat = new THREE.MeshStandardMaterial({ color: 0x4a3a2a, roughness: 0.55, metalness: 0.4 });
  const aeratorMat = new THREE.MeshStandardMaterial({ color: 0xa88c5a, roughness: 0.4, metalness: 0.7 });

  // Group structure: each part has its own offset target for "explode"
  const parts = [];

  function addPart(mesh, restPos, explodeDir, explodeDist, name) {
    mesh.position.copy(restPos);
    mesh.userData = {
      rest: restPos.clone(),
      explode: restPos.clone().add(explodeDir.clone().multiplyScalar(explodeDist)),
      name: name
    };
    scene.add(mesh);
    parts.push(mesh);
  }

  // Base (under-counter / collar)
  const baseGeo = new THREE.CylinderGeometry(0.32, 0.34, 0.12, 32);
  addPart(new THREE.Mesh(baseGeo, brassMat), new THREE.Vector3(0, -0.5, 0), new THREE.Vector3(0, -1, 0), 1.4, 'collar');

  // Lower body
  const lbGeo = new THREE.CylinderGeometry(0.16, 0.18, 0.6, 32);
  addPart(new THREE.Mesh(lbGeo, brassMat), new THREE.Vector3(0, -0.14, 0), new THREE.Vector3(0, -1, 0), 0.6, 'lower body');

  // Mid stem
  const stemGeo = new THREE.CylinderGeometry(0.13, 0.14, 0.8, 32);
  addPart(new THREE.Mesh(stemGeo, brassMat), new THREE.Vector3(0, 0.34, 0), new THREE.Vector3(0, 1, 0), 0.7, 'stem');

  // Cartridge housing (cylinder slightly fatter)
  const cartGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.22, 32);
  addPart(new THREE.Mesh(cartGeo, brassDark), new THREE.Vector3(0, 0.84, 0), new THREE.Vector3(1.2, 1, 0).normalize(), 1.0, 'cartridge housing');

  // Ceramic disc cartridge (inside)
  const discGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.14, 24);
  addPart(new THREE.Mesh(discGeo, ceramic), new THREE.Vector3(0, 0.84, 0), new THREE.Vector3(1.6, 1, 0).normalize(), 1.6, 'ceramic disc cartridge');

  // O-ring 1
  const oring1 = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.014, 12, 36), rubber);
  oring1.rotation.x = Math.PI / 2;
  addPart(oring1, new THREE.Vector3(0, 0.72, 0), new THREE.Vector3(1, 0.4, 0).normalize(), 1.8, 'O-ring · upper');

  // O-ring 2
  const oring2 = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.014, 12, 36), rubber);
  oring2.rotation.x = Math.PI / 2;
  addPart(oring2, new THREE.Vector3(0, 0.96, 0), new THREE.Vector3(1, -0.4, 0).normalize(), 1.8, 'O-ring · lower');

  // Spout — horizontal arm with a downward bend
  const spoutCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0.95, 0),
    new THREE.Vector3(0.35, 0.95, 0),
    new THREE.Vector3(0.85, 0.95, 0),
    new THREE.Vector3(1.0, 0.85, 0),
    new THREE.Vector3(1.05, 0.65, 0),
  ]);
  const spoutGeo = new THREE.TubeGeometry(spoutCurve, 64, 0.075, 24, false);
  addPart(new THREE.Mesh(spoutGeo, brassMat), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0.3).normalize(), 0.9, 'spout');

  // Aerator at end of spout
  const aerator = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.075, 0.06, 24), aeratorMat);
  aerator.position.set(1.05, 0.6, 0);
  aerator.userData = {
    rest: aerator.position.clone(),
    explode: aerator.position.clone().add(new THREE.Vector3(0.5, -0.6, 0)),
    name: 'aerator'
  };
  scene.add(aerator);
  parts.push(aerator);

  // Diverter spline (a small accent on the spout)
  const spline = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.02, 0.4), splineMat);
  spline.position.set(0.55, 1.02, 0);
  spline.userData = {
    rest: spline.position.clone(),
    explode: new THREE.Vector3(0.55, 2.2, 0),
    name: 'diverter spline'
  };
  scene.add(spline);
  parts.push(spline);

  // Handle (cylindrical, perpendicular to spout)
  const handleGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.42, 24);
  const handle = new THREE.Mesh(handleGeo, brassMat);
  handle.rotation.z = Math.PI / 2;
  handle.position.set(-0.28, 0.95, 0);
  handle.userData = {
    rest: handle.position.clone(),
    explode: new THREE.Vector3(-1.4, 1.4, 0),
    name: 'handle',
    isHandle: true
  };
  scene.add(handle);
  parts.push(handle);

  // Handle tip
  const tip = new THREE.Mesh(new THREE.SphereGeometry(0.05, 24, 16), brassMat);
  tip.position.set(-0.49, 0.95, 0);
  tip.userData = {
    rest: tip.position.clone(),
    explode: new THREE.Vector3(-1.7, 1.5, 0),
    name: 'handle tip'
  };
  scene.add(tip);
  parts.push(tip);

  // Stream of water (visible when handle is "open")
  const streamGeo = new THREE.CylinderGeometry(0.012, 0.022, 0.7, 12);
  const streamMat = new THREE.MeshStandardMaterial({
    color: 0xb8d4e8,
    roughness: 0.1,
    metalness: 0.2,
    transparent: true,
    opacity: 0
  });
  const stream = new THREE.Mesh(streamGeo, streamMat);
  stream.position.set(1.05, 0.25, 0);
  scene.add(stream);

  // Counter (floor under faucet)
  const counter = new THREE.Mesh(
    new THREE.BoxGeometry(6, 0.06, 3),
    new THREE.MeshStandardMaterial({ color: 0xC0B6A2, roughness: 0.85 })
  );
  counter.position.y = -0.62;
  scene.add(counter);

  // ---- Beats ----
  // Beat 0..1 — Object (rotate in)
  // Beat 1..2 — Material (camera dolly to spout macro)
  // Beat 2..3 — Explosion (parts move to explode positions)
  // Beat 3..4 — Intelligence (handle rotates, water flows)
  // Beat 4..5 — Settle (reassemble)

  const BEATS = [
    { name: '<em>Object.</em>',         num: '01 / 05', copy: '<strong>Vola FS1.</strong>The single mixer. Drawn by Arne Jacobsen in 1968. Still cast in Horsens, in the same brass, in the same room.' },
    { name: 'Material.',                 num: '02 / 05', copy: '<strong>Sand-cast in Horsens.</strong>Hand-polished. Eighteen stages of finish, none of them automated. The thread is cut, not pressed.' },
    { name: 'The <em>parts.</em>',       num: '03 / 05', copy: '<strong>Twelve components.</strong>Hover any one to isolate its provenance, tolerance, and lead-time. The cartridge alone is rated for 600,000 cycles.' },
    { name: '<em>Open.</em>',            num: '04 / 05', copy: '<strong>The handle turns once.</strong>The ceramic disc opens. Water leaves the aerator in a laminar stream — the reason it does not splatter on the stone.' },
    { name: 'Specified.',                num: '05 / 05', copy: '<strong>Fourteen times since 2021.</strong>Each one installed by our trades, signed off by the architect, photographed for the archive. Add to a Folio to stage it for your visit.' }
  ];

  function lerp(a, b, t) { return a + (b - a) * t; }
  function smooth(t) { return t * t * (3 - 2 * t); }

  let scrollT = 0; // 0 .. 5
  const stage = document.querySelector('.lot-stage');

  function updateScroll() {
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    const vh = window.innerHeight;
    const totalScroll = stage.offsetHeight - vh;
    const traveled = Math.max(0, Math.min(totalScroll, -rect.top));
    const progress = traveled / totalScroll; // 0..1
    scrollT = progress * 5;

    // Update beat side panel
    const beatIdx = Math.min(4, Math.floor(scrollT));
    const beat = BEATS[beatIdx];
    const side = document.querySelector('.lot-stage__side');
    if (side && side.dataset.activeBeat !== String(beatIdx)) {
      side.dataset.activeBeat = String(beatIdx);
      side.querySelector('.lot-stage__beat-num').textContent = beat.num;
      side.querySelector('.lot-stage__beat-name').innerHTML = beat.name;
      side.querySelector('.lot-stage__copy').innerHTML = beat.copy;
    }
    const bar = document.querySelector('.lot-stage__progress-bar');
    if (bar) bar.style.setProperty('--scroll-progress', (progress * 100).toFixed(1) + '%');
  }
  window.addEventListener('scroll', updateScroll, { passive: true });
  updateScroll();

  function applyBeats() {
    const t = scrollT;

    // ---- Beat 1: object rotate ----
    const introT = smooth(Math.max(0, Math.min(1, t)));
    const baseRotY = lerp(-0.7, 0, introT);

    // ---- Beat 2: dolly to macro ----
    const macroT = smooth(Math.max(0, Math.min(1, t - 1)));
    const camTarget = new THREE.Vector3(
      lerp(2.5, 1.6, macroT),
      lerp(1.2, 0.95, macroT),
      lerp(4.0, 2.2, macroT)
    );
    const camLook = new THREE.Vector3(
      lerp(0, 0.6, macroT),
      lerp(0.5, 0.85, macroT),
      0
    );

    // ---- Beat 3: explode ----
    const explodeT = smooth(Math.max(0, Math.min(1, t - 2)));

    // ---- Beat 4: handle turn + water ----
    const handleT = smooth(Math.max(0, Math.min(1, t - 3)));

    // ---- Beat 5: reassemble (explode back to 0) ----
    const reassembleT = smooth(Math.max(0, Math.min(1, t - 4)));
    const effectiveExplode = explodeT * (1 - reassembleT);

    // Apply
    scene.rotation.y = baseRotY + introT * 0.0; // stable
    parts.forEach((p) => {
      const rest = p.userData.rest;
      const ex = p.userData.explode;
      p.position.set(
        lerp(rest.x, ex.x, effectiveExplode),
        lerp(rest.y, ex.y, effectiveExplode),
        lerp(rest.z, ex.z, effectiveExplode)
      );

      // Handle rotation in beat 4 — return to rest
      if (p.userData.isHandle) {
        p.rotation.z = Math.PI / 2 + handleT * (1 - reassembleT) * (Math.PI * 0.4);
      }
    });

    // Water stream visibility tied to handle open and not-yet-reassembled
    const waterOn = handleT * (1 - reassembleT);
    streamMat.opacity = waterOn * 0.8;
    stream.scale.y = 0.3 + waterOn * 1.6;
    stream.position.y = 0.25 - (0.3 + waterOn * 0.8) * 0.5;

    // Camera
    camera.position.lerp(camTarget, 0.06);
    camera.lookAt(camLook);

    // Continuous slow turntable on the whole scene during 01–03
    if (t < 3) {
      scene.rotation.y = -0.6 + t * 0.15;
    } else {
      scene.rotation.y = -0.6 + 3 * 0.15;
    }
  }

  function animate() {
    if (document.documentElement.dataset.quiet !== 'true') {
      applyBeats();
    }
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();
}
