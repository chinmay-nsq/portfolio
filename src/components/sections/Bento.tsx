"use client";

import { useState } from "react";
import { education, profile } from "@/data/portfolio";
import { Clock, LedBoard, Shuttle, Terminal } from "../ui/Toys";
import LocalTime from "../ui/LocalTime";
import TechLogo from "../ui/TechLogo";

const DRIVERS = [
  ["TypeScript", "JavaScript", "React", "Next.js", "React Native", "Redux", "Tailwind CSS", "Python", "Java"],
  ["Node.js", "Express.js", "Spring Boot", "PostgreSQL", "MongoDB", "DynamoDB", "Redis", "AWS", "Docker", "Git / GitHub", "Postman", "Figma"],
];

type PillTone = "blue" | "sun" | "ink" | "soft";
const PILL: Record<PillTone, string> = {
  blue: "bg-blue text-white",
  sun: "bg-sun text-ink",
  ink: "bg-ink text-white",
  soft: "bg-page text-ink",
};

/** A small coloured token that sits inside a sentence, with an optional icon. */
function Pill({ tone, icon, children }: { tone: PillTone; icon?: string; children: React.ReactNode }) {
  return (
    <span className={`mx-[0.08em] inline-flex items-center gap-[0.28em] whitespace-nowrap rounded-full px-[0.48em] py-[0.04em] align-[0.06em] text-[0.8em] font-medium leading-[1.3] tracking-normal ${PILL[tone]}`}>
      {icon && (
        <svg viewBox="0 0 16 16" className="h-[0.9em] w-[0.9em]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d={icon} />
        </svg>
      )}
      {children}
    </span>
  );
}

const ICON = {
  people: "M6 7a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM1.5 13.5c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4M11 2.2a2.5 2.5 0 010 4.6M12.5 9.6c1.3.5 2 1.8 2 3.9",
  spark: "M8 1.5v3M8 11.5v3M1.5 8h3M11.5 8h3M3.4 3.4l2 2M10.6 10.6l2 2M3.4 12.6l2-2M10.6 5.4l2-2",
  chip: "M4.5 4.5h7v7h-7zM6.5 2v2.5M9.5 2v2.5M6.5 11.5V14M9.5 11.5V14M2 6.5h2.5M2 9.5h2.5M11.5 6.5H14M11.5 9.5H14",
};

const at = (area: string, i: number) => ({ gridArea: area, "--i": i }) as React.CSSProperties;

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4.5 11.5l7-7M5.5 4.5h6v6" />
    </svg>
  );
}

