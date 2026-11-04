import { projects } from "@/data/portfolio";
import { years } from "@/lib/content";
import Highlight from "../ui/Highlight";

/* ───────────── Little product drawings, one per project ───────────── */

const line = "border-[1.5px] border-ink";

function LinkForgeArt() {
  return (
    <div className={`h-[88%] aspect-[9/16] rounded-[18px] bg-tile p-2.5 ${line}`}>
      <div className="mx-auto h-1 w-7 rounded-full bg-ink/20" />
      <div className="mx-auto mt-3 h-8 w-8 rounded-full bg-sun" />
      <div className="mx-auto mt-2 h-1.5 w-14 rounded-full bg-ink" />
      <div className="mt-3 space-y-1.5">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`h-5 rounded-md ${i === 0 ? "bg-blue" : "bg-page"}`} />
        ))}
      </div>
    </div>
  );
}

function SlatXArt() {
  return (
    <div className={`grid h-[74%] w-[88%] grid-cols-[30%_1fr] overflow-hidden rounded-xl bg-tile ${line}`}>
      <div className="space-y-2 border-r-[1.5px] border-ink bg-page p-2.5">
        {[0, 1, 2, 1, 0].map((indent, i) => (
          <div key={i} className={`h-1.5 rounded-full ${i === 1 ? "bg-blue" : "bg-ink/25"}`} style={{ marginLeft: indent * 6, width: `${70 - indent * 12}%` }} />
        ))}
      </div>
      <div className="p-3">
        <div className="h-2.5 w-3/5 rounded-full bg-ink" />
        <div className="mt-3 space-y-1.5">
          {[100, 86, 94, 52].map((w, i) => (
            <div key={i} className="h-1.5 rounded-full bg-ink/20" style={{ width: `${w}%` }} />
          ))}
        </div>
        <div className="mt-3 flex items-center gap-1">
          <div className="h-1.5 w-1/3 rounded-full bg-ink/20" />
          <span className="h-3.5 w-[1.5px] animate-pulse bg-blue" />
        </div>
      </div>
    </div>
  );
}

function SpringCartArt() {
  return (
    <div className={`w-[80%] rounded-xl bg-tile p-3 ${line}`}>
      <div className="mb-2.5 flex items-center justify-between">
        <div className="h-2 w-12 rounded-full bg-ink" />
        <span className="relative grid h-6 w-6 place-items-center rounded-full bg-page">
          <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-blue" />
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 4h2l2.4 11h10.2L20 7H6.2" />
          </svg>
        </span>
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-md bg-page p-1">
            <div className={`aspect-[4/3] rounded ${i === 1 ? "bg-sun" : i === 4 ? "bg-blue" : "bg-ink/10"}`} />
            <div className="mt-1 h-1 w-4/5 rounded-full bg-ink/30" />
          </div>
        ))}
      </div>
    </div>
  );
}

const ART: Record<string, React.ReactNode> = {
  linkforge: <LinkForgeArt />,
  slatx: <SlatXArt />,
  springcart: <SpringCartArt />,
};

export default function Projects() {
  return (
    <section id="projects" className="shell scroll-mt-20 pt-28">
      <div data-reveal className="flex flex-wrap items-end justify-between gap-4 px-1">
        <h2 className="section-title">Projects</h2>
        <p className="max-w-[34ch] text-ink-2">Three apps I built front to back, because reading about a stack only gets you so far.</p>
      </div>

      <ul className="mt-6 grid gap-3 lg:grid-cols-3">
        {projects.map((p, i) => (
          <li key={p.id} data-reveal className="tile flex flex-col p-3" style={{ "--i": i } as React.CSSProperties}>
            <div aria-hidden="true" className="grid h-56 place-items-center overflow-hidden rounded-[20px] bg-page">
              {ART[p.id]}
            </div>
            <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-[26px] font-semibold leading-none tracking-[-0.025em]">{p.name}</h3>
                <span className="text-[14px] text-ink-3">{years(p.period)}</span>
              </div>
              <p className="mt-2 font-medium">{p.tagline}</p>
              <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-ink-2">
                {p.points.map((pt) => (
                  <li key={pt} className="relative pl-4">
                    <span aria-hidden="true" className="absolute left-0 top-[0.7em] h-1.5 w-1.5 rounded-full bg-blue" />
                    <Highlight text={pt} />
                  </li>
                ))}
              </ul>
              <ul className="mt-auto flex flex-wrap gap-1.5 pt-5">
                {p.tags.map((t) => (
                  <li key={t} className="chip !h-7 !text-[13px]">
                    {t}
                  </li>
                ))}
              </ul>
              {(p.live || p.repo) && (
                <div className="mt-4 flex gap-4 text-[14px] font-medium">
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noreferrer" className="link text-blue">
                      Live site
                    </a>
                  )}
                  {p.repo && (
                    <a href={p.repo} target="_blank" rel="noreferrer" className="link text-blue">
                      Source code
                    </a>
                  )}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
