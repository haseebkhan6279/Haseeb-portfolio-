"use client";

import { useEffect, useState } from "react";

/** Touch devices and viewports below lg — use native scroll, no Lenis / pin / hijack. */
export function useNativeScroll() {
  const [native, setNative] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px), (pointer: coarse)");
    const update = () => setNative(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return native;
}
