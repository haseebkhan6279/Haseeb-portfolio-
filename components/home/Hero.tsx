"use client";

import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Component, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { CONTACT, PROFILE } from "@/data/site";
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "@/components/ui/BrandIcons";
import Magnetic from "@/components/ui/Magnetic";

const HeroBlob = dynamic(() => import("@/components/three/HeroBlob"), { ssr: false });

const RAIL = [
  { label: "LinkedIn", href: CONTACT.linkedIn, Icon: LinkedinIcon },
  { label: "WhatsApp", href: CONTACT.whatsapp, Icon: WhatsappIcon },
  { label: "GitHub", href: CONTACT.github, Icon: GithubIcon },
];

const subscribeNoop = () => () => {};

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") ?? c.getContext("webgl"));
  } catch {
    return false;
  }
}

/** If the 3D scene fails (lost context, driver issues), the hero keeps its glow background instead of crashing. */
class BlobBoundary extends Component<{ children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function Hero({ photo }: { photo: string | null }) {
  const root = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const reduced = useSyncExternalStore(subscribeNoop, prefersReducedMotion, () => false);
  // Mount the WebGL scene after the headline intro has started, so slow GPUs never leave the hero blank.
  const [showBlob, setShowBlob] = useState(false);
  useEffect(() => {
    const show = () => setShowBlob(hasWebGL());
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(show, { timeout: 1200 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(show, 600);
    return () => window.clearTimeout(id);
  }, []);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      if (prefersReducedMotion()) return;

      // Intro: lines rise out of their masks, then the supporting UI settles in.
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(q(".hero-line > span"), { yPercent: 115, rotate: 4, duration: 1.4, stagger: 0.09 }, 0.2)
        .from(q(".hero-canvas"), { scale: 0.6, opacity: 0, duration: 2, ease: "expo.out" }, 0)
        .from(q(".hero-in"), { y: 26, opacity: 0, duration: 1.1, stagger: 0.07 }, 0.65)
        .from(q(".hero-rail > *"), { x: -20, opacity: 0, duration: 0.9, stagger: 0.06 }, 0.9);

      // Scroll parallax: every layer moves at its own speed as the hero leaves.
      const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
      gsap.to(q(".hero-line-a"), { xPercent: -14, ease: "none", scrollTrigger: st });
      gsap.to(q(".hero-line-b"), { xPercent: 10, ease: "none", scrollTrigger: st });
      gsap.to(q(".hero-line-c"), { xPercent: -6, ease: "none", scrollTrigger: st });
      gsap.to(q(".hero-canvas"), { yPercent: 28, ease: "none", scrollTrigger: st });
      gsap.to(q(".hero-fade"), { yPercent: -60, opacity: 0, ease: "none", scrollTrigger: st });
      gsap.to(q(".hero-aurora"), { yPercent: 45, ease: "none", scrollTrigger: st });
      ScrollTrigger.create({ ...st, onUpdate: (self) => (progress.current = self.progress) });

      // Pointer parallax on depth layers.
      const layers = q<HTMLElement>("[data-depth]").map((el) => ({
        depth: Number(el.dataset.depth),
        x: gsap.quickTo(el, "x", { duration: 1.2, ease: "power3.out" }),
        y: gsap.quickTo(el, "y", { duration: 1.2, ease: "power3.out" }),
      }));
      const move = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        layers.forEach((l) => {
          l.x(nx * l.depth * 60);
          l.y(ny * l.depth * 40);
        });
      };
      window.addEventListener("pointermove", move);
      return () => window.removeEventListener("pointermove", move);
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-24 sm:pt-28">
      {/* Atmosphere: one soft white spotlight from the top */}
      <div aria-hidden className="hero-aurora pointer-events-none absolute inset-0 -z-20">
        <div data-depth="-0.3" className="absolute inset-x-0 top-0 h-[80%] bg-[radial-gradient(ellipse_55%_60%_at_50%_0%,rgb(255_255_255/0.09),transparent_70%)]" />
      </div>
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(ellipse_60%_55%_at_50%_35%,#000,transparent)]"
      />

      {/* 3D scene */}
      <div aria-hidden className="hero-canvas pointer-events-none absolute inset-0 -z-10 opacity-55 sm:opacity-100">
        <div data-depth="0.5" className="absolute inset-[-6%] sm:inset-0">
          {showBlob ? (
            <div className="fade-in absolute inset-0">
              <BlobBoundary>
                <HeroBlob progress={progress} reduced={reduced} />
              </BlobBoundary>
            </div>
          ) : null}
        </div>
      </div>

      {/* Scrim keeps type legible over the blob's reflections. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_42%_at_50%_58%,rgb(0_0_0/0.6),transparent_72%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-b from-transparent to-bg" />

      {/* Vertical social rail, desktop */}
      <div className="hero-rail absolute left-7 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-5 xl:flex">
        <span aria-hidden className="h-40 w-px bg-gradient-to-b from-transparent via-line-strong to-fg" />
        <span aria-hidden className="-mt-5 h-1.5 w-1.5 rounded-full bg-fg" />
        {RAIL.map(({ label, href, Icon }) => (
          <Magnetic key={label} strength={0.5}>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="grid h-10 w-10 place-items-center rounded-full text-fg-2 transition-colors hover:bg-surface-2 hover:text-fg"
            >
              <Icon size={19} />
            </a>
          </Magnetic>
        ))}
      </div>

      <div className="shell relative flex flex-1 flex-col">
        <div className="hero-fade flex flex-1 flex-col items-center justify-center text-center">
          <p className="hero-in inline-flex items-center gap-3 rounded-full border border-line bg-surface/60 py-1.5 pl-1.5 pr-4 text-[13px] text-fg-2 backdrop-blur-md sm:text-sm">
            {photo ? (
              <span className="relative h-7 w-7 overflow-hidden rounded-full ring-1 ring-line-strong">
                <Image src={photo} alt="" fill sizes="28px" className="object-cover" />
              </span>
            ) : (
              <span className="grid h-7 w-7 place-items-center rounded-full bg-[image:var(--gradient)] text-[10px] font-bold text-accent-fg">
                HK
              </span>
            )}
            Hi! I’m {PROFILE.displayName} — {PROFILE.role}
          </p>

          <h1 className="hero-title mt-6 select-none [text-shadow:0_6px_40px_rgb(0_0_0/0.45)] sm:mt-7" aria-label="Building digital products that perform.">
            <span aria-hidden className="hero-line hero-line-a block overflow-hidden pb-[0.06em]">
              <span className="inline-block">Building</span>
            </span>
            <span aria-hidden className="hero-line hero-line-b block overflow-hidden pb-[0.06em]">
              <span className="inline-block">
                digital <span className="text-outline [-webkit-text-stroke-color:var(--fg)]">products</span>
              </span>
            </span>
            <span aria-hidden className="hero-line hero-line-c block overflow-hidden pb-[0.12em]">
              <span className="inline-block">
                that <span className="serif-i">perform.</span>
              </span>
            </span>
          </h1>

          <p className="hero-in lede mt-6 max-w-[36rem] text-fg/80 [text-shadow:0_2px_18px_rgb(0_0_0/0.95)] sm:mt-7">
            Full-stack web &amp; mobile development for startups and growing businesses — SaaS dashboards, booking
            platforms, online stores and apps. Designed, built and shipped end to end.
          </p>

          <div className="hero-in mt-8 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
            <Magnetic strength={0.25} className="block w-full sm:inline-block sm:w-auto">
              <Link href="/#work" className="btn btn-primary w-full sm:w-auto" data-cursor="Go">
                View my work <ArrowUpRight size={16} />
              </Link>
            </Magnetic>
            <Magnetic strength={0.25} className="block w-full sm:inline-block sm:w-auto">
              <Link href="/contact" className="btn btn-ghost w-full backdrop-blur-md sm:w-auto">
                Start a project
              </Link>
            </Magnetic>
            <a
              href={PROFILE.cv}
              target="_blank"
              rel="noreferrer"
              className="link-underline inline-flex items-center gap-2 py-2 text-sm font-medium text-fg-2 hover:text-fg sm:ml-2"
            >
              <Download size={15} /> Download CV
            </a>
          </div>
        </div>

        <div className="hero-in flex items-end justify-between gap-6 pb-7 pt-10 text-xs text-muted sm:pb-9">
          <p className="flex items-center gap-2">
            <span className="status-dot" /> {PROFILE.availability}
          </p>
          <p className="hidden items-center gap-2 font-mono uppercase tracking-[0.14em] sm:flex">
            Scroll to explore
            <span className="grid h-8 w-8 place-items-center rounded-full border border-line-strong">
              <ArrowDown size={13} className="float-y" />
            </span>
          </p>
          <p className="text-right">{PROFILE.location}</p>
        </div>
      </div>
    </section>
  );
}
