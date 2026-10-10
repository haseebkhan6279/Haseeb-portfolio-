import { MARQUEE } from "@/data/experience";

export default function StackMarquee() {
  return (
    <section aria-label="Tech stack" className="border-y border-line py-6">
      <div className="marquee text-[clamp(1rem,1.6vw,1.2rem)] text-fg-2" style={{ ["--marquee-speed" as string]: "48s" }}>
        {[0, 1].map((k) => (
          <div key={k} aria-hidden={k === 1} className="marquee__track items-center">
            {MARQUEE.map((t) => (
              <span key={t} className="flex items-center gap-14 whitespace-nowrap font-medium tracking-tight">
                <span>{t}</span>
                <span className="h-1.5 w-1.5 rounded-[2px] bg-accent/60" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
