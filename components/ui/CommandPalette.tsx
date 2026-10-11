"use client";

import { Command } from "cmdk";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Copy, FileText, FolderKanban, Home, Mail, Newspaper, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { CONTACT, PROFILE } from "@/data/site";
import { PROJECTS } from "@/data/projects";

export function openCommandPalette() {
  window.dispatchEvent(new Event("open-command-palette"));
}

const item =
  "flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-fg-2 transition-colors";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onOpen);
    };
  }, []);

  const run = useCallback((fn: () => void) => {
    setOpen(false);
    fn();
  }, []);

  const go = (href: string) => run(() => router.push(href));

  const copyEmail = () =>
    run(async () => {
      try {
        await navigator.clipboard.writeText(CONTACT.email);
        setToast("Email copied to clipboard");
      } catch {
        setToast(CONTACT.email);
      }
      window.setTimeout(() => setToast(null), 2200);
    });

  return (
    <>
      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[250] flex items-start justify-center bg-black/50 px-4 pt-[14vh] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            data-lenis-prevent
          >
            <motion.div
              className="w-full max-w-xl overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-2xl"
              initial={{ y: 20, scale: 0.97 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 10, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 32 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Command label="Command menu" loop>
                <div className="flex items-center gap-3 border-b border-line px-4">
                  <span className="font-mono text-xs text-accent">⌘K</span>
                  <Command.Input
                    autoFocus
                    placeholder="Search projects or pages…"
                    className="h-14 w-full bg-transparent text-base text-fg outline-none placeholder:text-muted"
                  />
                </div>
                <Command.List className="max-h-[55vh] overflow-y-auto p-2">
                  <Command.Empty className="px-3 py-8 text-center text-sm text-muted">No results.</Command.Empty>
                  <Command.Group heading="Navigate">
                    <Command.Item className={item} onSelect={() => go("/")}>
                      <Home size={16} /> Home
                    </Command.Item>
                    <Command.Item className={item} onSelect={() => go("/work")}>
                      <FolderKanban size={16} /> All work
                    </Command.Item>
                    <Command.Item className={item} onSelect={() => go("/archive")}>
                      <FolderKanban size={16} /> Project archive
                    </Command.Item>
                    <Command.Item className={item} onSelect={() => go("/about")}>
                      <User size={16} /> About
                    </Command.Item>
                    <Command.Item className={item} onSelect={() => go("/blog")}>
                      <Newspaper size={16} /> Blog
                    </Command.Item>
                    <Command.Item className={item} onSelect={() => go("/contact")}>
                      <Mail size={16} /> Contact
                    </Command.Item>
                  </Command.Group>
                  <Command.Group heading="Actions">
                    <Command.Item className={item} onSelect={copyEmail}>
                      <Copy size={16} /> Copy email
                    </Command.Item>
                    <Command.Item className={item} onSelect={() => run(() => window.open(PROFILE.cv, "_blank"))}>
                      <FileText size={16} /> Download CV
                    </Command.Item>
                    <Command.Item className={item} onSelect={() => go("/#work")}>
                      <FolderKanban size={16} /> Selected work
                    </Command.Item>
                    <Command.Item className={item} onSelect={() => run(() => window.open(CONTACT.linkedIn, "_blank"))}>
                      <ArrowUpRight size={16} /> LinkedIn
                    </Command.Item>
                    <Command.Item className={item} onSelect={() => run(() => window.open(CONTACT.github, "_blank"))}>
                      <ArrowUpRight size={16} /> GitHub
                    </Command.Item>
                  </Command.Group>
                  <Command.Group heading="Projects">
                    {PROJECTS.map((p) => (
                      <Command.Item
                        key={p.slug}
                        value={`${p.name} ${p.tagline} ${p.stack.join(" ")}`}
                        className={item}
                        onSelect={() => go(`/work/${p.slug}`)}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        <span className="text-fg">{p.name}</span>
                        <span className="truncate text-muted">{p.tagline}</span>
                      </Command.Item>
                    ))}
                  </Command.Group>
                  <Command.Group heading="Live sites">
                    {PROJECTS.filter((p) => p.url).map((p) => (
                      <Command.Item
                        key={`live-${p.slug}`}
                        value={`${p.name} live site ${p.url}`}
                        className={item}
                        onSelect={() => run(() => window.open(p.url, "_blank", "noopener,noreferrer"))}
                      >
                        <ArrowUpRight size={16} />
                        <span className="text-fg">{p.name}</span>
                        <span className="truncate text-muted">Open live site</span>
                      </Command.Item>
                    ))}
                  </Command.Group>
                </Command.List>
              </Command>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {toast ? (
          <motion.div
            role="status"
            className="fixed bottom-6 left-1/2 z-[260] -translate-x-1/2 rounded-full bg-fg px-5 py-2.5 text-sm text-bg"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
          >
            {toast}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
