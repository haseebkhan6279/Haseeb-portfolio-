"use client";

import { ReactLenis } from "lenis/react";
import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import CustomCursor from "@/components/ui/CustomCursor";
import LenisScrollSync from "@/components/providers/LenisScrollSync";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduced = useReducedMotion();

  useEffect(() => {
    const onRefresh = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onRefresh);
    return () => window.removeEventListener("resize", onRefresh);
  }, []);

  if (reduced) {
    return (
      <>
        {children}
      </>
    );
  }

  return (
    <ReactLenis root options={{ lerp: 0.08, smoothWheel: true, syncTouch: false }}>
      <LenisScrollSync />
      <CustomCursor />
      {children}
    </ReactLenis>
  );
}
