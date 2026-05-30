import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

const el = document.getElementById('hero-canvas');
if (el) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1A1A1C);

  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
  camera.position.set(0, 0, 6);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  el.appendChild(renderer.domElement);

  const resize = () => {
    renderer.setSize(el.clientWidth, el.clientHeight, false);
    camera.aspect = el.clientWidth / el.clientHeight;
    camera.updateProjectionMatrix();
  };
  resize();
  window.addEventListener('resize', resize);

  // Particles — dust drift
  const COUNT = 800;
  const positions = new Float32Array(COUNT * 3);
  const sizes = new Float32Array(COUNT);
  for (let i = 0; i < COUNT; i++) {
    positions[i*3]   = (Math.random() - 0.5) * 14;
    positions[i*3+1] = (Math.random() - 0.5) * 9;
    positions[i*3+2] = (Math.random() - 0.5) * 8;
    sizes[i] = Math.random() * 0.04 + 0.005;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));

  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(0xC9A96E) },
    },
    vertexShader: `
      attribute float aSize;
      uniform float uTime;
      varying float vAlpha;
      void main() {
        vec3 p = position;
        p.y += sin(uTime * 0.3 + position.x * 0.5) * 0.4;
        p.x += cos(uTime * 0.2 + position.z * 0.3) * 0.3;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_PointSize = aSize * 600.0 / -mv.z;
        gl_Position = projectionMatrix * mv;
        vAlpha = 0.4 + sin(uTime + position.x) * 0.3;
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      varying float vAlpha;
      void main() {
        vec2 c = gl_PointCoord - 0.5;
        float d = length(c);
        if (d > 0.5) discard;
        float a = smoothstep(0.5, 0.0, d) * vAlpha;
        gl_FragColor = vec4(uColor, a * 0.6);
      }
    `
  });

  const pts = new THREE.Points(geo, mat);
  scene.add(pts);

  // Soft light beam — simulated with a planar gradient
  const beam = new THREE.Mesh(
    new THREE.PlaneGeometry(3, 8),
    new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 } },
      vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: `
        varying vec2 vUv;
        uniform float uTime;
        void main() {
          float v = smoothstep(0.5, 0.0, abs(vUv.x - 0.5));
          float y = smoothstep(0.0, 0.5, vUv.y) * smoothstep(1.0, 0.6, vUv.y);
          gl_FragColor = vec4(vec3(0.55, 0.43, 0.28), v * y * 0.15);
        }
      `
    })
  );
  beam.position.set(-1.5, 0.5, -2);
  beam.rotation.z = 0.2;
  scene.add(beam);

  let t = 0;
  function animate() {
    t += 0.012;
    mat.uniforms.uTime.value = t;
    pts.rotation.y = t * 0.04;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();
}
