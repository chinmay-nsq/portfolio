"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { projects, type Project } from "@/data/portfolio";
import SectionHeading from "../ui/SectionHeading";
import Panel from "../ui/Panel";

/* ───────────── Wireframe mockups (no screenshots needed) ───────────── */

const frame = "border border-white/15 bg-void/80";

function LinkForgeVisual() {
  return (
    <div className={`relative mx-auto aspect-[9/17] h-[88%] rounded-[24px] p-4 ${frame}`}>
      <div className="mx-auto h-1 w-10 rounded-full bg-white/15" />
      <div className="mx-auto mt-4 h-12 w-12 rounded-full border border-white/30 bg-white/[0.06]" />
      <div className="mx-auto mt-3 h-2 w-20 rounded-full bg-white/60" />
      <div className="mx-auto mt-2 h-1.5 w-28 rounded-full bg-white/20" />
      <div className="mt-5 space-y-2.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex h-9 items-center gap-2.5 rounded-md border border-white/12 bg-white/[0.035] px-3 transition-transform duration-500 group-hover:translate-x-1"
            style={{ transitionDelay: `${i * 40}ms` }}
          >
            <span className="h-3.5 w-3.5 rounded-[3px] border border-white/30" />
            <span className="h-1.5 rounded-full bg-white/40" style={{ width: `${52 - i * 6}%` }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function SlatXVisual() {
  return (
    <div className={`grid h-[72%] w-[88%] grid-cols-[32%_1fr] overflow-hidden rounded-lg ${frame}`}>
      <div className="space-y-2.5 border-r border-white/10 p-3.5">
        <div className="h-2 w-16 rounded-full bg-white/55" />
        {[0, 1, 1, 2, 0, 1].map((indent, i) => (
          <div key={i} className="flex items-center gap-2" style={{ paddingLeft: indent * 12 }}>
            <span className="h-2.5 w-2.5 rounded-[2px] border border-white/30" />
            <span className="h-1.5 rounded-full bg-white/25" style={{ width: `${70 - indent * 14 - (i % 3) * 8}%` }} />
          </div>
        ))}
      </div>
      <div className="p-5">
        <div className="h-3.5 w-3/5 rounded-full bg-white/70" />
        <div className="mt-5 space-y-2.5">
          {[100, 92, 97, 60].map((w, i) => (
            <div key={i} className="h-1.5 rounded-full bg-white/18" style={{ width: `${w}%` }} />
          ))}
        </div>
        <div className="mt-5 flex gap-2">
          {["B", "I", "U", "H1"].map((l) => (
            <span key={l} className="grid h-6 w-6 place-items-center rounded-[3px] border border-white/15 font-mono text-[9px] text-dim">
              {l}
            </span>
          ))}
        </div>
        <div className="mt-5 flex items-center gap-1">
          <div className="h-1.5 w-1/3 rounded-full bg-white/18" />
          <span className="blink h-4 w-px bg-burner" />
        </div>
      </div>
    </div>
  );
}

function SpringCartVisual() {
  return (
    <div className={`relative h-[76%] w-[86%] rounded-lg p-4 ${frame}`}>
      <div className="mb-3 flex items-center justify-between">
        <div className="h-2 w-16 rounded-full bg-white/55" />
        <div className="relative grid h-7 w-7 place-items-center rounded-full border border-white/20">
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M3 4h2l2.4 11h10.2L20 7H6.2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="9" cy="19" r="1.2" />
            <circle cx="17" cy="19" r="1.2" />
          </svg>
          <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-burner" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2.5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-md border border-white/10 bg-white/[0.03] p-1.5">
            <div className="aspect-square rounded-[4px] border border-white/10 bg-gradient-to-br from-white/[0.08] to-transparent" />
            <div className="mt-1.5 h-1 w-4/5 rounded-full bg-white/35" />
            <div className="mt-1 h-1 w-1/3 rounded-full bg-white/20" />
          </div>
        ))}
      </div>
    </div>
  );
}

const visuals: Record<Project["visual"], React.ReactNode> = {
  linkforge: <LinkForgeVisual />,
  slatx: <SlatXVisual />,
  springcart: <SpringCartVisual />,
};

/* ───────────── Card ───────────── */

