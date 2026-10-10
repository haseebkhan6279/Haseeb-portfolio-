"use client";

import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { FEATURED_PROJECTS, type Project } from "@/data/projects";
import { statusLabel } from "@/data/project-types";
import ProductCard from "@/components/products/ProductCard";
import LoopVideo from "@/components/ui/LoopVideo";

const ease = [0.76, 0, 0.24, 1] as const;

function Preview({ project: p }: { project: Project }) {
  const wrap = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [6, -6]), { stiffness: 140, damping: 18 });
  const ry = useSpring(useTransform(px, [0, 1], [-8, 8]), { stiffness: 140, damping: 18 });
  const scale = useSpring(1.04, { stiffness: 80, damping: 20 });
  const gx = useTransform(px, (v) => `${v * 100}%`);
  const gy = useTransform(py, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(600px circle at ${gx} ${gy}, rgb(255 255 255 / 0.12), transparent 42%)`;

  return (
    <motion.div
      ref={wrap}
      className="relative aspect-[16/10] overflow-hidden rounded-[28px] bg-surface"
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200, scale }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !wrap.current) return;
        const r = wrap.current.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width);
        py.set((e.clientY - r.top) / r.height);
        scale.set(1.02);
      }}
      onPointerLeave={() => {
        px.set(0.5);
        py.set(0.5);
        scale.set(1.04);
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={p.slug}
          className="absolute inset-0"
          initial={{ y: "108%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-108%" }}
          transition={{ duration: 0.7, ease }}
        >
          <Image
            src={p.image}
            alt={`${p.name} — ${p.tagline}`}
            fill
            sizes="(min-width:1024px) 50vw, 100vw"
            className="object-cover object-top"

          />
          {p.video ? (
            <LoopVideo
              key={p.video}
              src={p.video}
              start={p.videoStart}
              poster={p.image}
              autoPlay
              className={`absolute inset-0 h-full w-full ${p.videoPortrait ? "object-contain bg-fg/90" : "object-cover object-top"}`}
            />
          ) : null}
          <motion.div className="pointer-events-none absolute inset-0" style={{ background: glare }} />
        </motion.div>
      </AnimatePresence>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent p-6 sm:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={p.slug + "-meta"}
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.45, ease }}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-white/60">{p.categories[0]}</p>
            <p className="mt-2 font-display text-3xl text-white">{p.name}</p>
            <p className="mt-1 text-sm text-white/70">{p.tagline}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/** Hover a name, the case-study media wipes in. Desktop-first agency interaction. */
export default function WorkShowcase() {
  const [active, setActive] = useState(0);
  const project = FEATURED_PROJECTS[active] ?? FEATURED_PROJECTS[0];

  return (
    <>
      <div className="space-y-12 lg:hidden">
        {FEATURED_PROJECTS.map((p) => (
          <ProductCard key={p.slug} project={p} />
        ))}
      </div>

      <div className="hidden lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start lg:gap-14">
      <ol className="relative">
        {FEATURED_PROJECTS.map((p, i) => {
          const on = i === active;
          return (
            <li key={p.slug} className="border-t border-line last:border-b">
              <div className="group relative flex w-full items-center gap-5 py-5 sm:py-6">
                {on ? (
                  <motion.span
                    layoutId="work-active-bar"
                    className="absolute inset-y-0 left-0 w-[3px] rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 36 }}
                  />
                ) : null}
                <Link
                  href={`/work/${p.slug}`}
                  data-cursor="View"
                  onPointerEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="flex min-w-0 flex-1 items-center gap-5 text-left"
                >
                <span className={`w-10 shrink-0 text-sm tabular-nums ${on ? "text-accent" : "text-muted"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <motion.span
                    className="block font-display leading-[1] tracking-[-0.04em]"
                    animate={{
                      opacity: on ? 1 : 0.45,
                      x: on ? 10 : 0,
                    }}
                    transition={{ duration: 0.4, ease }}
                    style={{ fontSize: "clamp(1.7rem, 3.4vw, 3.4rem)" }}
                  >
                    {p.name}
                  </motion.span>
                  <motion.span
                    className="mt-1 block text-sm text-muted"
                    animate={{ opacity: on ? 1 : 0.55 }}
                  >
                    {p.tagline}
                  </motion.span>
                </span>
                </Link>
                {p.url ? (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="Live"
                    onPointerEnter={() => setActive(i)}
                    className="hidden shrink-0 text-sm font-medium text-accent sm:inline-flex sm:items-center sm:gap-1"
                  >
                    Live <ArrowUpRight size={14} />
                  </a>
                ) : null}
                <Link
                  href={`/work/${p.slug}`}
                  onPointerEnter={() => setActive(i)}
                  className="hidden h-11 w-11 shrink-0 place-items-center rounded-full border border-line sm:grid"
                  style={{
                    backgroundColor: on ? "var(--fg)" : "rgba(0,0,0,0)",
                    color: on ? "var(--bg)" : "var(--muted)",
                    borderColor: on ? "var(--fg)" : "var(--line)",
                    transition: "background-color .4s, color .4s, border-color .4s, transform .5s cubic-bezier(.16,1,.3,1)",
                    transform: on ? "rotate(45deg)" : undefined,
                  }}
                >
                  <ArrowUpRight size={18} />
                </Link>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="sticky top-24">
        {project ? <Preview project={project} /> : null}
        {project ? (
          <div className="mt-5 max-w-lg">
            <motion.p
              key={project.slug + "-d"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[15px] leading-relaxed text-fg-2"
            >
              {project.description}
            </motion.p>
            {project.url ? (
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="Live"
                  className="btn btn-primary h-11 text-sm"
                >
                  Visit live site <ArrowUpRight size={16} />
                </a>
                <Link href={`/work/${project.slug}`} className="btn btn-ghost h-11 text-sm">
                  See how it was built
                </Link>
              </div>
            ) : (
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <p className="text-sm text-muted">{statusLabel(project.status)} — demo on request</p>
                <Link href={`/work/${project.slug}`} className="text-sm text-accent underline-offset-4 hover:underline">
                  See how it was built
                </Link>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
    </>
  );
}
