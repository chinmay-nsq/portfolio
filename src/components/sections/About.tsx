"use client";

import { useRef } from "react";
import Image from "next/image";
import { profile, stats } from "@/data/portfolio";
import { JetMark } from "../Jet";
import SectionHeading from "../ui/SectionHeading";
import Panel from "../ui/Panel";
import Counter from "../ui/Counter";
import { useReveal } from "../ui/useReveal";

const dossier = [
  ["Name", profile.name],
  ["Role", profile.role],
  ["Company", profile.company],
  ["Location", profile.location],
  ["Education", "B.Tech, Computer Science"],
  ["Focus", "GenieHire · AI recruitment"],
];

/** Line icon: a planet with its orbit. */
function OrbitIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12 text-ink" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
      <circle cx="32" cy="32" r="10" />
      <ellipse cx="32" cy="32" rx="26" ry="9" transform="rotate(-22 32 32)" strokeOpacity=".6" />
      <circle cx="53" cy="22" r="1.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

const passions = [
  {
    title: "Looking up",
    kicker: "Astronomy & space",
    text: "Planets, nebulae, deep-sky photographs — the universe is the largest system there is, and I never tire of studying it.",
    visual: <OrbitIcon />,
  },
  {
    title: "Speed with precision",
    kicker: "Fighter jets & aerospace",
    text: "Afterburners, airshows, engineering under extreme load. The same mindset I bring to production code: fast, never careless.",
    visual: (
      <div className="w-6 rotate-[24deg] text-ink">
        <JetMark flame={false} />
      </div>
    ),
  },
];

export default function About() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section id="about" ref={root} className="relative py-28 sm:py-36">
      <div className="container-x">
        <SectionHeading index="01" label="About" title="Engineer on the ground," muted="dreamer in orbit." />

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-20">
          {/* Profile card */}
          <div data-reveal className="lg:col-span-5">
            <Panel className="p-6 sm:p-7">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em]">
                <span className="text-dim">Profile</span>
                <span className="flex items-center gap-2 text-dim">
                  <span className="blink-slow h-1.5 w-1.5 rounded-full bg-mint" /> Active
                </span>
              </div>

              <div className="relative mt-5 aspect-[5/4] overflow-hidden rounded-[3px] border border-white/10 bg-black/30">
                {profile.photo ? (
                  <Image src={profile.photo} alt={profile.name} fill sizes="(min-width:1024px) 40vw, 90vw" className="object-cover" />
                ) : (
                  <>
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(255,255,255,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.045) 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                      }}
                    />
                    <svg viewBox="-100 -100 200 200" className="absolute inset-0 m-auto h-[86%]" fill="none" stroke="rgba(255,255,255,.14)">
                      <circle r="90" strokeDasharray="1.5 5" />
                      <circle r="62" />
                      <path d="M-100 0H-72M72 0H100M0 -100V-72M0 72V100" />
                    </svg>
                    <span className="absolute inset-0 grid place-items-center font-display text-[clamp(4.5rem,11vw,7rem)] font-semibold leading-none tracking-tighter text-white/90">
                      CL
                    </span>
                  </>
                )}
                <span
                  className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-transparent via-white/[0.06] to-transparent"
                  style={{ animation: "scan 5s linear infinite" }}
                />
              </div>

              <dl className="mt-5 divide-y divide-white/[0.07] text-sm">
                {dossier.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-6 py-2.5">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">{k}</dt>
                    <dd className="text-right text-ink/90">{v}</dd>
                  </div>
                ))}
              </dl>
            </Panel>
          </div>

          {/* Story */}
          <div className="lg:col-span-7">
            <p data-reveal className="font-display text-2xl leading-[1.4] text-ink sm:text-[1.7rem]">
              I&apos;m a full-stack engineer who loves hard problems and clean systems. Over the last
              couple of years I&apos;ve shipped a React Native app used by{" "}
              <span className="text-white">5,000+ people every day</span>, designed APIs on Node.js
              and Spring Boot, and kept production at <span className="text-white">99.9% uptime</span>{" "}
              on AWS.
            </p>
            <p data-reveal className="mt-6 max-w-2xl text-base leading-relaxed text-dim sm:text-lg">
              Today I&apos;m a Software Engineer at {profile.company}, building GenieHire — an AI
              recruitment platform. I care about the details that make software feel fast: sensible
              data models, tight feedback loops, and interfaces that respond the instant you touch
              them.
            </p>

            <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
              {stats.map((s, i) => (
                <div key={s.label} data-reveal data-reveal-delay={i * 0.07} className="border-t border-white/15 pt-4">
                  <div className="font-display text-4xl font-medium tracking-tight text-white tabular-nums sm:text-[2.6rem]">
                    <Counter value={s.value} suffix={s.suffix} decimals={s.decimals} />
                  </div>
                  <div className="mt-2 text-[13px] leading-snug text-dim">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Beyond the code */}
        <div className="mt-28">
          <p data-reveal className="eyebrow">
            Beyond the code
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {passions.map((p, i) => (
              <div key={p.title} data-reveal data-reveal-delay={i * 0.08}>
                <Panel className="flex h-full items-start gap-6 p-6 sm:p-8">
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-md border border-white/10 bg-white/[0.02]">
                    {p.visual}
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">{p.kicker}</p>
                    <h3 className="mt-2 font-display text-2xl font-medium tracking-tight text-white">{p.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-dim">{p.text}</p>
                  </div>
                </Panel>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
