"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { LayoutGrid, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { PROJECT_CATEGORIES, PROJECTS, type ProjectCategory } from "@/data/projects";
import { CATEGORY_META } from "@/components/products/categoryIcons";
import ProductCard from "@/components/products/ProductCard";

type Filter = ProjectCategory | "All";

export default function WorkGrid() {
  const [filter, setFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    const m = new Map<Filter, number>([["All", PROJECTS.length]]);
    for (const c of PROJECT_CATEGORIES) m.set(c, PROJECTS.filter((p) => p.categories.includes(c)).length);
    return m;
  }, []);

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PROJECTS.filter((p) => filter === "All" || p.categories.includes(filter)).filter(
      (p) => !q || `${p.name} ${p.tagline} ${p.description} ${p.stack.join(" ")}`.toLowerCase().includes(q),
    );
  }, [filter, query]);

  return (
    <div>
      <div className="sticky top-[4.75rem] z-30 mb-10 flex flex-col gap-3 border-y border-line bg-bg/80 py-3 backdrop-blur-xl sm:top-20 xl:flex-row xl:items-center xl:justify-between">
        <LayoutGroup>
          <div className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1 [scrollbar-width:none] lg:flex-wrap lg:overflow-visible" role="tablist" aria-label="Filter projects">
            {(["All", ...PROJECT_CATEGORIES] as Filter[]).map((c) => {
              const Icon = c === "All" ? LayoutGrid : CATEGORY_META[c].icon;
              const active = filter === c;
              return (
                <button
                  key={c}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(c)}
                  className={`relative flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-[13px] transition-colors ${
                    active ? "text-bg" : "text-fg-2 hover:text-fg"
                  }`}
                >
                  {active ? (
                    <motion.span
                      layoutId="work-filter"
                      className="absolute inset-0 -z-10 rounded-full"
                      style={{ background: "var(--fg)" }}
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  ) : null}
                  <Icon size={14} />
                  {c} <sup className="font-mono text-[10px] opacity-70">{counts.get(c)}</sup>
                </button>
              );
            })}
          </div>
        </LayoutGroup>
        <label className="flex h-10 items-center gap-2 rounded-full border border-line-strong bg-surface px-3 text-[13px] lg:w-72 lg:shrink-0">
          <Search size={15} className="text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, e.g. Buy4Low"
            className="w-full bg-transparent outline-none placeholder:text-muted"
          />
        </label>
      </div>

      <motion.ul layout className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {items.map((p, i) => (
            <motion.li
              layout
              key={p.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProductCard project={p} priority={i < 3} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {items.length === 0 ? (
        <p className="py-24 text-center text-muted">Nothing matches “{query}”. Try a project name.</p>
      ) : null}
    </div>
  );
}
