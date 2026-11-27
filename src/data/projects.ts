/**
 * PROJECT CONTENT — read this before adding an entry.
 *
 * This file feeds `components/sections/Projects.tsx`, which renders either the
 * real grid (`ProjectGrid` + `ProjectDialog`) or, while nothing is documented,
 * the placeholder slots defined at the bottom of this file.
 *
 * ---------------------------------------------------------------------------
 * ADDING A REAL PROJECT
 * ---------------------------------------------------------------------------
 * Append one object to `entries` below. Nothing else changes: no component
 * edits, no new files, no schema changes. The grid maps `entries` in array
 * order, so the array order is the order of the cards on the page, and each
 * card's position number (`01`, `02`, …) is derived from its index.
 *
 * The moment `entries` is non-empty, the placeholders disappear — they are a
 * fallback for an empty `entries`, not records that sit beside real work.
 *
 *     const entries: readonly Project[] = [
 *       {
 *         id: "sense-map",
 *         title: "SenseMap",
 *         category: "AI/ML",
 *         summary: "One line, shown on the card.",
 *         overview: "The longer purpose and scope, shown in the dialog.",
 *         role: "Solo build",
 *         timeframe: "October 2026",
 *         status: "In progress",
 *         contributions: ["What I built.", "What I owned."],
 *         features: ["What it does for a user."],
 *         details: "Constraints, trade-offs, anything worth remembering.",
 *         technologies: ["TypeScript", "Next.js", "PostgreSQL"],
 *         repositoryUrl: "https://github.com/user/repo",
 *         liveUrl: "https://example.com",
 *       },
 *     ];
 *
 * Only `id`, `title`, `category` and `summary` are required. Everything else
 * is optional and is simply left out of both the card and the dialog when it is
 * absent — never filled with placeholder text, never invented.
 *
 * ---------------------------------------------------------------------------
 * HOW THE CARD USES THESE FIELDS
 * ---------------------------------------------------------------------------
 * Collapsed card (`ProjectCard` in `ProjectGrid.tsx`):
 *   - header strip … `category` on the left; `featured` (accent) or the
 *                    position number on the right
 *   - title ……… `title`
 *   - body ……… `summary`, clamped to three lines
 *   - footer ……… the first three `technologies`, then `+N` if there are more;
 *                a "details" strip with a `+` appears only when the project has
 *                anything further to show.
 *
 * A project with no optional fields at all still renders as a complete, plain
 * card: it gets no "details" strip, is not a button, and opens no dialog.
 *
 * ---------------------------------------------------------------------------
 * HOW THE DIALOG USES THESE FIELDS
 * ---------------------------------------------------------------------------
 * Clicking a card with more content opens `ProjectDialog` (a portal on the page
 * with focus trapping, Escape to close and focus returned to the card).
 *
 *   Header ……… "project / category / status", then `title`
 *   Main column … `overview`, then `contributions`, `features` and `details`
 *                  as labelled groups, in that order
 *   Side column … `role`, `timeframe`, the full `technologies` list, `links`
 *
 * If none of `overview`, `contributions`, `features` or `details` is set, the
 * main column shows `summary` under a "summary" heading instead.
 *
 * ---------------------------------------------------------------------------
 * LINKS (repository and live demo)
 * ---------------------------------------------------------------------------
 * Both links live only in the dialog's side column; the card face never shows
 * them. Supply each as a full absolute `https://` URL:
 *
 *   repositoryUrl … the source repository  → rendered as "Repository"
 *   liveUrl ……… the deployed/demo build → rendered as "Live"
 *
 * Both are optional and independent, so there are three valid cases:
 *   - both ......... both links render, "Live" first
 *   - one only ..... that single link renders on its own; leave the other
 *                    field out entirely (do not pass "" or "#")
 *   - neither ...... the whole "links" block is omitted from the dialog
 *
 * Every supplied link opens in a new tab. There is no placeholder-link mode:
 * a project is either documented with a URL that really exists, or the field
 * stays absent.
 *
 * ---------------------------------------------------------------------------
 * RULES
 * ---------------------------------------------------------------------------
 * - No demo, fixture or invented records: only documented work belongs here.
 * - `id` is the React key and the dialog's aria id prefix, so keep it a unique,
 *   URL-safe slug and never reuse a retired one.
 * - `summary` is the only field read by search engines and card listings; keep
 *   it one sentence that says what the project actually does.
 * - `featured: true` gives a card the accent rule and the "featured" label.
 *   Mark at most one, so the emphasis stays meaningful.
 * - `status` and `timeframe` are shown only in the dialog. Fill them from
 *   verified information, or leave them out.
 * - Placeholders for undocumented work belong in `projectPlaceholders` below,
 *   never in `entries`.
 */
