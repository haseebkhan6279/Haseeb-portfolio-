import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/data/blog";
import { PROJECTS } from "@/data/projects";
import { SITE_URL } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const projectEntries: MetadataRoute.Sitemap = PROJECTS.map((p) => ({
    url: `${SITE_URL}/work/${p.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: p.featured ? 0.9 : 0.7,
  }));

  const blogEntries: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    { url: SITE_URL, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/work`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${SITE_URL}/about`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/contact`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/blog`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    ...projectEntries,
    ...blogEntries,
  ];
}
