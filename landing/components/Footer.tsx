"use client";

import Link from "next/link";

const FOOTER_LINKS = [
  { label: "Возможности", href: "#features" },
  { label: "Как это работает", href: "#how" },
  { label: "Кейсы", href: "#use-cases" },
  { label: "Тарифы", href: "#pricing" },
  { label: "FAQ", href: "#faq" }
];

const SOCIALS = [
  { label: "Twitter", href: "https://twitter.com/ghostdesk" },
  { label: "LinkedIn", href: "https://linkedin.com/company/ghostdesk" },
  { label: "Product Hunt", href: "https://www.producthunt.com/posts/ghostdesk" }
];

export function Footer() {
  return (
    <footer className="relative mx-auto mt-24 w-full max-w-6xl px-4 pb-12 pt-10 sm:px-6">
      <div className="flex flex-col gap-8 rounded-3xl border border-[var(--surface-border)] bg-[color-mix(in_srgb,var(--surface-glass)_80%,transparent)] px-6 py-8 backdrop-blur-xl sm:px-10 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.32em] text-foreground/70">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-gradient)] text-[0.7rem] font-semibold text-white shadow-lg shadow-[rgba(91,140,255,0.35)]" aria-hidden="true">
              GD
            </span>
            GhostDesk
          </div>
          <p className="mt-3 max-w-md text-sm text-muted">
            Невидимый AI-ассистент для разговоров. GhostDesk помогает слышать, понимать и действовать уверенно в каждом диалоге.
          </p>
        </div>
        <nav className="flex flex-1 flex-col gap-6 text-sm text-foreground/70 sm:flex-row sm:items-center sm:justify-end sm:gap-8">
          <div className="flex flex-wrap gap-4">
            {FOOTER_LINKS.map(link => (
              <Link key={link.label} href={link.href} className="transition hover:text-foreground">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            {SOCIALS.map(link => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="transition hover:text-foreground">
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      </div>
      <div className="mt-8 text-xs text-foreground/45">© {new Date().getFullYear()} GhostDesk. Все права защищены.</div>
    </footer>
  );
}
