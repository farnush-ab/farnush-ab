import type { Transition, Variants } from "framer-motion";

export const ease = {
  weighted: [0.22, 1, 0.36, 1] as const,
  glide: [0.65, 0, 0.35, 1] as const,
  exit: [0.7, 0, 0.84, 0] as const,
};

export const duration = {
  quick: 0.4,
  base: 0.7,
  slow: 1.2,
  cinematic: 1.8,
};

export const spring = {
  weighted: { type: "spring" as const, stiffness: 60, damping: 22, mass: 1.1 },
  drift: { type: "spring" as const, stiffness: 40, damping: 26, mass: 1.4 },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.base, ease: ease.weighted },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.slow, ease: ease.weighted } },
};

export const stagger = (delay = 0.08): Transition => ({
  staggerChildren: delay,
  delayChildren: 0.1,
});

export const revealMask: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: duration.slow, ease: ease.weighted },
  },
};
