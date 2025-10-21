import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Inter, Raleway } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter"
});

const raleway = Raleway({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-display"
});

export const metadata: Metadata = {
  title: "GhostDesk — Невидимый AI-ассистент для разговоров",
  description:
    "Реал-тайм транскрибация, подсказки и пост-аналитика встреч. GhostDesk работает поверх любых приложений и помогает говорить уверенно.",
  metadataBase: new URL("https://ghostdesk.app"),
  openGraph: {
    title: "GhostDesk — Невидимый AI-ассистент для разговоров",
    description:
      "Реал-тайм транскрибация, подсказки и пост-аналитика встреч. GhostDesk работает поверх любых приложений.",
    url: "https://ghostdesk.app",
    siteName: "GhostDesk",
    images: [
      {
        url: "https://ghostdesk.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "GhostDesk Landing"
      }
    ],
    locale: "ru_RU",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "GhostDesk — Невидимый AI-ассистент для разговоров",
    description:
      "Говорите свободно. GhostDesk транскрибирует, подсказывает и сохраняет встречи в умный архив.",
    creator: "@ghostdesk"
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f7ff" },
    { media: "(prefers-color-scheme: dark)", color: "#070811" }
  ]
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${inter.variable} ${raleway.variable}`} suppressHydrationWarning>
      <body className="font-sans bg-background text-foreground antialiased">
        <ThemeProvider>
          <div className="relative flex min-h-screen flex-col overflow-x-hidden">
            <span className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-br from-[rgba(91,140,255,0.18)] via-transparent to-[rgba(160,106,255,0.18)] opacity-80 blur-3xl mix-blend-screen dark:from-[rgba(91,140,255,0.12)] dark:via-transparent dark:to-[rgba(160,106,255,0.12)]" aria-hidden="true" />
            <span className="pointer-events-none fixed inset-0 -z-20 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.7),_transparent_60%),radial-gradient(circle_at_bottom,_rgba(91,140,255,0.25),_transparent_65%)] opacity-40 dark:opacity-20" aria-hidden="true" />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
