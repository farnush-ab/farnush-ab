"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ease } from "@/lib/motion";

type PinProps = {
  x: number;
  y: number;
  label?: string;
  active?: boolean;
  onActivate?: () => void;
};

export function Pin({ x, y, label, active, onActivate }: PinProps) {
  return (
    <button
      type="button"
      onClick={onActivate}
      style={{ left: `${x}%`, top: `${y}%` }}
      className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none"
      aria-label={label}
    >
      <span className="relative grid place-items-center">
        <span
          aria-hidden
          className={cn(
            "absolute inset-0 rounded-full bg-bone/80",
            "animate-pin-pulse",
          )}
        />
        <motion.span
          aria-hidden
          initial={false}
          animate={{ scale: active ? 1.15 : 1 }}
          transition={{ duration: 0.5, ease: ease.weighted }}
          className={cn(
            "relative block h-3.5 w-3.5 rounded-full border border-bone/70 backdrop-blur-md",
            "bg-bone/40 group-hover:bg-bone/95 transition-colors duration-500",
          )}
        >
          <span className="absolute inset-[3px] rounded-full bg-ink/85 group-hover:bg-ink transition-colors duration-500" />
        </motion.span>
      </span>
    </button>
  );
}
