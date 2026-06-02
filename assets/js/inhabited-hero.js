// INHABITED — cinematic hero composition
// 5-plane WebGL parallax composition suggesting a luxury interior at dusk.
// Cursor moves planes; cursor Y shifts depth-of-field focus.

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { EffectComposer } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/postprocessing/UnrealBloomPass.js';

const container = document.getElementById('hero-stage');
if (container) {

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1a1410);

  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(0, 0, 7);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  container.appendChild(renderer.domElement);

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.55, 0.65, 0.78);
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

  // --- Procedural plane textures ---
  function makeTex(draw, w = 1280, h = 1280) {
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const ctx = c.getContext('2d');
    draw(ctx, w, h);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    return tex;
  }

  // L4 (deepest): the room walls + warm window light
  const texWall = makeTex((ctx, w, h) => {
    // Warm wall gradient — late afternoon sun on plaster
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0,   '#3a2c1e');
    g.addColorStop(0.4, '#5a4128');
    g.addColorStop(0.7, '#3a2c1e');
    g.addColorStop(1,   '#1a120a');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    // Window — vertical light source from the left
    const winG = ctx.createLinearGradient(0, 0, w * 0.35, 0);
    winG.addColorStop(0, 'rgba(255, 210, 140, 0.85)');
    winG.addColorStop(0.4, 'rgba(255, 180, 110, 0.5)');
    winG.addColorStop(1, 'rgba(120, 80, 40, 0)');
    ctx.fillStyle = winG;
    ctx.fillRect(0, h * 0.05, w * 0.4, h * 0.85);

    // Window frame — thin dark lines suggesting muntins
    ctx.strokeStyle = 'rgba(20, 14, 8, 0.75)';
    ctx.lineWidth = 2;
    ctx.strokeRect(w * 0.04, h * 0.08, w * 0.22, h * 0.7);
    ctx.beginPath();
    ctx.moveTo(w * 0.15, h * 0.08);
    ctx.lineTo(w * 0.15, h * 0.78);
    ctx.moveTo(w * 0.04, h * 0.43);
    ctx.lineTo(w * 0.26, h * 0.43);
    ctx.stroke();

    // Floor — raked light catching wide boards
    const floorG = ctx.createLinearGradient(0, h * 0.78, 0, h);
    floorG.addColorStop(0, 'rgba(140, 100, 60, 0.4)');
    floorG.addColorStop(1, 'rgba(20, 12, 6, 1)');
    ctx.fillStyle = floorG;
    ctx.fillRect(0, h * 0.78, w, h * 0.22);

    // Floor light catch from window
    ctx.globalAlpha = 0.35;
    const catchG = ctx.createLinearGradient(0, h * 0.78, w * 0.45, h);
    catchG.addColorStop(0, 'rgba(255, 200, 130, 0.9)');
    catchG.addColorStop(1, 'rgba(255, 200, 130, 0)');
    ctx.fillStyle = catchG;
    ctx.fillRect(0, h * 0.78, w * 0.6, h * 0.22);
    ctx.globalAlpha = 1;
  });

  // L3: midground architecture — a doorway/threshold silhouette on the right
  const texArch = makeTex((ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    // A dark vertical column (a doorway frame on right side)
    const colG = ctx.createLinearGradient(w * 0.6, 0, w * 0.85, 0);
    colG.addColorStop(0, 'rgba(10, 6, 3, 0)');
    colG.addColorStop(0.5, 'rgba(10, 6, 3, 0.95)');
    colG.addColorStop(1, 'rgba(10, 6, 3, 1)');
    ctx.fillStyle = colG;
    ctx.fillRect(w * 0.6, 0, w * 0.4, h);

    // Suggested ceiling beam (top)
    ctx.fillStyle = 'rgba(10, 6, 3, 0.85)';
    ctx.fillRect(0, 0, w, h * 0.05);

    // A second wall behind the doorway (lit from beyond)
    ctx.fillStyle = 'rgba(180, 130, 80, 0.18)';
    ctx.fillRect(w * 0.78, h * 0.1, w * 0.15, h * 0.65);
  }, 1280, 1280);

  // L2: principal product — a brass pendant catching light, slightly right of center
  const texPendant = makeTex((ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    const cx = w * 0.55, cy = h * 0.40;

    // Cord
    ctx.fillStyle = 'rgba(10, 6, 3, 0.95)';
    ctx.fillRect(cx - 1, 0, 2, cy - 50);

    // Pendant cone — vertical brass
    const pendG = ctx.createLinearGradient(cx - 80, 0, cx + 80, 0);
    pendG.addColorStop(0,    '#1c1208');
    pendG.addColorStop(0.25, '#5a3c1e');
    pendG.addColorStop(0.5,  '#c9a96e');
    pendG.addColorStop(0.7,  '#8b6f47');
    pendG.addColorStop(1,    '#1c1208');
    ctx.fillStyle = pendG;
    // Shape: trapezoid
    ctx.beginPath();
    ctx.moveTo(cx - 60, cy - 50);
    ctx.lineTo(cx + 60, cy - 50);
    ctx.lineTo(cx + 90, cy + 110);
    ctx.lineTo(cx - 90, cy + 110);
    ctx.closePath();
    ctx.fill();

    // Bulb under pendant — bright pinprick
    const bulbG = ctx.createRadialGradient(cx, cy + 130, 0, cx, cy + 130, 80);
    bulbG.addColorStop(0, 'rgba(255, 230, 180, 1)');
    bulbG.addColorStop(0.3, 'rgba(255, 200, 140, 0.6)');
    bulbG.addColorStop(1, 'rgba(255, 200, 140, 0)');
    ctx.fillStyle = bulbG;
    ctx.fillRect(cx - 80, cy + 50, 160, 160);

    // Soft falloff downward — the pendant's wash on the floor
    const washG = ctx.createRadialGradient(cx, cy + 250, 0, cx, cy + 250, 320);
    washG.addColorStop(0, 'rgba(255, 200, 140, 0.45)');
    washG.addColorStop(1, 'rgba(255, 200, 140, 0)');
    ctx.fillStyle = washG;
    ctx.fillRect(0, cy + 100, w, h - cy);
  }, 1280, 1280);

  // L1 (nearest): foreground detail — a brass faucet handle in extreme close on bottom-left
  const texFore = makeTex((ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    // Counter edge — thin horizontal line
    ctx.strokeStyle = 'rgba(245, 220, 180, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, h * 0.78);
    ctx.lineTo(w * 0.4, h * 0.78);
    ctx.stroke();

    // Brass disc (faucet collar) on the counter, bottom-left
    const discG = ctx.createRadialGradient(w * 0.15, h * 0.7, 0, w * 0.15, h * 0.7, 100);
    discG.addColorStop(0,    '#e3c489');
    discG.addColorStop(0.4,  '#a87b45');
    discG.addColorStop(0.85, '#4a3424');
    discG.addColorStop(1,    'rgba(0,0,0,0)');
    ctx.fillStyle = discG;
    ctx.beginPath();
    ctx.arc(w * 0.15, h * 0.7, 80, 0, Math.PI * 2);
    ctx.fill();

    // Faucet vertical body rising from disc
    const bodyG = ctx.createLinearGradient(w * 0.13, 0, w * 0.18, 0);
    bodyG.addColorStop(0,   '#1a1208');
    bodyG.addColorStop(0.5, '#c9a96e');
    bodyG.addColorStop(1,   '#3a2818');
    ctx.fillStyle = bodyG;
    ctx.fillRect(w * 0.135, h * 0.4, w * 0.03, h * 0.3);

    // Spout — horizontal arm extending right
    ctx.fillStyle = '#a87b45';
    ctx.fillRect(w * 0.165, h * 0.42, w * 0.07, 14);
    ctx.fillRect(w * 0.225, h * 0.42, 14, h * 0.08);

    // A glint on the brass — bright highlight strip
    ctx.globalAlpha = 0.55;
    ctx.fillStyle = '#ffe5b8';
    ctx.fillRect(w * 0.139, h * 0.4, 3, h * 0.3);
    ctx.globalAlpha = 1;
  }, 1280, 1280);

  // L5: dust / atmosphere
  const texDust = makeTex((ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < 500; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const r = 0.4 + Math.random() * 1.6;
      const a = 0.15 + Math.random() * 0.55;
      ctx.fillStyle = `rgba(255, 220, 170, ${a})`;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }, 1280, 1280);

  // ---- Plane meshes with per-plane DoF shader ----
  function makePlane(tex, z, sizeX, sizeY) {
    const geom = new THREE.PlaneGeometry(sizeX, sizeY);
    const mat = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uMap:   { value: tex },
        uBlur:  { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
      `,
      fragmentShader: `
        precision highp float;
        varying vec2 vUv;
        uniform sampler2D uMap;
        uniform float uBlur;
        vec4 blurSample(vec2 uv, float r) {
          vec4 c = vec4(0.0); float total = 0.0;
          for (int i = -3; i <= 3; i++) for (int j = -3; j <= 3; j++) {
            vec2 o = vec2(float(i), float(j)) * r * 0.008;
            float w = 1.0 / (1.0 + float(i*i + j*j));
            c += texture2D(uMap, uv + o) * w; total += w;
          }
          return c / total;
        }
        void main() {
          vec4 s = texture2D(uMap, vUv);
          if (uBlur < 0.02) { gl_FragColor = s; }
          else { vec4 b = blurSample(vUv, uBlur); gl_FragColor = mix(s, b, clamp(uBlur, 0.0, 1.0)); }
        }
      `
    });
    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.z = z;
    return { mesh, mat };
  }

  const pWall    = makePlane(texWall,    -3.5, 16, 10);
  const pArch    = makePlane(texArch,    -2.0, 13, 9);
  const pPendant = makePlane(texPendant, -0.3,  9, 9);
  const pDust    = makePlane(texDust,     0.7,  10, 7);
  const pFore    = makePlane(texFore,     1.6,  7, 5);

  scene.add(pWall.mesh, pArch.mesh, pPendant.mesh, pDust.mesh, pFore.mesh);

  // ---- Cursor parallax + focus ----
  let mx = 0, my = 0, tmx = 0, tmy = 0;
  let focus = 0.5, targetFocus = 0.5;

  window.addEventListener('pointermove', (e) => {
    const rect = container.getBoundingClientRect();
    if (e.clientY > rect.bottom) return;
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    tmx = (nx - 0.5) * 2;
    tmy = (ny - 0.5) * 2;
    targetFocus = 1 - ny; // top = far in focus
  }, { passive: true });

  let t = 0;
  function animate() {
    t += 0.005;
    mx += (tmx - mx) * 0.05;
    my += (tmy - my) * 0.05;
    focus += (targetFocus - focus) * 0.04;

    // Parallax — each plane moves a little more than the one behind
    pWall.mesh.position.x    = mx * 0.10;  pWall.mesh.position.y    = -my * 0.08;
    pArch.mesh.position.x    = mx * 0.22;  pArch.mesh.position.y    = -my * 0.16;
    pPendant.mesh.position.x = mx * 0.40;  pPendant.mesh.position.y = -my * 0.28;
    pDust.mesh.position.x    = mx * 0.28 + Math.sin(t * 0.2) * 0.1;
    pDust.mesh.position.y    = -my * 0.20 + Math.cos(t * 0.18) * 0.08;
    pFore.mesh.position.x    = mx * 0.65;  pFore.mesh.position.y    = -my * 0.45;

    // Camera dolly
    camera.position.x = mx * 0.08;
    camera.position.y = -my * 0.15;
    camera.lookAt(0, 0, 0);

    // DoF
    const focalZ = -3.5 + focus * 5.5;
    [pWall, pArch, pPendant, pDust, pFore].forEach((p) => {
      const dz = Math.abs(p.mesh.position.z - focalZ);
      p.mat.uniforms.uBlur.value = Math.min(1, dz * 0.32);
    });

    composer.render();
    requestAnimationFrame(animate);
  }
  animate();
}
