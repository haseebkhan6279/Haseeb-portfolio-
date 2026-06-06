import BlogCard from "@/components/blog/BlogCard";
import MagneticButton from "@/components/ui/MagneticButton";
import { getAllPosts } from "@/lib/blog";
import { buildPageMetadata } from "@/lib/metadata";
import Link from "next/link";

export const metadata = buildPageMetadata({
  title: "Blog",
  description:
    "30+ articles on web design, Next.js, SEO, e-commerce, and AI automation by Haseeb Gulraiz Khan — tips for startups and growing brands.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = [...new Set(posts.map((p) => p.category))];

  return (
    <div className="relative min-h-screen pb-16 pt-24 sm:pt-28">
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
          <span className="text-slate-400" aria-current="page">
            Blog
          </span>
        </nav>

        <header className="mb-10 max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.28em] text-sky-400 uppercase">Resources</p>
          <h1 className="headline-section mt-3 text-slate-50">Blog</h1>
          <p className="mt-4 max-w-2xl text-[var(--text-lede)] leading-relaxed text-slate-400">
            {posts.length} articles on building high-performing websites, apps, and automations.
            Updated regularly for founders, marketers, and technical teams.
          </p>
          <div className="mt-5 flex flex-wrap gap-2" aria-label="Categories">
            {categories.map((cat) => (
              <span
                key={cat}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-400"
              >
                {cat}
              </span>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start gap-4 border-t border-white/10 pt-8">
          <p className="text-slate-400">Ready to apply these ideas to your project?</p>
          <MagneticButton href="/#contact">Get in Touch</MagneticButton>
        </div>
      </div>
    </div>
  );
}
