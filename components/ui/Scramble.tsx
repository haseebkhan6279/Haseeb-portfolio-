"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "!<>-_\\/[]{}—=+*^?#_$%&01";

/**
 * "Decrypting" text: random glyphs resolve into the real text, left to right,
 * when the element scrolls into view (or immediately with `immediate`).
 */
export default function Scramble({
  text,
  className,
  immediate = false,
  delay = 0,
  speed = 1,
}: {
  text: string;
  className?: string;
  immediate?: boolean;
  delay?: number;
  speed?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [out, setOut] = useState(text);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let timer = 0;

    const run = () => {
      const start = performance.now() + delay * 1000;
      const perChar = 28 / speed;
      const tick = (now: number) => {
        const elapsed = now - start;
        const resolved = Math.max(0, Math.floor(elapsed / perChar));
        let s = "";
        for (let i = 0; i < text.length; i++) {
          const ch = text[i];
          if (ch === " " || i < resolved) s += ch;
          else if (elapsed < 0) s += " ";
          else s += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        setOut(s);
        if (resolved < text.length) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    if (immediate) {
      timer = window.setTimeout(run, 0);
    } else {
      // Hide until it scrolls in, then decode.
      timer = window.setTimeout(() => setOut(text.replace(/\S/g, " ")), 0);
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            io.disconnect();
            run();
          }
        },
        { rootMargin: "0px 0px -12% 0px" },
      );
      io.observe(el);
      return () => {
        io.disconnect();
        clearTimeout(timer);
        cancelAnimationFrame(raf);
      };
    }
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [text, immediate, delay, speed]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden style={{ whiteSpace: "pre-wrap" }}>
        {out}
      </span>
    </span>
  );
}
