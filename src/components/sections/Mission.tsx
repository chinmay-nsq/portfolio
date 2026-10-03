"use client";

import { useEffect, useRef } from "react";
import { gsap, useGSAP, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { currentMission as m } from "@/data/portfolio";
import SectionHeading from "../ui/SectionHeading";
import { useReveal } from "../ui/useReveal";

const SIZE = 460;
const C = SIZE / 2;

type Orbit = {
  rx: number;
  ry: number;
  tilt: number;
  speed: number; // deg / s
  start: number;
  label?: string;
  accent?: boolean;
};

const orbits: Orbit[] = [
  { rx: 205, ry: 74, tilt: -24, speed: 22, start: 20, label: "Talent" },
  { rx: 205, ry: 74, tilt: 34, speed: -18, start: 200, label: "Teams", accent: true },
  { rx: 132, ry: 132, tilt: 0, speed: 30, start: 80 },
  { rx: 132, ry: 132, tilt: 0, speed: 30, start: 260 },
];

/** Point on a tilted ellipse, plus a 0→1 "nearness" value for depth cues. */
const pointOn = (o: Orbit, deg: number) => {
  const a = (deg * Math.PI) / 180;
  const t = (o.tilt * Math.PI) / 180;
  const x = o.rx * Math.cos(a);
  const y = o.ry * Math.sin(a);
  return {
    x: C + x * Math.cos(t) - y * Math.sin(t),
    y: C + x * Math.sin(t) + y * Math.cos(t),
    depth: (Math.sin(a) + 1) / 2,
  };
};

const place = (el: HTMLElement, o: Orbit, deg: number) => {
  const { x, y, depth } = pointOn(o, deg);
  el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-3px, -50%) scale(${0.85 + depth * 0.3})`;
  el.style.zIndex = String(Math.round(depth * 10));
  el.style.opacity = String(0.45 + depth * 0.55);
};

/** A thin-line orbital diagram: talent and teams revolving around the platform. */
function OrbitVisual() {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  // The scene is authored at 460px and scaled to whatever width it is given.
  useEffect(() => {
    const host = root.current;
    const el = stage.current;
    if (!host || !el) return;
    const fit = () => {
      el.style.transform = `scale(${host.clientWidth / SIZE})`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(host);
    return () => ro.disconnect();
  }, []);

  useGSAP(
    () => {
      const sats = gsap.utils.toArray<HTMLElement>("[data-sat]", root.current!);
      sats.forEach((el, i) => place(el, orbits[i], orbits[i].start));
      if (prefersReducedMotion()) return;

      let t = 0;
      const tick = (_: number, ms: number) => {
        t += ms / 1000;
        sats.forEach((el, i) => place(el, orbits[i], orbits[i].start + orbits[i].speed * t));
      };

      // Only animate while on screen
      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => (self.isActive ? gsap.ticker.add(tick) : gsap.ticker.remove(tick)),
      });
      return () => {
        st.kill();
        gsap.ticker.remove(tick);
      };
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative mx-auto aspect-square w-full max-w-[540px]" aria-hidden="true">
      <div ref={stage} className="absolute left-0 top-0 origin-top-left" style={{ width: SIZE, height: SIZE }}>
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 h-full w-full" fill="none">
          {orbits.slice(0, 3).map((o, i) => (
            <ellipse
              key={i}
              cx={C}
              cy={C}
              rx={o.rx}
              ry={o.ry}
              transform={`rotate(${o.tilt} ${C} ${C})`}
              stroke="rgba(236,236,241,.22)"
              strokeWidth=".8"
              strokeDasharray={i === 2 ? "2 5" : undefined}
            />
          ))}
          <circle cx={C} cy={C} r="34" stroke="rgba(236,236,241,.5)" strokeWidth=".9" fill="rgba(255,255,255,.03)" />
          <circle cx={C} cy={C} r="44" stroke="rgba(236,236,241,.12)" strokeWidth=".8" />
          <path d={`M${C - 70} ${C}H${C - 52}M${C + 52} ${C}H${C + 70}M${C} ${C - 70}V${C - 52}M${C} ${C + 52}V${C + 70}`} stroke="rgba(236,236,241,.25)" strokeWidth=".8" />
        </svg>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-display text-lg font-medium tracking-tight text-white">
          AI
        </div>
        {orbits.map((o, i) => (
          <div key={i} data-sat className="absolute left-0 top-0 flex items-center gap-2.5">
            <span
              className="block shrink-0 rounded-full"
              style={{
                width: o.label ? 7 : 4,
                height: o.label ? 7 : 4,
                background: o.accent ? "#ff6a2b" : "#ececf1",
              }}
            />
            {o.label && (
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-dim">{o.label}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Mission() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  const rows = [
    ["Status", "In progress"],
    ["Company", m.company],
    ["Role", m.role],
    ["Domain", "AI recruitment"],
  ];

  return (
    <section id="mission" ref={root} className="relative py-24 sm:py-32">
      <div className="container-x">
        <div className="panel relative overflow-hidden p-6 sm:p-10 lg:p-14">
          <div className="relative grid items-center gap-14 lg:grid-cols-2">
            <div>
              <SectionHeading index="02" label="Current focus" title="Currently building" muted={`${m.name}.`} />
              <p data-reveal className="mt-8 max-w-lg text-lg leading-relaxed text-dim">
                {m.description}
              </p>
              <dl data-reveal className="mt-9 grid max-w-md grid-cols-[auto_1fr] gap-x-10 gap-y-3 text-sm">
                {rows.map(([k, v]) => (
                  <div key={k} className="contents">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">{k}</dt>
                    <dd className={k === "Status" ? "flex items-center gap-2 text-ink" : "text-ink/90"}>
                      {k === "Status" && <span className="blink-slow h-1.5 w-1.5 rounded-full bg-mint" />}
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
              {m.href && (
                <a data-reveal href={m.href} target="_blank" rel="noreferrer" className="btn btn-primary mt-10">
                  Visit {m.name} <span aria-hidden>↗</span>
                </a>
              )}
            </div>
            <div data-reveal>
              <OrbitVisual />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
