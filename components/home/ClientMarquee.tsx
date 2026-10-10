import { PROJECTS } from "@/data/projects";

const EXTRA = new Set(["hypelet", "atlantic-devices", "manpowerhub", "splendid", "tekvers", "gt-estate"]);
const NAMES = PROJECTS.filter((p) => p.featured || EXTRA.has(p.slug)).map((p) => p.name);

/** Wordmark strip of products shipped for clients. */
export default function ClientMarquee() {
  return (
    <section aria-label="Products shipped" className="border-b border-line">
      <div className="shell flex flex-col gap-5 py-8 md:flex-row md:items-center md:gap-10 md:py-10">
        <p className="kicker shrink-0 md:w-44">Products shipped for</p>
        <div className="marquee min-w-0 flex-1" style={{ ["--marquee-speed" as string]: "45s" }}>
          {[0, 1].map((k) => (
            <div key={k} aria-hidden={k === 1} className="marquee__track items-center">
              {NAMES.map((n) => (
                <span
                  key={n}
                  className="whitespace-nowrap font-display text-[clamp(1.25rem,2.2vw,1.65rem)] text-muted/70 transition-colors duration-300 hover:text-fg"
                >
                  {n}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
