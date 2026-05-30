// Shared PBR environment — a procedural studio-light cubemap baked once,
// used by hub-3d and lot-3d for reflections on brass/ceramic/glass materials.
//
// Without an HDRI source, we build a six-face soft-box rig procedurally.

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
const { PMREMGenerator } = THREE;

let cachedEnv = null;

export function getStudioEnv(renderer) {
  if (cachedEnv) return cachedEnv;

  // Build a small scene we'll convert into a PMREM environment
  const envScene = new THREE.Scene();

  // Sky / top half — warm warm
  const sky = new THREE.Mesh(
    new THREE.SphereGeometry(50, 32, 16),
    new THREE.MeshBasicMaterial({
      side: THREE.BackSide,
      color: 0xfff0d8
    })
  );
  envScene.add(sky);

  // Big soft area "light" mesh at the top
  const keyLight = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 8),
    new THREE.MeshBasicMaterial({ color: 0xfff3d4, side: THREE.DoubleSide })
  );
  keyLight.position.set(8, 12, 6);
  keyLight.lookAt(0, 0, 0);
  envScene.add(keyLight);

  // Cool fill from the back
  const fill = new THREE.Mesh(
    new THREE.PlaneGeometry(14, 8),
    new THREE.MeshBasicMaterial({ color: 0x6a7a88, side: THREE.DoubleSide })
  );
  fill.position.set(-9, 4, -8);
  fill.lookAt(0, 0, 0);
  envScene.add(fill);

  // Dark floor — desaturated patina
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(80, 80),
    new THREE.MeshBasicMaterial({ color: 0x1c1a18 })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -8;
  envScene.add(floor);

  // Warm rim accent
  const rim = new THREE.Mesh(
    new THREE.PlaneGeometry(6, 12),
    new THREE.MeshBasicMaterial({ color: 0xc9a96e, side: THREE.DoubleSide })
  );
  rim.position.set(0, 2, -12);
  envScene.add(rim);

  // Plaster wash side
  const plaster = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 10),
    new THREE.MeshBasicMaterial({ color: 0xd8d2c5, side: THREE.DoubleSide })
  );
  plaster.position.set(12, 3, 0);
  plaster.lookAt(0, 3, 0);
  envScene.add(plaster);

  const pmrem = new PMREMGenerator(renderer);
  cachedEnv = pmrem.fromScene(envScene, 0.04).texture;
  pmrem.dispose();
  return cachedEnv;
}
