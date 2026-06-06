"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PORTFOLIO_INTRO, PROJECTS, type Project } from "@/data/projects";
import { useTekversReveal } from "@/hooks/useTekversReveal";

function formatProjectUrl(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function ProjectMedia({ project }: { project: Project }) {
  const isPhone = project.visual === "phone";

  return (
    <div
      className={`relative portfolio-work__media ${isPhone ? "portfolio-work__media--phone" : ""}`}
    >
      <Image
        src={project.image}
        alt={`${project.name} preview`}
        fill
        className={`portfolio-work__media-img ${
          isPhone
            ? "portfolio-work__media-img--phone"
            : project.mediaFit === "contain"
              ? "portfolio-work__media-img--contain"
              : ""
        }`}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
        loading="lazy"
      />
      <div className="portfolio-work__media-scrim" aria-hidden />
      <span className="portfolio-work__media-icon" aria-hidden>
        {isPhone ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="7" y="2" width="10" height="20" rx="2" />
            <path d="M11 18h2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="9" />
            <path d="M2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20" strokeLinecap="round" />
          </svg>
        )}
      </span>
    </div>
  );
}

export default function WorkSection() {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const firstRevealedItemRef = useRef<HTMLLIElement>(null);

  const hasMoreProjects = PROJECTS.length > PORTFOLIO_INTRO.initialVisible;
  const visibleProjects =
    showAllProjects || !hasMoreProjects
      ? PROJECTS
      : PROJECTS.slice(0, PORTFOLIO_INTRO.initialVisible);

  useTekversReveal(sectionRef, {
    headerSelector: "[data-portfolio-intro]",
    stagger: 0.1,
  });

  useEffect(() => {
    if (!showAllProjects || !hasMoreProjects) return;
    const id = window.requestAnimationFrame(() => {
      firstRevealedItemRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    });
    return () => window.cancelAnimationFrame(id);
  }, [showAllProjects, hasMoreProjects]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="portfolio-work"
      aria-labelledby="portfolio-work-heading"
    >
      <div className="portfolio-work__inner section-shell">
        <div className="portfolio-work__intro" data-portfolio-intro>
          <p id="portfolio-work-heading" className="portfolio-work__eyebrow">
            {PORTFOLIO_INTRO.eyebrow}
          </p>
          <p className="portfolio-work__lede">{PORTFOLIO_INTRO.lede}</p>
        </div>

        <ul className="portfolio-work__grid" id="projects-grid">
          {visibleProjects.map((project, index) => (
            <li
              key={project.name}
              ref={
                showAllProjects && index === PORTFOLIO_INTRO.initialVisible
                  ? firstRevealedItemRef
                  : undefined
              }
            >
              <article className="portfolio-work__card">
                <ProjectMedia project={project} />

                <div className="portfolio-work__body">
                  <div className="portfolio-work__card-head">
                    <h3 className="portfolio-work__card-title">{project.name}</h3>
                    <div className="portfolio-work__card-links">
                      {project.url ? (
                        <a
                          href={project.url}
                          className="portfolio-work__card-link"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {formatProjectUrl(project.url)}
                        </a>
                      ) : null}
                      {project.github ? (
                        <a
                          href={project.github}
                          className="portfolio-work__card-link portfolio-work__card-link--github"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          GitHub
                        </a>
                      ) : null}
                    </div>
                  </div>
                  <p className="portfolio-work__card-tagline">{project.tagline}</p>
                  <p className="portfolio-work__card-detail">{project.description}</p>

                  {project.stack.length > 0 ? (
                    <ul className="portfolio-work__stack" aria-label="Tech stack">
                      {project.stack.map((tech) => (
                        <li key={tech}>{tech}</li>
                      ))}
                    </ul>
                  ) : null}

                  <details className="portfolio-work__details">
                    <summary className="portfolio-work__summary">
                      <span>Scope &amp; delivery</span>
                      <span className="portfolio-work__summary-icon" aria-hidden>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <path
                            d="M6 9l6 6 6-6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </summary>
                    <ul className="portfolio-work__highlights">
                      {project.highlights.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </details>
                </div>
              </article>
            </li>
          ))}
        </ul>

        {hasMoreProjects && !showAllProjects ? (
          <div className="portfolio-work__expand-wrap">
            <button
              type="button"
              className="portfolio-work__expand btn-interactive"
              onClick={() => setShowAllProjects(true)}
              aria-expanded={false}
              aria-controls="projects-grid"
              aria-label="Show more projects"
            >
              <span className="portfolio-work__expand-label">
                {PORTFOLIO_INTRO.expandLabel}
              </span>
              <span className="portfolio-work__expand-icon" aria-hidden>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 5v14M5 12l7 7 7-7"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
