"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { PROJECT_CATEGORIES, PROJECTS, type Project, type ProjectCategory } from "@/data/projects";
import { statusLabel } from "@/data/project-types";
import WorkShowcase from "@/components/home/WorkShowcase";
import LoopVideo from "@/components/ui/LoopVideo";
import SectionHeading from "@/components/ui/SectionHeading";
import Magnetic from "@/components/ui/Magnetic";

const ease = [0.76, 0, 0.24, 1] as const;

function Filters({
  category,
  onChange,
}: {
  category: ProjectCategory | "All";
  onChange: (c: ProjectCategory | "All") => void;
}) {
  return (
    <div className="-mx-1 flex snap-x snap-mandatory gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] lg:flex-col lg:overflow-visible lg:px-0" role="tablist" aria-label="Filter archive">
      {(["All", ...PROJECT_CATEGORIES] as const).map((c) => {
        const count = c === "All" ? PROJECTS.length : PROJECTS.filter((p) => p.categories.includes(c)).length;
        const on = category === c;
        return (
          <button
            key={c}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => onChange(c)}
            className={`snap-start shrink-0 rounded-full px-3.5 py-2 text-left text-[13px] transition-colors ${
              on ? "bg-fg text-bg" : "bg-surface-2 text-fg-2 lg:bg-transparent hover:text-fg"
            }`}
          >
            {c} <span className="opacity-60">{count}</span>
          </button>
        );
      })}
    </div>
  );
}

/** Filterable archive of every project — rendered on /archive. */
export function Archive() {
  const [category, setCategory] = useState<ProjectCategory | "All">("All");
  const [active, setActive] = useState<Project>(PROJECTS.find((p) => p.slug === "ostello") ?? PROJECTS[0]);

  const items = useMemo(() => {
    const list = category === "All" ? PROJECTS : PROJECTS.filter((p) => p.categories.includes(category));
    return list.filter((p, i, a) => a.findIndex((x) => x.slug === p.slug) === i);
  }, [category]);

  function pick(c: ProjectCategory | "All") {
    setCategory(c);
    const next = c === "All" ? PROJECTS[0] : PROJECTS.find((p) => p.categories.includes(c));
    if (next) setActive(next);
  }

  return (
    <>
      <div className="lg:hidden">
        <Filters category={category} onChange={pick} />
        <ul className="mt-5 space-y-3">
          {items.slice(0, 7).map((p) => (
            <li key={p.slug}>
              <div className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-2.5">
                <Link href={`/work/${p.slug}`} className="relative h-[4.5rem] w-[5.5rem] shrink-0 overflow-hidden rounded-xl bg-surface-2">
                  <Image src={p.image} alt={p.name} fill sizes="88px" className="object-cover object-top" />
                </Link>
                <div className="min-w-0 flex-1">
                  <Link href={`/work/${p.slug}`} className="flex items-center gap-2">
                    <span className="font-display truncate text-[1.05rem] leading-tight">{p.name}</span>
                    {p.status === "Live" ? <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-ok" /> : null}
                  </Link>
                  <p className="mt-1 truncate text-sm text-muted">{p.tagline}</p>
                  {p.url ? (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 inline-flex items-center gap-1 text-[13px] font-medium text-accent"
                    >
                      Visit live site <ArrowUpRight size={12} />
                    </a>
                  ) : (
                    <span className="mt-1 block text-[11px] uppercase tracking-[0.12em] text-fg-2">{statusLabel(p.status)}</span>
                  )}
                </div>
                <Link href={`/work/${p.slug}`} className="shrink-0 text-muted" aria-label={`${p.name} — how it was built`}>
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </li>
          ))}
        </ul>
        {items.length > 7 ? (
          <Link href="/work" className="btn btn-ghost mt-5 w-full">
            Load more projects <ArrowUpRight size={16} />
          </Link>
        ) : null}
      </div>

      <div className="hidden overflow-hidden rounded-[24px] border border-line bg-bg-2 lg:grid lg:grid-cols-[minmax(240px,320px)_1fr]">
        <aside className="border-r border-line" data-lenis-prevent>
          <div className="border-b border-line p-3">
            <Filters category={category} onChange={pick} />
          </div>
          <ul className="max-h-[640px] overflow-y-auto p-2">
            {items.map((p) => (
              <li key={p.slug}>
                <button
                  type="button"
                  onClick={() => setActive(p)}
                  className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                    active.slug === p.slug ? "bg-surface-2 text-fg" : "text-fg-2 hover:bg-surface-2/60 hover:text-fg"
                  }`}
                >
                  <span className="truncate">{p.name}</span>
                  {p.status === "Live" ? <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-ok" /> : null}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.slug}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="p-5 sm:p-8"
          >
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-bg">
              <motion.div
                key={active.slug + "-img"}
                className="absolute inset-0"
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.65, ease }}
              >
                {active.video ? (
                  <LoopVideo
                    key={active.video}
                    src={active.video}
                    start={active.videoStart}
                    poster={active.image}
                    autoPlay
                    className={`h-full w-full ${active.videoPortrait ? "object-contain" : "object-cover object-top"}`}
                  />
                ) : (
                  <Image src={active.image} alt={`${active.name} — ${active.tagline}`} fill sizes="(min-width:1024px) 55vw, 100vw" className="object-cover object-top" />
                )}
              </motion.div>
            </div>
            <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="kicker">{active.categories[0]}</p>
                <h3 className="font-display mt-3 text-3xl">{active.name}</h3>
                <p className="mt-1 text-fg-2">{active.tagline}</p>
              </div>
              <span className="chip bg-surface-2">{statusLabel(active.status)} · {active.role}</span>
            </div>
            <p className="mt-4 max-w-2xl leading-relaxed text-fg-2">{active.description}</p>
            <ul className="mt-5 space-y-2 text-sm text-fg-2">
              {active.highlights.slice(0, 4).map((h) => (
                <li key={h} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {h}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={`/work/${active.slug}`} className="btn btn-primary h-11 text-sm">
                See how it was built <ArrowUpRight size={16} />
              </Link>
              {active.url ? (
                <a href={active.url} target="_blank" rel="noreferrer" className="btn btn-ghost h-11 text-sm">
                  Visit live site <ArrowUpRight size={16} />
                </a>
              ) : null}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}

export default function Projects() {
  return (
    <section id="work" className="theme-ink section relative isolate scroll-mt-0">
      <div aria-hidden className="aurora -z-10 -right-40 top-24 h-[34rem] w-[34rem] bg-[var(--glow-indigo)] opacity-[0.18]" />
      <div className="shell">
        <SectionHeading title="Real products," accent="live in production.">
          A selection of platforms I’ve designed and built for clients. Open the live site, or read the case study.
        </SectionHeading>

        <WorkShowcase />

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Magnetic className="block w-full sm:inline-block sm:w-auto">
            <Link href="/archive" className="btn btn-ghost w-full sm:w-auto">
              Browse the archive <ArrowUpRight size={16} />
            </Link>
          </Magnetic>
          <Magnetic className="block w-full sm:inline-block sm:w-auto">
            <Link href="/work" className="btn btn-ghost w-full sm:w-auto">
              See all {PROJECTS.length} projects <ArrowUpRight size={16} />
            </Link>
          </Magnetic>
        </div>

      </div>
    </section>
  );
}
