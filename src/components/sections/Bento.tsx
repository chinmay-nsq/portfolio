"use client";

import { useState } from "react";
import { education, profile } from "@/data/portfolio";
import { Clock, LedBoard, Shuttle, Terminal } from "../ui/Toys";
import LocalTime from "../ui/LocalTime";
import TechLogo from "../ui/TechLogo";

const DRIVERS = [
  [
    "TypeScript",
    "JavaScript",
    "React",
    "Next.js",
    "React Native",
    "Redux",
    "Tailwind CSS",
    "Python",
    "Java",
  ],
  [
    "Node.js",
    "Express.js",
    "Spring Boot",
    "PostgreSQL",
    "MongoDB",
    "DynamoDB",
    "Redis",
    "AWS",
    "Docker",
    "Git / GitHub",
    "Postman",
    "Figma",
  ],
];

function GitHubMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px]"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .3a12 12 0 00-3.8 23.38c.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22v3.29c0 .32.21.7.82.58A12 12 0 0012 .3z" />
    </svg>
  );
}

function LinkedInMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px]"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M4.98 3.5a2.5 2.5 0 110 5 2.5 2.5 0 010-5zM3 9.75h4v11H3v-11zM9.5 9.75h3.8v1.5h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1v5.46h-4v-4.84c0-1.15-.02-2.64-1.6-2.64-1.62 0-1.86 1.26-1.86 2.56v4.92h-4v-11z" />
    </svg>
  );
}

function MailMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M4 7l8 6 8-6" />
    </svg>
  );
}

const at = (area: string, i: number) =>
  ({ gridArea: area, "--i": i }) as React.CSSProperties;

