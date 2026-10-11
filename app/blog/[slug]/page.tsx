import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogJsonLd from "@/components/blog/BlogJsonLd";
import BlogPostBody from "@/components/blog/BlogPostBody";
import { formatPostDate, getAllSlugs, getPostBySlug } from "@/lib/blog";
import { buildArticleMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return buildArticleMetadata({
    title: post.title,
    description: post.metaDescription,
    path: `/blog/${post.slug}`,
    publishedAt: post.publishedAt,
    tags: post.tags,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="pb-32">
      <BlogJsonLd post={post} />
      <header className="shell max-w-4xl pb-14 pt-36 sm:pt-44">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg">
          <ArrowLeft size={16} /> All articles
        </Link>
        <div className="mt-10 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
          <span className="text-accent">{post.category}</span>
          <span aria-hidden>·</span>
          <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
          <span aria-hidden>·</span>
          <span>{post.readingTimeMinutes} min read</span>
        </div>
        <h1 className="mt-6 font-display text-[clamp(2.2rem,4.5vw,3.8rem)] leading-[1.08] tracking-[-0.03em]">{post.title}</h1>
        <p className="lede mt-6">{post.excerpt}</p>
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tags">
          {post.tags.map((tag) => (
            <li key={tag} className="chip">{tag}</li>
          ))}
        </ul>
      </header>

      <div className="shell max-w-4xl border-t border-line pt-14">
        <BlogPostBody sections={post.sections} />
        <footer className="mt-16 flex flex-col items-start gap-5 border-t border-line pt-10">
          <p className="text-fg-2">Building something similar? I&apos;m happy to talk it through.</p>
          <Link href="/contact" className="btn btn-primary">
            Get in touch
          </Link>
        </footer>
      </div>
    </article>
  );
}
