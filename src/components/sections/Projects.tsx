import { projects } from "@/data/portfolio";
import { years } from "@/lib/content";
import Arrow from "../ui/Arrow";
import Highlight from "../ui/Highlight";

export default function Projects() {
  return (
    <section id="projects" className="shell scroll-mt-16 py-24 sm:py-32">
      <div className="section">
        <div className="section-aside">
          <h2 className="section-title">Projects</h2>
          <p className="mt-4 max-w-[30ch] text-[16px] leading-relaxed text-ink-2">
            Things I built front to back, because reading about a stack only gets you so far.
          </p>
        </div>

        <ol className="section-body">
          {projects.map((p, i) => (
            <li key={p.id} className={`group ${i > 0 ? "mt-16 border-t border-line pt-10" : ""}`}>
              <div className="flex items-baseline justify-between gap-6">
                <h3 className="font-display text-[clamp(2.4rem,6vw,4.75rem)] font-medium leading-[0.95] tracking-[-0.04em]">
                  {p.name}
                </h3>
                <span className="shrink-0 text-[15px] tabular-nums text-ink-3">{years(p.period)}</span>
              </div>
              <p className="mt-3 text-[18px] text-ink">{p.tagline}</p>

              <ul className="mt-6 max-w-[64ch] space-y-3 text-[16px] leading-relaxed text-ink-2">
                {p.points.map((pt) => (
                  <li key={pt} className="relative pl-5">
                    <span aria-hidden="true" className="absolute left-0 top-[0.7em] h-1 w-1 rounded-full bg-ink-3" />
                    <Highlight text={pt} />
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                <p className="text-[14px] text-ink-3">{p.tags.join("  ·  ")}</p>
                {p.live && (
                  <a href={p.live} target="_blank" rel="noreferrer" className="draw-link inline-flex items-center gap-1.5 text-[15px] font-medium text-accent">
                    Live site <Arrow dir="up-right" />
                  </a>
                )}
                {p.repo && (
                  <a href={p.repo} target="_blank" rel="noreferrer" className="draw-link inline-flex items-center gap-1.5 text-[15px] font-medium text-accent">
                    Source code <Arrow dir="up-right" />
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
