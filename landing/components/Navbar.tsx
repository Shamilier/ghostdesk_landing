"use client";

import clsx from "clsx";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Menu, MoonStar, SunMedium, X } from "lucide-react";
import { useTheme } from "next-themes";

const NAV_LINKS = [
  { label: "Возможности", href: "#features" },
  { label: "Как работает", href: "#how" },
  { label: "Кейсы", href: "#use-cases" },
  { label: "Тарифы", href: "#pricing" },
  { label: "FAQ", href: "#faq" }
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const shouldReduceMotion = useReducedMotion();
  const { resolvedTheme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 64);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const ids = ["hero", "social-proof", "features", "how", "use-cases", "pricing", "faq", "cta"] as const;
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0.2
      }
    );

    ids.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleMenu = useCallback(() => setIsOpen(prev => !prev), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);

  const handleThemeSwitch = useCallback(() => {
    if (!isMounted) return;
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [isMounted, resolvedTheme, setTheme]);

  const activeHref = useMemo(() => {
    if (activeSection === "hero") return "";
    const match = NAV_LINKS.find(link => link.href.slice(1) === activeSection);
    return match?.href ?? "";
  }, [activeSection]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-4 sm:px-6">
      <motion.nav
        className={clsx(
          "glass relative flex w-full max-w-6xl items-center justify-between rounded-full px-4 py-3 transition-all sm:px-6",
          isScrolled ? "backdrop-blur-2xl" : "backdrop-blur-lg"
        )}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        style={{
          background: isScrolled
            ? "color-mix(in srgb, var(--surface-elevated) 94%, transparent)"
            : "color-mix(in srgb, var(--surface-glass) 88%, transparent)",
          borderColor: "var(--surface-border)",
          boxShadow: isScrolled ? "var(--shadow-strong)" : "var(--shadow-soft)"
        }}
      >
        <Link
          href="#hero"
          className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.32em] text-foreground/80"
        >
          <span
            className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-gradient)] text-[0.7rem] font-semibold text-white shadow-lg shadow-[rgba(91,140,255,0.35)]"
            aria-hidden="true"
          >
            Gd
          </span>
          GhostDesk
        </Link>
        <div className="hidden items-center gap-8 text-sm font-medium text-foreground/70 lg:flex">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "relative px-1 py-1 transition-colors",
                activeHref === link.href
                  ? "text-foreground"
                  : "text-foreground/70 hover:text-foreground"
              )}
            >
              {link.label}
              <motion.span
                layoutId="nav-underline"
                className="absolute inset-x-1 bottom-0 h-px rounded-full bg-foreground/40"
                initial={false}
                animate={{ opacity: activeHref === link.href ? 1 : 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </Link>
          ))}
        </div>
        <div className="hidden items-center gap-3 lg:flex">
          {isMounted && (
            <button
              type="button"
              onClick={handleThemeSwitch}
              aria-label="Переключить тему"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--surface-border)] bg-transparent text-foreground/80 transition hover:text-foreground"
            >
              {resolvedTheme === "dark" ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
            </button>
          )}
          <Link
            href="#pricing"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--surface-border)] bg-[color-mix(in_srgb,var(--surface-elevated)_82%,transparent)] px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-foreground/75 transition hover:border-[var(--surface-border-strong)] hover:text-foreground"
          >
            Смотреть демо
          </Link>
          <Link
            href="#cta"
            className="btn-primary inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white"
          >
            Попробовать бесплатно
          </Link>
        </div>
        <button
          type="button"
          aria-label="Открыть меню"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--surface-border)] bg-[color-mix(in_srgb,var(--surface-glass)_82%,transparent)] text-foreground lg:hidden"
          onClick={toggleMenu}
        >
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: "easeOut" }}
              className="absolute right-0 top-full mt-4 w-full min-w-[240px] rounded-3xl border border-[var(--surface-border)] bg-[color-mix(in_srgb,var(--surface-elevated)_95%,transparent)] p-4 shadow-xl shadow-[color:rgba(22,30,86,0.12)] backdrop-blur-2xl dark:shadow-[rgba(4,8,24,0.55)] lg:hidden"
            >
              <div className="flex flex-col gap-2 text-sm text-foreground/80">
                {NAV_LINKS.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className="rounded-xl px-3 py-2 transition hover:bg-[color-mix(in_srgb,var(--surface-glass)_85%,transparent)] hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="mt-4 flex flex-col gap-2">
                {isMounted && (
                  <button
                    type="button"
                    onClick={() => {
                      handleThemeSwitch();
                    }}
                    className="flex items-center justify-between rounded-2xl border border-[var(--surface-border)] bg-transparent px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground/80"
                  >
                    Тема
                    {resolvedTheme === "dark" ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
                  </button>
                )}
                <Link
                  href="#pricing"
                  onClick={closeMenu}
                  className="btn-secondary justify-center text-xs uppercase tracking-[0.2em]"
                >
                  Смотреть демо
                </Link>
                <Link
                  href="#cta"
                  onClick={closeMenu}
                  className="btn-primary justify-center text-xs uppercase tracking-[0.2em]"
                >
                  Попробовать бесплатно
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}
