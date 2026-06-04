'use client';

import { useEffect, useRef } from 'react';

/**
 * The "Cosmos" textured-mask headline:
 * The headline is drawn as transparent text, with a luxury photograph
 * clipped into the type. On scroll, the background image shifts position
 * inside the text — producing a parallax "window cut through the type".
 *
 * Persian falls back to display-color (image clip works for both,
 * but Persian renders are tested separately to avoid harming legibility).
 */
export function MaskedHeadline({
  imageSrc = '/photography/hero-veil.jpeg',
  className,
  children,
}: {
  imageSrc?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const center = rect.top + rect.height / 2;
        const t = (vh / 2 - center) / vh; // -0.5..0.5
        // Shift the background inside the type, vertically
        el.style.backgroundPosition = `50% calc(50% + ${t * 60}px)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <h1
      ref={ref}
      className={className}
      style={{
        backgroundImage: `url(${imageSrc})`,
        backgroundSize: '180% auto',
        backgroundPosition: '50% 50%',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        WebkitTextFillColor: 'transparent',
      }}
    >
      {children}
    </h1>
  );
}
