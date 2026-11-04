"use client";

import { useId, useState } from "react";
import { experience } from "@/data/portfolio";
import { years } from "@/lib/content";
import Highlight from "../ui/Highlight";

export default function Work() {
  // the current job starts open; the rest open on click
  const [open, setOpen] = useState<number[]>([0]);
  const uid = useId();
  const toggle = (i: number) => setOpen((o) => (o.includes(i) ? o.filter((x) => x !== i) : [...o, i]));

  return (
    <section id="work" className="shell scroll-mt-20 pt-28">
      <div data-reveal className="flex flex-wrap items-end justify-between gap-4 px-1">
        <h2 className="section-title">Work</h2>
        <p className="max-w-[34ch] text-ink-2">Three companies so far. Tap a row to see what shipped.</p>
      </div>

      <ol data-reveal className="tile mt-6 p-2 sm:p-3">
        {experience.map((job, i) => {
          const isOpen = open.includes(i);
          const panel = `${uid}-job-${i}`;
          return (
            <li key={`${job.company}-${job.role}`} className={i > 0 ? "border-t border-line" : ""}>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panel}
                onClick={() => toggle(i)}
                className="group grid w-full grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 rounded-2xl px-4 py-5 text-left transition-colors duration-150 hover:bg-page sm:grid-cols-[1fr_auto_auto] sm:px-5"
              >
                <span className="min-w-0">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="font-display text-[clamp(1.25rem,2.2vw,1.6rem)] font-semibold leading-tight tracking-[-0.02em]">{job.company}</span>
                    {job.current && <span className="rounded-full bg-blue px-2.5 py-0.5 text-[12px] font-medium text-white">Now</span>}
                  </span>
                  <span className="mt-0.5 block text-[15px] text-ink-2">
                    {job.role} · {years(job.period)}
                  </span>
                </span>
                <span className="hidden rounded-full bg-page px-3 py-1.5 text-[14px] font-medium sm:block">{job.headline}</span>
                <span
                  aria-hidden="true"
                  className={`grid h-9 w-9 place-items-center rounded-full bg-page transition-[rotate,background-color] duration-200 ease-[var(--ease-out)] group-hover:bg-line ${isOpen ? "rotate-45" : ""}`}
                >
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M8 3v10M3 8h10" />
                  </svg>
                </span>
              </button>

              <div
                id={panel}
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[var(--ease-out)] ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
              >
                <div className="overflow-hidden" inert={!isOpen}>
                  <div className="px-4 pb-6 sm:px-5">
                    <ul className="max-w-[70ch] space-y-2 text-ink-2">
                      {job.points.map((p) => (
                        <li key={p} className="relative pl-5">
                          <span aria-hidden="true" className="absolute left-0 top-[0.7em] h-1.5 w-1.5 rounded-full bg-blue" />
                          <Highlight text={p} />
                        </li>
                      ))}
                    </ul>
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {job.tags.map((t) => (
                        <li key={t} className="chip !h-7 !text-[13px]">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