function Arrow() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
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
        <div
          data-reveal
          className="tile flex flex-col justify-between p-7 sm:p-9"
          style={at("intro", 0)}
        >
          <h1 className="text-[15px] text-ink-2">
            <span className="font-medium text-ink">{profile.name}</span>
            <span className="block">Software engineer, {profile.city}</span>
          </h1>

          <div className="py-4">
            <p className="font-display text-[clamp(2rem,3.4vw,2.9rem)] font-medium leading-[1.08] tracking-[-0.035em]">
              <span className="text-[#71717a]">
                Everything works. Then I think,
              </span>{" "}
              &quot;what if...?&quot; You know the rest.
            </p>

            <p className="mt-4 text-[16px] text-ink-2">
              This is why I can&apos;t have a boring weekend.
            </p>
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
        <div
          data-reveal
          className="tile flex flex-col justify-between bg-blue text-white"
          style={at("now", 2)}
        >
          <p className="text-[13px] font-medium text-white/75">Now building</p>
          <div>
            <p className="tile-big text-[clamp(1.4rem,5.6vw,2.4rem)]">
              GenieHire
            </p>
            <p className="mt-2 text-[14px] leading-snug text-white/80">
              An AI recruitment platform, at {profile.company}.
            </p>
          </div>
        </div>

        {/* backend */}
        <div
          data-reveal
          className="tile flex flex-col justify-between"
          style={at("uptime", 3)}
        >
          <p className="tile-label">Backend at heart</p>
          <div>
            <p className="whitespace-nowrap font-mono text-[11.5px] text-ink-2 sm:text-[13px]">
              <span className="font-medium text-blue">GET</span> /api/chinmay
            </p>
            <p className="tile-big mt-1 flex items-center gap-2 whitespace-nowrap text-[clamp(1.55rem,7vw,3rem)]">
              <span
                className="h-3 w-3 shrink-0 rounded-full bg-led"
                aria-hidden="true"
              />
              200 OK
            </p>
            <p className="mt-2 text-[14px] leading-snug">
              <span className="block text-ink">
                Reads error logs like novels.
              </span>
              {/* <span className="block text-ink-2">
                Can&apos;t unsee a 50ms delay.
              </span> */}
            </p>
          </div>
        </div>

        {/* esp32 */}
        <div data-reveal className="tile flex flex-col" style={at("esp", 4)}>
          <div className="min-h-0 flex-1">
            <LedBoard on={led} onToggle={() => setLed((v) => !v)} />
          </div>
          <p
            className="mt-2 flex min-h-[2.8em] items-start justify-center text-center text-[13px] leading-snug text-ink-2"
            aria-live="polite"
          >
            {led ? "It blinks. Hello, world." : "The ESP32. Tap the LED."}
          </p>
        </div>

        {/* terminal */}
        <div
          data-reveal
          className="tile bg-ink p-6 sm:p-7"
          style={at("term", 5)}
        >
          <Terminal />
        </div>

        {/* badminton */}
        <div
          data-reveal
          className="tile flex flex-col bg-sun"
          style={at("shuttle", 6)}
        >
          <div className="min-h-0 flex-1">
            <Shuttle onHit={() => setRally((r) => r + 1)} />
          </div>
          <p
            className="mt-2 flex min-h-[2.8em] items-start justify-center text-center text-[13px] font-medium leading-snug"
            aria-live="polite"
          >
            {rally === 0
              ? "Badminton. Tap to serve."
              : rally >= 10
                ? `Rally ${rally}. Okay, you win.`
                : `Rally ${rally}. Keep it going.`}
          </p>
        </div>

        {/* invoices */}
        <div
          data-reveal
          className="tile flex flex-col justify-between"
          style={at("invoice", 7)}
        >
          <p className="tile-label">Manual invoicing work</p>
          <div>
            <p className="tile-big text-[clamp(2.6rem,4vw,3.4rem)]">−80%</p>
            <p className="mt-2 text-[14px] leading-snug text-ink-2">
              Thanks to an invoice generator built at Aarya Global.
            </p>
          </div>
        </div>

        {/* daily drivers */}
        <div
          data-reveal
          className="tile drift-wrap flex flex-col !px-0"
          style={at("stack", 8)}
        >
          <div className="flex items-baseline justify-between gap-4 px-6">
            <p className="tile-label">Daily drivers</p>
            <p className="text-[13px] text-ink-3">
              The tools that ship the bugs, and the fixes
            </p>
          </div>
          <div className="flex flex-1 flex-col justify-center gap-2 pt-4 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
            {DRIVERS.map((row, r) => (
              <div key={r} className="overflow-hidden">
                <ul
                  className={`drift flex w-max ${r % 2 ? "drift-reverse" : ""}`}
                >
                  {[...row, ...row].map((name, i) => (
                    <li
                      key={i}
                      className="pr-2"
                      aria-hidden={i >= row.length || undefined}
                    >
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
        <a
          href="#story"
          data-reveal
          className="tile press group flex flex-col justify-between"
          style={at("edu", 9)}
        >
          <p className="tile-label">Studied</p>
          <div>
            <p className="font-display text-[22px] font-semibold leading-tight tracking-[-0.02em]">
              B.Tech, Computer Science
            </p>
            <p className="mt-1 text-[14px] text-ink-2">
              Solapur · {degree.period.match(/\d{4}$/)?.[0]} ·{" "}
              {degree.note.replace(" / 10", "")}
            </p>
            <p className="mt-3 inline-flex items-center gap-1 text-[14px] font-medium text-blue">
              The whole story
              <svg
                viewBox="0 0 16 16"
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M8 3v10M4 9l4 4 4-4" />
              </svg>
            </p>
          </div>
        </a>

        {/* social */}
        <div
          data-reveal
          className="tile flex flex-col justify-between !p-3"
          style={at("social", 10)}
        >
          <p className="tile-label px-3 pt-2">Find me elsewhere</p>
          <ul className="space-y-0.5">
            {[
              {
                label: "GitHub",
                handle: "@ChinmayLale",
                href: profile.github,
                icon: <GitHubMark />,
                tone: "bg-ink text-white",
              },
              {
                label: "LinkedIn",
                handle: "in/ChinmayLale",
                href: profile.linkedin,
                icon: <LinkedInMark />,
                tone: "bg-blue text-white",
              },
              {
                label: "Email",
                handle: "the fastest way",
                href: `mailto:${profile.email}`,
                icon: <MailMark />,
                tone: "bg-sun text-ink",
              },
            ].map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group flex items-center gap-3 rounded-2xl p-1.5 transition-colors duration-150 hover:bg-page"
                >
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${l.tone}`}
                  >
                    {l.icon}
                  </span>
                  <span className="min-w-0 flex-1 leading-tight">
                    <span className="block font-medium">{l.label}</span>
                    <span className="block truncate text-[13px] text-ink-2">
                      {l.handle}
                    </span>
                  </span>
                  <span className="mr-1 text-ink-3 transition-[translate,color] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink">
                    <Arrow />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
