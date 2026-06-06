import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
};

export default function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
}: Props) {
  const alignClass = align === "center" ? "text-center mx-auto" : "";

  return (
    <header className={`max-w-3xl ${alignClass}`}>
      <p className="eyebrow" data-reveal-header>
        {eyebrow}
      </p>
      <h2 className="headline-section mt-4 text-slate-50" data-reveal-header>
        {title}
      </h2>
      {lede ? (
        <p
          className="mt-5 max-w-2xl text-[var(--text-lede)] leading-relaxed text-slate-400"
          data-reveal-header
        >
          {lede}
        </p>
      ) : null}
    </header>
  );
}
