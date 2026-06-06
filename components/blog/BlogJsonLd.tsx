import { CONTACT, PROFILE } from "@/data/site";
import { SITE_URL } from "@/lib/metadata";
import type { BlogPost } from "@/data/blog";

type Props = {
  post: BlogPost;
};

export default function BlogJsonLd({ post }: Props) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishedAt,
    author: {
      "@type": "Person",
      name: PROFILE.name,
      url: CONTACT.linkedIn,
    },
    publisher: {
      "@type": "Person",
      name: PROFILE.name,
      url: SITE_URL,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    keywords: post.tags.join(", "),
    articleSection: post.category,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
