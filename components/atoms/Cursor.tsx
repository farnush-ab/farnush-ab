'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

type Mode = 'default' | 'hover' | 'text' | 'inspect';

const HOVER_SELECTOR =
  'a, button, [data-hover], .hover-target, label, input[type="radio"]';
const INSPECT_SELECTOR = '[data-inspect]';

export function Cursor() {
  const [mode, setMode] = useState<Mode>('default');
  const ref = useRef<HTMLDivElement>(null);
  const target = useRef({ x: -100, y: -100 });
  const current = useRef({ x: -100, y: -100, vx: 0, vy: 0 });

  useEffect(() => {
    const move = (e: PointerEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };
    const over = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.closest(INSPECT_SELECTOR)) setMode('inspect');
      else if (t.matches('input, textarea')) setMode('text');
      else if (t.closest(HOVER_SELECTOR)) setMode('hover');
      else setMode('default');
    };
    document.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerover', over);
    let raf = 0;
    const loop = () => {
      const cur = current.current;
      const t = target.current;
      const ax = (t.x - cur.x) * 0.18 - cur.vx * 0.20;
      const ay = (t.y - cur.y) * 0.18 - cur.vy * 0.20;
      cur.vx += ax;
      cur.vy += ay;
      cur.x += cur.vx;
      cur.y += cur.vy;
      if (ref.current) {
        ref.current.style.transform = `translate(${cur.x}px, ${cur.y}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', over);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      aria-hidden
      className={clsx(
        'fixed top-0 left-0 z-[9999] pointer-events-none rounded-full',
        'mix-blend-difference invert',
        'transition-[width,height,background-color,border-color] duration-glance ease-glance',
        mode === 'default' && 'w-[10px] h-[10px] border border-ink bg-transparent',
        mode === 'hover' && 'w-[44px] h-[44px] border border-terracotta bg-terracotta/20',
        mode === 'text' && 'w-[2px] h-[22px] border-0 bg-ink',
        mode === 'inspect' && 'w-[56px] h-[56px] border border-terracotta bg-terracotta/15',
      )}
    >
      {mode === 'inspect' && (
        <span className="absolute inset-0 grid place-items-center text-bone text-lg leading-none">
          ↻
        </span>
      )}
    </motion.div>
  );
}
