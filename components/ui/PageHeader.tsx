import { SplitReveal } from "@/components/ui/Reveal";

/** Editorial page intro for inner routes. */
export default function PageHeader({
  name,
  title,
  accent,
  lede,
  children,
}: {
  name: string;
  command?: string;
  title: string;
  accent?: string;
  lede?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(ellipse_70%_70%_at_30%_0%,#000,transparent)]"
      />
      <div className="shell relative pb-12 pt-32 sm:pb-16 sm:pt-44">
        <p className="kicker">{name}</p>
        <SplitReveal as="h1" className="h-display mt-6 max-w-[16ch]" immediate delay={0.05}>
          {title}
          {accent ? (
            <>
              {" "}
              <span className="serif-i text-accent">{accent}</span>
            </>
          ) : null}
        </SplitReveal>
        {lede ? <p className="lede mt-7 max-w-2xl">{lede}</p> : null}
        {children}
      </div>
    </header>
  );
}
