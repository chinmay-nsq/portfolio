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
    <section id="work" className="shell scroll-mt-16 py-24 sm:py-32">
      <div className="section">
        <div className="section-aside">
          <h2 className="section-title">Work</h2>
          <p className="mt-4 max-w-[30ch] text-[16px] leading-relaxed text-ink-2">
            Three companies so far, and a number on almost every line. I like being able to measure things.
          </p>
        </div>

        <ol className="section-body border-b border-line">
          {experience.map((job, i) => {
            const isOpen = open.includes(i);
            const panel = `${uid}-job-${i}`;
            return (
              <li key={`${job.company}-${job.role}`} className="border-t border-line first:border-t-0">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panel}
                  onClick={() => toggle(i)}
                  className="group grid w-full grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 py-6 text-left sm:grid-cols-[1fr_auto_9.5rem]"
                >
                  <span>
                    <span className="block font-display text-[clamp(1.4rem,2.4vw,1.9rem)] font-medium leading-tight tracking-[-0.02em] transition-colors group-hover:text-accent">
                      {job.company}
                    </span>
                    <span className="mt-1 block text-[15px] text-ink-2">
                      {job.role}
                      {job.current && (
                        <span className="ml-2 inline-flex translate-y-[-1px] items-center gap-1.5 rounded-full bg-accent/10 px-2 py-0.5 text-[12px] font-medium text-accent">
                          Now
                        </span>
                      )}
                    </span>
                  </span>
                  <span className="hidden text-[15px] font-medium text-accent sm:block">{job.headline}</span>
                  <span className="flex items-center justify-end gap-4 text-[15px] tabular-nums text-ink-2">
                    {years(job.period)}
                    <span
                      aria-hidden="true"
                      className={`relative grid h-7 w-7 place-items-center rounded-full border border-line transition-[transform,border-color] duration-300 ease-[cubic-bezier(0.2,0,0,1)] group-hover:border-ink/30 ${isOpen ? "rotate-45" : ""}`}
                    >
                      <span className="absolute h-px w-3 bg-ink" />
                      <span className="absolute h-3 w-px bg-ink" />
                    </span>
                  </span>
                </button>

                <div
                  id={panel}
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden" inert={!isOpen}>
                    <div className="pb-8">
                      <p className="text-[14px] text-ink-3">
                        {job.period} · {job.location}
                      </p>
                      <ul className="mt-4 max-w-[68ch] space-y-3 text-[16px] leading-relaxed text-ink-2">
                        {job.points.map((p) => (
                          <li key={p} className="relative pl-5">
                            <span aria-hidden="true" className="absolute left-0 top-[0.7em] h-1 w-1 rounded-full bg-ink-3" />
                            <Highlight text={p} />
                          </li>
                        ))}
                      </ul>
                      <p className="mt-5 text-[14px] text-ink-3">{job.tags.join("  ·  ")}</p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
