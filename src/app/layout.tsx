import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Mascot } from "@/components/mascot/Mascot";
import { SiteFooter } from "@/components/navigation/SiteFooter";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { ScrollParallax } from "@/components/parallax/ScrollParallax";
import { RevealController } from "@/components/reveal/RevealController";
import { site } from "@/data/site";
import { revealInitScript } from "@/lib/reveal";
import { themeInitScript } from "@/lib/theme";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Page metadata. The framing follows the site itself: a student developer, not
 * an established professional. Everything here is drawn from content the
 * portfolio already states — no invented credentials, no awards that are not on
 * the page.
 *
 * Deliberately absent: `metadataBase`, `openGraph.url`, `alternates.canonical`
 * and `openGraph.images`. The production domain and a social preview image do
 * not exist yet, and a guessed origin or a path to a missing file would be worse
 * than its absence. Add them together once both are real.
 */
const title = `${site.name} — ${site.role}`;
const description =
  "Student developer focused on software, AI/ML and game development, with quantum error correction research and a People's Choice award at ImpactHack 2026.";

export const metadata: Metadata = {
  title,
  description,
  authors: [{ name: site.name }],
  creator: site.name,
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    title,
    description,
  },
  // Text-only card: there is no preview image yet, so no large-image card is
  // declared and no image path is pointed at a file that does not exist.
  twitter: {
    card: "summary",
    title,
    description,
  },
};

/**
 * Browser presentation. `themeColor` belongs to the viewport export, not to
 * metadata (Next.js deprecated it there in v14). The two values are the site's
 * existing light and dark background tokens, so browser chrome matches the page
 * rather than introducing a new colour.
 */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f7f9" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1217" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script dangerouslySetInnerHTML={{ __html: revealInitScript }} />
      </head>
      <body className="flex min-h-dvh flex-col text-fg">
        {/* Persistent background and mascot layer. See the layering plan in globals.css. */}
        <div aria-hidden="true" className="page-backdrop" />
        <Mascot />
        <RevealController />
        <ScrollParallax />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:border focus:border-accent focus:bg-bg focus:px-3 focus:py-2 focus:font-mono focus:text-xs focus:text-fg"
        >
          Skip to main content
        </a>

        <SiteHeader />

        {children}

        <SiteFooter />
      </body>
    </html>
  );
}
