"use client";

import { useLenis } from "lenis/react";
import { ScrollTrigger } from "@/lib/gsap";

/** Tell ScrollTrigger to update when Lenis scrolls (ReactLenis already drives raf) */
export default function LenisScrollSync() {
  useLenis((lenis) => {
    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);
    ScrollTrigger.refresh();

    return () => {
      lenis.off("scroll", onScroll);
    };
  }, []);

  return null;
}
