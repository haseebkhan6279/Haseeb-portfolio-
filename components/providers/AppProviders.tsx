"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import CommandPalette from "@/components/ui/CommandPalette";
import ScrollProgress from "@/components/ui/ScrollProgress";

/** Drives Lenis from GSAP's ticker so ScrollTrigger and smooth scroll stay in lockstep. */
function LenisGsapBridge() {
  const lenis = useLenis(ScrollTrigger.update);
  const pathname = usePathname();

  useEffect(() => {
    if (!lenis) return;
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(tick);
  }, [lenis]);

  useEffect(() => {
    if (!lenis) return;
    const hash = window.location.hash;
    if (!hash) lenis.scrollTo(0, { immediate: true });
    const id = window.setTimeout(() => {
      ScrollTrigger.refresh();
      // Honour /#section links once sections have their final height.
      if (hash && document.querySelector(hash)) lenis.scrollTo(hash, { offset: -80, immediate: true });
    }, 300);
    return () => window.clearTimeout(id);
  }, [pathname, lenis]);

  return null;
}

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ autoRaf: false, lerp: 0.1, smoothWheel: true, anchors: { offset: -80 } }}>
      <LenisGsapBridge />
      <ScrollProgress />
      <CommandPalette />
      {children}
    </ReactLenis>
  );
}
