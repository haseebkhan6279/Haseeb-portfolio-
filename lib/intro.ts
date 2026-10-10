/** Coordinates the preloader with hero intro animations. */
declare global {
  interface Window {
    __hkIntroReady?: boolean;
  }
}

export function markIntroReady() {
  window.__hkIntroReady = true;
  window.dispatchEvent(new Event("hk:intro-ready"));
}

export function onIntroReady(cb: () => void) {
  if (window.__hkIntroReady) {
    cb();
    return () => {};
  }
  window.addEventListener("hk:intro-ready", cb, { once: true });
  return () => window.removeEventListener("hk:intro-ready", cb);
}
