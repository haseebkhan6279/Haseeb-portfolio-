"use client";

import gsap from "gsap";
import { useLayoutEffect, type RefObject } from "react";
import { useLightMotion } from "@/hooks/useLightMotion";

type Options = {
  itemSelector?: string;
  headerSelector?: string;
  stagger?: number;
  threshold?: number;
};

/** Tekvers-style intersection reveal: header stagger, then items */
export function useTekversReveal(
  ref: RefObject<HTMLElement | null>,
  options: Options = {},
) {
  const lightMotion = useLightMotion();
  const {
    itemSelector = "[data-reveal-item]",
    headerSelector = "[data-reveal-header]",
    stagger = 0.1,
    threshold = 0.08,
  } = options;

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || lightMotion) return;

    const headerEls = gsap.utils.toArray<HTMLElement>(root.querySelectorAll(headerSelector));
    const items = gsap.utils.toArray<HTMLElement>(root.querySelectorAll(itemSelector));
    const all = [...headerEls, ...items];
    if (all.length === 0) return;

    gsap.set(all, { opacity: 0, y: 40, force3D: true });

    let played = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting) || played) return;
        played = true;
        io.disconnect();

        const clear = () => gsap.set(all, { clearProps: "transform" });

        const tl = gsap.timeline({ onComplete: clear });
        if (headerEls.length > 0) {
          tl.to(headerEls, {
            opacity: 1,
            y: 0,
            duration: 0.68,
            stagger: 0.11,
            ease: "power3.out",
          });
        }
        if (items.length > 0) {
          tl.to(
            items,
            {
              opacity: 1,
              y: 0,
              duration: 0.72,
              stagger,
              ease: "power3.out",
            },
            headerEls.length > 0 ? "-=0.38" : 0,
          );
        }
      },
      { threshold, rootMargin: "0px 0px -6% 0px" },
    );

    io.observe(root);
    return () => {
      io.disconnect();
      gsap.killTweensOf(all);
      gsap.set(all, { clearProps: "opacity,transform" });
    };
  }, [ref, lightMotion, itemSelector, headerSelector, stagger, threshold]);
}
