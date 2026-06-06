export type BlogCategory =
  | "Web Design"
  | "Development"
  | "SEO"
  | "AI & Automation"
  | "Business";

export type BlogSection = {
  heading?: string;
  paragraphs: string[];
  bullets?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  metaDescription: string;
  publishedAt: string;
  category: BlogCategory;
  tags: string[];
  readingTimeMinutes: number;
  sections: BlogSection[];
};
