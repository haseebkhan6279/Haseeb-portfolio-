import Image from "next/image";
import type { Project } from "@/data/projects";

/** Screenshot inside a browser or phone frame. */
export default function ProjectMedia({
  project,
  src = project.image,
  priority,
  sizes = "(min-width: 1024px) 60vw, 100vw",
  className = "",
  bare = false,
}: {
  project: Project;
  src?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  bare?: boolean;
}) {
  const fit = project.mediaFit === "contain" ? "object-contain" : "object-cover object-top";

  if (project.visual === "phone") {
    return (
      <div className={`flex items-center justify-center bg-surface-2 ${className}`}>
        <div className="relative aspect-[9/19] h-[88%] overflow-hidden rounded-[2rem] border-[6px] border-fg/90 bg-bg shadow-2xl">
          <Image src={src} alt={`${project.name} app screen`} fill sizes="320px" className="object-cover object-top" preload={priority} />
        </div>
      </div>
    );
  }

  if (bare) {
    return (
      <div className={`relative overflow-hidden bg-surface-2 ${className}`}>
        <Image src={src} alt={`${project.name} — ${project.tagline}`} fill sizes={sizes} className={fit} preload={priority} />
      </div>
    );
  }

  return (
    <div className={`browser ${className}`}>
      <div className="browser__bar">
        <i />
        <i />
        <i />
        <span className="ml-3 truncate font-mono text-[10px] text-muted">
          {project.url ? project.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "") : `${project.slug}.app`}
        </span>
      </div>
      <div className="relative aspect-[16/10] bg-bg-2">
        <Image src={src} alt={`${project.name} — ${project.tagline}`} fill sizes={sizes} className={fit} preload={priority} />
      </div>
    </div>
  );
}
