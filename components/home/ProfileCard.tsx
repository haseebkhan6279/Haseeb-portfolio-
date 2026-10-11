"use client";

import { ArrowUpRight, Download } from "lucide-react";
import { useMemo, useRef } from "react";
import { CONTACT, PROFILE } from "@/data/site";
import type { GithubProfile } from "@/lib/github";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { GithubIcon } from "@/components/ui/BrandIcons";
import Counter from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const LEVEL_BG = ["var(--surface-3)", "#3b2d6b", "#6a4fc2", "#b69cff", "#ff9a6b"];

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#e6c831",
  Python: "#3572a5",
  CSS: "#7b5fb5",
  HTML: "#e34c26",
  Java: "#b07219",
};

const FACTS: [string, string][] = [
  ["Based in", "Lahore, Pakistan — working remotely"],
  ["Currently", "Full-time at Hypelet · part-time contract at Tekvers"],
  ["Focus", "SaaS, booking, e-commerce & mobile"],
  ["Education", "BS Computer Science · MS in progress"],
];

const PRINCIPLES = [
  ["Clear communication", "Regular updates, honest timelines and a staging link you can click at any time."],
  ["Built to last", "Typed, tested, documented code your next developer will thank you for."],
  ["Business first", "Every decision is weighed against conversions, speed and cost to run."],
];

function Heatmap({ github }: { github: GithubProfile }) {
  const weeks = useMemo(() => {
    const cols: (GithubProfile["days"][number] | null)[][] = [];
    const firstDow = new Date(`${github.days[0]?.date}T00:00:00Z`).getUTCDay();
    const padded = [...Array(firstDow).fill(null), ...github.days];
    for (let i = 0; i < padded.length; i += 7) cols.push(padded.slice(i, i + 7));
    return cols;
  }, [github.days]);

  return (
    <div className="w-full min-w-0 overflow-hidden">
      <div
        className="heatmap grid w-full gap-[2px]"
        style={{ gridTemplateColumns: `repeat(${Math.max(weeks.length, 1)}, minmax(0, 1fr))` }}
      >
        {weeks.map((week, wi) => (
          <div key={wi} className="grid min-w-0 gap-[2px]" style={{ gridTemplateRows: "repeat(7, minmax(0, 1fr))" }}>
            {week.map((d, di) =>
              d ? (
                <span
                  key={d.date}
                  title={`${d.count} contribution${d.count === 1 ? "" : "s"} on ${d.date}`}
                  className="heat-cell block aspect-square w-full rounded-[2px]"
                  style={{ background: LEVEL_BG[d.level] }}
                />
              ) : (
                <span key={`pad-${wi}-${di}`} className="block aspect-square w-full" />
              ),
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function GithubCard({ github }: { github: GithubProfile }) {
  const langTotal = github.languages.reduce((s, l) => s + l.count, 0);
  return (
    <div className="card min-w-0 overflow-hidden p-5 shadow-[var(--shadow-sm)] sm:p-7">
      <div className="flex items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-sm font-medium">
          <GithubIcon size={16} /> GitHub activity
        </p>
        <a
          href={CONTACT.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-sm text-fg-2 transition-colors hover:text-accent"
        >
          @{github.username} <ArrowUpRight size={14} />
        </a>
      </div>
      <p className="mt-6 font-display text-5xl leading-none">
        <Counter value={github.total} />
      </p>
      <p className="mt-2 text-sm text-muted">contributions in the last year</p>
      <div className="mt-6">
        <Heatmap github={github} />
      </div>
      <div className="mt-5 flex items-center justify-end gap-1.5 text-[11px] text-muted">
        Less
        {LEVEL_BG.map((c) => (
          <span key={c} className="h-2.5 w-2.5 rounded-[2px]" style={{ background: c }} />
        ))}
        More
      </div>
      {github.languages.length ? (
        <div className="mt-5 border-t border-line pt-5">
          <div className="flex h-1.5 overflow-hidden rounded-full bg-surface-3">
            {github.languages.map((l) => (
              <span
                key={l.name}
                className="h-full"
                style={{ width: `${(l.count / langTotal) * 100}%`, background: LANG_COLORS[l.name] ?? "#9a9890" }}
              />
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-fg-2">
            {github.languages.map((l) => (
              <span key={l.name} className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full" style={{ background: LANG_COLORS[l.name] ?? "#9a9890" }} />
                {l.name}
              </span>
            ))}
            <span className="ml-auto text-muted">{github.repos} public repos</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function ProfileCard({ github }: { github: GithubProfile | null }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current?.querySelector(".heatmap")) return;
      gsap.from(".heat-cell", {
        scale: 0,
        duration: 0.35,
        ease: "back.out(2)",
        stagger: { each: 0.0015, from: "start" },
        scrollTrigger: { trigger: ".heatmap", start: "top 88%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="about" className="section scroll-mt-16">
      <div className="shell">
        <SectionHeading title="A developer who thinks like" accent="a product owner.">
          {PROFILE.manifesto}
        </SectionHeading>

        <div className="grid min-w-0 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-16">
          <div className="min-w-0">
            <p className="text-[clamp(1.3rem,2.2vw,1.75rem)] font-medium leading-snug tracking-[-0.02em]">
              I’ve shipped booking platforms, online stores, SaaS dashboards and mobile apps used by real customers in
              the UK, the US and Pakistan.
            </p>
            <p className="mt-5 max-w-xl leading-relaxed text-fg-2">
              Today I build product features full-time at Hypelet and work part-time on contract with Tekvers. I
              work across the whole stack — Next.js and React on the front, Node.js and NestJS on the back,
              React Native for mobile — so you get one person accountable from the first wireframe to the production
              launch.
            </p>

            <dl className="mt-10 grid gap-x-8 sm:grid-cols-2">
              {FACTS.map(([k, v]) => (
                <div key={k} className="border-t border-line py-4">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">{k}</dt>
                  <dd className="mt-1.5 text-fg">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={PROFILE.cv} target="_blank" rel="noreferrer" className="btn btn-dark w-full sm:w-auto">
                <Download size={16} /> Download CV
              </a>
              <a href={CONTACT.linkedIn} target="_blank" rel="noreferrer" className="btn btn-ghost w-full sm:w-auto">
                Connect on LinkedIn <ArrowUpRight size={16} />
              </a>
            </div>
          </div>

          <div className="min-w-0 space-y-4">
            {github ? <GithubCard github={github} /> : null}
            <Reveal className="grid gap-3" y={24}>
              {PRINCIPLES.map(([title, text], i) => (
                <div key={title} className="flex gap-4 rounded-2xl border border-line bg-surface/60 p-5">
                  <span className="font-mono text-xs text-accent">0{i + 1}</span>
                  <div>
                    <p className="font-medium">{title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-fg-2">{text}</p>
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
