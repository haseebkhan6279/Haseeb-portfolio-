"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState, useSyncExternalStore } from "react";

/**
 * Dot + ring cursor. Elements can set `data-cursor="View"` to show a label,
 * or `data-cursor="hide"` to hide it.
 */
const FINE_POINTER = "(hover: hover) and (pointer: fine)";

function subscribePointer(cb: () => void) {
  const mq = window.matchMedia(FINE_POINTER);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

export default function Cursor() {
  const enabled = useSyncExternalStore(
    subscribePointer,
    () => window.matchMedia(FINE_POINTER).matches,
    () => false,
  );
  const [label, setLabel] = useState<string | null>(null);
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 350, damping: 32, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 350, damping: 32, mass: 0.6 });

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor], a, button, input, textarea, select");
      const value = target?.dataset.cursor;
      setHidden(value === "hide");
      setLabel(value && value !== "hide" ? value : null);
      setHovering(Boolean(target));
    };
    const leave = () => setHidden(true);
    const enter = () => setHidden(false);

    window.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", leave);
    document.addEventListener("pointerenter", enter);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      document.removeEventListener("pointerenter", enter);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const size = label ? 96 : hovering ? 56 : 34;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[200] flex items-center justify-center rounded-full border"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: size,
          height: size,
          opacity: hidden ? 0 : 1,
          backgroundColor: label ? "var(--accent)" : "rgba(0,0,0,0)",
          borderColor: label ? "var(--accent)" : "var(--line-strong)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {label ? (
          <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-accent-fg">{label}</span>
        ) : null}
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[201] h-1.5 w-1.5 rounded-full bg-accent"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: hidden || label ? 0 : 1, scale: hovering ? 0 : 1 }}
      />
    </>
  );
}
