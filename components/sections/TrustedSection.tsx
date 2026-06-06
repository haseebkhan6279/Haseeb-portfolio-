import { TRUSTED_BY } from "@/data/trusted";

export default function TrustedSection() {
  return (
    <section className="section-shell py-14 md:py-16" aria-label="Clients I've worked with">
      <p className="text-center text-xs tracking-[0.25em] text-slate-500 uppercase">Clients I&apos;ve worked with</p>
      <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-5 md:mt-10">
        {TRUSTED_BY.map((name) => (
          <li
            key={name}
            className="font-display text-lg text-slate-400 transition-colors hover:text-slate-200 md:text-xl"
          >
            {name}
          </li>
        ))}
      </ul>
    </section>
  );
}
