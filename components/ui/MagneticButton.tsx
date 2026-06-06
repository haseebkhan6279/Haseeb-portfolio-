"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { useRef, type ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: "solid" | "ghost" | "outline";
};

function isExternal(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

export default function MagneticButton({
  href,
  children,
  className = "",
  variant = "solid",
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });
  const external = isExternal(href);

  const variants = {
    solid:
      "bg-sky-400 text-slate-950 hover:bg-sky-300 shadow-[0_0_40px_var(--accent-glow)]",
    ghost: "border border-white/15 text-slate-100 hover:border-sky-400/50 hover:bg-white/5",
    outline: "border border-sky-500/40 text-sky-200 hover:bg-sky-500/10",
  };

  return (
    <motion.div style={{ x: sx, y: sy }} data-magnetic className="inline-block max-w-full">
      <Link
        ref={ref}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={`btn-interactive inline-flex min-h-[2.75rem] max-w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-colors ${variants[variant]} ${className}`}
        onMouseMove={(e) => {
          const el = ref.current;
          if (!el) return;
          const r = el.getBoundingClientRect();
          x.set((e.clientX - r.left - r.width / 2) * 0.18);
          y.set((e.clientY - r.top - r.height / 2) * 0.18);
        }}
        onMouseLeave={() => {
          x.set(0);
          y.set(0);
        }}
      >
        {children}
      </Link>
    </motion.div>
  );
}
