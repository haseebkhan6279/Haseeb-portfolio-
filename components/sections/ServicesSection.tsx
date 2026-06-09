"use client";

import { useRef } from "react";
import { SERVICES, SERVICES_INTRO } from "@/data/services";
import ServiceIcon from "@/components/ui/ServiceIcon";
import MagneticButton from "@/components/ui/MagneticButton";
import { useTekversReveal } from "@/hooks/useTekversReveal";

export default function ServicesSection() {
  const ref = useRef<HTMLElement>(null);
  useTekversReveal(ref, {
    headerSelector: "[data-services-header]",
    itemSelector: "[data-services-item]",
    stagger: 0.08,
  });

  return (
    <section
      ref={ref}
      id="services"
      className="section-pad border-t border-white/5"
      aria-labelledby="services-heading"
    >
      <div className="section-shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between" data-services-header>
          <div className="max-w-2xl">
            <p className="eyebrow">{SERVICES_INTRO.eyebrow}</p>
            <h2 id="services-heading" className="headline-section mt-4 text-slate-50">
              {SERVICES_INTRO.title}
            </h2>
            <p className="mt-4 text-[var(--text-lede)] text-slate-400">{SERVICES_INTRO.subtitle}</p>
          </div>
          <MagneticButton href="/#contact" className="!w-full shrink-0 sm:!w-auto">
            Get a free quote →
          </MagneticButton>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <li key={service.id} data-services-item>
              <article className="group flex h-full flex-col rounded-2xl border border-white/8 bg-white/[0.02] p-6 transition-colors hover:border-sky-500/25 hover:bg-white/[0.04]">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400 transition-colors group-hover:bg-sky-500/20">
                  <ServiceIcon name={service.icon} />
                </div>
                <h3 className="mt-5 font-display text-lg text-slate-100">{service.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{service.description}</p>
                <ul className="mt-5 space-y-2 border-t border-white/5 pt-5">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2 text-sm text-slate-500">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-sky-400" aria-hidden />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
