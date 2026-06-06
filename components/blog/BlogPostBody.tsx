import type { BlogSection } from "@/data/blog";

type Props = {
  sections: BlogSection[];
};

export default function BlogPostBody({ sections }: Props) {
  return (
    <div className="max-w-3xl">
      {sections.map((section, i) => (
        <section key={i} className={i > 0 ? "mt-8" : undefined}>
          {section.heading ? (
            <h2 className="mb-3 text-xl font-semibold tracking-tight text-slate-50 sm:text-2xl">
              {section.heading}
            </h2>
          ) : null}
          {section.paragraphs.map((p, j) => (
            <p key={j} className="mb-4 text-base leading-relaxed text-slate-400 sm:text-[1.0625rem]">
              {p}
            </p>
          ))}
          {section.bullets?.length ? (
            <ul className="mb-4 list-disc space-y-2 pl-5 text-slate-400 marker:text-sky-400">
              {section.bullets.map((item) => (
                <li key={item} className="leading-relaxed">
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
