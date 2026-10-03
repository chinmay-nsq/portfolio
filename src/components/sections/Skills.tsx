"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { skillGroups } from "@/data/portfolio";
import SectionHeading from "../ui/SectionHeading";
import { useReveal } from "../ui/useReveal";

/** Orbit stage is authored at this size and scaled down to fit narrower containers. */
const W = 1240;
const H = 440;
const CX = W / 2;
const CY = H / 2;
const ring = (i: number) => {
  const rx = 140 + i * 95;
  return { rx, ry: rx * 0.34 };
};
const SPEEDS = [9, 7.2, 5.8, 4.6, 3.6]; // deg / s, inner rings orbit faster

function Orbit() {
  const host = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const hoverRef = useRef<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);

  const setHoverBoth = (id: string | null) => {
    hoverRef.current = id;
    setHover(id);
  };

  // Scale the fixed-size stage to the available width
  useEffect(() => {
    const h = host.current;
    const s = stage.current;
    if (!h || !s) return;
    const fit = () => {
      const k = Math.min(1, h.clientWidth / W);
      s.style.transform = `scale(${k})`;
      h.style.height = `${H * k}px`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(h);
    return () => ro.disconnect();
  }, []);

  useGSAP(
    () => {
      const nodes = gsap.utils.toArray<HTMLElement>("[data-skill]", stage.current!);
      const meta = nodes.map((el) => {
        const g = Number(el.dataset.ring);
        const j = Number(el.dataset.idx);
        const n = skillGroups[g].items.length;
        return { el, g, base: (j / n) * 360 + g * 37 };
      });

      let t = 0;
      let rate = 1;
      const draw = () => {
        for (const m of meta) {
          const { rx, ry } = ring(m.g);
          const a = ((m.base + SPEEDS[m.g] * t) * Math.PI) / 180;
          const near = (Math.sin(a) + 1) / 2;
          m.el.style.transform = `translate3d(${CX + rx * Math.cos(a)}px, ${CY + ry * Math.sin(a)}px, 0) translate(-4px, -50%) scale(${0.8 + near * 0.3})`;
          m.el.style.opacity = String(0.35 + near * 0.65);
          m.el.style.zIndex = String(Math.round(near * 100));
        }
      };
      draw();
      if (prefersReducedMotion()) return;

      const tick = (_: number, ms: number) => {
        const target = hoverRef.current ? 0.12 : 1;
        rate += (target - rate) * 0.08;
        t += (ms / 1000) * rate;
        draw();
      };
      const st = ScrollTrigger.create({
        trigger: host.current,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => (self.isActive ? gsap.ticker.add(tick) : gsap.ticker.remove(tick)),
      });
      return () => {
        st.kill();
        gsap.ticker.remove(tick);
      };
    },
    { scope: stage },
  );

  return (
    <div>
      <div ref={host} className="relative w-full" aria-hidden="true">
        <div ref={stage} className="absolute left-1/2 top-0 origin-top" style={{ width: W, height: H, marginLeft: -W / 2 }}>
          <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" fill="none">
            {skillGroups.map((g, i) => {
              const { rx, ry } = ring(i);
              const active = hover === g.id;
              return (
                <ellipse
                  key={g.id}
                  cx={CX}
                  cy={CY}
                  rx={rx}
                  ry={ry}
                  stroke="#ececf1"
                  strokeOpacity={hover ? (active ? 0.7 : 0.05) : 0.14}
                  strokeWidth={active ? 1.2 : 0.8}
                  style={{ transition: "stroke-opacity .3s, stroke-width .3s" }}
                />
              );
            })}
          </svg>

          {/* Centre */}
          <div
            className="absolute grid h-14 w-14 place-items-center rounded-full border border-white/40 bg-white/[0.04] font-display text-sm font-medium tracking-tight text-white"
            style={{ left: CX - 28, top: CY - 28 }}
          >
            CL
            <span className="absolute -inset-2 rounded-full border border-white/10" />
          </div>

          {skillGroups.map((g, gi) =>
            g.items.map((item, j) => {
              const dim = hover && hover !== g.id;
              const active = hover === g.id;
              return (
                <div
                  key={item}
                  data-skill
                  data-ring={gi}
                  data-idx={j}
                  onPointerEnter={() => setHoverBoth(g.id)}
                  onPointerLeave={() => setHoverBoth(null)}
                  className="absolute left-0 top-0 flex cursor-default items-center gap-2.5 whitespace-nowrap"
                >
                  <span
                    className="block h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-300"
                    style={{ background: active ? "#ff6a2b" : "#ececf1", opacity: dim ? 0.3 : 1 }}
                  />
                  <span
                    className="font-mono text-[11px] uppercase tracking-[0.12em] transition-colors duration-300"
                    style={{ color: dim ? "rgba(146,150,164,.4)" : active ? "#ffffff" : "#c4c7d1" }}
                  >
                    {item}
                  </span>
                </div>
              );
            }),
          )}
        </div>
      </div>

      {/* Legend */}
      <ul className="mt-12 flex flex-wrap justify-center gap-2.5" aria-hidden="true">
        {skillGroups
          .slice()
          .reverse()
          .map((g) => (
            <li
              key={g.id}
              onPointerEnter={() => setHoverBoth(g.id)}
              onPointerLeave={() => setHoverBoth(null)}
              className={`rounded-full border px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors ${hover === g.id ? "border-white/60 text-white" : "border-white/12 text-dim hover:border-white/30 hover:text-white"}`}
            >
              {g.label}
              <span className="ml-2 text-faint">{g.items.length}</span>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default function Skills() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section id="skills" ref={root} className="relative py-28 sm:py-36">
      <div className="container-x">
        <SectionHeading index="04" label="Skills" title="The stack" muted="I work with." />

        <div className="mt-16">
          {/* Desktop: orbital diagram */}
          <div data-reveal className="hidden lg:block">
            <Orbit />
            <ul className="sr-only">
              {skillGroups.map((g) => (
                <li key={g.id}>
                  {g.label}: {g.items.join(", ")}
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile / tablet: grouped lists */}
          <div className="grid gap-5 sm:grid-cols-2 lg:hidden">
            {skillGroups
              .slice()
              .reverse()
              .map((g, i) => (
                <div key={g.id} data-reveal data-reveal-delay={(i % 2) * 0.08} className="panel p-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-dim">{g.label}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {g.items.map((s) => (
                      <li
                        key={s}
                        className="rounded-[3px] border border-white/10 bg-white/[0.02] px-2.5 py-1.5 text-[13px] text-ink/90"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
