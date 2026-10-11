"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/** Glows plus a giant outlined watermark that drift at different speeds as the page scrolls. */
export default function HeaderAtmosphere({ watermark }: { watermark?: string }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const markY = useTransform(scrollY, [0, 700], [0, reduce ? 0 : 160]);
  const markX = useTransform(scrollY, [0, 700], [0, reduce ? 0 : -80]);
  const glowY = useTransform(scrollY, [0, 700], [0, reduce ? 0 : 120]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.div style={{ y: glowY }} className="aurora -left-40 -top-40 h-[34rem] w-[34rem] bg-[#6d4bff] opacity-30" />
      <motion.div style={{ y: glowY }} className="aurora -right-32 top-24 h-[28rem] w-[28rem] bg-[#ff5a3c] opacity-20" />
      <div className="bg-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_70%_70%_at_30%_0%,#000,transparent)]" />
      {watermark ? (
        <motion.p
          style={{ y: markY, x: markX }}
          className="text-outline absolute -bottom-[0.18em] right-[-0.04em] select-none whitespace-nowrap font-display text-[clamp(7rem,22vw,20rem)] font-bold leading-none tracking-[-0.06em] opacity-70"
        >
          {watermark}
        </motion.p>
      ) : null}
    </div>
  );
}
