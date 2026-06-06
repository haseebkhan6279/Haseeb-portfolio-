"use client";

import { useLayoutEffect, type RefObject } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type RevealOptions = {
  selector?: string;
  y?: number;
  stagger?: number;
  threshold?: number;
};

export function useGsapReveal(
  ref: RefObject<HTMLElement | null>,
  options: RevealOptions = {},
) {
  const reduced = useReducedMotion();
  const { selector = "[data-reveal]", y = 48, stagger = 0.1, threshold = 0.12 } = options;

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || reduced) return;

    const items = gsap.utils.toArray<HTMLElement>(root.querySelectorAll(selector));
    if (items.length === 0) return;

    gsap.set(items, { opacity: 0, y, force3D: true });

    let done = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting) || done) return;
        done = true;
        io.disconnect();
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger,
          ease: "power3.out",
          onComplete: () => gsap.set(items, { clearProps: "transform" }),
        });
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );

    io.observe(root);
    return () => {
      io.disconnect();
      gsap.killTweensOf(items);
      gsap.set(items, { clearProps: "opacity,transform" });
    };
  }, [ref, reduced, selector, y, stagger, threshold]);
}
