import type { Metadata } from "next";
import { PROFILE } from "@/data/site";

/** Set `NEXT_PUBLIC_SITE_URL` in production (e.g. https://yourdomain.com). */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export const SITE_URL = getSiteUrl();

export const SEO = {
  siteName: PROFILE.name,
  defaultTitle: `${PROFILE.displayName} — Websites and apps for businesses`,
  titleTemplate: `%s | ${PROFILE.displayName}`,
  description:
    "Haseeb Khan designs and builds live websites, online shops, booking systems, dashboards and mobile apps for clients in Pakistan, the UK and the US. Open to freelance projects and remote roles.",
  keywords: [
    "full-stack developer",
    "Next.js developer",
    "TypeScript developer",
    "NestJS developer",
    "React Native developer",
    "remote full-stack developer",
    "SaaS dashboard developer",
    "booking platform developer",
    "e-commerce developer",
    "full-stack developer Pakistan",
    "Lahore web developer",
    "Haseeb Gulraiz Khan",
    "Haseeb Khan developer",
  ],
  author: PROFILE.name,
  locale: "en_US",
} as const;

type PageMetaInput = {
  /** Short page title (site name is appended via layout template). */
  title: string;
  description: string;
  path: string;
  /** Optional Open Graph image path (e.g. a project screenshot). */
  image?: string;
};

function absoluteUrl(path: string): string {
  return path.startsWith("http") ? path : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildPageMetadata({ title, description, path, image }: PageMetaInput): Metadata {
  const canonical = absoluteUrl(path);
  const fullTitle = `${title} | ${SEO.siteName}`;
  const images = image ? [{ url: absoluteUrl(image) }] : undefined;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: SEO.locale,
      url: canonical,
      siteName: SEO.siteName,
      title: fullTitle,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images,
    },
  };
}

type ArticleMetaInput = PageMetaInput & {
  publishedAt: string;
  tags?: string[];
};

export function buildArticleMetadata({
  title,
  description,
  path,
  publishedAt,
  tags = [],
}: ArticleMetaInput): Metadata {
  const base = buildPageMetadata({ title, description, path });
  const canonical = absoluteUrl(path);
  const fullTitle = `${title} | ${SEO.siteName}`;

  return {
    ...base,
    keywords: [...new Set([...SEO.keywords, ...tags])],
    openGraph: {
      ...base.openGraph,
      type: "article",
      url: canonical,
      title: fullTitle,
      description,
      publishedTime: publishedAt,
      tags,
    },
  };
}

const sharedRobots: Metadata["robots"] = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
};

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SEO.defaultTitle,
    template: SEO.titleTemplate,
  },
  description: SEO.description,
  keywords: [...SEO.keywords],
  authors: [{ name: SEO.author, url: SITE_URL }],
  creator: SEO.author,
  publisher: SEO.author,
  applicationName: SEO.siteName,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: SEO.locale,
    url: SITE_URL,
    siteName: SEO.siteName,
    title: SEO.defaultTitle,
    description: SEO.description,
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.defaultTitle,
    description: SEO.description,
  },
  robots: sharedRobots,
  category: "technology",
};
