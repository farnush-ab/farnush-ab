'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import type { Product } from '@/lib/content/products';

type Props = {
  products: Product[];
  activeIndex: number;
};

/**
 * The rotating product stage.
 * - perspective: 1400px on the parent grid; product itself rotates X/Y
 *   based on cursor offset, with spring damping toward target.
 * - A silver shine div follows the cursor, mix-blend overlay.
 * - Only the active product is opacity:1; others are 0.
 */
export function Stage({ products, activeIndex }: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const [shine, setShine] = useState({ x: '50%', y: '50%' });

  useEffect(() => {
    const stage = stageRef.current;
    const product = productRef.current;
    if (!stage || !product) return;

    let trx = 0,
      try_ = 0,
      rx = 0,
      ry = 0;

    const onMove = (e: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      trx = -ny * 10;
      try_ = nx * 18;
      setShine({
        x: ((e.clientX - rect.left) / rect.width) * 100 + '%',
        y: ((e.clientY - rect.top) / rect.height) * 100 + '%',
      });
    };
    const onLeave = () => {
      trx = 0;
      try_ = 0;
    };
    stage.addEventListener('pointermove', onMove);
    stage.addEventListener('pointerleave', onLeave);

    let raf = 0;
    const loop = () => {
      rx += (trx - rx) * 0.08;
      ry += (try_ - ry) * 0.08;
      product.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      stage.removeEventListener('pointermove', onMove);
      stage.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={stageRef}
      data-inspect
      className="relative grid place-items-center [perspective:1400px] [perspective-origin:50%_50%]"
    >
      <div
        ref={productRef}
        className="relative w-[clamp(280px,38vw,520px)] aspect-[4/5] [transform-style:preserve-3d] will-change-transform transition-transform duration-cinema ease-reveal"
      >
        {products.map((p, i) => (
          <Image
            key={p.id}
            src={p.imageSrc}
            alt={p.imageAlt}
            fill
            sizes="(min-width: 768px) 38vw, 80vw"
            priority={i === 0}
            className={clsx(
              'object-contain',
              'drop-shadow-inspect',
              'transition-opacity duration-cinema ease-reveal',
              i === activeIndex ? 'opacity-100' : 'opacity-0 pointer-events-none',
            )}
            style={{
              filter:
                'drop-shadow(0 30px 60px rgb(31 26 18 / 0.18)) drop-shadow(0 12px 24px rgb(31 26 18 / 0.12))',
            }}
          />
        ))}
        {/* Soft reflection disc */}
        <span
          aria-hidden
          className="absolute -bottom-[8%] start-[10%] end-[10%] h-[30px] rounded-full"
          style={{
            background:
              'radial-gradient(ellipse, rgb(31 26 18 / 0.18), transparent 70%)',
            filter: 'blur(8px)',
          }}
        />
      </div>

      {/* Silver shine that follows cursor */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-0 hover:opacity-100 transition-opacity duration-reveal ease-reveal"
        style={{
          background: `radial-gradient(circle 240px at ${shine.x} ${shine.y}, rgb(212 161 136 / 0.35), transparent 60%)`,
        }}
      />
    </div>
  );
}
