"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/** Clip-reveal on enter, then gentle scale while scrolling past. */
export default function Parallax({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 0.98]);
  const y = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden ${className}`}
      initial={{ clipPath: "inset(12% 8% 12% 8% round 24px)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 24px)" }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div style={{ scale, y }}>{children}</motion.div>
    </motion.div>
  );
}
