import { SplitReveal } from "@/components/ui/Reveal";

export default function SectionHeading({
  index,
  name,
  title,
  accent,
  after,
  children,
  className = "",
}: {
  index?: string;
  name: string;
  command?: string;
  title: string;
  /** Words rendered in the italic serif accent, after `title`. */
  accent?: string;
  /** Plain words after the accent. */
  after?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mb-12 grid gap-6 sm:mb-16 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-12 ${className}`}>
      <div>
        <p className="kicker">
          {index ? <span className="text-fg">{index}</span> : null}
          {index ? <span aria-hidden>/</span> : null}
          {name}
        </p>
        <SplitReveal as="h2" className="h-section mt-5 max-w-[18ch]">
          {title}
          {accent ? (
            <>
              {" "}
              <span className="serif-i text-accent">{accent}</span>
            </>
          ) : null}
          {after ? <> {after}</> : null}
        </SplitReveal>
      </div>
      {children ? (
        <div className="max-w-md text-[1.05rem] leading-relaxed text-fg-2 lg:justify-self-end">{children}</div>
      ) : null}
    </div>
  );
}
