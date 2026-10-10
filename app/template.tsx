"use client";

import { motion } from "framer-motion";

/** Re-mounts on every navigation: a soft content fade. */
export default function Template({ children }: { children: React.ReactNode }) {
  // Opacity only — a transform here would break position:fixed and GSAP pinning inside pages.
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}
