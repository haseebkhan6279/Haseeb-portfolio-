"use client";

import { useEffect, useMemo, useState } from "react";
import { onIntroReady } from "@/lib/intro";

type Tok = [text: string, cls?: string];

const K = "text-syn-red"; // keyword
const V = "text-syn-blue"; // variable / property
const S = "text-syn-string"; // string
const F = "text-syn-purple"; // function / type
const N = "text-syn-orange"; // number / const
const C = "text-syn-comment"; // comment

const CODE: Tok[][] = [
  [["// profile.ts — the short version", C]],
  [["import", K], [" { "], ["Developer", F], [" } "], ["from", K], [" "], ['"@/lahore"', S], [";"]],
  [],
  [["export const", K], [" "], ["haseeb", V], [": "], ["Developer", F], [" = {"]],
  [["  role", V], [": "], ['"Full-Stack Developer"', S], [","]],
  [["  location", V], [": "], ['"Lahore, PK · remote"', S], [","]],
  [["  company", V], [": "], ['"Hypelet"', S], [","]],
  [["  stack", V], [": ["], ['"Next.js"', S], [", "], ['"TypeScript"', S], [", "], ['"NestJS"', S], [","]],
  [["          "], ['"React Native"', S], [", "], ['"PostgreSQL"', S], ["],"]],
  [["  shipped", V], [": "], ["40", N], [", "], ["// products, end to end", C]],
  [["  countries", V], [": ["], ['"PK"', S], [", "], ['"UK"', S], [", "], ['"US"', S], ["],"]],
  [["  openToWork", V], [": "], ["true", N], [","]],
  [["};"]],
  [],
  [["haseeb", V], ["."], ["ship", F], ["("], ['"your next product"', S], [");"]],
];

/** Visible slice of CODE after `typed` characters, keeping token colours. */
function sliceCode(typed: number) {
  let budget = typed;
  let cursorLine = 0;
  const lines: { text: string; cls?: string }[][] = [];
  for (let li = 0; li < CODE.length; li++) {
    const parts: { text: string; cls?: string }[] = [];
    for (const [t, cls] of CODE[li]) {
      if (budget <= 0) break;
      const piece = t.slice(0, budget);
      budget -= piece.length;
      parts.push({ text: piece, cls });
    }
    if (budget > 0) {
      budget -= 1; // newline
      cursorLine = li + 1;
    } else if (parts.length) cursorLine = li;
    lines.push(parts);
  }
  return { lines, cursorLine };
}

/** VS Code–style window that types out a syntax-highlighted profile. */
export default function CodeEditor() {
  const total = useMemo(() => CODE.reduce((n, line) => n + line.reduce((m, [t]) => m + t.length, 0) + 1, 0), []);
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = window.setTimeout(() => setTyped(total), 0);
      return () => clearTimeout(id);
    }
    let id = 0;
    const off = onIntroReady(() => {
      id = window.setInterval(() => {
        setTyped((n) => {
          if (n >= total) {
            clearInterval(id);
            return n;
          }
          return n + 3;
        });
      }, 22);
    });
    return () => {
      off();
      clearInterval(id);
    };
  }, [total]);

  const { lines, cursorLine } = sliceCode(typed);
  const done = typed >= total;

  return (
    <div className="window w-full">
      <div className="window__bar gap-4 !px-0">
        <span className="dots pl-4">
          <i />
          <i />
          <i />
        </span>
        <div className="flex h-full items-stretch text-[11px]">
          <span className="flex items-center gap-2 border-x border-line bg-bg-2 px-4 text-fg">
            <span className="text-syn-blue">TS</span> profile.ts
          </span>
          <span className="hidden items-center gap-2 px-4 sm:flex">
            <span className="text-syn-orange">{"{}"}</span> projects.json
          </span>
          <span className="hidden items-center gap-2 px-4 md:flex">
            <span className="text-syn-purple">M↓</span> README.md
          </span>
        </div>
      </div>
      <div className="grid grid-cols-[auto_1fr] gap-4 overflow-x-auto p-4 font-mono text-[12.5px] leading-[1.75] sm:text-[13px]">
        <div className="select-none text-right text-syn-comment/60">
          {CODE.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <div className="min-w-0 whitespace-pre text-fg">
          {lines.map((parts, i) => (
            <div key={i} className={i === cursorLine && !done ? "bg-accent-soft" : undefined}>
              {parts.map((p, j) => (
                <span key={j} className={p.cls}>
                  {p.text}
                </span>
              ))}
              {i === cursorLine ? <span className="caret !h-[1.1em] !w-[2px]" /> : null}
              {parts.length === 0 ? "​" : null}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 bg-accent px-3 py-1 font-mono text-[11px] text-accent-fg">
        <span className="flex gap-4">
          <span>⎇ main</span>
          <span className="hidden sm:inline">✓ 0 problems</span>
        </span>
        <span className="flex gap-4">
          <span className="hidden sm:inline">UTF-8</span>
          <span>TypeScript</span>
          <span>{done ? "● saved" : "● typing…"}</span>
        </span>
      </div>
    </div>
  );
}
