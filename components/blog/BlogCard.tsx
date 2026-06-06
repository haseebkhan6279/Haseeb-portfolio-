import Link from "next/link";
import { formatPostDate } from "@/lib/blog";
import type { BlogPost } from "@/data/blog";

type Props = {
  post: BlogPost;
};

export default function BlogCard({ post }: Props) {
  return (
    <article className="flex h-full flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-sky-400/30 hover:bg-white/[0.05] sm:p-6">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-500">
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
      <h2 className="text-lg font-semibold leading-snug tracking-tight text-slate-50 sm:text-xl">
        <Link href={`/blog/${post.slug}`} className="hover:text-sky-300">
          {post.title}
        </Link>
      </h2>
      <p className="flex-1 text-sm leading-relaxed text-slate-400 sm:text-[0.9375rem]">
        {post.excerpt}
      </p>
      <Link
        href={`/blog/${post.slug}`}
        className="text-sm font-semibold text-sky-400 hover:text-sky-300"
      >
        Read article →
      </Link>
    </article>
  );
}
