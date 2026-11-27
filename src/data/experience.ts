export type ExperienceTone = "research" | "hackathon" | "certification" | "teaching";

/**
 * Optional detail shown for the selected entry in the experience explorer.
 * Every field is optional: anything that is not verified is left out rather
 * than filled in.
 */
export type ExperienceDetails = {
  responsibilities?: readonly string[];
  contributions?: readonly string[];
  /** Weekly or overall commitment, only when it is known. */
  timeCommitment?: string;
  /** Host, conference or venue the work sits under. Shown prominently. */
  venue?: string;
  /** Start and end dates or timeframe, only when they are verified. */
  dates?: string;
  outcomes?: readonly string[];
  /** Heading for the outcomes list, e.g. the kind of recognition. */
  outcomeLabel?: string;
  /**
   * Supporting sentence under the outcomes, e.g. how an award was decided. It
   * reads as an explanation, never as a second award.
   */
  outcomeNote?: string;
  /** Public file offered as a button beside the outcome, e.g. a poster PDF. */
  document?: ExperienceDocument;
  /** Detail that is still unconfirmed, shown so it is easy to fill in later. */
  pendingDetails?: string;
};

/**
 * A public file linked from an entry. `href` is a path inside `public/`, so
 * dropping the PDF into that folder is all it takes to make the link work.
 */
export type ExperienceDocument = {
  label: string;
  href: string;
};

/**
 * A page outside this site that backs up the entry, such as a credential
 * badge or a course description. `href` is left empty until the URL is known,
 * and the entry
 * renders the label as a visible placeholder in the meantime.
 */
export type ExperienceLink = {
  label: string;
  href: string;
};

export type ExperienceEntry = {
  id: string;
  title: string;
  category: string;
  tone: ExperienceTone;
  organization?: string;
  /** Only set when a verified date or period is available. */
  period?: string;
  summary: string;
  skills?: readonly string[];
  details?: ExperienceDetails;
  /** More information elsewhere, e.g. the official course page. */
  link?: ExperienceLink;
  /**
   * Preserved emphasis flag. The explorer signals emphasis through the accent
   * selection treatment, so this no longer changes type size or weight.
   *
   * ENTRIES ARE ORDERED NEWEST FIRST. The array order is the tab order, and the
   * first entry is the one selected on load, so a newly added entry goes at the
   * top. Only confirmed dates are used for that ordering (`details.dates`); an
   * entry whose date is unknown sits after every dated entry rather than being
   * given an assumed position.
   */
  featured?: boolean;
};

const entries: readonly ExperienceEntry[] = [
  {
    id: "impacthack-2026",
    title: "ImpactHack 2026",
    category: "Hackathon",
    tone: "hackathon",
    summary:
      "SenseMap, the submitted project: a web app that turns a restaurant's Google reviews into a 0–100 sensory-friendliness score.",
    skills: ["AI validation", "API integration", "Full-stack"],
    details: {
      venue: "Online hackathon",
      dates: "October 15, 2026",
      contributions: [
        "Gives a searched restaurant a sensory-friendliness score from 0 to 100, where a higher score means a calmer environment across lights, noise, crowding by hour and smell strength.",
        "Converts messy Google reviews into sensory data, checked against real review evidence and confidence levels so invented details stay out of the score.",
        "Brings the Google review data, the AI layer, a backend and a front end together in one app that helps people pick places suited to their sensory needs.",
      ],
      outcomes: ["People's Choice Award"],
      outcomeNote: "Awarded for the most popular project by participant and community voting.",
      outcomeLabel: "Award",
      document: {
        label: "View certificate (PDF)",
        href: "/documents/impacthack-2026-peoples-choice-certificate.pdf",
      },
    },
  },
  {
    id: "quantum-error-correction",
    title: "Quantum error correction research",
    category: "Research",
    tone: "research",
    summary:
      "Research on quantum error correction, presented as a poster at the research conference.",
    skills: ["Quantum error correction", "Machine learning"],
    details: {
      venue: "IRCC' 26 by GYRA",
      dates: "June 6–7, 2026",
      contributions: [
        "Applied machine-learning algorithms to the error-correction work.",
        "Presented the work as a poster at the conference.",
      ],
      outcomes: ["Best Poster Presentation Award"],
      outcomeLabel: "Award",
      document: {
        label: "View certificate (PDF)",
        href: "/documents/ircc-26-best-poster-certificate.pdf",
      },
    },
    featured: true,
  },
  {
    id: "google-ai-essentials",
    title: "Google AI Essentials",
    category: "Certification",
    tone: "certification",
    organization: "Google",
    summary:
      "Completed certification covering AI fundamentals and practical use of AI tools.",
    skills: ["AI fundamentals", "Generative AI", "Responsible AI"],
    details: {
      contributions: [
        "Covers the fundamentals of how AI works, through hands-on activities and assessments.",
        "Covers using generative AI tools for everyday work tasks, including writing effective prompts.",
        "Includes responsible-use guidance and how to judge where AI fits into a workflow.",
      ],
    },
    link: { label: "Verify credential", href: "https://www.credly.com/badges/6a6a6600-a607-4a0e-9828-6429a47352fb/linked_in_profile" },
  },
];

export const experience = {
  entries,
} as const;