function ProjectCard({ p }: { p: Project }) {
  return (
    <Panel
      as="article"
      className="group flex w-full flex-col overflow-hidden lg:h-[clamp(400px,56vh,520px)] lg:w-[min(84vw,1040px)] lg:flex-row"
    >
      {/* Visual */}
      <div
        className="relative grid h-[22rem] shrink-0 place-items-center overflow-hidden border-b border-white/10 sm:h-[24rem] lg:h-auto lg:w-[40%] lg:border-b-0 lg:border-r"
        style={{ background: "radial-gradient(circle at 50% 40%, rgba(157,184,214,.07), transparent 70%)" }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <span className="absolute left-5 top-4 font-display text-5xl font-medium leading-none tracking-tight text-white/12">
          {p.code.split("-")[1]}
        </span>
        <div className="relative grid h-full w-full place-items-center py-6 transition-transform duration-700 ease-out group-hover:scale-[1.03]">
          {visuals[p.visual]}
        </div>
      </div>

      {/* Copy */}
      <div className="flex flex-1 flex-col p-6 sm:p-8 lg:p-10">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
          <span>Project {p.code.split("-")[1]}</span>
          <span>{p.period}</span>
        </div>
        <h3 className="mt-4 font-display text-4xl font-medium leading-none tracking-[-0.025em] text-white sm:text-5xl">
          {p.name}
        </h3>
        <p className="mt-2 text-sm text-hud">{p.tagline}</p>

        <ul className="mt-6 space-y-3 text-[15px] leading-relaxed text-dim">
          {p.points.map((pt) => (
            <li key={pt} className="flex gap-3">
              <span className="mt-[0.72em] h-px w-2.5 shrink-0 bg-faint" aria-hidden="true" />
              {pt}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-7">
          <ul className="flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <li key={t} className="rounded-[3px] border border-white/10 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-dim">
                {t}
              </li>
            ))}
          </ul>
          <div className="flex gap-3">
            {p.live && (
              <a href={p.live} target="_blank" rel="noreferrer" className="btn btn-primary !h-9">
                Live <span aria-hidden>↗</span>
              </a>
            )}
            {p.repo && (
              <a href={p.repo} target="_blank" rel="noreferrer" className="btn btn-ghost !h-9">
                Code <span aria-hidden>↗</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </Panel>
  );
}

/* ───────────── Section ───────────── */

export default function Projects() {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const count = useRef<HTMLSpanElement>(null);

  // Desktop: pin the section and slide the cards horizontally while scrolling vertically
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const el = track.current!;
        const distance = () => Math.max(0, el.scrollWidth - document.documentElement.clientWidth);
        gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: pin.current,
            pin: true,
            scrub: 0.8,
            start: "top top",
            end: () => `+=${distance()}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
              if (count.current) {
                const n = Math.min(projects.length, Math.floor(self.progress * projects.length) + 1);
                count.current.textContent = String(n).padStart(2, "0");
              }
            },
          },
        });
      });

      // Stacked layout: cards rise in as they scroll into view
      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-card]").forEach((card) => {
          gsap.from(card, {
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="projects" ref={root} className="relative">
      <div ref={pin} className="py-28 sm:py-32 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:overflow-hidden lg:py-0">
        <div className="container-x">
          <SectionHeading index="05" label="Projects" title="Selected projects" />
          <div className="mt-8 hidden items-center gap-5 font-mono text-[10px] uppercase tracking-[0.18em] text-faint lg:flex">
            <span>
              <span ref={count} className="text-white">01</span> / {String(projects.length).padStart(2, "0")}
            </span>
            <span className="relative h-px flex-1 bg-white/10">
              <span ref={bar} className="absolute inset-0 origin-left scale-x-0 bg-white/60" />
            </span>
            <span>Scroll →</span>
          </div>
        </div>

        <div
          ref={track}
          className="container-x mt-12 flex flex-col gap-8 lg:mx-0 lg:mt-10 lg:w-max lg:max-w-none lg:flex-row lg:gap-10 lg:pl-[max(3rem,calc((100vw-1280px)/2+3rem))] lg:pr-12"
        >
          {projects.map((p) => (
            <div key={p.id} data-card className="lg:shrink-0">
              <ProjectCard p={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
