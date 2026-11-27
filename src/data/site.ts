export const site = {
  name: "Naman Kaushik",
  role: "Student Developer",
} as const;

export const sections = [
  { id: "hero", index: "00", label: "Hero" },
  { id: "about", index: "01", label: "About Me" },
  { id: "experience", index: "02", label: "Experience" },
  { id: "projects", index: "03", label: "Projects" },
  { id: "personality", index: "04", label: "Personality" },
  { id: "contact", index: "05", label: "Contact" },
] as const;

export type SectionId = (typeof sections)[number]["id"];

export const primaryNavigation = [
  { id: "about", label: "About Me" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "personality", label: "Personality" },
] as const satisfies ReadonlyArray<{ id: SectionId; label: string }>;

export const contactNavigation = {
  id: "contact",
  label: "Contact Me",
} as const satisfies { id: SectionId; label: string };
