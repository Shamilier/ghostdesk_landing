"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label={theme === "light" ? "Включить тёмную тему" : "Включить светлую тему"}
      aria-pressed={theme === "light"}
      onClick={toggleTheme}
      className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-white/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/70"
      style={{ ["--tw-ring-offset-color" as "--tw-ring-offset-color"]: "var(--color-bg)" }}
    >
      <span className="sr-only">Сменить тему</span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -12, scale: 0.9 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 12, scale: 0.9 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="flex"
        >
          {theme === "light" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
