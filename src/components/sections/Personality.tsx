"use client";

import { useId, useState } from "react";

import { SectionShell } from "@/components/sections/SectionShell";
import { personality } from "@/data/personality";

/**
 * One type scale and one indent per line, in the same order as the data. The
 * composition is deliberately uneven — sizes carry the hierarchy, indents keep
 * the stack from reading as a list — but every offset shrinks on narrow screens
 * so no line runs past the container. Monospace advance width is 0.6em, which
 * is why the longest label is also the smallest at the top end of its clamp.
 * Six lines alternate large and small so the pairings stay balanced as a whole.
 */
const lines: readonly { size: string; indent: string }[] = [
  { size: "text-[clamp(2.4rem,6.2vw,4.75rem)]", indent: "ml-0" },
  { size: "text-[clamp(2rem,5vw,3.6rem)]", indent: "ml-[12%] sm:ml-[24%]" },
  { size: "text-[clamp(2.1rem,5.6vw,4.4rem)]", indent: "ml-[2%] sm:ml-[4%]" },
  { size: "text-[clamp(1.7rem,4.2vw,3.1rem)]", indent: "ml-[10%] sm:ml-[20%]" },
  { size: "text-[clamp(1.5rem,4.4vw,3.6rem)]", indent: "ml-[3%] sm:ml-[10%]" },
  { size: "text-[clamp(2rem,5.2vw,4.1rem)]", indent: "ml-[8%] sm:ml-[16%]" },
];

const formatIndex = (value: number) => String(value).padStart(2, "0");

export function Personality() {
  const [active, setActive] = useState(0);
  const descriptionId = useId();
  const current = personality.interests[active];

  return (
    <SectionShell id="personality" title="Personality" width="wide" surface="solid">
      <div className="mx-auto max-w-[68rem]">
        <div
          data-reveal-item
          data-reveal-step="0"
          className="mt-4 grid gap-8 border-t border-border pt-8 sm:mt-5 sm:pt-10 lg:mt-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start lg:gap-12 xl:grid-cols-[minmax(0,1fr)_22rem] xl:gap-16"
        >
          <ul className="space-y-1.5 sm:space-y-2">
            {personality.interests.map((interest, index) => {
              const isActive = index === active;

              return (
                <li key={interest.id} className={lines[index].indent}>
                  <button
                    type="button"
                    aria-describedby={descriptionId}
                    aria-pressed={isActive}
                    onPointerEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    onClick={() => setActive(index)}
                    className="group block min-h-6 max-w-full text-left focus-visible:outline-offset-4"
                  >
                    <span
                      className={[
                        "block font-mono leading-[0.95] tracking-[-0.02em] transition-colors duration-200",
                        lines[index].size,
                        isActive
                          ? "font-semibold text-fg"
                          : "font-normal text-fg-muted group-hover:text-fg-secondary",
                      ].join(" ")}
                    >
                      {interest.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Sits beneath the type on mobile, beside it from lg up. The
              paragraph itself never unmounts (so the live region keeps
              announcing); only the text inside it fades. */}
          <div className="border-l border-border-strong pl-5 sm:pl-6">
            <p className="font-mono text-[12px] tracking-[0.16em] text-fg-muted uppercase tabular-nums">
              {formatIndex(active + 1)} / {formatIndex(personality.interests.length)}
              <span aria-hidden="true" className="px-1.5 text-border-strong">
                ·
              </span>
              <span className="text-fg-secondary normal-case tracking-[0.08em]">
                {current.label}
              </span>
            </p>

            <p id={descriptionId} className="mt-3 min-h-[6.5rem] max-w-[26rem] sm:min-h-[5.5rem]">
              <span
                key={current.id}
                className="block animate-[detail-fade-in_200ms_ease-out] text-[15px] leading-7 text-fg-secondary sm:text-base sm:leading-8"
              >
                {current.description}
              </span>
            </p>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
