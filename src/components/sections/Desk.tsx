"use client";

import { useEffect, useRef, useState } from "react";

const reduceMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ───────────── Laptop: tap it and it installs something ───────────── */

const SESSIONS = [
  ["$ npm i -g new-thing", "added 1 package. now what?"],
  ["$ git clone cool-repo", "cloned. skimming the README."],
  ["$ docker run why-not", "running. no idea why yet."],
  ["$ apt install curiosity", "already the newest version."],
];

function Laptop() {
  const [n, setN] = useState(-1);
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearInterval(timer.current), []);

  const run = () => {
    const next = (n + 1) % SESSIONS.length;
    const [cmd] = SESSIONS[next];
    window.clearInterval(timer.current);
    setN(next);
    setDone(false);
    if (reduceMotion()) {
      setTyped(cmd);
      setDone(true);
      return;
    }
    let i = 0;
    setTyped("");
    timer.current = window.setInterval(() => {
      i += 1;
      setTyped(cmd.slice(0, i));
      if (i >= cmd.length) {
        window.clearInterval(timer.current);
        window.setTimeout(() => setDone(true), 260);
      }
    }, 38);
  };

  return (
    <button type="button" onClick={run} aria-label="Laptop: install something" className="press flex h-full w-full flex-col items-center justify-center">
      <span className="block w-[84%] rounded-t-[10px] border-[1.5px] border-ink bg-paper p-[6px]">
        <span className="block aspect-[16/10] overflow-hidden rounded-[4px] bg-ink px-2.5 py-2 text-left font-mono text-[11px] leading-[1.5] text-[#e9e9e7] sm:text-[12px]">
          {n < 0 ? (
            <span className="text-[#8c8c8a]">tap to install something</span>
          ) : (
            <>
              <span className="block whitespace-pre-wrap">{typed}</span>
              {done ? <span className="block text-[#8c8c8a]">{SESSIONS[n][1]}</span> : null}
            </>
          )}
          <span className="inline-block h-[1.1em] w-[0.55em] translate-y-[2px] animate-pulse bg-[#e9e9e7]" aria-hidden="true" />
        </span>
      </span>
      <span className="block h-[7px] w-[92%] rounded-b-[6px] border-[1.5px] border-ink bg-paper" />
    </button>
  );
}

/* ───────────── ESP32: the LED you can switch on ───────────── */

function Esp32({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button type="button" onClick={onToggle} aria-pressed={on} aria-label="ESP32: switch the LED" className="press grid h-full w-full place-items-center">
      <svg viewBox="0 0 120 150" className="h-[78%] w-auto overflow-visible" fill="none" stroke="#171717" strokeWidth="1.5" strokeLinejoin="round">
        {/* board */}
        <rect x="18" y="8" width="84" height="134" rx="6" fill="#fcfcfc" />
        {/* pins down both sides */}
        {Array.from({ length: 15 }, (_, i) => (
          <g key={i}>
            <circle cx="25" cy={22 + i * 8} r="1.6" />
            <circle cx="95" cy={22 + i * 8} r="1.6" />
          </g>
        ))}
        {/* the shielded module with its antenna */}
        <rect x="36" y="14" width="48" height="60" rx="2" fill="#f3f3f2" />
        <path d="M42 22h6v-4h6v4h6v-4h6v4h6v-4h4" strokeWidth="1.2" />
        <text x="60" y="56" textAnchor="middle" stroke="none" fill="#171717" fontSize="9" fontFamily="var(--font-geist-mono), monospace" fontWeight="500">
          ESP32
        </text>
        {/* BOOT / EN buttons */}
        <rect x="38" y="112" width="10" height="7" rx="1.5" />
        <rect x="72" y="112" width="10" height="7" rx="1.5" />
        {/* USB port */}
        <rect x="50" y="134" width="20" height="10" rx="2" fill="#fcfcfc" />
        {/* the LED */}
        <circle
          cx="60"
          cy="96"
          r="5"
          fill={on ? "#22c55e" : "#fcfcfc"}
          stroke={on ? "#15803d" : "#171717"}
          style={{ filter: on ? "drop-shadow(0 0 6px rgba(34,197,94,.9)) drop-shadow(0 0 14px rgba(34,197,94,.55))" : "none", transition: "fill 120ms, filter 200ms" }}
        />
        <text x="60" y="86" textAnchor="middle" stroke="none" fill="#6b6b6b" fontSize="6" fontFamily="var(--font-geist-mono), monospace">
          GPIO2
        </text>
      </svg>
    </button>
  );
}

/* ───────────── Shuttlecock: keep the rally going ───────────── */

function Shuttle({ onHit }: { onHit: () => void }) {
  const ref = useRef<SVGSVGElement>(null);

  const hit = () => {
    onHit();
    const el = ref.current;
    if (!el || reduceMotion()) return;
    el.animate(
      [
        { transform: "translateY(0) rotate(0deg)", easing: "cubic-bezier(0.23, 1, 0.32, 1)" },
        { transform: "translateY(-46px) rotate(-14deg)", offset: 0.45, easing: "cubic-bezier(0.55, 0, 1, 0.45)" },
        { transform: "translateY(0) rotate(0deg)" },
      ],
      { duration: 620 },
    );
  };

  return (
    <button type="button" onClick={hit} aria-label="Shuttlecock: hit it" className="press grid h-full w-full place-items-center">
      <svg ref={ref} viewBox="0 0 80 110" className="h-[70%] w-auto" fill="none" stroke="#171717" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round">
        {/* feather skirt */}
        <path d="M12 10 L30 74 H50 L68 10" fill="#fcfcfc" />
        <path d="M12 10 Q40 2 68 10" />
        <path d="M24 8 L35 74 M40 6 V74 M56 8 L45 74" strokeWidth="1.1" />
        <path d="M18 34 Q40 28 62 34 M22 52 Q40 47 58 52" strokeWidth="1.1" />
        {/* band and cork */}
        <rect x="28" y="74" width="24" height="7" rx="1.5" fill="#f3f3f2" />
        <path d="M28 81 V88 a12 12 0 0 0 24 0 V81" fill="#fcfcfc" />
      </svg>
    </button>
  );
}

/* ───────────── The desk ───────────── */

export default function Desk() {
  const [led, setLed] = useState(false);
  const [rally, setRally] = useState(0);

  const items = [
    {
      key: "laptop",
      object: <Laptop />,
      title: "Laptop",
      text: "Every now and then I install something new on it just to see what it does. Tap it.",
    },
    {
      key: "esp32",
      object: <Esp32 on={led} onToggle={() => setLed((v) => !v)} />,
      title: "ESP32",
      text: led ? "There it is. Every ESP32 project starts exactly like this." : "My hardware side quest. Tap the LED.",
    },
    {
      key: "shuttle",
      object: <Shuttle onHit={() => setRally((r) => r + 1)} />,
      title: "Badminton",
      text: rally === 0 ? "How I get away from screens. Tap to serve." : `Rally: ${rally}. ${rally >= 10 ? "Okay, you win." : "Keep it going."}`,
    },
  ];

  return (
    <ul className="grid gap-3 sm:grid-cols-3">
      {items.map((it) => (
        <li key={it.key}>
          <div className="aspect-[4/3.4] rounded-2xl bg-surface p-4 sm:aspect-[4/4.2]">{it.object}</div>
          <p className="mt-3 font-medium">{it.title}</p>
          <p className="text-ink-2" aria-live="polite">
            {it.text}
          </p>
        </li>
      ))}
    </ul>
  );
}
