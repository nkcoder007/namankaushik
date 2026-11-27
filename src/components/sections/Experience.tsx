"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";

import { SectionShell } from "@/components/sections/SectionShell";
import {
  experience,
  type ExperienceDetails,
  type ExperienceDocument,
  type ExperienceLink,
  type ExperienceTone,
} from "@/data/experience";

const toneText: Record<ExperienceTone, string> = {
  research: "text-syntax-purple",
  hackathon: "text-syntax-orange",
  certification: "text-syntax-blue",
  teaching: "text-syntax-teal",
};

// 11rem meta + 4rem gap + 46rem text column at lg, so the whole composition is
// centered as one block while the section identifier and title stay on the rail.
const compositionWidth = "mx-auto w-full max-w-[61rem]";

// One shape for both entry actions. The credential and certificate buttons have
// to match in height and border, and differ only in fill: the credential is
// filled, the certificate outlined.
const entryAction =
  "inline-flex min-h-10 items-center border px-4 font-mono text-[12px] tracking-[0.16em] uppercase transition-colors duration-150 focus-visible:outline-offset-4";

const entries = experience.entries;

const tabIdFor = (id: string) => `experience-tab-${id}`;
const panelIdFor = (id: string) => `experience-panel-${id}`;

export function Experience() {
  const [activeId, setActiveId] = useState<string>(entries[0].id);
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);

  const activeIndex = Math.max(
    0,
    entries.findIndex((entry) => entry.id === activeId),
  );

  function selectAt(index: number) {
    const next = entries[(index + entries.length) % entries.length];
    setActiveId(next.id);
    tabsRef.current[index % entries.length]?.focus();
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight":
        event.preventDefault();
        selectAt(index + 1);
        break;
      case "ArrowUp":
      case "ArrowLeft":
        event.preventDefault();
        selectAt(index - 1);
        break;
      case "Home":
        event.preventDefault();
        selectAt(0);
        break;
      case "End":
        event.preventDefault();
        selectAt(entries.length - 1);
        break;
      default:
        break;
    }
  }

  return (
    <SectionShell
      id="experience"
      title="Experience"
      width="wide"
      headingClassName={compositionWidth}
      surface="solid"
    >
      <div className={compositionWidth}>
        <div className="mt-6 border-t border-border sm:mt-7 md:grid md:grid-cols-[12rem_minmax(0,1fr)] lg:grid-cols-[15rem_minmax(0,1fr)]">
          <div
            role="tablist"
            aria-label="Experience entries"
            aria-orientation="vertical"
            data-reveal-item
            data-reveal-step="0"
            className="md:border-r md:border-border"
          >
            {entries.map((entry, index) => {
              const selected = index === activeIndex;

              return (
                <button
                  key={entry.id}
                  ref={(node) => {
                    tabsRef.current[index] = node;
                  }}
                  type="button"
                  role="tab"
                  id={tabIdFor(entry.id)}
                  aria-selected={selected}
                  aria-controls={panelIdFor(entry.id)}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveId(entry.id)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                  className={[
                    "group relative flex min-h-11 w-full items-center border-b border-border py-3 pr-4 pl-4 text-left transition-colors duration-150",
                    "md:pr-5",
                    selected
                      ? "bg-surface text-accent"
                      : "text-fg-secondary hover:bg-hover hover:text-accent",
                  ].join(" ")}
                >
                  <span
                    aria-hidden="true"
                    className={[
                      "absolute inset-y-0 left-0 w-0.5 bg-accent transition-opacity duration-150",
                      selected ? "opacity-100" : "opacity-0",
                    ].join(" ")}
                  />

                  <span className="text-[15px] leading-6 font-medium text-pretty">
                    {entry.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* One shared cell: the panel takes the height of the tallest entry, so
              switching never moves the composition or re-centres the section. */}
          <div data-reveal-item data-reveal-step="1" className="grid">
            {entries.map((entry, index) => {
              const selected = index === activeIndex;

              return (
                <div
                  key={entry.id}
                  id={panelIdFor(entry.id)}
                  role="tabpanel"
                  aria-labelledby={tabIdFor(entry.id)}
                  tabIndex={selected ? 0 : -1}
                  className={[
                    "min-w-0 [grid-area:1/1]",
                    selected
                      ? "visible animate-[detail-fade-in_160ms_ease-out]"
                      : "invisible",
                  ].join(" ")}
                >
                  <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-border bg-surface px-5 py-2.5 font-mono text-[12px] tracking-[0.18em] uppercase sm:px-7 lg:px-8">
                    <span className="flex min-w-0 flex-wrap items-center gap-x-2.5 gap-y-1">
                      <span className={toneText[entry.tone]}>{entry.category}</span>

                      {entry.organization ? (
                        <>
                          <span aria-hidden="true" className="text-border-strong">
                            /
                          </span>
                          <span className="text-fg-muted">{entry.organization}</span>
                        </>
                      ) : null}

                      {entry.period ? (
                        <>
                          <span aria-hidden="true" className="text-border-strong">
                            /
                          </span>
                          <span className="text-fg-muted">{entry.period}</span>
                        </>
                      ) : null}
                    </span>

                    <span className="text-fg-muted tabular-nums">
                      {String(index + 1).padStart(2, "0")} /{" "}
                      {String(entries.length).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="px-5 py-6 sm:px-7 sm:py-7 lg:px-8">
                    <h3 className="text-xl font-semibold tracking-tight text-fg text-pretty sm:text-2xl">
                      {entry.title}
                    </h3>

                    {/* Conference and dates read as the entry's second line of
                        information, so they are set at body size in the accent
                        instead of being tucked into the mono header strip. */}
                    {entry.details?.venue || entry.details?.dates ? (
                      <div className="mt-3.5 flex flex-wrap items-baseline gap-x-5 gap-y-1.5 border-l-2 border-accent pl-4">
                        {entry.details.venue ? (
                          <p className="text-[17px] leading-6 font-semibold tracking-tight text-fg sm:text-lg">
                            {entry.details.venue}
                          </p>
                        ) : null}

                        {entry.details.dates ? (
                          <p className="font-mono text-[12px] tracking-[0.14em] text-accent uppercase tabular-nums">
                            {entry.details.dates}
                          </p>
                        ) : null}
                      </div>
                    ) : null}

                    <p className="mt-4 max-w-[46rem] text-[15px] leading-7 text-fg-secondary sm:text-base sm:leading-8">
                      {entry.summary}
                    </p>

                    {entry.skills?.length ? (
                      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                        {entry.skills.map((skill) => (
                          <li
                            key={skill}
                            className="flex items-center gap-2 font-mono text-[12px] text-fg-secondary"
                          >
                            <span aria-hidden="true" className="size-1 bg-border-strong" />
                            {skill}
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    {entry.details ? <EntryDetails details={entry.details} /> : null}

                    {entry.link ? (
                      <div className="mt-6">
                        <EntryLink link={entry.link} />
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

function EntryDetails({ details }: { details: ExperienceDetails }) {
  const hasDetail =
    Boolean(details.responsibilities?.length) ||
    Boolean(details.contributions?.length) ||
    Boolean(details.timeCommitment) ||
    Boolean(details.outcomes?.length) ||
    Boolean(details.document);

  if (!hasDetail) return null;

  return (
    <div className="mt-6 max-w-[46rem] space-y-6 border-t border-border pt-5">
      {details.responsibilities?.length ? (
        <DetailGroup label="responsibilities">
          <DetailList items={details.responsibilities} />
        </DetailGroup>
      ) : null}

      {details.contributions?.length ? (
        <DetailGroup label="contributions">
          <DetailList items={details.contributions} />
        </DetailGroup>
      ) : null}

      {details.timeCommitment ? (
        <DetailGroup label="time commitment">
          <p className="font-mono text-[12.5px] leading-6 text-fg-secondary">
            {details.timeCommitment}
          </p>
        </DetailGroup>
      ) : null}

      {/* Outcome and its document share one row: the award sits on the left,
          the file button on the right, so the pair costs one line and not two. */}
      {details.outcomes?.length || details.document ? (
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <div className="min-w-0">
            {details.outcomes?.length ? (
              <>
                <p className="font-mono text-[12px] tracking-[0.18em] text-fg-secondary uppercase">
                  {details.outcomeLabel ?? "outcomes"}
                </p>
                <ul className="mt-1.5 space-y-1.5">
                  {details.outcomes.map((outcome) => (
                    <li
                      key={outcome}
                      className="flex gap-2.5 text-[15px] leading-6 font-medium text-fg"
                    >
                      <span aria-hidden="true" className="mt-2.5 size-1 shrink-0 bg-accent" />
                      {outcome}
                    </li>
                  ))}
                </ul>

                {/* Supporting line for the outcome above, e.g. how an award was
                    decided. It is never rendered as a second outcome. */}
                {details.outcomeNote ? (
                  <p className="mt-2 max-w-[42ch] text-[13px] leading-6 text-fg-muted">
                    {details.outcomeNote}
                  </p>
                ) : null}
              </>
            ) : null}

            {details.pendingDetails ? (
              <p className="mt-1.5 font-mono text-[11px] leading-5 text-fg-muted">
                {details.pendingDetails}
              </p>
            ) : null}
          </div>

          {details.document ? <DocumentButton file={details.document} /> : null}
        </div>
      ) : null}
    </div>
  );
}

/**
 * Outbound link to more information. Until a URL is supplied in the data the
 * label stays visible as a placeholder, the same way contact destinations do.
 */
function EntryLink({ link }: { link: ExperienceLink }) {
  // Same shape as the certificate button; the accent fill makes it the primary
  // action of the panel without changing its size or border.
  if (!link.href) {
    return (
      <span className={`${entryAction} border-border-strong text-fg-secondary`}>
        {link.label}
        <span className="ml-2.5 text-[9.5px] tracking-[0.14em] text-fg-muted">placeholder</span>
      </span>
    );
  }

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noreferrer noopener"
      className={`${entryAction} border-accent bg-accent text-accent-contrast hover:border-accent-strong hover:bg-accent-strong`}
    >
      {link.label}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

/** Opens a public entry document (the conference certificate) in a new tab. */
function DocumentButton({ file }: { file: ExperienceDocument }) {
  return (
    <a
      href={file.href}
      target="_blank"
      rel="noreferrer noopener"
      className={`${entryAction} border-border-strong text-fg hover:border-accent hover:text-accent`}
    >
      {file.label}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

function DetailGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="font-mono text-[12px] tracking-[0.18em] text-fg-secondary uppercase">
        {label}
      </p>
      <div className="mt-2.5">{children}</div>
    </div>
  );
}

function DetailList({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 text-[15px] leading-7 text-fg-secondary">
          <span aria-hidden="true" className="mt-3 size-1 shrink-0 bg-border-strong" />
          {item}
        </li>
      ))}
    </ul>
  );
}
