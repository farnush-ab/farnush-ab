// Hero — Cinematic Gateway
// Multi-plane parallax with depth-of-field response to cursor.
// Without real showroom footage, the planes are composed procedurally —
// 5 textured layers at different depths suggesting architectural recession.
// When real footage is available, each plane swaps for a depth-masked AVIF.

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { EffectComposer } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/postprocessing/UnrealBloomPass.js';

const container = document.getElementById('hero-cinematic-canvas');
if (container) {

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a0a0c);

  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  camera.position.set(0, 0, 6);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  container.appendChild(renderer.domElement);

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.45, 0.5, 0.78);
  composer.addPass(bloom);

  const resize = () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    renderer.setSize(w, h, false);
    composer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    bloom.resolution.set(w, h);
  };
  resize();
  window.addEventListener('resize', resize);

  // ---- Procedural plane textures (stand-in for real footage) ----
  function makeTexture(draw) {
    const c = document.createElement('canvas');
    c.width = 1024;
    c.height = 1024;
    const ctx = c.getContext('2d');
    draw(ctx, c.width, c.height);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.anisotropy = 8;
    return tex;
  }

  // L3 (far): the Hub backdrop — soft warm gradient with vertical strips
  // suggesting the showroom's rear wall and clerestory glazing.
  const texFar = makeTexture((ctx, w, h) => {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, '#1a1614');
    g.addColorStop(0.45, '#241e1a');
    g.addColorStop(0.7, '#1c1814');
    g.addColorStop(1, '#0d0a08');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    // Clerestory light strip
    const glow = ctx.createLinearGradient(0, h * 0.18, 0, h * 0.34);
    glow.addColorStop(0, 'rgba(180, 130, 70, 0)');
    glow.addColorStop(0.5, 'rgba(220, 170, 100, 0.18)');
    glow.addColorStop(1, 'rgba(180, 130, 70, 0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, h * 0.18, w, h * 0.16);

    // Vertical wall panels — barely visible, like sliding screens
    ctx.globalAlpha = 0.06;
    for (let i = 0; i < 8; i++) {
      const x = (i + 0.5) * (w / 8);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x - 1, 0, 1, h);
    }
    ctx.globalAlpha = 1;

    // Floor catch — bottom warm wash
    const floor = ctx.createLinearGradient(0, h * 0.78, 0, h);
    floor.addColorStop(0, 'rgba(120, 90, 50, 0)');
    floor.addColorStop(1, 'rgba(80, 55, 30, 0.6)');
    ctx.fillStyle = floor;
    ctx.fillRect(0, h * 0.78, w, h * 0.22);
  });

  // L2 (mid): principal product silhouette — a tall vertical brass pendant
  // hanging from above center, with bloom highlight.
  const texMid = makeTexture((ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);

    // Pendant cord (thin)
    ctx.fillStyle = '#1a1410';
    ctx.fillRect(w * 0.5 - 1, 0, 2, h * 0.45);

    // Pendant body — vertical brass cylinder with gradient
    const cx = w * 0.5;
    const cy = h * 0.55;
    const pw = w * 0.06;
    const ph = h * 0.32;
    const grad = ctx.createLinearGradient(cx - pw, 0, cx + pw, 0);
    grad.addColorStop(0,    '#3d2e1c');
    grad.addColorStop(0.35, '#8b6f47');
    grad.addColorStop(0.55, '#c9a96e');
    grad.addColorStop(0.7,  '#8b6f47');
    grad.addColorStop(1,    '#3d2e1c');
    ctx.fillStyle = grad;
    ctx.fillRect(cx - pw, cy - ph * 0.5, pw * 2, ph);

    // Soft glow at the bottom of the pendant (the light itself)
    const bulb = ctx.createRadialGradient(cx, cy + ph * 0.55, 0, cx, cy + ph * 0.55, w * 0.22);
    bulb.addColorStop(0,   'rgba(255, 220, 160, 0.65)');
    bulb.addColorStop(0.3, 'rgba(220, 170, 100, 0.35)');
    bulb.addColorStop(1,   'rgba(220, 170, 100, 0)');
    ctx.fillStyle = bulb;
    ctx.fillRect(0, 0, w, h);

    // Filament-bright pinprick
    const fil = ctx.createRadialGradient(cx, cy + ph * 0.5, 0, cx, cy + ph * 0.5, w * 0.04);
    fil.addColorStop(0, 'rgba(255, 245, 220, 1)');
    fil.addColorStop(1, 'rgba(255, 220, 160, 0)');
    ctx.fillStyle = fil;
    ctx.fillRect(0, 0, w, h);
  });

  // L1 (near): foreground bench detail — bottom-left bench edge with sample blocks
  const texNear = makeTexture((ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);

    // Bench surface — dark patina green/grey, bottom 35%
    const bench = ctx.createLinearGradient(0, h * 0.65, 0, h);
    bench.addColorStop(0, '#2a2620');
    bench.addColorStop(1, '#1a1614');
    ctx.fillStyle = bench;
    ctx.fillRect(0, h * 0.7, w, h * 0.3);

    // Top edge highlight
    ctx.strokeStyle = 'rgba(200, 170, 130, 0.25)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, h * 0.7);
    ctx.lineTo(w, h * 0.7);
    ctx.stroke();

    // Sample blocks on the bench — stone + brass disc + glass tumbler
    // Stone block (left)
    ctx.fillStyle = '#6e6760';
    ctx.fillRect(w * 0.05, h * 0.6, w * 0.13, h * 0.13);
    // Brass disc (center)
    const discG = ctx.createRadialGradient(w * 0.32, h * 0.66, 0, w * 0.32, h * 0.66, w * 0.05);
    discG.addColorStop(0, '#e3c489');
    discG.addColorStop(0.6, '#8b6f47');
    discG.addColorStop(1, '#4a3a2a');
    ctx.fillStyle = discG;
    ctx.beginPath();
    ctx.arc(w * 0.32, h * 0.66, w * 0.05, 0, Math.PI * 2);
    ctx.fill();
    // Glass tumbler (right) — outline + faint highlight
    ctx.strokeStyle = 'rgba(200, 220, 240, 0.5)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.rect(w * 0.42, h * 0.6, w * 0.06, h * 0.13);
    ctx.stroke();
    const glass = ctx.createLinearGradient(w * 0.42, 0, w * 0.48, 0);
    glass.addColorStop(0, 'rgba(180, 200, 220, 0.18)');
    glass.addColorStop(0.5, 'rgba(220, 230, 240, 0.06)');
    glass.addColorStop(1, 'rgba(180, 200, 220, 0.18)');
    ctx.fillStyle = glass;
    ctx.fillRect(w * 0.42, h * 0.6, w * 0.06, h * 0.13);
  });

  // L4 (atmospheric): dust particles — only as a texture; lights have their own particles
  const texDust = makeTexture((ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < 400; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const r = 0.5 + Math.random() * 1.5;
      const a = 0.15 + Math.random() * 0.45;
      ctx.fillStyle = `rgba(220, 190, 140, ${a})`;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  // ---- Plane meshes ----
  // Each plane gets a custom shader so we can do per-plane DoF (cheap gaussian on UV).

  function makePlane(tex, depthZ, size) {
    const geom = new THREE.PlaneGeometry(size.x, size.y);
    const mat = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uMap:      { value: tex },
        uFocus:    { value: 0.5 },   // 0..1, focal distance
        uPlaneDepth: { value: depthZ }, // -3..3
        uBlur:     { value: 0 },     // 0..1, current blur amount
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;
        varying vec2 vUv;
        uniform sampler2D uMap;
        uniform float uBlur;

        vec4 blurSample(vec2 uv, float r) {
          vec4 c = vec4(0.0);
          float total = 0.0;
          for (int i = -3; i <= 3; i++) {
            for (int j = -3; j <= 3; j++) {
              vec2 offset = vec2(float(i), float(j)) * r * 0.008;
              float w = 1.0 / (1.0 + float(i*i + j*j));
              c += texture2D(uMap, uv + offset) * w;
              total += w;
            }
          }
          return c / total;
        }

        void main() {
          vec4 sharp = texture2D(uMap, vUv);
          if (uBlur < 0.02) {
            gl_FragColor = sharp;
          } else {
            vec4 blurred = blurSample(vUv, uBlur);
            gl_FragColor = mix(sharp, blurred, clamp(uBlur, 0.0, 1.0));
          }
        }
      `
    });
    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.z = depthZ;
    return { mesh, mat };
  }

  // Plane sizes scale with depth (closer = smaller mesh in world space, fills more of view)
  const planeFar  = makePlane(texFar,  -3.0, new THREE.Vector2(14, 9));
  const planeMid  = makePlane(texMid,  -0.5, new THREE.Vector2(8, 8));
  const planeNear = makePlane(texNear,  1.5, new THREE.Vector2(7, 4.5));
  const planeDust = makePlane(texDust,  0.5, new THREE.Vector2(10, 7));
  planeDust.mat.uniforms.uMap.value.wrapS = THREE.RepeatWrapping;
  planeDust.mat.uniforms.uMap.value.wrapT = THREE.RepeatWrapping;

  scene.add(planeFar.mesh);
  scene.add(planeMid.mesh);
  scene.add(planeDust.mesh);
  scene.add(planeNear.mesh);

  // ---- Cursor-driven parallax + focus ----
  let mx = 0, my = 0, tmx = 0, tmy = 0;
  let focus = 0.5; // 0 = far in focus, 1 = near in focus
  let targetFocus = 0.5;

  window.addEventListener('pointermove', (e) => {
    const rect = container.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    tmx = (nx - 0.5) * 2;
    tmy = (ny - 0.5) * 2;
    // Focus: near-bottom = near plane in focus; near-top = far plane
    targetFocus = 1 - ny;
  }, { passive: true });

  let t = 0;
  function animate() {
    if (document.documentElement.dataset.quiet === 'true') {
      composer.render();
      requestAnimationFrame(animate);
      return;
    }
    t += 0.006;

    mx += (tmx - mx) * 0.06;
    my += (tmy - my) * 0.06;
    focus += (targetFocus - focus) * 0.04;

    // Plane parallax — closer planes move more
    planeFar.mesh.position.x  = mx * 0.15;
    planeFar.mesh.position.y  = -my * 0.10;
    planeMid.mesh.position.x  = mx * 0.32;
    planeMid.mesh.position.y  = -my * 0.22;
    planeNear.mesh.position.x = mx * 0.55;
    planeNear.mesh.position.y = -my * 0.38;
    planeDust.mesh.position.x = mx * 0.24 + Math.sin(t * 0.3) * 0.15;
    planeDust.mesh.position.y = -my * 0.18 + Math.cos(t * 0.27) * 0.1;

    // Camera dolly on Y for headiness
    camera.position.y = -my * 0.18;
    camera.position.x = mx * 0.05;
    camera.lookAt(0, 0, 0);

    // DoF — blur planes inversely to their distance from focal plane
    // focus mapping: 0..1 -> -3..1.5 (far..near)
    const focalZ = -3 + focus * 4.5;
    const setBlur = (plane, defaultBlur) => {
      const dz = Math.abs(plane.mesh.position.z - focalZ);
      const b = Math.min(1, dz * 0.35);
      plane.mat.uniforms.uBlur.value = b;
    };
    setBlur(planeFar);
    setBlur(planeMid);
    setBlur(planeNear);
    setBlur(planeDust);

    composer.render();
    requestAnimationFrame(animate);
  }
  animate();
}
