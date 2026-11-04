"use client";

import { useEffect, useRef, useState } from "react";

const reduceMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ───────────── Clock: analog, always on Pune time ───────────── */

function istParts(d: Date) {
  const [h, m, s] = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })
    .format(d)
    .split(":")
    .map(Number);
  return { h, m, s };
}

export function Clock() {
  // starts at 10:10 (the watch-ad pose) until the real time arrives on the client
  const [t, setT] = useState({ h: 10, m: 10, s: 0 });

  useEffect(() => {
    const tick = () => setT(istParts(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const hour = ((t.h % 12) + t.m / 60) * 30;
  const minute = (t.m + t.s / 60) * 6;
  const second = t.s * 6;

  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" role="img" aria-label={`Pune time ${String(t.h).padStart(2, "0")}:${String(t.m).padStart(2, "0")}`}>
      <circle cx="50" cy="50" r="47" fill="#f4f4f5" />
      {Array.from({ length: 12 }, (_, i) => (
        <line key={i} x1="50" y1={i % 3 === 0 ? 8 : 9.5} x2="50" y2={i % 3 === 0 ? 15 : 13} stroke="#18181b" strokeWidth={i % 3 === 0 ? 2.2 : 1.2} strokeLinecap="round" transform={`rotate(${i * 30} 50 50)`} />
      ))}
      <line x1="50" y1="50" x2="50" y2="27" stroke="#18181b" strokeWidth="3.4" strokeLinecap="round" transform={`rotate(${hour} 50 50)`} />
      <line x1="50" y1="50" x2="50" y2="17" stroke="#18181b" strokeWidth="2.2" strokeLinecap="round" transform={`rotate(${minute} 50 50)`} />
      <g transform={`rotate(${second} 50 50)`} style={{ transition: t.s === 0 ? "none" : "transform 200ms cubic-bezier(0.23, 1, 0.32, 1)" }}>
        <line x1="50" y1="58" x2="50" y2="14" stroke="#2453e6" strokeWidth="1" strokeLinecap="round" />
      </g>
      <circle cx="50" cy="50" r="2.6" fill="#2453e6" />
    </svg>
  );
}

/* ───────────── Terminal: tap it and it installs something ───────────── */

const SESSIONS = [
  ["npm i -g new-thing", "added 1 package. now what?"],
  ["git clone cool-repo", "cloned. skimming the README."],
  ["docker run why-not", "running. no idea why yet."],
  ["apt install curiosity", "already the newest version."],
];

export function Terminal() {
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
        window.setTimeout(() => setDone(true), 240);
      }
    }, 40);
  };

  return (
    <button type="button" onClick={run} className="press flex h-full w-full flex-col text-left" aria-label="Terminal: install something">
      <span className="flex items-center gap-1.5" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="ml-3 font-mono text-[12px] text-white/40">~/side-quests</span>
      </span>
      <span className="mt-5 block flex-1 font-mono text-[13px] leading-[1.7] text-white/90 sm:text-[14px]" aria-live="polite">
        {n < 0 ? (
          <span className="text-white/45"># tap to install something</span>
        ) : (
          <>
            <span className="block">
              <span className="text-sun">$</span> {typed}
            </span>
            {done && <span className="block text-white/45">{SESSIONS[n][1]}</span>}
          </>
        )}
        <span className="inline-block h-[1.1em] w-[0.55em] translate-y-[3px] animate-pulse bg-white/80" aria-hidden="true" />
      </span>
      <span className="text-[14px] text-white/55">Side quest: installing things just to see what they do.</span>
    </button>
  );
}

/* ───────────── ESP32: the LED you can switch on ───────────── */

export function LedBoard({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button type="button" onClick={onToggle} aria-pressed={on} aria-label="ESP32: switch the LED" className="press grid h-full w-full place-items-center">
      <svg viewBox="0 0 120 150" className="h-full w-auto" fill="none" stroke="#18181b" strokeWidth="1.6" strokeLinejoin="round">
        <rect x="18" y="8" width="84" height="134" rx="7" fill="#fff" />
        {Array.from({ length: 15 }, (_, i) => (
          <g key={i}>
            <circle cx="25" cy={22 + i * 8} r="1.7" />
            <circle cx="95" cy={22 + i * 8} r="1.7" />
          </g>
        ))}
        <rect x="36" y="14" width="48" height="60" rx="3" fill="#f4f4f5" />
        <path d="M42 22h6v-4h6v4h6v-4h6v4h6v-4h4" strokeWidth="1.3" />
        <text x="60" y="56" textAnchor="middle" stroke="none" fill="#18181b" fontSize="10" fontFamily="var(--font-geist-mono), monospace" fontWeight="600">
          ESP32
        </text>
        <rect x="38" y="112" width="10" height="7" rx="1.5" />
        <rect x="72" y="112" width="10" height="7" rx="1.5" />
        <rect x="50" y="134" width="20" height="10" rx="2" fill="#fff" />
        <circle
          cx="60"
          cy="96"
          r="5.5"
          fill={on ? "#22c55e" : "#fff"}
          stroke={on ? "#15803d" : "#18181b"}
          style={{ filter: on ? "drop-shadow(0 0 6px rgba(34,197,94,.95)) drop-shadow(0 0 16px rgba(34,197,94,.6))" : "none", transition: "fill 120ms, filter 200ms" }}
        />
      </svg>
    </button>
  );
}

/* ───────────── Shuttlecock: keep the rally going ───────────── */

export function Shuttle({ onHit }: { onHit: () => void }) {
  const ref = useRef<SVGSVGElement>(null);

  const hit = () => {
    onHit();
    const el = ref.current;
    if (!el || reduceMotion()) return;
    el.animate(
      [
        { transform: "translateY(0) rotate(0deg)", easing: "cubic-bezier(0.23, 1, 0.32, 1)" },
        { transform: "translateY(-40px) rotate(-16deg)", offset: 0.45, easing: "cubic-bezier(0.55, 0, 1, 0.45)" },
        { transform: "translateY(0) rotate(0deg)" },
      ],
      { duration: 620 },
    );
  };

  return (
    <button type="button" onClick={hit} aria-label="Shuttlecock: hit it" className="press grid h-full w-full place-items-center">
      <svg ref={ref} viewBox="0 0 80 110" className="h-full max-h-[130px] w-auto" fill="none" stroke="#18181b" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
        <path d="M12 10 L30 74 H50 L68 10" fill="#fff" />
        <path d="M12 10 Q40 2 68 10" />
        <path d="M24 8 L35 74 M40 6 V74 M56 8 L45 74" strokeWidth="1.2" />
        <path d="M18 34 Q40 28 62 34 M22 52 Q40 47 58 52" strokeWidth="1.2" />
        <rect x="28" y="74" width="24" height="7" rx="1.5" fill="#18181b" />
        <path d="M28 81 V88 a12 12 0 0 0 24 0 V81" fill="#fff" />
      </svg>
    </button>
  );
}
