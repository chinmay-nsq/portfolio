"use client";

import { useId, useRef, useState } from "react";
import { experience } from "@/data/portfolio";
import { years } from "@/lib/content";
import Highlight from "../ui/Highlight";
import { useReveal } from "../ui/useReveal";

/** Where the product has been deployed: one expandable row per job. */
export default function Work() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);
  // the current job starts open; the rest open on click
  const [open, setOpen] = useState<number[]>([0]);
  const uid = useId();
  const toggle = (i: number) => setOpen((o) => (o.includes(i) ? o.filter((x) => x !== i) : [...o, i]));

  return (
    <section ref={root} id="work" className="scroll-mt-14 bg-mist py-28 sm:py-36">
      <div className="wrap text-center">
        <h2 data-reveal className="headline">
          Deployed at.
          <span className="block text-ink-3">Three companies. Four roles.</span>
        </h2>
      </div>

      <ol data-reveal className="wrap mt-14 max-w-[860px]">
        {experience.map((job, i) => {
          const isOpen = open.includes(i);
          const panel = `${uid}-job-${i}`;
          return (
            <li key={`${job.company}-${job.role}`} className="mb-3 rounded-[22px] bg-paper">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panel}
                onClick={() => toggle(i)}
                className="group grid w-full grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 px-6 py-5 text-left sm:grid-cols-[1fr_auto_auto] sm:px-8"
              >
                <span>
                  <span className="block font-display text-[clamp(1.3rem,2.4vw,1.75rem)] font-semibold leading-tight tracking-[-0.02em]">
                    {job.company}
                  </span>
                  <span className="mt-1 block text-[15px] text-ink-2">
                    {job.role} · {years(job.period)}
                    {job.current && (
                      <span className="ml-2 inline-flex translate-y-[-1px] items-center rounded-full bg-accent/10 px-2 py-0.5 text-[12px] font-medium text-accent">
                        Now
                      </span>
                    )}
                  </span>
                </span>
                <span className="hidden text-[15px] font-medium text-accent sm:block">{job.headline}</span>
                <span
                  aria-hidden="true"
                  className={`relative grid h-8 w-8 place-items-center rounded-full bg-mist transition-[transform,background-color] duration-300 ease-[cubic-bezier(0.2,0,0,1)] group-hover:bg-line ${isOpen ? "rotate-45" : ""}`}
                >
                  <span className="absolute h-[1.5px] w-3 bg-ink" />
                  <span className="absolute h-3 w-[1.5px] bg-ink" />
                </span>
              </button>

              <div
                id={panel}
                className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
              >
                <div className="overflow-hidden" inert={!isOpen}>
                  <div className="px-6 pb-7 sm:px-8">
                    <ul className="max-w-[68ch] space-y-3 text-[16px] leading-relaxed text-ink-2">
                      {job.points.map((p) => (
                        <li key={p} className="relative pl-5">
                          <span aria-hidden="true" className="absolute left-0 top-[0.7em] h-1 w-1 rounded-full bg-ink-3" />
                          <Highlight text={p} />
                        </li>
                      ))}
                    </ul>
                    <p className="mt-5 text-[14px] text-ink-3">
                      {job.location} · {job.tags.join(" · ")}
                    </p>
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
