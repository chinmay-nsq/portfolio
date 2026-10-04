"use client";

import { useRef } from "react";
import { achievements, education, type Achievement } from "@/data/portfolio";
import SectionHeading from "../ui/SectionHeading";
import Panel from "../ui/Panel";
import Counter from "../ui/Counter";
import DepthWord from "../ui/DepthWord";
import TechLogo from "../ui/TechLogo";
import { useReveal } from "../ui/useReveal";

const icons: Record<Achievement["icon"], string> = {
  code: "M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14",
  trophy: "M8 4h8v5a4 4 0 01-8 0V4zM8 6H5a3 3 0 003 4M16 6h3a3 3 0 01-3 4M12 13v4M8.5 20h7M10 17h4",
  flag: "M5 21V4M5 4h11l-2 4 2 4H5",
  cloud: "M7 18a4 4 0 01-.6-7.95A5.5 5.5 0 0117 9.5a4.25 4.25 0 01.5 8.5H7z",
};

function Icon({ icon, logo }: { icon: Achievement["icon"]; logo?: string }) {
  if (logo) {
    return (
      <span className="grid h-10 w-10 place-items-center rounded-md border border-white/12 text-ink">
        <TechLogo file={logo} className="h-5 w-5" />
      </span>
    );
  }
  return (
    <span className="grid h-10 w-10 place-items-center rounded-md border border-white/12 text-ink">
      <svg
        viewBox="0 0 24 24"
        className="h-[18px] w-[18px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d={icons[icon]} />
      </svg>
    </span>
  );
}

export default function Achievements() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section id="achievements" ref={root} className="relative py-28 sm:py-36">
      <div className="container-x">
        <SectionHeading index="06" label="Recognition" title="Achievements" muted="& education." />

        <DepthWord word="Milestones" className="mt-14" maxSize={300} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {achievements.map((a, i) => (
            <div key={a.title} data-reveal data-reveal-delay={i * 0.07}>
              <Panel className="depth-card tech-group flex h-full flex-col p-6">
                <div className="flex items-start justify-between">
                  <Icon icon={a.icon} logo={a.logo} />
                  <span className="font-mono text-[10px] tracking-[0.16em] text-faint">0{i + 1}</span>
                </div>
                <div className="mt-10 font-display text-5xl font-medium leading-none tracking-[-0.025em] text-white tabular-nums">
                  {a.count !== undefined ? <Counter value={a.count} suffix={a.suffix} /> : a.value}
                </div>
                <h3 className="mt-4 text-[15px] font-medium text-white">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-dim">{a.text}</p>
              </Panel>
            </div>
          ))}
        </div>

        {/* Education */}
        <div className="mt-28 grid gap-10 lg:grid-cols-12 lg:gap-20">
          <div data-reveal className="lg:col-span-4">
            <p className="eyebrow">Education</p>
            <h3 className="mt-5 font-display text-3xl font-medium leading-tight tracking-[-0.022em] text-white sm:text-4xl">
              Where the training <span className="text-faint">began.</span>
            </h3>
          </div>
          <ol className="space-y-4 lg:col-span-8">
            {education.map((e, i) => (
              <li key={e.school} data-reveal data-reveal-delay={i * 0.08} className="panel p-6 sm:p-7">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h4 className="font-display text-xl font-medium tracking-tight text-white sm:text-2xl">{e.school}</h4>
                    <p className="mt-1 text-sm text-hud">{e.degree}</p>
                  </div>
                  <div className="text-right font-mono text-[11px] uppercase tracking-[0.14em] text-dim">
                    <div>{e.period}</div>
                    <div className="mt-1 text-faint">{e.place}</div>
                  </div>
                </div>
                {e.note && (
                  <p className="mt-4 inline-block rounded-[3px] border border-white/12 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-ink">
                    {e.note}
                  </p>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