export default function Bento() {
  const [led, setLed] = useState(false);
  const [rally, setRally] = useState(0);
  const degree = education[0];

  return (
    <section id="top" className="shell pt-4">
      <div className="bento">
        {/* intro */}
        <div data-reveal className="tile flex flex-col justify-between p-7 sm:p-9" style={at("intro", 0)}>
          <div>
            <h1 className="text-[15px] text-ink-2">
              <span className="font-medium text-ink">{profile.name}</span> · <span className="whitespace-nowrap">Full-stack engineer</span>, {profile.city}
            </h1>
            <p className="mt-5 font-display text-[clamp(1.55rem,2.5vw,2.1rem)] font-medium leading-[1.25] tracking-[-0.025em] text-[#71717a]">
              Writes the <span className="text-ink">kind of software you never notice</span>, because it simply works
              for the{" "}
              <Pill tone="sun" icon={ICON.people}>
                5,000+ people
              </Pill>{" "}
              using it every day.
            </p>
            <p className="mt-4 max-w-[52ch] text-[15px] leading-[1.9] text-ink-2">
              Now building{" "}
              <Pill tone="blue" icon={ICON.spark}>
                GenieHire
              </Pill>{" "}
              at {profile.company}. After hours: an{" "}
              <span className="whitespace-nowrap">
                <Pill tone="soft" icon={ICON.chip}>
                  ESP32
                </Pill>
                ,
              </span>{" "}
              a badminton racket and a very experimental laptop.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <a href={`mailto:${profile.email}`} className="btn btn-ink">
              Email me
            </a>
            <a href="#work" className="btn btn-soft">
              See the work
            </a>
          </div>
        </div>

        {/* clock */}
        <div data-reveal className="tile flex flex-col" style={at("clock", 1)}>
          <div className="mx-auto aspect-square h-0 flex-1 min-h-[96px]">
            <Clock />
          </div>
          <LocalTime className="mt-3 text-[13px] leading-snug text-ink-2" />
        </div>

        {/* now */}
        <div data-reveal className="tile flex flex-col justify-between bg-blue text-white" style={at("now", 2)}>
          <p className="text-[13px] font-medium text-white/75">Now building</p>
          <div>
            <p className="tile-big text-[clamp(1.9rem,3vw,2.4rem)]">GenieHire</p>
            <p className="mt-2 text-[14px] leading-snug text-white/80">An AI recruitment platform, at {profile.company}.</p>
          </div>
        </div>

        {/* apis */}
        <div data-reveal className="tile flex flex-col justify-between" style={at("uptime", 3)}>
          <p className="tile-label">APIs shipped</p>
          <div>
            <p className="tile-big text-[clamp(2.6rem,4vw,3.4rem)]">25+</p>
            <p className="mt-2 text-[14px] leading-snug text-ink-2">REST APIs, designed and shipped. Node.js and TypeScript, mostly.</p>
          </div>
        </div>

        {/* esp32 */}
        <div data-reveal className="tile flex flex-col" style={at("esp", 4)}>
          <div className="min-h-0 flex-1">
            <LedBoard on={led} onToggle={() => setLed((v) => !v)} />
          </div>
          <p className="mt-2 text-center text-[13px] text-ink-2" aria-live="polite">
            {led ? "It blinks. Hello, world." : "The ESP32. Tap the LED."}
          </p>
        </div>

        {/* terminal */}
        <div data-reveal className="tile bg-ink p-6 sm:p-7" style={at("term", 5)}>
          <Terminal />
        </div>

        {/* badminton */}
        <div data-reveal className="tile flex flex-col bg-sun" style={at("shuttle", 6)}>
          <div className="min-h-0 flex-1">
            <Shuttle onHit={() => setRally((r) => r + 1)} />
          </div>
          <p className="mt-2 text-center text-[13px] font-medium" aria-live="polite">
            {rally === 0 ? "Badminton. Tap to serve." : rally >= 10 ? `Rally ${rally}. Okay, you win.` : `Rally ${rally}. Keep it going.`}
          </p>
        </div>

        {/* invoices */}
        <div data-reveal className="tile flex flex-col justify-between" style={at("invoice", 7)}>
          <p className="tile-label">Manual invoicing work</p>
          <div>
            <p className="tile-big text-[clamp(2.6rem,4vw,3.4rem)]">−80%</p>
            <p className="mt-2 text-[14px] leading-snug text-ink-2">Thanks to an invoice generator built at Aarya Global.</p>
          </div>
        </div>

        {/* daily drivers */}
        <div data-reveal className="tile drift-wrap flex flex-col !px-0" style={at("stack", 8)}>
          <div className="flex items-baseline justify-between gap-4 px-6">
            <p className="tile-label">Daily drivers</p>
            <p className="text-[13px] text-ink-3">The tools that pay the rent</p>
          </div>
          <div className="flex flex-1 flex-col justify-center gap-2 pt-4 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
            {DRIVERS.map((row, r) => (
              <div key={r} className="overflow-hidden">
                <ul className={`drift flex w-max ${r % 2 ? "drift-reverse" : ""}`}>
                  {[...row, ...row].map((name, i) => (
                    <li key={i} className="pr-2" aria-hidden={i >= row.length || undefined}>
                      <span className="chip gap-2 !h-10 !px-3.5 !text-[15px]">
                        <TechLogo name={name} className="h-4 w-4" />
                        {name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* education */}
        <a href="#story" data-reveal className="tile press group flex flex-col justify-between" style={at("edu", 9)}>
          <p className="tile-label">Studied</p>
          <div>
            <p className="font-display text-[22px] font-semibold leading-tight tracking-[-0.02em]">B.Tech, Computer Science</p>
            <p className="mt-1 text-[14px] text-ink-2">
              Solapur · {degree.period.match(/\d{4}$/)?.[0]} · {degree.note.replace(" / 10", "")}
            </p>
            <p className="mt-3 inline-flex items-center gap-1 text-[14px] font-medium text-blue">
              The whole story
              <svg viewBox="0 0 16 16" className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M8 3v10M4 9l4 4 4-4" />
              </svg>
            </p>
          </div>
        </a>

        {/* social */}
        <div data-reveal className="tile flex flex-col justify-between" style={at("social", 10)}>
          <p className="tile-label">Elsewhere</p>
          <ul className="space-y-1">
            {[
              { label: "LinkedIn", href: profile.linkedin },
              { label: "GitHub", href: profile.github },
            ].map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-xl px-3 py-2.5 font-medium transition-colors hover:bg-page"
                >
                  {l.label}
                  <Arrow />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
