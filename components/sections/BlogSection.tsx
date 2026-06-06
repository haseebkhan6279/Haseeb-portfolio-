import BlogCard from "@/components/blog/BlogCard";
import MagneticButton from "@/components/ui/MagneticButton";
import { getAllPosts } from "@/lib/blog";

const PREVIEW_COUNT = 3;

export default function BlogSection() {
  const latest = getAllPosts().slice(0, PREVIEW_COUNT);

  return (
    <section id="blog" className="section-pad" aria-labelledby="blog-heading">
      <div className="section-shell">
        <div className="mb-10 flex flex-col items-start gap-5 md:flex-row md:items-end md:justify-between md:gap-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.28em] text-sky-400 uppercase">Insights</p>
            <h2 id="blog-heading" className="headline-section mt-3 text-slate-50">
              Writing & Notes
            </h2>
            <p className="mt-3 text-[var(--text-lede)] leading-relaxed text-slate-400">
              Practical guides on web design, development, SEO, and AI automation—written to help you
              ship smarter digital products.
            </p>
          </div>
          <MagneticButton href="/blog" variant="ghost">
            View all articles
          </MagneticButton>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {latest.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
