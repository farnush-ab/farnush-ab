"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { NumberBadge } from "@/components/atoms/NumberBadge";
import { ease } from "@/lib/motion";

export function HeroMaskText() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1.25, 1.0]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "12%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.35, 0.85, 1], [0.2, 1, 1, 0.4]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 50, damping: 20 });
  const py = useSpring(my, { stiffness: 50, damping: 20 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - rect.left) / rect.width - 0.5) * 24);
    my.set(((e.clientY - rect.top) / rect.height - 0.5) * 24);
  };

  return (
    <section
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="relative isolate overflow-hidden bg-bone py-section"
    >
      <div className="mx-auto flex max-w-editorial items-center justify-between px-gutter">
        <NumberBadge index={2} label="بیانیه" />
        <span className="ltr font-sans text-eyebrow text-ash num">
          MASK · PARALLAX · STATEMENT
        </span>
      </div>

      <div className="relative mt-16 flex items-center justify-center px-gutter">
        <svg
          viewBox="0 0 1600 320"
          aria-hidden
          className="w-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <pattern
              id="texture"
              patternUnits="userSpaceOnUse"
              width="1600"
              height="320"
            >
              <motion.image
                href="https://images.unsplash.com/photo-1497366216548-37526070297c?w=2400&q=85&auto=format&fit=crop"
                width="1900"
                height="500"
                x={px}
                y={py}
                preserveAspectRatio="xMidYMid slice"
                style={{ scale: bgScale, translateY: bgY }}
              />
              <rect width="1600" height="320" fill="#ECE6D3" fillOpacity="0.18" />
            </pattern>

            <mask id="textMask">
              <rect width="1600" height="320" fill="black" />
              <text
                x="800"
                y="232"
                textAnchor="middle"
                fontFamily="var(--font-playfair), serif"
                fontWeight="500"
                fontStyle="italic"
                fontSize="280"
                fill="white"
                letterSpacing="-6"
              >
                STATION
              </text>
            </mask>
          </defs>

          <rect
            width="1600"
            height="320"
            fill="url(#texture)"
            mask="url(#textMask)"
          />

          <text
            x="800"
            y="232"
            textAnchor="middle"
            fontFamily="var(--font-playfair), serif"
            fontWeight="500"
            fontStyle="italic"
            fontSize="280"
            fill="none"
            stroke="#2A2620"
            strokeWidth="1.2"
            strokeOpacity="0.25"
            letterSpacing="-6"
          >
            STATION
          </text>
        </svg>
      </div>

      <motion.div
        style={{ opacity }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: ease.weighted }}
        className="mx-auto mt-16 max-w-3xl px-gutter text-center"
      >
        <p className="font-display text-display-sm leading-[1.1] text-balance">
          ما <span className="italic text-terracotta">انتخاب</span> نمی‌کنیم،
          <br />
          ما <span className="italic">نگه‌داری</span> می‌کنیم.
        </p>
        <p className="mx-auto mt-8 max-w-xl font-sans text-base leading-loose text-ink/70">
          هر قطعه‌ای که وارد دیزاین استیشن می‌شود، آزمونی از زیبایی‌شناسی،
          مهندسی و دوام را پشت سر گذاشته است. ما به آرشیتکت‌ها فقط محصول
          نمی‌فروشیم؛ ما زبان مشترکی برای روایت فضا می‌سازیم.
        </p>
      </motion.div>
    </section>
  );
}
