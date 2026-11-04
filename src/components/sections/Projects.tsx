import { projects, type Project } from "@/data/portfolio";
import { cutter, parsePeriod, tracings } from "@/lib/catalogue";
import Card from "../ui/Card";
import GuideCard from "../ui/GuideCard";
import Stamp from "../ui/Stamp";
import Arrow from "../ui/Arrow";

/* ───────────── Plates: line drawings in blue-black ink, no screenshots needed ───────────── */

const line = "border border-[#2c3e5c]/45";
const fillBar = "rounded-full bg-[#2c3e5c]/30";

function LinkForgePlate() {
  return (
    <div className={`mx-auto aspect-[9/16] h-[92%] rounded-[22px] p-3.5 ${line}`}>
      <div className="mx-auto h-1 w-9 rounded-full bg-[#2c3e5c]/25" />
      <div className={`mx-auto mt-4 h-11 w-11 rounded-full ${line}`} />
      <div className={`mx-auto mt-3 h-1.5 w-20 ${fillBar}`} />
      <div className="mx-auto mt-1.5 h-1 w-24 rounded-full bg-[#2c3e5c]/15" />
      <div className="mt-5 space-y-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className={`flex h-8 items-center gap-2 rounded-md px-2.5 ${line}`}>
            <span className={`h-3 w-3 rounded-[3px] ${line}`} />
            <span className={`h-1.5 ${fillBar}`} style={{ width: `${54 - i * 7}%` }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function SlatXPlate() {
  return (
    <div className={`grid h-[70%] w-[92%] grid-cols-[34%_1fr] overflow-hidden rounded-lg ${line}`}>
      <div className="space-y-2.5 border-r border-[#2c3e5c]/30 p-3">
        <div className={`h-1.5 w-14 ${fillBar}`} />
        {[0, 1, 1, 2, 0, 1].map((indent, i) => (
          <div key={i} className="flex items-center gap-1.5" style={{ paddingLeft: indent * 10 }}>
            <span className={`h-2 w-2 rounded-[2px] ${line}`} />
            <span className="h-1 rounded-full bg-[#2c3e5c]/20" style={{ width: `${68 - indent * 14 - (i % 3) * 8}%` }} />
          </div>
        ))}
      </div>
      <div className="p-4">
        <div className="h-2.5 w-3/5 rounded-full bg-[#2c3e5c]/45" />
        <div className="mt-4 space-y-2">
          {[100, 90, 96, 58].map((w, i) => (
            <div key={i} className="h-1 rounded-full bg-[#2c3e5c]/20" style={{ width: `${w}%` }} />
          ))}
        </div>
        <div className="mt-4 flex gap-1.5">
          {["B", "I", "U", "H1"].map((l) => (
            <span key={l} className={`typed grid h-5 w-5 place-items-center rounded-[3px] !text-[9px] !leading-none text-[#2c3e5c] ${line}`}>
              {l}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function SpringCartPlate() {
  return (
    <div className={`h-[72%] w-[90%] rounded-lg p-3.5 ${line}`}>
      <div className="mb-3 flex items-center justify-between">
        <div className={`h-1.5 w-14 ${fillBar}`} />
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#2c3e5c]" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M3 4h2l2.4 11h10.2L20 7H6.2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="9" cy="19" r="1.2" />
          <circle cx="17" cy="19" r="1.2" />
        </svg>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={`rounded-md p-1.5 ${line}`}>
            <div className="aspect-square rounded-[4px] bg-[#2c3e5c]/[0.07]" />
            <div className={`mt-1.5 h-1 w-4/5 ${fillBar}`} />
            <div className="mt-1 h-1 w-1/3 rounded-full bg-[#2c3e5c]/15" />
          </div>
        ))}
      </div>
    </div>
  );
}

const plates: Record<Project["visual"], React.ReactNode> = {
  linkforge: <LinkForgePlate />,
  slatx: <SlatXPlate />,
  springcart: <SpringCartPlate />,
};

export default function Projects() {
  return (
    <section id="projects" className="shell scroll-mt-14 pt-24">
      <GuideCard label="Projects" title="Things I've built." slot={2}>
        Three apps, three different stacks. Each card comes with an illustration, as all good catalogue entries do.
      </GuideCard>

      <div className="mt-6 space-y-6">
        {projects.map((p) => {
          const { start, end } = parsePeriod(p.period);
          return (
            <Card key={p.id} as="article" call={`${start}\n${cutter(p.name)}`} stamp={<Stamp>Shipped {end}</Stamp>}>
              <div className="grid gap-x-10 md:grid-cols-[1fr_240px] lg:grid-cols-[1fr_290px]">
                <div>
                  <h3 className="font-display text-[clamp(1.9rem,3.6vw,2.6rem)] font-semibold leading-[56px] tracking-[-0.025em]">
                    {p.name}
                  </h3>
                  <p className="text-[17px] font-medium leading-7">{p.tagline}</p>
                  <p className="typed text-ink-2">1 web app : ill. ; {p.tags.join(", ")}.</p>

                  <ul className="mt-7 max-w-[62ch] text-[16px] leading-7 text-ink-2">
                    {p.points.map((pt) => (
                      <li key={pt} className="relative pl-6">
                        <span aria-hidden="true" className="absolute left-0 top-[14px] h-px w-3 bg-ink-3" />
                        {pt}
                      </li>
                    ))}
                  </ul>

                  <p className="typed mt-7 text-ink-2">{tracings(p.tags)}</p>

                  {(p.live || p.repo) && (
                    <div className="mt-7 flex flex-wrap gap-3">
                      {p.live && (
                        <a href={p.live} target="_blank" rel="noreferrer" className="btn btn-ink">
                          Live site <Arrow dir="up-right" />
                        </a>
                      )}
                      {p.repo && (
                        <a href={p.repo} target="_blank" rel="noreferrer" className="btn btn-line">
                          Source code <Arrow dir="up-right" />
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {/* the plate: an unruled inset, like a tipped-in illustration */}
                <div
                  aria-hidden="true"
                  className="relative hidden min-h-[340px] place-items-center overflow-hidden rounded-md bg-card shadow-[0_0_0_1px_rgba(23,25,30,.08)] md:grid"
                >
                  {plates[p.visual]}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
