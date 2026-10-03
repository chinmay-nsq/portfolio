"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { experience } from "@/data/portfolio";
import SectionHeading from "../ui/SectionHeading";
import Panel from "../ui/Panel";

const NUM = /(\b\d[\d,.]*(?:\+|%|ms)?)/g;

/** Emphasises every metric in a bullet so achievements read on a skim. */
function Highlight({ text }: { text: string }) {
  return (
    <>
      {text.split(NUM).map((part, i) =>
        i % 2 ? (
          <b key={i} className="font-medium text-white">
            {part}
          </b>
        ) : (
          part
        ),
      )}
    </>
  );
}

export default function Experience() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const wide = window.innerWidth >= 768;

      const fill = root.current!.querySelector("[data-line-fill]") as HTMLElement;
      const marker = root.current!.querySelector("[data-comet]") as HTMLElement;
      const range = { trigger: "[data-timeline]", start: "top 62%", end: "bottom 62%" };

      gsap.fromTo(fill, { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { ...range, scrub: 0.5 } });
      ScrollTrigger.create({
        ...range,
        onUpdate: (self) => {
          marker.style.top = `${self.progress * 100}%`;
        },
      });

      gsap.utils.toArray<HTMLElement>("[data-job]").forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          x: wide ? (i % 2 === 0 ? -40 : 40) : 0,
          y: 30,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 86%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-node]").forEach((node) => {
        gsap.from(node, {
          scale: 0,
          duration: 0.6,
          ease: "back.out(2.5)",
          scrollTrigger: { trigger: node, start: "top 80%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-date]").forEach((d) => {
        gsap.from(d, {
          opacity: 0,
          y: 16,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: d, start: "top 86%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="experience" ref={root} className="relative py-28 sm:py-36">
      <div className="container-x">
        <SectionHeading index="03" label="Experience" title="Where I've worked" muted="and what I shipped." />

        <ol data-timeline className="relative mt-20">
          {/* Spine */}
          <div className="absolute bottom-0 left-[11px] top-0 w-px -translate-x-1/2 bg-white/10 md:left-1/2">
            <span data-line-fill className="absolute inset-0 origin-top bg-white/55" />
            <span
              data-comet
              className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_0_4px_rgba(6,7,10,1)]"
            />
          </div>

          {experience.map((job, i) => {
            const left = i % 2 === 0;
            return (
              <li
                key={`${job.company}-${job.role}`}
                className="relative mb-10 last:mb-0 md:mb-0 md:grid md:grid-cols-2 md:gap-x-20 md:py-6"
              >
                <span
                  data-node
                  className={`absolute left-[11px] top-9 z-10 h-3 w-3 -translate-x-1/2 rounded-full border bg-void md:left-1/2 ${job.current ? "border-burner" : "border-white/50"}`}
                />

                {/* Dates on the opposite side of the spine (desktop) */}
                <div
                  data-date
                  className={`hidden self-start pt-7 font-mono text-xs uppercase tracking-[0.14em] md:block ${left ? "md:col-start-2 md:row-start-1 md:text-left" : "md:col-start-1 md:row-start-1 md:text-right"}`}
                >
                  <div className={job.current ? "text-burner" : "text-dim"}>{job.period}</div>
                  <div className="mt-2 text-faint">{job.location}</div>
                </div>

                <div className={`pl-9 md:pl-0 ${left ? "md:col-start-1 md:row-start-1" : "md:col-start-2 md:row-start-1"}`}>
                  <div data-job>
                    <Panel as="article" className="p-6 sm:p-8">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className="font-display text-2xl font-medium tracking-[-0.015em] text-white sm:text-[1.75rem]">
                            {job.company}
                          </h3>
                          <p className="mt-1 text-sm text-hud">{job.role}</p>
                        </div>
                        {job.current && (
                          <span className="flex items-center gap-2 rounded-full border border-white/12 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-dim">
                            <span className="blink-slow h-1.5 w-1.5 rounded-full bg-burner" /> Current
                          </span>
                        )}
                      </div>

                      <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-faint md:hidden">
                        {job.period} · {job.location}
                      </p>

                      <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-dim">
                        {job.points.map((p) => (
                          <li key={p} className="flex gap-3">
                            <span className="mt-[0.72em] h-px w-2.5 shrink-0 bg-faint" aria-hidden="true" />
                            <span>
                              <Highlight text={p} />
                            </span>
                          </li>
                        ))}
                      </ul>

                      <ul className="mt-6 flex flex-wrap gap-2">
                        {job.tags.map((t) => (
                          <li
                            key={t}
                            className="rounded-[3px] border border-white/10 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-dim"
                          >
                            {t}
                          </li>
                        ))}
                      </ul>
                    </Panel>
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