export type Project = {
  /** REQUIRED. Unique slug: React key and the dialog's aria id prefix. */
  id: string;
  /** REQUIRED. Card title, and the dialog heading. */
  title: string;
  /** REQUIRED. Short kind label on the card header, e.g. "AI/ML", "Game Development". */
  category: string;
  /** REQUIRED. One line on the card, clamped to three; also the dialog fallback. */
  summary: string;
  /** Longer purpose and scope, shown at the top of the dialog's main column. */
  overview?: string;
  /** Your role on the project, shown in the dialog's side column. */
  role?: string;
  /** What you personally built or owned, as dialog bullets. */
  contributions?: readonly string[];
  /** The stack. First three appear on the card, all of them in the dialog. */
  technologies?: readonly string[];
  /** What the project does for a user, as dialog bullets. */
  features?: readonly string[];
  /** Constraints, trade-offs and implementation notes, as one dialog paragraph. */
  details?: string;
  /** Full absolute URL to the source. Rendered as "Repository" in the dialog. */
  repositoryUrl?: string;
  /** Full absolute URL to the deployed build. Rendered as "Live" in the dialog. */
  liveUrl?: string;
  /** Verified timeframe only, e.g. "October 2026". Dialog side column. */
  timeframe?: string;
  /** Verified status only, e.g. "In progress", "Shipped". Dialog header. */
  status?: string;
  /** Accent rule plus the "featured" label on the card. Use on at most one. */
  featured?: boolean;
};

/**
 * REAL PROJECT RECORDS — the only list the grid renders.
 *
 * Empty until work is documented: the placeholder slots below stand in for it.
 * See the block above `Project` for the exact format and how each field is used.
 */
const entries: readonly Project[] = [];

export const projects = entries;

/**
 * PLACEHOLDER SLOTS — not project records.
 *
 * Shown only while `entries` is empty, so the Projects section reads as
 * deliberately reserved rather than broken. They carry no project facts: just a
 * slot number, a state label and one line saying the details will follow.
 *
 * They are rendered as static, non-interactive cards: no link, no button, no
 * dialog, and the whole grid is hidden from assistive technology, which is told
 * about the state in one sentence instead. Nothing here is a real project, so
 * search engines see no project names, headings or URLs to index.
 *
 * Delete the three objects (or empty the array) to remove the slots entirely.
 * They are never mixed into `projects`.
 */
export type ProjectPlaceholder = {
  /** Position number shown in the card header, e.g. 1 → "01". */
  slot: number;
  /** Restrained state label, e.g. "Coming Soon" or "In Development". */
  state: string;
  /** One muted line under the label. No names, facts or dates. */
  detail: string;
};

export const projectPlaceholders: readonly ProjectPlaceholder[] = [
  {
    slot: 1,
    state: "Coming Soon",
    detail: "A build will be documented here once it is finished and worth showing.",
  },
  {
    slot: 2,
    state: "In Development",
    detail: "This slot is held for work that is still being built.",
  },
  {
    slot: 3,
    state: "Coming Soon",
    detail: "Details, stack and links follow once the project is ready to share.",
  },
];

/**
 * Section copy. The note that used to sit under the grid was internal
 * placeholder bookkeeping and is intentionally not replaced.
 */
export const projectsCopy = {
  emptyState: {
    label: "empty index",
    title: "No project records yet.",
    body: "Each card will carry what the project does, the stack it was built with, and links to a repository or live version once those are ready to share.",
    hint: "Records are added as the work is documented.",
  },
  /** Screen-reader equivalent for the placeholder grid, which is aria-hidden. */
  placeholdersNote:
    "Projects are not published yet. Three reserved slots mark where they will appear.",
} as const;
