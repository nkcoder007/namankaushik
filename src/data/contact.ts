export type ContactDestination = {
  id: string;
  /** Platform name shown in the section. */
  label: string;
  /** What the entry shows: the address, or the platform and handle. */
  value: string;
  /**
   * Real destination. Use `mailto:` for the email address. When it is
   * absent the entry renders as inert text: never a link, never a dead href,
   * never a focus stop.
   */
  href?: string;
  /** TEMPORARY marker: no destination has been supplied for this entry yet. */
  placeholder?: boolean;
};

/**
 * THE EMAIL DESTINATION.
 *
 * The public inbox, shown on the first row and linked with `mailto:`. Change
 * the value and the href together so the label and the destination stay in
 * step — never invent an address.
 */
const email: ContactDestination = {
  id: "email",
  label: "Email",
  value: "imnaman2@gmail.com",
  href: "mailto:imnaman2@gmail.com",
};

/**
 * SECONDARY DESTINATIONS.
 *
 * Order is the order the panel reads in. Each `value` is the platform with the
 * handle, kept short enough to sit on one line beside its label; the href is
 * the full profile URL.
 */
const socials: readonly ContactDestination[] = [
  {
    id: "github",
    label: "GitHub",
    value: "github.com/nkcoder007",
    href: "https://github.com/nkcoder007",
  },
  {
    id: "youtube",
    label: "YouTube",
    value: "youtube.com/@namanRichGuy",
    href: "https://www.youtube.com/@namanRichGuy",
  },
  {
    id: "instagram",
    label: "Instagram",
    value: "instagram.com/namanrichguy",
    href: "https://www.instagram.com/namanrichguy/",
  },
  {
    id: "facebook",
    label: "Facebook",
    value: "facebook.com/namanRichGuy",
    href: "https://www.facebook.com/namanRichGuy",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/naman-kaushik-5445b7415",
    href: "https://www.linkedin.com/in/naman-kaushik-5445b7415/",
  },
  {
    id: "x",
    label: "X",
    value: "x.com/namanRichGuy",
    href: "https://x.com/namanRichGuy",
  },
];

export const contact = {
  /**
   * The closing statement, authored as deliberate lines so the break falls
   * after "Let's Make" at every width instead of wherever the measure lands.
   */
  headline: ["Let's Make", "Something Happen."],
  actionLabel: "Get in Touch",
  panelLabel: "destinations",
  closeLabel: "Close",
  email,
  socials,
} as const;
