"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";

type SplitProps = {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "p" | "div";
  className?: string;
  /** Animate on mount instead of on scroll. */
  immediate?: boolean;
  delay?: number;
};

/** Masked line-by-line rise using GSAP SplitText. */
export function SplitReveal({ children, as: Tag = "h2", className, immediate, delay = 0 }: SplitProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ref.current || prefersReducedMotion()) return;
      const split = SplitText.create(ref.current, {
        type: "lines,words",
        linesClass: "split-line",
        mask: "lines",
        autoSplit: true,
        onSplit(self) {
          return gsap.from(self.words, {
            yPercent: 110,
            duration: 1.1,
            ease: "expo.out",
            stagger: 0.035,
            delay,
            scrollTrigger: immediate ? undefined : { trigger: ref.current, start: "top 88%", once: true },
          });
        },
      });
      return () => split.revert();
    },
    { scope: ref },
  );

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={className}>
      {children}
    </Tag>
  );
}

/** Fades/rises direct children (or elements marked `data-reveal`) on scroll. */
export function Reveal({
  children,
  className,
  stagger = 0.08,
  y = 40,
  selector = ":scope > *",
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  y?: number;
  selector?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current || prefersReducedMotion()) return;
      const items = ref.current.querySelectorAll(selector);
      gsap.set(items, { y, opacity: 0 });
      ScrollTrigger.batch(items, {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { y: 0, opacity: 1, duration: 1, ease: "expo.out", stagger }),
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/** Scroll-scrubbed word highlight: words brighten as you read. */
export function ScrubText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const words = ref.current.querySelectorAll("span");
      if (prefersReducedMotion()) {
        gsap.set(words, { opacity: 1 });
        return;
      }
      gsap.fromTo(
        words,
        { opacity: 0.15 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top 80%", end: "bottom 45%", scrub: true },
        },
      );
    },
    { scope: ref },
  );

  return (
    <p ref={ref} className={className} aria-label={text}>
      {text.split(" ").map((w, i) => (
        <span key={i} aria-hidden className="inline-block pr-[0.25em]">
          {w}
        </span>
      ))}
    </p>
  );
}
