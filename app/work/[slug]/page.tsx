import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/ui/Reveal";
import LoopVideo from "@/components/ui/LoopVideo";
import Parallax from "@/components/work/Parallax";
import ProjectMedia from "@/components/work/ProjectMedia";
import { getAdjacentProject, getProject, PROJECTS } from "@/data/projects";
import { liveHost, statusLabel } from "@/data/project-types";
import { buildPageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return buildPageMetadata({
    title: `${p.name} — ${p.tagline}`,
    description: p.description,
    path: `/work/${p.slug}`,
    image: p.image,
  });
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="kicker mb-5">{children}</p>;
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const next = getAdjacentProject(slug);
  const index = PROJECTS.findIndex((x) => x.slug === slug);

  const meta: [string, ReactNode][] = [
    ["What I did", p.role],
    ["Status", statusLabel(p.status)],
    ["Industry", p.caseStudy?.industry ?? p.categories.join(" · ")],
    [
      "Live site",
      p.url ? (
        <a href={p.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-accent hover:underline">
          {liveHost(p.url)} <ArrowUpRight size={14} />
        </a>
      ) : (
        "Private / in progress"
      ),
    ],
  ];

  return (
    <article>
      <header className="relative overflow-hidden">
        <div className="dot-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,#000,transparent)]" aria-hidden />
        <div className="shell relative pb-10 pt-28 sm:pt-36">
          <Link href="/work" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg">
            <ArrowLeft size={15} /> All work
          </Link>
          <p className="kicker mt-8">
            {String(index + 1).padStart(2, "0")} / {PROJECTS.length} · {p.categories.join(" · ")}
          </p>
          <h1 className="h-display mt-4">{p.name}</h1>
          <p className="mt-4 text-[clamp(1.05rem,2vw,1.4rem)] text-fg-2">{p.tagline}</p>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line text-sm sm:grid-cols-4">
              {meta.map(([k, v]) => (
                <div key={k} className="bg-bg-2 p-4">
                  <dt className="text-xs uppercase tracking-[0.12em] text-muted">{k}</dt>
                  <dd className="mt-1 text-fg">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="flex flex-wrap gap-3">
              {p.url ? (
                <a href={p.url} target="_blank" rel="noreferrer" className="btn btn-primary w-full sm:w-auto" data-cursor="Visit">
                  Visit live site <ArrowUpRight size={16} />
                </a>
              ) : (
                <span className="chip h-12 px-4">Private build · demo on request</span>
              )}
              {p.github ? (
                <a href={p.github} target="_blank" rel="noreferrer" className="btn btn-ghost">
                  <GithubIcon size={16} /> Code
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </header>

      <div className="shell">
        <Parallax className="rounded-[24px]">
          <div className="overflow-hidden rounded-[24px] border border-line bg-surface shadow-[var(--shadow)]">
            <div className="relative aspect-[16/9] bg-bg">
              {p.video ? (
                <LoopVideo
                  src={p.video}
                  start={p.videoStart}
                  poster={p.image}
                  autoPlay
                  className={`h-full w-full ${p.videoPortrait ? "object-contain" : "object-cover object-top"}`}
                />
              ) : (
                <Image src={p.image} alt={`${p.name} — ${p.tagline}`} fill preload sizes="100vw" className="object-cover object-top" />
              )}
            </div>
          </div>
        </Parallax>
      </div>

      {p.metrics ? (
        <section className="shell mt-10">
          <Reveal className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
            {p.metrics.map((m) => (
              <div key={m.label} className="bg-bg-2 p-7">
                <p className="font-serif text-[clamp(2rem,4vw,3.2rem)] leading-none">{m.value}</p>
                <p className="mt-2 text-sm text-muted">{m.label}</p>
              </div>
            ))}
          </Reveal>
        </section>
      ) : null}

      <section className="section">
        <div className="shell grid gap-12 lg:grid-cols-2">
          <div>
            <Label>About this project</Label>
            <p className="text-[clamp(1.2rem,2.2vw,1.7rem)] leading-snug text-fg">{p.description}</p>
            {p.caseStudy ? (
              <Reveal className="mt-10 space-y-4">
                <div className="card p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">The problem</p>
                  <p className="mt-2 leading-relaxed text-fg-2">{p.caseStudy.problem}</p>
                </div>
                <div className="card p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">The solution</p>
                  <p className="mt-2 leading-relaxed text-fg-2">{p.caseStudy.solution}</p>
                </div>
              </Reveal>
            ) : null}
          </div>

          <div>
            <Label>What you get</Label>
            <div className="overflow-hidden rounded-2xl border border-line">
              <Reveal className="divide-y divide-line">
                {p.highlights.map((h, i) => (
                  <div key={h} className="flex gap-4 px-5 py-4">
                    <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <p className="text-fg-2">{h}</p>
                  </div>
                ))}
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {p.architecture ? (
        <section className="border-y border-line bg-bg-2">
          <div className="shell py-20">
            <Label>How it works</Label>
            <Reveal className="grid gap-4 sm:grid-cols-2">
              {p.architecture.map((a) => {
                const [head, ...rest] = a.split(" — ");
                return (
                  <div key={a} className="card p-5">
                    <p className="font-medium">{head}</p>
                    {rest.length ? <p className="mt-2 text-sm leading-relaxed text-fg-2">{rest.join(" — ")}</p> : null}
                  </div>
                );
              })}
            </Reveal>
          </div>
        </section>
      ) : null}

      {p.gallery?.length ? (
        <section className={`shell grid gap-6 py-20 ${p.gallery.length > 1 ? "md:grid-cols-2" : ""}`}>
          {p.gallery.map((src) => (
            <Parallax key={src} className="rounded-xl">
              <ProjectMedia project={{ ...p, visual: undefined }} src={src} sizes="(min-width: 768px) 50vw, 100vw" />
            </Parallax>
          ))}
        </section>
      ) : null}

      <section className="shell grid gap-10 py-16 lg:grid-cols-2">
        <div>
          <Label>Tools used</Label>
          <Reveal className="flex flex-wrap gap-2" stagger={0.03} y={16}>
            {p.stack.map((s) => (
              <span key={s} className="chip px-3 py-1.5 text-sm">{s}</span>
            ))}
          </Reveal>
        </div>
        {p.caseStudy?.results ? (
          <div>
            <Label>Results</Label>
            <Reveal className="space-y-3">
              {p.caseStudy.results.map((r) => (
                <p key={r} className="text-fg">
                  <span className="text-accent">✓</span> {r}
                </p>
              ))}
            </Reveal>
          </div>
        ) : null}
      </section>

      <Link href={`/work/${next.slug}`} className="group block border-t border-line" data-cursor="Next">
        <div className="shell flex items-end justify-between gap-6 py-20">
          <div>
            <p className="kicker">Next project</p>
            <p className="mt-3 font-serif text-[clamp(2.2rem,6vw,5rem)] leading-none tracking-tight transition-colors group-hover:text-accent">
              {next.name}
            </p>
            <p className="mt-3 text-muted">{next.tagline}</p>
          </div>
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-lg border border-line-strong transition-all group-hover:border-accent group-hover:bg-accent group-hover:text-accent-fg sm:h-20 sm:w-20">
            <ArrowUpRight size={28} />
          </span>
        </div>
      </Link>
    </article>
  );
}
