import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { formatPostDate } from "@/lib/blog";
import type { BlogPost } from "@/data/blog";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group card flex h-full flex-col gap-4 p-6 transition-colors hover:border-accent sm:p-7"
      data-cursor="Read"
    >
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] uppercase tracking-[0.14em] text-muted">
        <span className="text-accent">{post.category}</span>
        <span aria-hidden>·</span>
        <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
        <span aria-hidden>·</span>
        <span>{post.readingTimeMinutes} min</span>
      </div>
      <h2 className="font-display text-2xl leading-snug tracking-tight transition-colors group-hover:text-accent">
        {post.title}
      </h2>
      <p className="flex-1 text-sm leading-relaxed text-fg-2">{post.excerpt}</p>
      <span className="flex items-center gap-2 text-sm text-fg">
        Read article <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:rotate-45" />
      </span>
    </Link>
  );
}
