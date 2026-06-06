"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SERVICES, SERVICES_INTRO } from "@/data/services";
import MagneticButton from "@/components/ui/MagneticButton";
import { useLightMotion } from "@/hooks/useLightMotion";
import { useTekversReveal } from "@/hooks/useTekversReveal";

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const pinStageRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pinHeight, setPinHeight] = useState("220vh");
  const lightMotion = useLightMotion();
  const useDesktopScroller = !lightMotion;

  useTekversReveal(mobileRef, {
    headerSelector: "[data-mobile-reveal-header]",
    itemSelector: "[data-mobile-reveal-item]",
    stagger: 0.1,
  });

  useLayoutEffect(() => {
    const pinWrap = pinWrapRef.current;
    const pinStage = pinStageRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const header = headerRef.current;
    const progressFill = progressFillRef.current;

    const updatePinHeight = () => {
      if (!track || !viewport) return;
      const scrollDistance = Math.max(0, track.scrollWidth - viewport.clientWidth);
      setPinHeight(`${scrollDistance + window.innerHeight}px`);
    };

    updatePinHeight();
    const t = window.setTimeout(() => {
      updatePinHeight();
      ScrollTrigger.refresh();
    }, 150);
    window.addEventListener("resize", updatePinHeight);

    if (!useDesktopScroller || !pinWrap || !pinStage || !viewport || !track) {
      return () => {
        window.clearTimeout(t);
        window.removeEventListener("resize", updatePinHeight);
      };
    }

    if (!window.matchMedia("(min-width: 1024px)").matches) {
      return () => {
        window.clearTimeout(t);
        window.removeEventListener("resize", updatePinHeight);
      };
    }

    const cards = gsap.utils.toArray<HTMLElement>("[data-service-card]", track);

    const ctx = gsap.context(() => {
      if (header) {
        gsap.from(header.children, {
          y: 48,
          opacity: 0,
          stagger: 0.12,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            once: true,
          },
        });
      }

      const maxX = () => {
        const dist = track.scrollWidth - viewport.clientWidth;
        return dist > 0 ? -dist : 0;
      };

      gsap.to(track, {
        x: maxX,
        ease: "none",
        scrollTrigger: {
          trigger: pinWrap,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.65,
          pin: pinStage,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.round(self.progress * (SERVICES.length - 1));
            setActiveIndex(idx);
            if (progressFill) {
              progressFill.style.transform = `scaleX(${Math.max(0.04, self.progress)})`;
            }
          },
        },
      });

      cards.forEach((card, i) => {
        gsap.set(card, {
          scale: i === 0 ? 1 : 0.94,
          opacity: i === 0 ? 1 : 0.5,
          transformOrigin: "center left",
        });
      });
    }, sectionRef);

    const onRefresh = () => {
      updatePinHeight();
      ScrollTrigger.refresh();
    };
    ScrollTrigger.addEventListener("refreshInit", updatePinHeight);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", updatePinHeight);
      ScrollTrigger.removeEventListener("refreshInit", updatePinHeight);
      ctx.revert();
    };
  }, [useDesktopScroller]);

  useLayoutEffect(() => {
    if (!useDesktopScroller) return;
    const track = trackRef.current;
    if (!track) return;

    const cards = gsap.utils.toArray<HTMLElement>("[data-service-card]", track);
    cards.forEach((card, i) => {
      const isActive = i === activeIndex;
      gsap.to(card, {
        scale: isActive ? 1 : 0.94,
        opacity: isActive ? 1 : 0.48,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      });
      const glow = card.querySelector("[data-service-glow]");
      if (glow) {
        gsap.to(glow, {
          opacity: isActive ? 1 : 0,
          duration: 0.45,
          ease: "power2.out",
        });
      }
    });
  }, [activeIndex, useDesktopScroller]);

  const active = SERVICES[activeIndex];

  const servicesHeader = (headingId?: string) => (
    <div className="services-header">
      <div className="services-header__copy">
        <p className="eyebrow">{SERVICES_INTRO.eyebrow}</p>
        <h2 id={headingId} className="headline-section mt-3 text-slate-50">
          {SERVICES_INTRO.title}
        </h2>
        <p className="mt-3 text-[var(--text-lede)] text-slate-400">
          {SERVICES_INTRO.subtitle}
        </p>
      </div>
      <div className="services-header__actions">
        <MagneticButton href="/#pricing" variant="ghost" className="!w-full sm:!w-auto">
          View Packages
        </MagneticButton>
        <MagneticButton href="/#contact" className="!w-full sm:!w-auto">
          Let&apos;s work!
        </MagneticButton>
      </div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id="services"
      className="services-section border-t border-white/5"
      aria-labelledby="services-heading"
    >
      <div className="services-section__glow" aria-hidden />

      {!useDesktopScroller ? (
        <div className="section-shell services-section__header lg:hidden">
          {servicesHeader("services-heading")}
        </div>
      ) : null}

      {/* Desktop: pinned horizontal scroll */}
      <div
        ref={pinWrapRef}
        className={useDesktopScroller ? "hidden" : "services-scroller hidden lg:block"}
        style={{ height: pinHeight }}
      >
        <div ref={pinStageRef} className="services-scroller__stage">
          <div className="section-shell services-scroller__inner">
            <div ref={headerRef} className="services-section__header services-section__header--pinned">
              {servicesHeader()}
            </div>

            <div className="services-scroller__meta">
              <div className="services-scroller__counter">
                <span className="services-scroller__counter-active">{active.number}</span>
                <span className="services-scroller__counter-sep">/</span>
                <span className="services-scroller__counter-total">
                  {SERVICES[SERVICES.length - 1].number}
                </span>
              </div>
              <p className="services-scroller__active-title">{active.title}</p>
              <div className="services-scroller__progress" aria-hidden>
                <div ref={progressFillRef} className="services-scroller__progress-fill" />
              </div>
            </div>

            <div ref={viewportRef} className="services-scroller__viewport">
              <div ref={trackRef} className="services-scroller__track">
                {SERVICES.map((service) => (
                  <article
                    key={service.title}
                    data-service-card
                    className="services-card"
                    aria-current={service.title === active.title ? "true" : undefined}
                  >
                    <div data-service-glow className="services-card__glow" aria-hidden />
                    <span className="services-card__index">{service.number}</span>
                    <h3 className="services-card__title">{service.title}</h3>
                    <p className="services-card__desc">{service.description}</p>
                    <ul className="services-card__tags">
                      {service.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                  </article>
                ))}
                <div className="services-scroller__track-end" aria-hidden />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / reduced motion: vertical cards */}
      <div ref={mobileRef} className={`section-shell pb-16 ${useDesktopScroller ? "lg:hidden" : ""}`}>
        {!useDesktopScroller && (
          <div className="services-section__header">{servicesHeader("services-heading")}</div>
        )}
        <ul className="mt-8 grid gap-5">
          {SERVICES.map((service) => (
            <li key={service.title} data-mobile-reveal-item>
              <article className="services-card services-card--static">
                <span className="services-card__index">{service.number}</span>
                <h3 className="services-card__title">{service.title}</h3>
                <p className="services-card__desc">{service.description}</p>
                <ul className="services-card__tags">
                  {service.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
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
