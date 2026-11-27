export type Project = {
  /** Stable slug, used as the React key. */
  id: string;
  title: string;
  /** Software Development, AI/ML, Research, Game Development, … */
  category: string;
  /** One-line description shown on the collapsed card. */
  summary: string;
  /** Longer description and purpose, shown when the card is expanded. */
  overview?: string;
  /** Your role on the project. */
  role?: string;
  /** What you personally built or contributed. */
  contributions?: readonly string[];
  technologies?: readonly string[];
  /** Key features, shown as a list when expanded. */
  features?: readonly string[];
  /** Challenges or interesting implementation notes. */
  details?: string;
  repositoryUrl?: string;
  liveUrl?: string;
  /** Only set when a verified timeframe is available. */
  timeframe?: string;
  /** Only set when a verified status is available (e.g. In progress). */
  status?: string;
  /** Gives one card the larger treatment: accent rule and a featured label. */
  featured?: boolean;
  /**
   * Temporary fixture marker. Demo records are labelled as such in the UI and
   * never render their placeholder URLs as working external links.
   */
  demo?: boolean;
};

/**
 * TEMPORARY VISUAL FIXTURES — NOT PORTFOLIO CONTENT.
 *
 * The three DEMO PROJECT records below exist only so the card grid can be
 * inspected before real work is documented. Every value is invented: the copy
 * is placeholder text, and the links use the reserved `.invalid` domain, which
 * never resolves in any browser. Each record is flagged `demo: true`, which
 * makes the dialog list its links as inert placeholder text instead of real
 * anchors.
 *
 * To restore the shipped state, replace the whole `entries` array with:
 *
 *     const entries: readonly Project[] = [];
 *
 * Only documented projects belong in this file — name, what it does, its stack,
 * and any repository or live link that actually exists.
 */
const entries: readonly Project[] = [
  {
    id: "demo-project-01",
    demo: true,
    title: "DEMO PROJECT 01",
    category: "Demo / Software Development",
    summary:
      "Demonstration record with a longer summary, so line clamping, technology trimming and the expanded detail groups can all be reviewed on one card.",
    overview:
      "This card is placeholder content. It shows where a project's purpose and scope sit inside the expanded panel, and how that paragraph wraps across the full grid width on a wide viewport. Nothing described here is a real project, and no part of this text should be published.",
    role: "Placeholder role — demo content only",
    timeframe: "Demo timeframe — not a real date",
    status: "Demo fixture",
    contributions: [
      "Placeholder contribution describing one part of the invented work.",
      "Second placeholder contribution, long enough to wrap onto a second line inside the panel.",
      "Third placeholder contribution used to check spacing between list items.",
    ],
    technologies: ["TypeScript", "React", "Next.js", "Tailwind CSS", "PostgreSQL"],
    features: [
      "Placeholder feature describing behaviour that does not exist.",
      "Second placeholder feature that shows how two-line bullets sit in the list.",
      "Third placeholder feature standing in for a real capability.",
    ],
    details:
      "Placeholder notes. This block shows how implementation notes and open questions read inside the expanded card; it is temporary review copy and is removed with the rest of the fixtures.",
    repositoryUrl: "https://example.invalid/demo-project-01/repository",
    liveUrl: "https://example.invalid/demo-project-01/live",
  },
  {
    id: "demo-project-02",
    demo: true,
    title: "DEMO PROJECT 02",
    category: "Demo / Research",
    summary:
      "Short placeholder summary, kept deliberately brief to check how a compact description sits beside longer cards in the same row.",
    overview:
      "Placeholder overview for the second demonstration card. It exists to confirm that a shorter record still fills its card evenly, and that expanding it pushes the row below down instead of overlapping it.",
    role: "Placeholder role — demo content only",
    contributions: [
      "Placeholder contribution for the second card.",
      "Another placeholder contribution, framed like a research task.",
    ],
    technologies: ["Python", "pandas", "Jupyter"],
    features: [
      "Placeholder feature representing a data preparation step.",
      "Placeholder feature representing an evaluation step.",
    ],
    details:
      "Placeholder notes for the second card. No findings, results or conclusions are described here because none exist.",
    repositoryUrl: "https://example.invalid/demo-project-02/repository",
  },
  {
    id: "demo-project-03",
    demo: true,
    title: "DEMO PROJECT 03",
    category: "Demo / Tooling",
    summary:
      "Third placeholder record, used to see a full three-column row and to check that the remaining cards stay visible while another one is expanded.",
    overview:
      "Placeholder overview for the third demonstration card. It carries more technology entries than the card face shows, which is how the trimmed stack and the plus-count indicator get reviewed.",
    role: "Placeholder role — demo content only",
    status: "Demo fixture",
    contributions: [
      "Placeholder contribution describing a command-line workflow.",
      "Placeholder contribution describing how the invented tool was tested.",
      "Placeholder contribution standing in for documentation work.",
    ],
    technologies: ["Go", "SQLite", "Docker", "GitHub Actions", "Make", "goreleaser"],
    features: [
      "Placeholder feature describing an invented command.",
      "Placeholder feature describing invented output formatting.",
      "Placeholder feature describing a packaging step that does not exist.",
    ],
    details:
      "Placeholder notes for the third card, covering the kind of challenge usually written here: constraints, trade-offs and anything worth remembering.",
    liveUrl: "https://example.invalid/demo-project-03/live",
  },
];

export const projects = entries;

export const projectsCopy = {
  note: "Temporary demonstration fixtures for layout review only; these placeholder records are removed before any real project is listed.",
  emptyState: {
    label: "empty index",
    title: "No project records yet.",
    body: "Each card will carry what the project does, the stack it was built with, and links to a repository or live version once those are ready to share.",
    hint: "Records are added as the work is documented.",
  },
} as const;
