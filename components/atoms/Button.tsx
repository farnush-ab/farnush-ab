"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { ease, duration } from "@/lib/motion";

type Variant = "primary" | "ghost" | "pill";

type ButtonProps = Omit<HTMLMotionProps<"button">, "children"> & {
  variant?: Variant;
  withArrow?: boolean;
  children?: React.ReactNode;
};

const baseStyles =
  "group relative inline-flex items-center justify-center gap-3 font-sans text-sm tracking-[0.08em] transition-colors";

const variantStyles: Record<Variant, string> = {
  primary:
    "px-7 py-4 bg-ink text-bone hover:bg-gold/95 rounded-none border border-ink",
  ghost:
    "px-1 py-2 text-ink/80 hover:text-ink border-b border-hairline hover:border-ink",
  pill:
    "px-6 py-3 rounded-full border border-ink/30 text-ink hover:bg-ink hover:text-bone",
};

export function Button({
  variant = "primary",
  withArrow = true,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ y: 0, scale: 0.985 }}
      transition={{ duration: duration.quick, ease: ease.weighted }}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...rest}
    >
      <span className="relative">{children}</span>
      {withArrow && (
        <span
          aria-hidden
          className="inline-block translate-x-0 transition-transform duration-700 ease-weighted group-hover:-translate-x-1 rtl:group-hover:translate-x-1 rtl:rotate-180"
        >
          →
        </span>
      )}
    </motion.button>
  );
}
