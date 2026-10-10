"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { markIntroReady } from "@/lib/intro";
import { PROFILE } from "@/data/site";

const KEY = "hk-preloaded";

export default function Preloader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {}
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      markIntroReady();
      return;
    }
    const hide = window.setTimeout(() => {
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {}
      setShow(false);
      window.setTimeout(markIntroReady, 420);
    }, 1400);
    return () => clearTimeout(hide);
  }, []);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key="boot"
          className="preloader fixed inset-0 z-[300] grid place-items-center bg-bg"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="text-center">
            <p className="font-serif text-5xl tracking-tight">{PROFILE.displayName}</p>
            <p className="mt-3 text-xs uppercase tracking-[0.2em] text-muted">{PROFILE.studio}</p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
