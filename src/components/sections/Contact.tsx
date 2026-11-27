"use client";

import { useEffect, useRef, useState } from "react";

import { Container } from "@/components/ui/Container";
import { contact, type ContactDestination } from "@/data/contact";

// One centred block: the statement, the single action, and the destinations
// once they are asked for. The section identifier alone stays on the page
// edge, the same convention every other section uses.
const composition = "mx-auto w-full max-w-[60rem]";

const labelBase = "font-mono text-[12px] tracking-[0.2em] uppercase";

const destinations: readonly ContactDestination[] = [contact.email, ...contact.socials];

export function Contact() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  function close() {
    setOpen(false);
    toggleRef.current?.focus();
  }

  // Escape closes from anywhere in the panel and returns focus to the control
  // that opened it, mirroring the header menu.
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <section
      id="contact"
      data-section
      data-scene
      data-surface="grid"
      aria-labelledby="contact-heading"
      className="relative flex min-h-svh scroll-mt-16 flex-col border-b border-border"
    >
      <Container
        width="wide"
        scene
        className="flex flex-1 flex-col pt-16 pb-20 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28"
      >
        {/* The scene is placed by its own top offset rather than centred on its
            own height, so revealing the panel grows the section downward
            without moving the statement the visitor is reading. */}
        <div className={`mt-[clamp(4rem,19svh,15rem)] text-center ${composition}`}>
          <h2
            id="contact-heading"
            data-reveal-item
            data-reveal-step="0"
            className="font-mono text-[2rem] leading-[1.02] font-semibold tracking-[-0.025em] text-fg sm:text-[3.5rem] lg:text-[5rem] xl:text-[5.5rem]"
          >
            {contact.headline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>

          <button
            ref={toggleRef}
            id="contact-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="contact-panel"
            data-reveal-item
            data-reveal-step="1"
            onClick={() => setOpen((value) => !value)}
            className="group mt-10 inline-flex min-h-12 items-center gap-3 bg-accent px-6 font-mono text-[12px] tracking-[0.18em] text-accent-contrast uppercase transition-colors duration-150 hover:bg-accent-strong focus-visible:outline-offset-4 sm:mt-12 sm:min-h-13 sm:px-7"
          >
            {contact.actionLabel}
            <span
              aria-hidden="true"
              className="text-[14px] leading-none transition-transform duration-150 group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </button>

          {/* Disclosure: always mounted so the height can animate, but fully
              collapsed, unpainted and inert until the action is used. */}
          <div
            id="contact-panel"
            role="region"
            aria-labelledby="contact-toggle"
            aria-hidden={!open}
            inert={!open}
            className={[
              "mx-auto grid w-full max-w-[38rem] transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none",
              open
                ? "grid-rows-[1fr] opacity-100"
                : "pointer-events-none grid-rows-[0fr] opacity-0",
            ].join(" ")}
          >
            <div className="min-h-0 overflow-hidden">
              <div className="mt-8 border border-border border-t-2 border-t-accent bg-surface text-left sm:mt-10">
                <div className="flex items-center justify-between gap-4 py-1.5 pr-2 pl-4 sm:pl-5">
                  <p className={`${labelBase} text-fg-secondary`}>{contact.panelLabel}</p>

                  <button
                    type="button"
                    onClick={close}
                    className="inline-flex min-h-11 items-center gap-2 px-2 font-mono text-[12px] tracking-[0.18em] text-fg-muted uppercase transition-colors duration-150 hover:text-accent focus-visible:outline-offset-2 sm:min-h-10"
                  >
                    {contact.closeLabel}
                    <span aria-hidden="true" className="text-[13px] leading-none">
                      &uarr;
                    </span>
                  </button>
                </div>

                <ul className="border-t border-border">
                  {destinations.map((destination) => (
                    <li
                      key={destination.id}
                      className="flex flex-col gap-1.5 border-b border-border px-4 py-4 last:border-b-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 sm:px-5"
                    >
                      <span className={`${labelBase} text-fg-muted`}>{destination.label}</span>
                      <DestinationValue destination={destination} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/**
 * The value end of one panel row: a link when a destination exists, inert text
 * marked as a placeholder when it does not.
 */
function DestinationValue({ destination }: { destination: ContactDestination }) {
  if (!destination.href) {
    return (
      <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[14px] text-fg-secondary sm:text-[15px]">
        {destination.value}
        <span className="font-mono text-[10px] tracking-[0.16em] text-fg-muted uppercase">
          placeholder
        </span>
      </span>
    );
  }

  const isExternal = destination.href.startsWith("http");

  return (
    <a
      href={destination.href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer noopener" : undefined}
      className="group inline-flex min-h-11 items-center gap-2 text-[14px] font-medium text-fg transition-colors duration-150 hover:text-accent focus-visible:outline-offset-4 sm:min-h-0 sm:text-[15px]"
    >
      {destination.value}
      <span
        aria-hidden="true"
        className="text-[13px] leading-none text-fg-muted transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
      >
        {isExternal ? "↗" : "→"}
      </span>
      {isExternal ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </a>
  );
}
