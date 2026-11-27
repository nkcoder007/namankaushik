import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { SectionShell } from "@/components/sections/SectionShell";
import { projects, projectsCopy } from "@/data/projects";

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
        {projects.length === 0 ? <ProjectsEmpty /> : <ProjectGrid items={projects} />}

        <div className={`mt-8 grid ${metaColumns}`}>
          <p className="hidden font-mono text-[11px] tracking-[0.18em] text-fg-muted uppercase md:block">
            note
          </p>
          <p className="max-w-[44rem] font-mono text-[11px] leading-5 text-fg-muted">
            {projectsCopy.note}
          </p>
        </div>
      </div>
    </SectionShell>
  );
}

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
