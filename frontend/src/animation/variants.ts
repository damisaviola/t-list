import type { Variants } from "framer-motion";

/* CONTAINER (untuk stagger) */
export const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

/* ITEM (dipakai card, chart, stats, dll) */
export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut", // 🔥 aman TS
    },
  },
};
