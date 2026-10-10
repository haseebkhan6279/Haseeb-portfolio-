"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { PROCESS } from "@/data/experience";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Process() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      // The rail fills as you scroll: horizontal on desktop, vertical on mobile.
      mm.add("(min-width: 768px)", () => {
        gsap.fromTo(q(".process-fill"), { scaleX: 0 }, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: q(".process-list")[0], start: "top 75%", end: "bottom 55%", scrub: 0.6 },
        });
      });
      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(q(".process-fill"), { scaleY: 0 }, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: q(".process-list")[0], start: "top 70%", end: "bottom 60%", scrub: 0.6 },
        });
      });
      gsap.from(q(".process-step"), {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.12,
        scrollTrigger: { trigger: q(".process-list")[0], start: "top 80%", once: true },
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="process" className="section scroll-mt-16 border-y border-line bg-bg-2">
      <div className="shell">
        <SectionHeading index="03" name="Process" title="A clear process," accent="no surprises.">
          You always know what’s being built, what it costs and when it ships. Here’s how a typical project runs.
        </SectionHeading>

        <div className="process-list relative">
          {/* Rail */}
          <div aria-hidden className="absolute left-[19px] top-2 bottom-2 w-px bg-line-strong md:left-0 md:right-0 md:top-[19px] md:bottom-auto md:h-px md:w-auto">
            <div className="process-fill h-full w-full origin-top bg-accent md:origin-left" />
          </div>

          <ol className="relative grid gap-10 md:grid-cols-4 md:gap-8">
            {PROCESS.map((p) => (
              <li key={p.step} className="process-step relative pl-16 md:pl-0">
                <span className="absolute left-0 top-0 grid h-10 w-10 place-items-center rounded-full border border-line-strong bg-bg-2 font-mono text-xs font-medium text-fg md:relative">
                  {p.step}
                </span>
                <h3 className="font-display text-[1.4rem] md:mt-8">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-fg-2">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-14 flex flex-col items-start gap-4 rounded-[24px] border border-line bg-surface p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="font-display text-xl">Have a project in mind?</p>
            <p className="mt-1 text-fg-2">Get a free consultation and a fixed quote — no commitment.</p>
          </div>
          <Link href="/contact" className="btn btn-dark w-full shrink-0 sm:w-auto">
            Get a free quote <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
