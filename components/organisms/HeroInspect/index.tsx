'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Stage } from './Stage';
import { MaskedHeadline } from './MaskedHeadline';
import { Cap } from '@/components/atoms/Type';
import { MetaStrip } from '@/components/molecules/MetaStrip';
import { featuredProducts } from '@/lib/content/products';
import { toFa, padFa } from '@/lib/utils/faNum';
import { T } from '@/lib/motion/presets';

export function HeroInspect() {
  const [active, setActive] = useState(0);
  const total = featuredProducts.length;

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % total), 7000);
    return () => clearInterval(id);
  }, [total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setActive((i) => (i - 1 + total) % total);
      if (e.key === 'ArrowRight') setActive((i) => (i + 1) % total);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [total]);

  const cur = featuredProducts[active];

  return (
    <section
      id="hero"
      className="relative min-h-svh bg-bone overflow-hidden"
    >
      {/* Soft radial backdrop for cinematic depth */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 35%, rgb(244 239 224 / 0.55), transparent 65%), radial-gradient(ellipse at 25% 70%, rgb(192 191 178 / 0.35), transparent 50%), linear-gradient(180deg, #ECE6D3 0%, #D9D3BD 100%)',
        }}
      />

      {/* Frame corner marks (cosmos.so cinematic framing) */}
      {(
        [
          { key: 'tl', style: { top: '6rem', insetInlineStart: 'var(--spacing-gutter, 2rem)', borderTopWidth: 1, borderInlineStartWidth: 1 } },
          { key: 'tr', style: { top: '6rem', insetInlineEnd: 'var(--spacing-gutter, 2rem)', borderTopWidth: 1, borderInlineEndWidth: 1 } },
          { key: 'bl', style: { bottom: '4rem', insetInlineStart: 'var(--spacing-gutter, 2rem)', borderBottomWidth: 1, borderInlineStartWidth: 1 } },
          { key: 'br', style: { bottom: '4rem', insetInlineEnd: 'var(--spacing-gutter, 2rem)', borderBottomWidth: 1, borderInlineEndWidth: 1 } },
        ] as const
      ).map(({ key, style }) => (
        <span
          key={key}
          aria-hidden
          className="absolute w-7 h-7 pointer-events-none z-[3]"
          style={{ ...style, borderColor: 'rgb(31 26 18 / 0.40)' }}
        />
      ))}

      <div className="relative z-[2] min-h-svh px-gutter pt-36 pb-20 grid grid-rows-[auto_1fr_auto] gap-8">
        {/* Top meta */}
        <motion.header
          className="flex justify-between items-start flex-wrap gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={T.reveal}
        >
          <Cap className="text-ink-faint">اتلیه ۰۱ · دیزاین استیشن</Cap>
          <MetaStrip variant="hero" className="text-cap text-ink-faint tracking-[0.08em]" />
        </motion.header>

        {/* Stage with rotating product */}
        <Stage products={featuredProducts} activeIndex={active} />

        {/* Bottom: name + pager + CTA */}
        <motion.footer
          className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-end gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...T.reveal, delay: 0.2 }}
        >
          <div className="flex flex-col gap-2">
            <Cap className="text-ink-faint">{cur.lot} · {cur.tagFa}</Cap>
            <span className="font-display italic font-thin text-h3 text-ink">
              {cur.nameFa}
            </span>
          </div>

          <div className="flex items-center gap-3 justify-self-start sm:justify-self-center">
            {featuredProducts.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`محصول ${i + 1}`}
                onClick={() => setActive(i)}
                className={`
                  w-2 h-2 rounded-full transition-all duration-glance ease-glance
                  ${i === active ? 'bg-ink scale-[1.4]' : 'bg-ink-mute'}
                `}
              />
            ))}
            <span className="ms-3 text-cap text-ink-faint tabular-nums tracking-[0.08em]">
              {padFa(active + 1)} / {padFa(total)}
            </span>
          </div>

          <div className="justify-self-start sm:justify-self-end">
            <Link
              href="#reserve"
              className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-bone rounded-full text-cap tracking-[0.08em] transition-[background,padding] duration-glance ease-glance hover:bg-terracotta hover:pe-9"
            >
              رزرو ملاقات
              <span className="rtl:scale-x-[-1] inline-block">→</span>
            </Link>
          </div>
        </motion.footer>
      </div>

      {/* Hint + scroll cue */}
      <span className="absolute bottom-6 start-gutter text-[0.62rem] tracking-[0.08em] text-ink-faint opacity-70 z-[4]">
        با موس بچرخانید
      </span>
      <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-cap text-ink-faint tracking-[0.1em] z-[4] animate-pulse">
        پایین بکشید ↓
      </span>

      {/* Masked-headline strip — sits above the fold below the stage */}
      <div className="relative px-gutter pb-20 z-[2]">
        <MaskedHeadline className="font-display italic font-thin text-hero leading-[0.9] tracking-[-0.025em] max-w-[18ch]">
          <span style={{ display: 'block' }}>چیزی برای فروش نداریم —</span>
          <span style={{ display: 'block' }}>یک <em className="not-italic">اتاق</em> داریم.</span>
        </MaskedHeadline>
        <p className="mt-6 text-lede text-ink-soft max-w-measure">
          شش‌هزار مترمربع، در پالادیومِ تهران، با هماهنگی قبلی. {toFa(featuredProducts.length)} محصول در مجموعه‌ی این فصل.
        </p>
      </div>
    </section>
  );
}
