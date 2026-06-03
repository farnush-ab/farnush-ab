"use client";

import { motion } from "framer-motion";
import { ease } from "@/lib/motion";

export function HotspotTooltip({
  name,
  descriptor,
  x,
  y,
}: {
  name: string;
  descriptor: string;
  x: number;
  y: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.45, ease: ease.weighted }}
      style={{ left: `${x}%`, top: `${y}%` }}
      className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+18px)] whitespace-nowrap rounded-sm bg-bone/95 px-4 py-3 shadow-[0_10px_30px_-15px_rgba(42,38,32,0.45)] backdrop-blur"
    >
      <p className="font-display text-base text-ink">{name}</p>
      <p className="mt-0.5 font-sans text-caption text-ash">{descriptor}</p>
    </motion.div>
  );
}
