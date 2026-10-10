"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";
import { statusLabel } from "@/data/project-types";
import { CATEGORY_META } from "./categoryIcons";
import LoopVideo from "@/components/ui/LoopVideo";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

export default function ProductCard({
  project: p,
  priority,
  size = "md",
}: {
  project: Project;
  priority?: boolean;
  size?: "md" | "lg";
}) {
  const box = useRef<HTMLElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const Icon = CATEGORY_META[p.categories[0]].icon;

  const play = () => {
    if (!vid.current) return;
    vid.current.currentTime = p.videoStart ?? 0;
    vid.current.play().then(() => setPlaying(true)).catch(() => {});
  };
  const stop = () => {
    vid.current?.pause();
    setPlaying(false);
  };

  useEffect(() => {
    if (!p.video || !box.current || window.matchMedia("(hover: hover)").matches) return;
    const io = new IntersectionObserver(([e]) => {
      if (!vid.current) return;
      if (e.intersectionRatio > 0.6) vid.current.play().then(() => setPlaying(true)).catch(() => {});
      else {
        vid.current.pause();
        setPlaying(false);
      }
    }, { threshold: [0, 0.6, 1] });
    io.observe(box.current);
    return () => io.disconnect();
  }, [p.video]);

  useGSAP(
    () => {
      if (!media.current || prefersReducedMotion()) return;
      const img = media.current.querySelector("img");
      gsap.fromTo(
        media.current,
        { y: 28 },
        {
          y: 0,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: { trigger: media.current, start: "top 90%", once: true },
        },
      );
      if (img) {
        gsap.fromTo(
          img,
          { scale: 1.18 },
          {
            scale: 1,
            duration: 1.35,
            ease: "expo.out",
            scrollTrigger: { trigger: media.current, start: "top 90%", once: true },
          },
        );
      }
    },
    { scope: box },
  );

  return (
    <article ref={box} className="group flex h-full flex-col">
      <Link
        href={`/work/${p.slug}`}
        onPointerEnter={(e) => e.pointerType === "mouse" && p.video && play()}
        onPointerLeave={stop}
        data-cursor="View"
        className="block"
      >
      <div
        ref={media}
        className={`relative overflow-hidden rounded-[20px] border border-line bg-surface-2 ${size === "lg" ? "aspect-[16/10]" : "aspect-[16/11]"}`}
      >
        <Image
          src={p.image}
          alt={`${p.name} — ${p.tagline}`}
          fill
          preload={priority}
          sizes={size === "lg" ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
          className={`${p.mediaFit === "contain" ? "object-contain" : "object-cover object-top"} origin-center transition duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08] ${playing ? "opacity-0" : "opacity-100"}`}
        />
        {p.video ? (
          <LoopVideo
            ref={vid}
            src={p.video}
            start={p.videoStart}
            preload="none"
            className={`absolute inset-0 h-full w-full ${p.videoPortrait ? "object-contain" : "object-cover object-top"} transition-opacity duration-500 ${playing ? "opacity-100" : "opacity-0"}`}
          />
        ) : null}
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 text-[11px] text-white backdrop-blur">
          <Icon size={12} /> {p.categories[0]}
        </span>
        {p.url ? (
          <span className="absolute bottom-3 left-3 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur"><span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 align-middle" />
            Live site
          </span>
        ) : null}
        <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white text-black opacity-100 shadow-lg transition-all duration-500 md:opacity-0 md:group-hover:rotate-45 md:group-hover:opacity-100">
          <ArrowUpRight size={16} />
        </span>
      </div>
      </Link>

      <div className="flex flex-1 flex-col px-1 pt-4">
        <div>
          <h3 className={`font-display tracking-[-0.03em] transition-colors group-hover:text-accent ${size === "lg" ? "text-[1.7rem]" : "text-xl"}`}>
            <Link href={`/work/${p.slug}`}>{p.name}</Link>
          </h3>
          <p className="mt-1 text-sm text-fg-2">{p.tagline}</p>
        </div>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">{p.description}</p>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          {p.url ? (
            <a
              href={p.url}
              target="_blank"
              rel="noreferrer"
              data-cursor="Live"
              className="inline-flex items-center gap-1 font-medium text-accent"
            >
              Visit live site <ArrowUpRight size={14} />
            </a>
          ) : (
            <span className="text-muted">{statusLabel(p.status)}</span>
          )}
          <Link href={`/work/${p.slug}`} className="text-muted underline-offset-4 hover:text-fg hover:underline">
            See how it was built
          </Link>
        </div>
      </div>
    </article>
  );
}
