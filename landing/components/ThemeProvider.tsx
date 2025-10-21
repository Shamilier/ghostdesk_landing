"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "ghostdesk-theme";

const isTheme = (value: unknown): value is Theme => value === "light" || value === "dark";

const applyThemeToDocument = (theme: Theme) => {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");

  const applyTheme = useCallback((next: Theme, persist = true) => {
    setThemeState(next);
    applyThemeToDocument(next);
    if (persist && typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, next);
    }
    if (!persist && typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    applyTheme(theme === "dark" ? "light" : "dark");
  }, [applyTheme, theme]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const preferred = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    const initial = isTheme(stored) ? stored : preferred;
    applyTheme(initial, isTheme(stored));
  }, [applyTheme]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-color-scheme: light)");
    const handleChange = (event: MediaQueryListEvent) => {
      if (!isTheme(window.localStorage.getItem(STORAGE_KEY))) {
        applyTheme(event.matches ? "light" : "dark", false);
      }
    };

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, [applyTheme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme: next => applyTheme(next, true),
      toggleTheme
    }),
    [theme, applyTheme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
