import BlogJsonLd from "@/components/blog/BlogJsonLd";
import BlogPostBody from "@/components/blog/BlogPostBody";
import MagneticButton from "@/components/ui/MagneticButton";
import { formatPostDate, getAllSlugs, getPostBySlug } from "@/lib/blog";
import { buildArticleMetadata } from "@/lib/metadata";
import Link from "next/link";
import { notFound } from "next/navigation";

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
    <article className="relative min-h-screen pb-16 pt-24 sm:pt-28">
      <BlogJsonLd post={post} />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_20%_0%,rgba(56,189,248,0.07),transparent_55%),radial-gradient(ellipse_50%_35%_at_80%_100%,rgba(212,175,55,0.04),transparent_50%)]"
        aria-hidden
      />
      <div className="section-shell relative z-10">
        <nav className="mb-6 text-sm text-slate-500" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-sky-400">
            Home
          </Link>
          <span aria-hidden> / </span>
          <Link href="/blog" className="hover:text-sky-400">
            Blog
          </Link>
          <span aria-hidden> / </span>
          <span className="line-clamp-1 text-slate-400" aria-current="page">
            {post.title}
          </span>
        </nav>

        <header className="mb-10 max-w-3xl">
          <div className="mb-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-500">
            <span className="font-semibold text-sky-400">{post.category}</span>
            <span aria-hidden className="text-slate-600">
              ·
            </span>
            <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
            <span aria-hidden className="text-slate-600">
              ·
            </span>
            <span>{post.readingTimeMinutes} min read</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
            {post.title}
          </h1>
          <p className="mt-4 text-[var(--text-lede)] leading-relaxed text-slate-400">{post.excerpt}</p>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tags">
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400"
              >
                {tag}
              </li>
            ))}
          </ul>
        </header>

        <BlogPostBody sections={post.sections} />

        <footer className="mt-12 flex flex-col gap-6 border-t border-white/10 pt-8">
          <Link href="/blog" className="text-sm font-semibold text-sky-400 hover:text-sky-300">
            ← All articles
          </Link>
          <div className="flex flex-col items-start gap-4">
            <p className="text-slate-400">Want help implementing this on your site?</p>
            <MagneticButton href="/#contact">Get a free quote</MagneticButton>
          </div>
        </footer>
      </div>
    </article>
  );
}
