"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CERTIFICATIONS, EDUCATION, EXPERIENCE, SKILL_GROUPS } from "@/data/experience";
import { PROJECTS } from "@/data/projects";
import { CONTACT, PROFILE } from "@/data/site";
import SectionHeading from "@/components/ui/SectionHeading";

type Line = { kind: "in" | "out" | "err" | "ok"; text: string };

const HELP = [
  "available commands:",
  "  whoami          about me",
  "  projects        list featured projects",
  "  open <name>     open a project case study",
  "  skills          my stack",
  "  experience      where I've worked",
  "  education       degrees & certifications",
  "  contact         how to reach me",
  "  resume          download my CV",
  "  hire            the important one",
  "  clear           clear the screen",
];

const SUGGEST = ["help", "whoami", "projects", "skills", "contact", "hire"];

export default function TerminalSection() {
  const router = useRouter();
  const [lines, setLines] = useState<Line[]>([
    { kind: "ok", text: `Welcome to haseeb-sh v1.0 — type "help" to get started.` },
  ]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIndex, setHIndex] = useState(-1);
  const input = useRef<HTMLInputElement>(null);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [lines]);

  const out = (text: string | string[], kind: Line["kind"] = "out") =>
    (Array.isArray(text) ? text : [text]).map((t) => ({ kind, text: t }));

  function run(raw: string) {
    const cmd = raw.trim();
    const [name, ...args] = cmd.split(/\s+/);
    const add: Line[] = [{ kind: "in", text: cmd }];
    switch ((name ?? "").toLowerCase()) {
      case "":
        break;
      case "help":
        add.push(...out(HELP));
        break;
      case "whoami":
        add.push(
          ...out([
            `${PROFILE.name} — ${PROFILE.role}`,
            `${PROFILE.location} · ${PROFILE.availability}`,
            PROFILE.manifesto,
          ]),
        );
        break;
      case "projects":
      case "ls":
        add.push(
          ...out(PROJECTS.filter((p) => p.featured).map((p) => `  ${p.slug.padEnd(14)} ${p.tagline}`)),
          ...out(`  … and ${PROJECTS.length - 7} more. Try "open buy4low".`, "ok"),
        );
        break;
      case "open":
      case "cd": {
        const q = args.join(" ").toLowerCase();
        const p = PROJECTS.find((x) => x.slug === q || x.name.toLowerCase() === q) ?? PROJECTS.find((x) => x.slug.includes(q));
        if (!q || !p) add.push(...out(`project not found: ${q || "(empty)"} — run "projects"`, "err"));
        else {
          add.push(...out(`opening ${p.name}…`, "ok"));
          setTimeout(() => router.push(`/work/${p.slug}`), 500);
        }
        break;
      }
      case "skills":
      case "stack":
        add.push(...out(SKILL_GROUPS.map((g) => `  ${g.title.padEnd(14)} ${g.items.slice(0, 6).join(", ")}`)));
        break;
      case "experience":
      case "git":
        add.push(...out(EXPERIENCE.map((x) => `  ${x.period.padEnd(20)} ${x.company} — ${x.roles[0].title}`)));
        break;
      case "education":
        add.push(
          ...out(EDUCATION.map((e) => `  ${e.period.padEnd(20)} ${e.degree}, ${e.school}`)),
          ...out(`  certs: ${CERTIFICATIONS.join(" · ")}`),
        );
        break;
      case "contact":
        add.push(...out([`  email     ${CONTACT.email}`, `  linkedin  ${CONTACT.linkedIn}`, `  github    ${CONTACT.github}`, `  whatsapp  ${CONTACT.phone}`]));
        break;
      case "resume":
      case "cv":
        add.push(...out("downloading resume.pdf…", "ok"));
        window.open(PROFILE.cv, "_blank");
        break;
      case "hire":
      case "sudo":
        add.push(...out(["✓ excellent choice.", `  redirecting to /contact — or email ${CONTACT.email}`], "ok"));
        setTimeout(() => router.push("/contact"), 900);
        break;
      case "clear":
        setLines([]);
        return;
      default:
        add.push(...out(`command not found: ${name}. Type "help".`, "err"));
    }
    setLines((l) => [...l, ...add]);
    if (cmd) setHistory((h) => [cmd, ...h]);
    setHIndex(-1);
  }

  return (
    <section id="terminal" className="section">
      <div className="shell">
        <SectionHeading index="06" name="terminal" command="./haseeb-sh" title="Try the" accent="terminal">
          Poke around — it actually works. Start with <code className="text-accent">help</code>.
        </SectionHeading>

        <div className="window" onClick={() => input.current?.focus()}>
          <div className="window__bar">
            <span className="dots">
              <i />
              <i />
              <i />
            </span>
            <span className="mx-auto">haseeb-sh — 80×24</span>
          </div>
          <div ref={scroller} className="h-[380px] overflow-y-auto p-5 font-mono text-[13px] leading-[1.75]" data-lenis-prevent>
            {lines.map((l, i) => (
              <p
                key={i}
                className={`whitespace-pre-wrap ${
                  l.kind === "in" ? "text-fg" : l.kind === "err" ? "text-syn-red" : l.kind === "ok" ? "text-accent" : "text-fg-2"
                }`}
              >
                {l.kind === "in" ? (
                  <>
                    <span className="text-accent">visitor@haseeb</span>
                    <span className="text-muted">:~$ </span>
                  </>
                ) : null}
                {l.text}
              </p>
            ))}
            <form
              className="flex items-center"
              onSubmit={(e) => {
                e.preventDefault();
                run(value);
                setValue("");
              }}
            >
              <span className="text-accent">visitor@haseeb</span>
              <span className="text-muted">:~$&nbsp;</span>
              <input
                ref={input}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowUp" && history.length) {
                    e.preventDefault();
                    const n = Math.min(hIndex + 1, history.length - 1);
                    setHIndex(n);
                    setValue(history[n]);
                  } else if (e.key === "ArrowDown") {
                    e.preventDefault();
                    const n = hIndex - 1;
                    setHIndex(n);
                    setValue(n >= 0 ? history[n] : "");
                  }
                }}
                aria-label="Terminal command"
                autoComplete="off"
                spellCheck={false}
                className="flex-1 bg-transparent text-fg caret-accent outline-none"
              />
            </form>
          </div>
          <div className="flex flex-wrap gap-2 border-t border-line bg-surface px-4 py-3">
            {SUGGEST.map((s) => (
              <button
                key={s}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  run(s);
                }}
                className="chip transition-colors hover:border-accent hover:text-accent-bright"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
