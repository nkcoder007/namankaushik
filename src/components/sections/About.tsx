import { existsSync } from "node:fs";
import path from "node:path";

import Image from "next/image";

import { SectionShell } from "@/components/sections/SectionShell";
import { about, portrait, profile } from "@/data/profile";

const portraitFile = path.join(process.cwd(), "public", portrait.src);
const portraitFilename = portrait.src.split("/").pop();

// 27rem portrait + 3.5rem column gap + 38rem text at xl, so the composition box matches its content.
const compositionWidth = "max-w-[68.5rem]";

export function About() {
  const hasPortrait = existsSync(portraitFile);

  return (
    <SectionShell
      id="about"
      title="About Me"
      width="wide"
      headingClassName={`mx-auto ${compositionWidth}`}
      surface="solid"
    >
      <div
        className={`mx-auto mt-2 grid ${compositionWidth} gap-10 md:grid-cols-[17rem_minmax(0,1fr)] md:gap-12 lg:grid-cols-[minmax(0,25rem)_minmax(0,1fr)] lg:items-center lg:gap-14 xl:grid-cols-[minmax(0,27rem)_minmax(0,1fr)]`}
      >
        <figure
          data-reveal-item
          data-reveal-step="0"
          className="mx-auto w-full max-w-[22rem] border border-border bg-surface md:mx-0 md:max-w-none"
        >
          <figcaption className="flex items-center justify-between gap-3 border-b border-border bg-bg-subtle px-3.5 py-2">
            <span className="flex items-center gap-2 font-mono text-xs text-fg-secondary">
              <span aria-hidden="true" className="size-1.5 shrink-0 bg-syntax-teal" />
              {portraitFilename}
            </span>
            <span className="font-mono text-[11px] tracking-[0.14em] text-fg-muted uppercase">
              4:5
            </span>
          </figcaption>

          <div className="relative aspect-[4/5] w-full bg-bg-subtle">
            {hasPortrait ? (
              <Image
                src={portrait.src}
                alt={portrait.alt}
                fill
                sizes="(min-width: 1280px) 27rem, (min-width: 1024px) 25rem, (min-width: 768px) 17rem, 22rem"
                className="object-cover"
              />
            ) : (
              <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
                <span
                  aria-hidden="true"
                  className="absolute top-3 left-3 size-3 border-t border-l border-border-strong"
                />
                <span
                  aria-hidden="true"
                  className="absolute top-3 right-3 size-3 border-t border-r border-border-strong"
                />
                <span
                  aria-hidden="true"
                  className="absolute bottom-3 left-3 size-3 border-b border-l border-border-strong"
                />
                <span
                  aria-hidden="true"
                  className="absolute right-3 bottom-3 size-3 border-r border-b border-border-strong"
                />

                <span
                  aria-hidden="true"
                  className="flex size-12 items-center justify-center border border-border-strong bg-surface text-fg-muted"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    className="size-5"
                  >
                    <circle cx="12" cy="9" r="3.2" />
                    <path d="M5.8 18.5a6.4 6.4 0 0 1 12.4 0" />
                  </svg>
                </span>

                <p className="mt-4 font-mono text-xs tracking-[0.18em] text-fg-secondary uppercase">
                  Portrait
                </p>
                <p className="mt-1 font-mono text-[11px] text-fg-muted">awaiting image</p>

                <span aria-hidden="true" className="absolute inset-x-6 bottom-6 h-px bg-border" />
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-t border-border px-3.5 py-2 font-mono text-[11px] text-fg-muted">
            <span className="truncate">{portrait.src}</span>
            <span className="uppercase tracking-[0.14em]">
              {hasPortrait ? "loaded" : "placeholder"}
            </span>
          </div>
        </figure>

        <div data-reveal-item data-reveal-step="1" className="max-w-[38rem]">
          <div className="space-y-5 text-[15px] leading-7 text-fg-secondary sm:text-base sm:leading-8 lg:text-[17px] lg:leading-[1.75]">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-8 border-t border-border pt-5">
            <p className="font-mono text-xs tracking-[0.18em] text-fg-secondary uppercase">
              Tools &amp; technologies
            </p>

            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2.5">
              {profile.tools.map((tool) => (
                <li
                  key={tool}
                  className="flex items-center gap-2 font-mono text-[12.5px] text-fg-secondary sm:text-[13px]"
                >
                  <span aria-hidden="true" className="size-1 bg-border-strong" />
                  {tool}
                </li>
              ))}
            </ul>

            <p className="mt-4 max-w-md text-[13px] leading-6 text-fg-muted">{about.toolsNote}</p>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
