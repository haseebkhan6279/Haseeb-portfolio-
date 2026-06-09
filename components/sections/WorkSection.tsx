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
    </div>
  );
}

function CaseStudyBody({ project }: { project: Project }) {
  const cs = project.caseStudy;

  if (cs) {
    return (
      <div className="portfolio-work__case">
        <div className="portfolio-work__case-meta">
          <span className="portfolio-work__case-tag">{cs.industry}</span>
          <span className="portfolio-work__case-client">{cs.client}</span>
        </div>

        <div className="portfolio-work__case-block">
          <h4 className="portfolio-work__case-label">Problem</h4>
          <p className="portfolio-work__case-text">{cs.problem}</p>
        </div>

        <div className="portfolio-work__case-block">
          <h4 className="portfolio-work__case-label">Solution</h4>
          <p className="portfolio-work__case-text">{cs.solution}</p>
        </div>

        <div className="portfolio-work__case-block">
          <h4 className="portfolio-work__case-label">Results</h4>
          <ul className="portfolio-work__case-results">
            {cs.results.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <>
      <p className="portfolio-work__card-detail">{project.description}</p>
      <ul className="portfolio-work__highlights portfolio-work__highlights--open">
        {project.highlights.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </>
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
    itemSelector: "[data-portfolio-item]",
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
              data-portfolio-item
              ref={
                showAllProjects && index === PORTFOLIO_INTRO.initialVisible
                  ? firstRevealedItemRef
                  : undefined
              }
            >
              <article className="portfolio-work__card portfolio-work__card--case">
                <ProjectMedia project={project} />

                <div className="portfolio-work__body">
                  <div className="portfolio-work__card-head">
                    <h3 className="portfolio-work__card-title">{project.name}</h3>
                    <p className="portfolio-work__card-tagline">{project.tagline}</p>
                  </div>

                  <CaseStudyBody project={project} />

                  {project.stack.length > 0 ? (
                    <ul className="portfolio-work__stack" aria-label="Technologies used">
                      {project.stack.map((tech) => (
                        <li key={tech}>{tech}</li>
                      ))}
                    </ul>
                  ) : null}

                  <div className="portfolio-work__card-actions">
                    {project.url ? (
                      <a
                        href={project.url}
                        className="portfolio-work__action portfolio-work__action--primary"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Live Demo →
                      </a>
                    ) : null}
                    {project.github ? (
                      <a
                        href={project.github}
                        className="portfolio-work__action"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        GitHub
                      </a>
                    ) : null}
                    {project.url ? (
                      <span className="portfolio-work__card-url">{formatProjectUrl(project.url)}</span>
                    ) : null}
                  </div>
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
              <span className="portfolio-work__expand-label">{PORTFOLIO_INTRO.expandLabel}</span>
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
