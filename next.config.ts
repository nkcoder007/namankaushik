import type { NextConfig } from "next";

/**
 * Response headers applied to every route, including static assets.
 *
 * Deliberately limited to protections that cannot break the page: there is no
 * Content-Security-Policy here. The theme and reveal gates run as inline
 * scripts in <head> (see `src/lib/theme.ts` and `src/lib/reveal.ts`), so a
 * policy without nonces or hashes would block the first paint and a policy
 * with `unsafe-inline` would add little. Images, fonts, fragment links,
 * animations and the external contact links are all unaffected by these four.
 */
const securityHeaders = [
  // Never let a browser re-interpret a file's type: a PDF cannot be served as
  // HTML, and a text response cannot be sniffed into a script.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Full URL to this origin, only the origin to anyone else.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // A personal portfolio is never meant to be framed by another site.
  { key: "X-Frame-Options", value: "DENY" },
  // Nothing on the page uses these; deny rather than ask later.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  // Do not advertise the framework in every response.
  poweredByHeader: false,

  // Tailwind v4 is compiled by the Turbopack CSS rule below, which applies to
  // the production build as well as dev — there is no separate PostCSS config.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
