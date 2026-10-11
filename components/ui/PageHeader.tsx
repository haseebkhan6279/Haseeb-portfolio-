import HeaderAtmosphere from "@/components/ui/HeaderAtmosphere";
import { SplitReveal } from "@/components/ui/Reveal";

/** Editorial page intro for inner routes: copy on the left, a page-specific visual on the right. */
export default function PageHeader({
  name,
  title,
  accent,
  lede,
  children,
  aside,
  watermark,
}: {
  name: string;
  command?: string;
  title: string;
  accent?: string;
  lede?: React.ReactNode;
  children?: React.ReactNode;
  /** Visual shown beside the copy on large screens (below it on small ones). */
  aside?: React.ReactNode;
  /** Huge outlined word drifting behind the header. */
  watermark?: string;
}) {
  return (
    <header className="relative isolate overflow-hidden">
      <HeaderAtmosphere watermark={watermark} />
      <div
        className={`shell relative pb-14 pt-32 sm:pb-20 sm:pt-40 ${
          aside ? "grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16" : ""
        }`}
      >
        <div className="min-w-0">
          <p className="kicker">{name}</p>
          <SplitReveal as="h1" className="h-display mt-6 max-w-[16ch]" immediate delay={0.05}>
            {title}
            {accent ? (
              <>
                {" "}
                <span className="serif-i">{accent}</span>
              </>
            ) : null}
          </SplitReveal>
          {lede ? <p className="lede mt-7 max-w-2xl">{lede}</p> : null}
          {children}
        </div>
        {aside ? <div className="min-w-0">{aside}</div> : null}
      </div>
    </header>
  );
}
