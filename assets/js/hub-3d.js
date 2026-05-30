import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { getStudioEnv } from './env-map.js';

function buildHub(container) {
  if (!container) return;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xE8E3DA);
  scene.fog = new THREE.Fog(0xE8E3DA, 8, 22);

  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(6, 4.2, 7);
  camera.lookAt(0, 1, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  scene.environment = getStudioEnv(renderer);
  const resize = () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  container.appendChild(renderer.domElement);
  resize();
  window.addEventListener('resize', resize);

  // Lights — directional warm + soft hemisphere
  scene.add(new THREE.HemisphereLight(0xF3E9D3, 0x6B5436, 0.55));
  const key = new THREE.DirectionalLight(0xFFE4B5, 0.85);
  key.position.set(6, 9, 4);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xC8B49A, 0.25);
  fill.position.set(-5, 3, -2);
  scene.add(fill);

  // Floor — large plaster slab
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({ color: 0xD8D2C5, roughness: 0.9, metalness: 0.0 })
  );
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);

  // Outline floor inset (the Hub footprint)
  const hubFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(5.5, 5.5),
    new THREE.MeshStandardMaterial({ color: 0xC0B6A2, roughness: 1.0 })
  );
  hubFloor.rotation.x = -Math.PI / 2;
  hubFloor.position.y = 0.01;
  scene.add(hubFloor);

  // Columns — four slender bronze pillars at the corners
  const colGeo = new THREE.CylinderGeometry(0.08, 0.08, 4.5, 24);
  const colMat = new THREE.MeshStandardMaterial({ color: 0x8B6F47, roughness: 0.4, metalness: 0.7 });
  const positions = [
    [-2.5, 2.25, -2.5],
    [ 2.5, 2.25, -2.5],
    [-2.5, 2.25,  2.5],
    [ 2.5, 2.25,  2.5],
  ];
  positions.forEach((p) => {
    const c = new THREE.Mesh(colGeo, colMat);
    c.position.set(...p);
    scene.add(c);
  });

  // Ceiling beam (linear pendant)
  const beam = new THREE.Mesh(
    new THREE.BoxGeometry(5.0, 0.05, 0.05),
    new THREE.MeshStandardMaterial({ color: 0x1A1A1C, roughness: 0.6 })
  );
  beam.position.set(0, 3.6, 0);
  scene.add(beam);

  // Glow under beam (point light)
  const glow = new THREE.PointLight(0xFFD89A, 1.2, 8, 1.4);
  glow.position.set(0, 3.2, 0);
  scene.add(glow);

  // Central table — the meeting bench
  const table = new THREE.Mesh(
    new THREE.BoxGeometry(2.8, 0.06, 1.2),
    new THREE.MeshStandardMaterial({ color: 0x3D4A40, roughness: 0.5, metalness: 0.1 })
  );
  table.position.set(0, 0.75, 0);
  scene.add(table);

  // Table legs
  const legGeo = new THREE.BoxGeometry(0.05, 0.7, 0.05);
  const legMat = new THREE.MeshStandardMaterial({ color: 0x2a2e30, roughness: 0.6, metalness: 0.4 });
  [[-1.3, 0.37, -0.5], [1.3, 0.37, -0.5], [-1.3, 0.37, 0.5], [1.3, 0.37, 0.5]].forEach((p) => {
    const l = new THREE.Mesh(legGeo, legMat);
    l.position.set(...p);
    scene.add(l);
  });

  // Chairs (4 minimal blocks)
  const chairMat = new THREE.MeshStandardMaterial({ color: 0xAFA28C, roughness: 0.8 });
  const chairPositions = [[0, 0.35, 1.0], [0, 0.35, -1.0], [-1.6, 0.35, 0], [1.6, 0.35, 0]];
  chairPositions.forEach((p, i) => {
    const c = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.65, 0.6), chairMat);
    c.position.set(...p);
    c.rotation.y = i * Math.PI / 4;
    scene.add(c);
  });

  // Far wall (suggested only by panel)
  const panel = new THREE.Mesh(
    new THREE.PlaneGeometry(8, 4.5),
    new THREE.MeshStandardMaterial({ color: 0xC5BBA8, roughness: 1.0, side: THREE.DoubleSide })
  );
  panel.position.set(0, 2.25, -4);
  scene.add(panel);

  // Small product objects on the table — fixture sample
  const fixture = new THREE.Mesh(
    new THREE.CylinderGeometry(0.12, 0.18, 0.35, 24),
    new THREE.MeshStandardMaterial({ color: 0xC9A96E, roughness: 0.3, metalness: 0.8 })
  );
  fixture.position.set(-0.8, 0.95, 0.1);
  scene.add(fixture);

  const lamp = new THREE.Mesh(
    new THREE.SphereGeometry(0.18, 32, 24),
    new THREE.MeshStandardMaterial({ color: 0xF3E9D3, roughness: 0.2, metalness: 0.0, emissive: 0xFFD89A, emissiveIntensity: 0.3 })
  );
  lamp.position.set(0.8, 0.93, -0.1);
  scene.add(lamp);

  // Slow rotation
  const target = new THREE.Vector3(0, 1, 0);
  let t = 0;
  let mx = 0, my = 0, tmx = 0, tmy = 0;

  container.addEventListener('pointermove', (e) => {
    const rect = container.getBoundingClientRect();
    tmx = ((e.clientX - rect.left) / rect.width - 0.5) * 0.6;
    tmy = ((e.clientY - rect.top) / rect.height - 0.5) * 0.3;
  });

  function animate() {
    t += 0.0015;
    mx += (tmx - mx) * 0.06;
    my += (tmy - my) * 0.06;
    const radius = 8.5;
    camera.position.x = Math.sin(t + mx) * radius;
    camera.position.z = Math.cos(t + mx) * radius;
    camera.position.y = 4.2 + my * 1.5;
    camera.lookAt(target);
    glow.intensity = 1.0 + Math.sin(t * 4) * 0.1;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();
}

const el = document.getElementById('hub-canvas');
if (el) buildHub(el);
