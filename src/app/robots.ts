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
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
  };
}
