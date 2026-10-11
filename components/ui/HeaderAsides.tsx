"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Clock, MapPin, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CONTACT, PROFILE } from "@/data/site";
import LocalTime from "@/components/ui/LocalTime";

const ease = [0.16, 1, 0.3, 1] as const;

type FanItem = { slug: string; name: string; image: string; tagline: string };

/** /work — three project screenshots fanned like cards; they spread on hover and drift on scroll. */
export function WorkFan({ items, stats }: { items: FanItem[]; stats: [string, string][] }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const drift = useTransform(scrollY, [0, 600], [0, reduce ? 0 : -60]);
  const poses = [
    { rotate: -9, x: "-14%", y: 26, z: 1 },
    { rotate: 7, x: "14%", y: 14, z: 2 },
    { rotate: -1, x: "0%", y: -6, z: 3 },
  ];

  return (
    <div>
      <motion.div style={{ y: drift }} className="group relative mx-auto aspect-[4/3] w-full max-w-[520px]">
        {items.slice(0, 3).map((p, i) => {
          const pose = poses[i] ?? poses[2];
          return (
            <motion.div
              key={p.slug}
              className="absolute inset-x-[8%] top-[10%] aspect-[16/10] overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-[0_30px_60px_-25px_rgb(0_0_0/0.9)]"
              style={{ zIndex: pose.z }}
              initial={{ opacity: 0, y: 60, rotate: 0 }}
              animate={{ opacity: 1, y: pose.y, rotate: pose.rotate, x: pose.x }}
              whileHover={{ scale: 1.04, rotate: 0, zIndex: 10 }}
              transition={{ duration: 1.1, delay: 0.25 + i * 0.12, ease }}
            >
              <Link href={`/work/${p.slug}`} data-cursor="View" className="block h-full w-full">
                <Image src={p.image} alt={`${p.name} — ${p.tagline}`} fill sizes="420px" className="object-cover object-top" />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-8 text-sm font-medium text-white">
                  {p.name}
                </span>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
      <dl className="mx-auto mt-4 grid max-w-[520px] grid-cols-3 gap-px overflow-hidden rounded-2xl border border-line bg-line">
        {stats.map(([value, label]) => (
          <div key={label} className="bg-bg/80 p-4 text-center backdrop-blur">
            <dd className="text-gradient font-display text-3xl leading-none">{value}</dd>
            <dt className="mt-1.5 text-xs text-muted">{label}</dt>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** /about — portrait with an inner parallax and a floating "currently" chip. */
export function PortraitAside({ photo }: { photo: string | null }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 600], ["0%", reduce ? "0%" : "12%"]);
  const chipY = useTransform(scrollY, [0, 600], [0, reduce ? 0 : -50]);

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[380px]"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, delay: 0.2, ease }}
    >
      <div aria-hidden className="absolute -inset-5 rounded-[40px] border border-dashed border-line-strong" />
      <div className="gradient-border relative aspect-[4/5] overflow-hidden rounded-[32px] bg-surface">
        <motion.div style={{ y: imgY }} className="absolute inset-[-10%_0]">
          {photo ? (
            <Image src={photo} alt={`${PROFILE.displayName}, ${PROFILE.role}`} fill preload sizes="380px" className="object-cover object-[64%_center]" />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#2e2e2e,transparent_55%),radial-gradient(circle_at_80%_80%,#1c1c1c,transparent_50%)]" />
          )}
        </motion.div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 text-white">
          <p className="font-display text-xl">{PROFILE.displayName}</p>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-white/70">
            <MapPin size={13} /> {PROFILE.location}
          </p>
        </div>
      </div>
      <motion.div
        style={{ y: chipY }}
        className="absolute -left-6 top-10 rounded-2xl border border-line bg-surface/85 px-4 py-3 shadow-[var(--shadow)] backdrop-blur-xl"
      >
        <p className="text-[11px] text-muted">Currently</p>
        <p className="text-sm font-semibold">Web Developer · Hypelet</p>
      </motion.div>
    </motion.div>
  );
}

/** /contact — live availability: local time, reply time and the fastest ways to reach me. */
export function AvailabilityAside() {
  return (
    <motion.div
      className="gradient-border relative overflow-hidden rounded-[28px] bg-surface/80 p-7 backdrop-blur-xl sm:p-8"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, delay: 0.2, ease }}
    >
      <div aria-hidden className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#ffffff] opacity-[0.06] blur-[60px]" />
      <p className="flex items-center gap-2.5 text-sm text-fg">
        <span className="status-dot" /> {PROFILE.availability}
      </p>
      <p className="mt-6 text-xs uppercase tracking-[0.14em] text-muted">Right now in Lahore</p>
      <LocalTime className="text-gradient mt-1 block font-display text-[clamp(3rem,6vw,4.5rem)] leading-none tracking-[-0.04em]" />
      <ul className="mt-6 space-y-3 border-t border-line pt-6 text-sm text-fg-2">
        <li className="flex items-center gap-3">
          <Clock size={16} className="text-accent" /> {CONTACT.responseTime}
        </li>
        <li className="flex items-center gap-3">
          <MapPin size={16} className="text-accent-2" /> {CONTACT.location}
        </li>
      </ul>
      <div className="mt-7 flex flex-wrap gap-3">
        <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="btn btn-primary h-11 text-sm">
          <MessageCircle size={16} /> WhatsApp me
        </a>
        <a href={`mailto:${CONTACT.email}`} className="btn btn-ghost h-11 text-sm">
          Email <ArrowUpRight size={15} />
        </a>
      </div>
    </motion.div>
  );
}

type LatestPost = { slug: string; title: string; excerpt: string; category: string; date: string; minutes: number };

/** /blog — the newest article as a feature card. */
export function LatestPostAside({ post }: { post: LatestPost }) {
  return (
    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.2, ease }}>
      <Link
        href={`/blog/${post.slug}`}
        data-cursor="Read"
        className="gradient-border group relative block overflow-hidden rounded-[28px] bg-surface p-7 sm:p-9"
      >
        <div aria-hidden className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#ffffff] opacity-[0.06] blur-[70px] transition-opacity duration-500 group-hover:opacity-[0.12]" />
        <p className="relative flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-muted">
          <span className="rounded-full bg-[image:var(--gradient)] px-2.5 py-1 font-semibold text-accent-fg">Latest</span>
          <span className="text-accent">{post.category}</span> · {post.date} · {post.minutes} min
        </p>
        <h2 className="relative mt-5 font-display text-[clamp(1.6rem,2.6vw,2.2rem)] leading-[1.08] tracking-[-0.03em] transition-colors group-hover:text-accent">
          {post.title}
        </h2>
        <p className="relative mt-3 line-clamp-3 leading-relaxed text-fg-2">{post.excerpt}</p>
        <span className="relative mt-6 inline-flex items-center gap-2 text-sm font-medium">
          Read article <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:rotate-45" />
        </span>
      </Link>
    </motion.div>
  );
}
