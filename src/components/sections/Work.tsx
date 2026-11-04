"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { experience } from "@/data/portfolio";
import { cutter, parsePeriod, tracings } from "@/lib/catalogue";
import Card from "../ui/Card";
import GuideCard from "../ui/GuideCard";
import Stamp from "../ui/Stamp";
import Highlight from "../ui/Highlight";

const STICKY_TOP = 76; // just under the header tabs
const STICKY_STEP = 16; // each later card parks a little lower, so the edges of the stack show

export default function Work() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // each card's due-date stamp comes down as the card arrives
        gsap.utils.toArray<HTMLElement>("[data-job]").forEach((job) => {
          gsap.fromTo(
            job.querySelector("[data-stamp]"),
            { scale: 1.9, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.28, ease: "power4.in", scrollTrigger: { trigger: job, start: "top 70%", once: true } },
          );
        });
      });
      // desktop: a card that gets covered by the next one sinks back into the drawer
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const jobs = gsap.utils.toArray<HTMLElement>("[data-job]");
        jobs.forEach((job, i) => {
          const next = jobs[i + 1];
          if (!next) return;
          const range = { trigger: next, start: "top 85%", end: `top ${STICKY_TOP + (i + 1) * STICKY_STEP}px`, scrub: true };
          gsap.to(job.querySelector("[data-job-card]"), { scale: 0.95, ease: "none", scrollTrigger: range });
          gsap.to(job.querySelector("[data-job-dim]"), { opacity: 0.5, ease: "none", scrollTrigger: range });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="work" className="shell scroll-mt-14 pt-24">
      <GuideCard label="Work" title="Where I've been checked out." slot={1}>
        Four cards, three companies, and a number on almost every line. I like being able to measure things.
      </GuideCard>

      <ol className="mt-6">
        {experience.map((job, i) => {
          const { start, end } = parsePeriod(job.period);
          const last = i === experience.length - 1;
          return (
            <li
              key={`${job.company}-${job.role}`}
              data-job
              className={`lg:sticky ${last ? "" : "pb-6 lg:pb-[14vh]"}`}
              style={{ top: STICKY_TOP + i * STICKY_STEP }}
            >
              <div data-job-card className="relative origin-top">
                <Card
                  as="article"
                  call={`${start}\n${cutter(job.company)}`}
                  stamp={job.current ? <Stamp current>Checked out</Stamp> : <Stamp>Returned {end}</Stamp>}
                >
                  <h3 className="font-display text-[clamp(1.9rem,3.6vw,2.6rem)] font-semibold leading-[56px] tracking-[-0.025em]">
                    {job.company}
                  </h3>
                  <p className="text-[17px] font-medium leading-7">
                    {job.role} <span className="font-normal text-ink-2">· {job.location}</span>
                  </p>
                  <p className="typed text-ink-2">{job.period}</p>

                  <ul className="mt-7 max-w-[68ch] text-[16px] leading-7 text-ink-2">
                    {job.points.map((p) => (
                      <li key={p} className="relative pl-6">
                        <span aria-hidden="true" className="absolute left-0 top-[14px] h-px w-3 bg-ink-3" />
                        <Highlight text={p} />
                      </li>
                    ))}
                  </ul>

                  <p className="typed mt-7 text-ink-2">{tracings(job.tags)}</p>
                </Card>
                <div data-job-dim aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-md bg-ground opacity-0" />
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
