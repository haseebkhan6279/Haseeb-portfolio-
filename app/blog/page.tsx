import BlogCard from "@/components/blog/BlogCard";
import { LatestPostAside } from "@/components/ui/HeaderAsides";
import PageHeader from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { formatPostDate, getAllPosts } from "@/lib/blog";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Blog",
  description:
    "Notes by Haseeb Khan on websites, performance, Google search, online shops and automation — written from real client work.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = [...new Set(posts.map((p) => p.category))];
  const latest = posts[0];

  return (
    <>
      <PageHeader
        name={`Journal · ${posts.length} articles`}
        title="Notes from"
        accent="the work."
        lede="Practical write-ups on websites, speed, Google search, shops and automation."
        watermark="Notes"
        aside={
          latest ? (
            <LatestPostAside
              post={{
                slug: latest.slug,
                title: latest.title,
                excerpt: latest.excerpt,
                category: latest.category,
                date: formatPostDate(latest.publishedAt),
                minutes: latest.readingTimeMinutes,
              }}
            />
          ) : undefined
        }
      >
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((c) => (
            <span key={c} className="chip">{c}</span>
          ))}
        </div>
      </PageHeader>
      <div className="shell pb-32">
        <Reveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </Reveal>
      </div>
    </>
  );
}
