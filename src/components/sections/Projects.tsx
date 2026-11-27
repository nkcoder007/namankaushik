import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { SectionShell } from "@/components/sections/SectionShell";
import { projectPlaceholders, projects, projectsCopy } from "@/data/projects";

// 8rem meta + 4rem gap + 60rem card grid at lg, so the whole composition is
// centered as one block while the identifier row stays on the section rail.
const compositionWidth = "mx-auto w-full max-w-[72rem]";

const metaColumns =
  "md:grid-cols-[7rem_minmax(0,1fr)] md:gap-x-10 lg:grid-cols-[8rem_minmax(0,1fr)] lg:gap-x-16";

export function Projects() {
  return (
    <SectionShell
      id="projects"
      title="Projects"
      width="wide"
      headingClassName={compositionWidth}
    >
      <div className={compositionWidth}>
        {projects.length > 0 ? (
          <ProjectGrid items={projects} />
        ) : projectPlaceholders.length > 0 ? (
          <ProjectPlaceholders />
        ) : (
          <ProjectsEmpty />
        )}
      </div>
    </SectionShell>
  );
}

/**
 * Reserved slots shown while no project is documented. They borrow the card's
 * frame and metrics so the grid stays balanced, but they are deliberately inert:
 * no button, no link, no dialog. The grid is hidden from assistive technology
 * (there is nothing here to read as a project) and the state is announced once
 * in plain text instead — see `projects.ts` for the data and its rules.
 */
function ProjectPlaceholders() {
  return (
    <div>
      <p className="sr-only">{projectsCopy.placeholdersNote}</p>

      <ul
        aria-hidden="true"
        className="mt-9 grid gap-4 sm:mt-11 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6"
      >
        {projectPlaceholders.map((placeholder) => (
          <li key={placeholder.slot}>
            <article className="flex h-full flex-col border border-border bg-surface">
              <div className="flex flex-1 flex-col px-5 py-5">
                <span className="flex items-center justify-between gap-3 font-mono text-[10.5px] tracking-[0.18em] uppercase">
                  <span className="flex min-w-0 items-center gap-2 text-fg-muted">
                    <span aria-hidden="true" className="size-1 shrink-0 bg-border-strong" />
                    <span className="truncate">placeholder</span>
                  </span>
                  <span className="shrink-0 text-fg-muted tabular-nums">
                    {String(placeholder.slot).padStart(2, "0")}
                  </span>
                </span>

                <span className="mt-4 block text-lg font-semibold tracking-tight text-fg-secondary text-pretty">
                  {placeholder.state}
                </span>

                <span className="mt-2 block text-[14px] leading-6 text-fg-muted text-pretty">
                  {placeholder.detail}
                </span>

                <span className="-mx-5 mt-auto flex items-center justify-between gap-3 border-t border-border px-5 pt-3 font-mono text-[10.5px] tracking-[0.16em] uppercase">
                  <span className="text-fg-muted">upcoming</span>
                  <span
                    aria-hidden="true"
                    className="flex size-5 shrink-0 items-center justify-center border border-border text-xs leading-none text-fg-muted"
                  >
                    &mdash;
                  </span>
                </span>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Fallback for a genuinely empty section: no real records and no reserved
 * slots. Only reached if `projectPlaceholders` is emptied too.
 */
function ProjectsEmpty() {
  const { emptyState } = projectsCopy;

  return (
    <div className="mt-10 border-t border-border sm:mt-12">
      <div className={`grid gap-y-3 py-8 sm:py-10 ${metaColumns}`}>
        <p
          aria-hidden="true"
          className="hidden font-mono text-xs text-fg-muted tabular-nums md:block md:pt-1.5"
        >
          &mdash;
        </p>

        <div>
          <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-fg-secondary uppercase">
            <span aria-hidden="true" className="size-1.5 bg-border-strong" />
            {emptyState.label}
          </p>

          <p className="mt-3 text-xl font-semibold tracking-tight text-fg sm:text-2xl">
            {emptyState.title}
          </p>

          <p className="mt-3 max-w-[42rem] text-[15px] leading-7 text-fg-secondary sm:text-base sm:leading-8">
            {emptyState.body}
          </p>

          <p className="mt-5 border-l-2 border-border-strong pl-4 font-mono text-[11px] leading-5 text-fg-muted">
            {emptyState.hint}
          </p>
        </div>
      </div>

      <div aria-hidden="true" className="border-t border-border" />
    </div>
  );
}
