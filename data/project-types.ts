export type ProjectVisual = "phone";

export type ProjectCaseStudy = {
  client: string;
  industry: string;
  problem: string;
  solution: string;
  results: string[];
};

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
  caseStudy?: ProjectCaseStudy;
};

export type PortfolioIntro = {
  eyebrow: string;
  lede: string;
  initialVisible: number;
  expandLabel: string;
};
