"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, MeshTransmissionMaterial } from "@react-three/drei";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import * as THREE from "three";
import { Display, Eyebrow } from "@/components/atoms/Typography";
import { Button } from "@/components/atoms/Button";
import { NumberBadge } from "@/components/atoms/NumberBadge";
import { ease, duration } from "@/lib/motion";

function SculpturalObject({
  rx,
  ry,
}: {
  rx: { get: () => number };
  ry: { get: () => number };
}) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.y += delta * 0.12;
    mesh.current.rotation.x = THREE.MathUtils.lerp(
      mesh.current.rotation.x,
      ry.get(),
      0.08,
    );
    mesh.current.rotation.z = THREE.MathUtils.lerp(
      mesh.current.rotation.z,
      rx.get(),
      0.08,
    );
  });

  return (
    <mesh ref={mesh} castShadow receiveShadow>
      <torusKnotGeometry args={[1.1, 0.34, 220, 32, 2, 3]} />
      <MeshTransmissionMaterial
        backside
        thickness={0.55}
        roughness={0.18}
        chromaticAberration={0.04}
        anisotropy={0.4}
        distortion={0.15}
        distortionScale={0.6}
        temporalDistortion={0.08}
        ior={1.35}
        color="#BC846C"
        attenuationColor="#8C846C"
        attenuationDistance={1.2}
      />
    </mesh>
  );
}

export function HeroCosmos() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rx = useSpring(useTransform(mx, [-1, 1], [-0.6, 0.6]), {
    stiffness: 60,
    damping: 22,
    mass: 1.1,
  });
  const ry = useSpring(useTransform(my, [-1, 1], [-0.5, 0.5]), {
    stiffness: 60,
    damping: 22,
    mass: 1.1,
  });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mx.set(x * 2 - 1);
    my.set(y * 2 - 1);
  };

  return (
    <section
      onMouseMove={onMove}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="relative h-screen min-h-[760px] w-full overflow-hidden bg-bone"
    >
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 4.2], fov: 38 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.55} />
          <directionalLight position={[3, 4, 2]} intensity={1.4} color="#ECE6D3" />
          <directionalLight position={[-3, -2, -1]} intensity={0.7} color="#BC846C" />
          <Suspense fallback={null}>
            <SculpturalObject rx={rx} ry={ry} />
            <Environment preset="apartment" />
          </Suspense>
        </Canvas>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bone/0 via-bone/0 to-bone/70"
      />

      <div className="relative z-10 mx-auto flex h-full max-w-editorial flex-col justify-between px-gutter py-28">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.slow, ease: ease.weighted, delay: 0.2 }}
          className="flex items-center justify-between"
        >
          <NumberBadge index={1} label="ورودی" />
          <Eyebrow className="ltr">PALLADIUM · 6,000 m²</Eyebrow>
        </motion.div>

        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration.cinematic, ease: ease.weighted, delay: 0.35 }}
          >
            <Display as="h1" size="lg" className="text-balance">
              معماری <span className="italic text-terracotta">سکوت</span>،
              <br />
              در جزئیات پیدا می‌شود.
            </Display>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: duration.slow, ease: ease.weighted, delay: 0.9 }}
            className="mt-10 max-w-xl font-sans text-base leading-loose text-ink/75"
          >
            دیزاین استیشن، خانهٔ برترین برندهای جهانی شیرآلات، خانهٔ هوشمند و
            عناصر معماری است — جایی برای دیدار آرشیتکت‌ها، طراحان داخلی و
            صاحبان پروژه‌های ممتاز.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration.slow, ease: ease.weighted, delay: 1.05 }}
            className="mt-12 flex flex-wrap items-center gap-5"
          >
            <Button variant="primary">رزرو میز در شوروم</Button>
            <Button variant="ghost">گردش در لوک‌بوک</Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: duration.slow, delay: 1.4 }}
          className="flex items-center justify-between"
        >
          <span className="font-sans text-caption text-ash/80">
            با حرکت نشانگر، شیء واکنش نشان می‌دهد
          </span>
          <span className="ltr font-sans text-eyebrow text-ash/80 num">
            SCROLL · ۰۲ →
          </span>
        </motion.div>
      </div>
    </section>
  );
}
