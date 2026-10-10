import type { BlogSection } from "@/data/blog";

export default function BlogPostBody({ sections }: { sections: BlogSection[] }) {
  return (
    <div className="max-w-2xl">
      {sections.map((section, i) => (
        <section key={i} className={i > 0 ? "mt-12" : undefined}>
          {section.heading ? (
            <h2 className="mb-4 text-2xl font-semibold tracking-tight sm:text-3xl">{section.heading}</h2>
          ) : null}
          {section.paragraphs.map((p, j) => (
            <p key={j} className="mb-5 text-[1.075rem] leading-[1.8] text-fg-2">
              {p}
            </p>
          ))}
          {section.bullets?.length ? (
            <ul className="mb-5 space-y-3 text-fg-2">
              {section.bullets.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
    </div>
  );
}
