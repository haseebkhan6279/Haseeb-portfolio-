import Link from "next/link";
import FooterContactIcons from "@/components/layout/FooterContactIcons";
import { FOOTER } from "@/data/cta";
import { PROFILE } from "@/data/site";

export default function SiteFooter() {
  return (
    <footer className="site-footer border-t border-white/5 py-12 md:py-16" role="contentinfo">
      <div className="section-shell">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-10">
          <div className="sm:col-span-2 lg:col-span-3 xl:col-span-1">
            <Link href="/" className="font-brand text-xl text-slate-50 hover:text-sky-300">
              {PROFILE.shortName}
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-500">{FOOTER.tagline}</p>
          </div>

          <nav aria-labelledby="footer-services">
            <p id="footer-services" className="text-xs font-semibold tracking-widest text-slate-500 uppercase">
              Services
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {FOOTER.services.map((s) => (
                <li key={s.label}>
                  <Link href={s.href} className="text-slate-400 transition-colors hover:text-sky-300">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-blog">
            <p id="footer-blog" className="text-xs font-semibold tracking-widest text-slate-500 uppercase">
              Blog
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {FOOTER.blog.map((b) => (
                <li key={b.label}>
                  <Link href={b.href} className="text-slate-400 transition-colors hover:text-sky-300">
                    {b.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-work">
            <p id="footer-work" className="text-xs font-semibold tracking-widest text-slate-500 uppercase">
              Work
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {FOOTER.work.map((w) => (
                <li key={w.label}>
                  <a
                    href={w.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 transition-colors hover:text-sky-300"
                  >
                    {w.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div aria-labelledby="footer-contact">
            <p id="footer-contact" className="text-xs font-semibold tracking-widest text-slate-500 uppercase">
              Contact
            </p>
            <FooterContactIcons />
          </div>
        </div>

        <p className="mt-10 border-t border-white/5 pt-8 text-center text-sm text-slate-500 md:text-left">
          {FOOTER.bottom}
        </p>
      </div>
    </footer>
  );
}
