import type { Transition, Variants } from 'framer-motion';

// The four cadences from the brief as Framer transition presets
export const T = {
  glance: { duration: 0.22, ease: [0.22, 0.61, 0.36, 1] as [number, number, number, number] } as Transition,
  reveal: { duration: 0.98, ease: [0.16, 1, 0.30, 1] as [number, number, number, number] } as Transition,
  heavy: { duration: 2.20, ease: [0.65, 0, 0.35, 1] as [number, number, number, number] } as Transition,
  cinema: { duration: 4.20, ease: [0.83, 0, 0.17, 1] as [number, number, number, number] } as Transition,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: T.reveal },
};

export const staggerKids: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export const inertia = { k: 0.18, d: 0.20 };
