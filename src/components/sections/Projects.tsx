"use client";

import { useRef } from "react";
import { projects } from "@/data/portfolio";
import { years } from "@/lib/content";
import Arrow from "../ui/Arrow";
import Highlight from "../ui/Highlight";
import { useReveal } from "../ui/useReveal";

// each app gets its own icon colours, all from the launch gradient family
const ICONS: Record<string, { bg: string; glyph: string }> = {
  linkforge: { bg: "linear-gradient(145deg,#4f6bff,#2b45f0 60%,#1f2fb0)", glyph: "M7 13a4 4 0 004 4h2a4 4 0 000-8M17 11a4 4 0 00-4-4h-2a4 4 0 000 8" },
  slatx: { bg: "linear-gradient(145deg,#b06bff,#8a3ffc 60%,#5f22c2)", glyph: "M6 5h12M6 10h12M6 15h8M6 20h5" },
  springcart: { bg: "linear-gradient(145deg,#ff7aa2,#e8457c 60%,#b8285a)", glyph: "M4 5h2l2.2 10h9.6L20 8H7M9.5 19.5h.01M17 19.5h.01" },
};

/** Projects, presented as the apps that ship with the device. */
export default function Projects() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section ref={root} id="apps" className="scroll-mt-14 py-28 sm:py-36">
      <div className="wrap text-center">
        <h2 data-reveal className="headline">
          Built-in apps.
          <span className="block text-ink-3">Pre-installed. Built front to back.</span>
        </h2>
      </div>

      <div className="wrap mt-16 max-w-[860px] space-y-16">
        {projects.map((p) => {
          const icon = ICONS[p.id];
          return (
            <article key={p.id} data-reveal className="grid gap-6 sm:grid-cols-[96px_1fr] sm:gap-8">
              <div
                aria-hidden="true"
                className="grid h-20 w-20 place-items-center rounded-[24%] shadow-[0_12px_24px_-12px_rgba(29,29,31,.45),inset_0_1px_0_rgba(255,255,255,.35)] sm:h-24 sm:w-24"
                style={{ background: icon?.bg }}
              >
                <svg viewBox="0 0 24 24" className="h-1/2 w-1/2 text-white" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d={icon?.glyph} />
                </svg>
              </div>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <h3 className="font-display text-[clamp(2rem,4vw,2.75rem)] font-semibold leading-none tracking-[-0.03em]">{p.name}</h3>
                  <span className="text-[15px] text-ink-3">{years(p.period)}</span>
                </div>
                <p className="mt-2 text-[18px]">{p.tagline}</p>
                <ul className="mt-5 max-w-[64ch] space-y-3 text-[16px] leading-relaxed text-ink-2">
                  {p.points.map((pt) => (
                    <li key={pt} className="relative pl-5">
                      <span aria-hidden="true" className="absolute left-0 top-[0.7em] h-1 w-1 rounded-full bg-ink-3" />
                      <Highlight text={pt} />
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
                  <p className="text-[14px] text-ink-3">Requires {p.tags.join(", ")}.</p>
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noreferrer" className="btn-link !text-[15px]">
                      Open app <Arrow dir="up-right" />
                    </a>
                  )}
                  {p.repo && (
                    <a href={p.repo} target="_blank" rel="noreferrer" className="btn-link !text-[15px]">
                      Source code <Arrow dir="up-right" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
