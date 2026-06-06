"use client";

import { useNativeScroll } from "@/hooks/useNativeScroll";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Prefer simpler UX on mobile/touch and when reduced motion is requested. */
export function useLightMotion() {
  const reduced = useReducedMotion();
  const nativeScroll = useNativeScroll();
  return reduced || nativeScroll;
}
