"use client";

import { motion } from "framer-motion";
import type { Brand } from "@/lib/brands";
import { ease } from "@/lib/motion";

export function BrandLogo({ brand }: { brand: Brand }) {
  return (
    <motion.div
      whileHover="hover"
      initial="rest"
      className="group relative flex h-32 items-center justify-center overflow-hidden border-b border-hairline px-6"
    >
      <motion.div
        variants={{
          rest: { opacity: 0.35, filter: "grayscale(100%)", y: 0 },
          hover: { opacity: 1, filter: "grayscale(0%)", y: -4 },
        }}
        transition={{ duration: 0.7, ease: ease.weighted }}
        className="ltr font-display text-3xl tracking-tight text-ink"
      >
        {brand.name}
      </motion.div>
      <motion.div
        variants={{
          rest: { opacity: 0, y: 12 },
          hover: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.6, ease: ease.weighted }}
        className="ltr absolute bottom-3 left-1/2 -translate-x-1/2 font-sans text-eyebrow text-ash num"
      >
        {brand.origin} · since {brand.since}
      </motion.div>
    </motion.div>
  );
}
