export const PROJECT_CATEGORIES = [
  "SaaS & Dashboards",
  "AI",
  "E-commerce",
  "Booking & Marketplaces",
  "Mobile",
  "Web3",
  "Websites",
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export type ProjectStatus = "Live" | "In development" | "Client delivery";

export function statusLabel(status: ProjectStatus) {
  if (status === "In development") return "In progress";
  if (status === "Client delivery") return "Delivered — private";
  return "Live";
}

function hostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function liveHost(url: string) {
  return hostname(url);
}

export type ProjectCaseStudy = {
  client: string;
  industry: string;
  problem: string;
  solution: string;
  results: string[];
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  categories: ProjectCategory[];
  status: ProjectStatus;
  role: string;
  url?: string;
  github?: string;
  image: string;
  /** Recorded scrolling preview (webm), shown on hover. */
  video?: string;
  /** Second where the recording shows real content. */
  videoStart?: number;
  /** Portrait (mobile) recording. */
  videoPortrait?: boolean;
  gallery?: string[];
  /** Mobile app: render the image inside a phone frame. */
  visual?: "phone";
  mediaFit?: "contain" | "cover";
  stack: string[];
  highlights: string[];
  /** Architecture pieces, e.g. "API — NestJS · MongoDB". */
  architecture?: string[];
  metrics?: { value: string; label: string }[];
  featured?: boolean;
  caseStudy?: ProjectCaseStudy;
};
