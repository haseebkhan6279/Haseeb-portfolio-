"use client";

import { ReactLenis } from "lenis/react";
import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import CustomCursor from "@/components/ui/CustomCursor";
import LenisScrollSync from "@/components/providers/LenisScrollSync";
import { useLightMotion } from "@/hooks/useLightMotion";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const lightMotion = useLightMotion();

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const onRefresh = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => ScrollTrigger.refresh(), 150);
    };
    window.addEventListener("resize", onRefresh);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", onRefresh);
    };
  }, []);

  if (lightMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ lerp: 0.08, smoothWheel: true, syncTouch: false }}>
      <LenisScrollSync />
      <CustomCursor />
      {children}
    </ReactLenis>
  );
}
