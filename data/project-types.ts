export type ProjectVisual = "phone";

export type Project = {
  name: string;
  tagline: string;
  description: string;
  url?: string;
  github?: string;
  image: string;
  stack: string[];
  visual?: ProjectVisual;
  mediaFit?: "contain" | "cover";
  highlights: string[];
};

export type PortfolioIntro = {
  eyebrow: string;
  lede: string;
  initialVisible: number;
  expandLabel: string;
};
