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
          <h1 className="text-[15px] text-ink-2">
            <span className="font-medium text-ink">{profile.name}</span>
            <span className="block">Software engineer, {profile.city}</span>
          </h1>

          <div className="py-4">
            <p className="font-display text-[clamp(2rem,3.4vw,2.9rem)] font-medium leading-[1.08] tracking-[-0.035em]">
              <span className="text-[#71717a]">Breaks things on purpose,</span> so they never break by accident.
            </p>
            <p className="mt-4 text-[16px] text-ink-2">Full-stack engineer. Also blinks LEDs and smashes shuttles.</p>
          </div>

          <div className="flex flex-wrap gap-2">
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
            <p className="text-[13px] text-ink-3">The tools that ship the bugs, and the fixes</p>
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
