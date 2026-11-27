import type { MetadataRoute } from "next";

/**
 * Crawler policy: the whole single-page portfolio is public, so everything is
 * allowed and nothing is disallowed.
 *
 * There is intentionally no `sitemap` entry and no `host`. Both are absolute
 * URLs, and the production domain is not known yet — a placeholder, localhost or
 * repository URL here would be worse than omitting the line. Add `sitemap` (and
 * a `src/app/sitemap.ts`) together once the real origin exists.
 */

// The site is a static export (`output: "export"`), so this metadata route has
// to be resolved to a file at build time: the export refuses a route that could
// only be rendered by a server. The output is byte-for-byte the same
// `robots.txt`; only the rendering mode is pinned.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
  };
}
