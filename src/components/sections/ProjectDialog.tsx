"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

import type { Project } from "@/data/projects";

type ProjectDialogProps = {
  project: Project;
  /** The card that opened the dialog; focus returns here when it closes. */
  returnFocusTo: HTMLElement | null;
  onClose: () => void;
};

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Project details presented above the page. The grid behind it is left
 * completely alone: no reflow, no scroll shift, no focus while it is open.
 */
export function ProjectDialog({ project, returnFocusTo, onClose }: ProjectDialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [closing, setClosing] = useState(false);

  const requestClose = useCallback(() => {
    setClosing(true);
  }, []);

  // Let the closing fade finish before the dialog unmounts.
  useEffect(() => {
    if (!closing) return;
    const timer = window.setTimeout(onClose, 170);
    return () => window.clearTimeout(timer);
  }, [closing, onClose]);

  useEffect(() => {
    const panel = panelRef.current;
    const body = document.body;
    const html = document.documentElement;

    // Lock the page without shifting it: hide the scrollbar and pad it out.
    // Both the root and the body are locked so the viewport cannot scroll in
    // any engine, not only where body overflow propagates to it.
    const previous = {
      bodyOverflow: body.style.overflow,
      bodyPaddingRight: body.style.paddingRight,
      htmlOverflow: html.style.overflow,
    };
    const scrollbarWidth = window.innerWidth - html.clientWidth;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      const basePadding = Number.parseFloat(window.getComputedStyle(body).paddingRight) || 0;
      body.style.paddingRight = `${basePadding + scrollbarWidth}px`;
    }

    // Keep the rest of the page out of the tab order and the accessibility tree.
    const host = panel?.closest("[data-project-dialog]");
    const inerted: Element[] = [];
    for (const child of Array.from(body.children)) {
      if (host && (child === host || child.contains(host))) continue;
      child.setAttribute("inert", "");
      inerted.push(child);
    }

    panel?.focus({ preventScroll: true });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        requestClose();
        return;
      }

      if (event.key !== "Tab" || !panel) return;

      const focusables = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (element) => element.offsetParent !== null,
      );

      if (focusables.length === 0) {
        event.preventDefault();
        panel.focus();
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || active === panel || !panel.contains(active))) {
        event.preventDefault();
        last.focus();
        return;
      }

      if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown, true);

    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      for (const element of inerted) element.removeAttribute("inert");
      body.style.overflow = previous.bodyOverflow;
      body.style.paddingRight = previous.bodyPaddingRight;
      html.style.overflow = previous.htmlOverflow;
      if (returnFocusTo && document.contains(returnFocusTo)) {
        returnFocusTo.focus({ preventScroll: true });
      }
    };
  }, [requestClose, returnFocusTo]);

  if (typeof document === "undefined") return null;

  const technologies = project.technologies ?? [];
  const titleId = `project-${project.id}-title`;
  const hasAside = Boolean(
    project.role ||
      project.timeframe ||
      project.status ||
      technologies.length > 0 ||
      project.repositoryUrl ||
      project.liveUrl,
  );
  const hasMain =
    Boolean(project.overview) ||
    Boolean(project.contributions?.length) ||
    Boolean(project.features?.length) ||
    Boolean(project.details);

  return createPortal(
    <div
      data-project-dialog=""
      className="fixed inset-0 z-[80] flex items-center justify-center p-2 sm:p-6"
      onClick={(event) => {
        if (event.target === event.currentTarget) requestClose();
      }}
    >
      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-0 bg-[#0b1017]/40 dark:bg-[#05080b]/72",
          "animate-[project-dialog-backdrop-in_180ms_ease-out]",
          closing ? "opacity-0 transition-opacity duration-150" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={[
          "relative flex h-[calc(100svh-1rem)] w-[calc(100vw-1rem)] max-w-[1120px] flex-col overflow-hidden",
          "border border-border-strong bg-bg shadow-[0_40px_120px_-48px_rgb(0_0_0/0.85)] outline-none",
          "animate-[project-dialog-in_180ms_cubic-bezier(0.16,1,0.3,1)]",
          "sm:h-[88svh] sm:w-[88vw]",
          closing ? "opacity-0 transition-opacity duration-150" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <header className="flex shrink-0 items-start justify-between gap-4 border-b border-border bg-surface px-4 py-4 sm:px-6 sm:py-5">
          <div className="min-w-0">
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10.5px] tracking-[0.18em] uppercase">
              <span className="flex items-center gap-2 text-fg-secondary">
                <span aria-hidden="true" className="size-1 shrink-0 bg-accent" />
                project
              </span>
              <span aria-hidden="true" className="text-border-strong">
                /
              </span>
              <span className="text-fg-muted">{project.category}</span>
              {project.status ? (
                <span className="flex items-center gap-2 text-fg-muted">
                  <span aria-hidden="true" className="size-1 shrink-0 bg-border-strong" />
                  {project.status}
                </span>
              ) : null}
            </p>

            <h3
              id={titleId}
              className="mt-2 text-xl font-semibold tracking-tight text-fg text-pretty sm:text-2xl"
            >
              {project.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={requestClose}
            aria-label="Close project details"
            className="group flex min-h-9 min-w-9 shrink-0 items-center justify-center gap-2 border border-border px-2.5 py-1.5 font-mono text-[10.5px] tracking-[0.16em] text-fg-secondary uppercase transition-colors duration-150 hover:border-border-strong hover:bg-hover hover:text-fg sm:justify-start"
          >
            <span aria-hidden="true" className="text-sm leading-none">
              &times;
            </span>
            <span className="hidden sm:inline">close</span>
            <span className="hidden border-l border-border pl-2 text-fg-muted group-hover:border-border-strong md:inline">
              esc
            </span>
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain [scrollbar-gutter:stable]">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_18rem]">
            <div className="px-4 py-6 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
              {hasMain ? (
                <div>
                  {project.overview ? (
                    <Group label="overview">
                      <p className="max-w-[60ch] text-[15px] leading-7 text-fg-secondary">
                        {project.overview}
                      </p>
                    </Group>
                  ) : null}

                  {project.contributions?.length ? (
                    <Group label="contributions">
                      <BulletList items={project.contributions} />
                    </Group>
                  ) : null}

                  {project.features?.length ? (
                    <Group label="key features">
                      <BulletList items={project.features} />
                    </Group>
                  ) : null}

                  {project.details ? (
                    <Group label="implementation notes">
                      <p className="max-w-[60ch] text-[15px] leading-7 text-fg-secondary">
                        {project.details}
                      </p>
                    </Group>
                  ) : null}
                </div>
              ) : (
                <Group label="summary">
                  <p className="max-w-[60ch] text-[15px] leading-7 text-fg-secondary">
                    {project.summary}
                  </p>
                </Group>
              )}
            </div>

            {hasAside ? (
              <aside className="border-t border-border bg-bg-subtle px-4 py-6 sm:px-6 lg:border-t-0 lg:border-l lg:border-border lg:px-6 lg:py-8">
                {project.role ? <Meta label="role">{project.role}</Meta> : null}
                {project.timeframe ? <Meta label="timeframe">{project.timeframe}</Meta> : null}

                {technologies.length > 0 ? (
                  <Meta label="technologies">
                    <span className="flex flex-wrap gap-x-3 gap-y-1.5 font-mono text-[12px]">
                      {technologies.map((technology) => (
                        <span key={technology} className="flex items-center gap-1.5">
                          <span aria-hidden="true" className="size-1 bg-border-strong" />
                          {technology}
                        </span>
                      ))}
                    </span>
                  </Meta>
                ) : null}

                {project.repositoryUrl || project.liveUrl ? (
                  <Meta label="links">
                    <span className="flex flex-wrap gap-x-5 gap-y-2">
                      {project.liveUrl ? (
                        <ExternalLink href={project.liveUrl}>Live</ExternalLink>
                      ) : null}
                      {project.repositoryUrl ? (
                        <ExternalLink href={project.repositoryUrl}>Repository</ExternalLink>
                      ) : null}
                    </span>
                  </Meta>
                ) : null}
              </aside>
            ) : null}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

function Group({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="border-t border-border pt-5 pb-1 first:border-t-0 first:pt-0">
      <p className="font-mono text-[10.5px] tracking-[0.18em] text-fg-secondary uppercase">{label}</p>
      <div className="mt-2.5">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: readonly string[] }) {
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

function Meta({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="mt-5 first:mt-0">
      <p className="font-mono text-[10.5px] tracking-[0.18em] text-fg-secondary uppercase">{label}</p>
      <div className="mt-2 text-[13.5px] leading-6 text-fg-secondary">{children}</div>
    </div>
  );
}

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-1.5 font-mono text-[12px] text-fg underline decoration-border-strong underline-offset-4 hover:text-accent hover:decoration-accent"
    >
      {children}
      <span aria-hidden="true">&nearr;</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
