"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { fx } from "@/lib/fx";
import { useIntro } from "./IntroContext";

/** Scrolling the page is an ascent: runway → atmosphere → Kármán line → low Earth orbit. */
const PHASES = [
  { km: 0, label: "RUNWAY" },
  { km: 1, label: "TROPOSPHERE" },
  { km: 12, label: "STRATOSPHERE" },
  { km: 50, label: "MESOSPHERE" },
  { km: 85, label: "THERMOSPHERE" },
  { km: 100, label: "SPACE" },
  { km: 380, label: "LOW EARTH ORBIT" },
];

const MAX_KM = 408; // roughly the ISS orbit

export default function HudTelemetry() {
  const revealed = useIntro();
  const altRef = useRef<HTMLSpanElement>(null);
  const machRef = useRef<HTMLSpanElement>(null);
  const phaseRef = useRef<HTMLSpanElement>(null);
  const markerRef = useRef<HTMLSpanElement>(null);
  const toastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const alt = altRef.current;
    const mach = machRef.current;
    const phase = phaseRef.current;
    const marker = markerRef.current;
    const toast = toastRef.current;
    if (!alt || !mach || !phase || !marker || !toast) return;

    let p = 0;
    let m = 0;
    let crossedKarman = false;
    let inOrbit = false;
    let lastPhase = "";

    const announce = (text: string) => {
      toast.textContent = text;
      gsap.fromTo(
        toast,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", overwrite: true },
      );
      gsap.to(toast, { opacity: 0, y: -8, duration: 0.6, delay: 3, overwrite: "auto" });
    };

    const tick = () => {
      p += (fx.progress - p) * 0.08;
      const km = MAX_KM * p * p;
      alt.textContent = km.toFixed(1).padStart(5, "0");
      marker.style.bottom = `${p * 100}%`;

      m += (Math.min(9.9, Math.abs(fx.velocity) * 0.05) - m) * 0.1;
      mach.textContent = m.toFixed(2);

      let label = PHASES[0].label;
      for (const ph of PHASES) if (km >= ph.km) label = ph.label;
      if (label !== lastPhase) {
        lastPhase = label;
        phase.textContent = label;
      }

      if (!crossedKarman && km >= 100) {
        crossedKarman = true;
        announce("KÁRMÁN LINE CROSSED — WELCOME TO SPACE");
      } else if (crossedKarman && km < 92) crossedKarman = false;

      if (!inOrbit && km >= 395) {
        inOrbit = true;
        announce("ORBIT ACHIEVED");
      } else if (inOrbit && km < 380) inOrbit = false;
    };

    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  return (
    <>
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed bottom-6 left-6 z-40 hidden items-stretch gap-4 rounded-md border border-white/[0.08] bg-void/70 px-4 py-3 font-mono text-[10px] tracking-[0.14em] backdrop-blur-md transition-opacity duration-1000 xl:flex ${revealed ? "opacity-100" : "opacity-0"}`}
      >
        {/* Altitude gauge */}
        <div className="relative w-2">
          <div className="absolute inset-y-0 left-0 w-px bg-white/20" />
          <div
            className="absolute inset-y-0 left-0 w-1.5"
            style={{
              backgroundImage:
                "repeating-linear-gradient(180deg, rgba(236,236,241,.4) 0 1px, transparent 1px 9px)",
            }}
          />
          <span ref={markerRef} className="absolute left-0 translate-y-1/2">
            <span className="block h-px w-3 -translate-x-px bg-burner" />
          </span>
        </div>
        <dl className="grid grid-cols-[auto_auto] gap-x-4 gap-y-1 uppercase">
          <dt className="text-faint">Alt</dt>
          <dd className="text-ink">
            <span ref={altRef}>000.0</span> km
          </dd>
          <dt className="text-faint">Spd</dt>
          <dd className="text-ink">
            M <span ref={machRef}>0.00</span>
          </dd>
          <dt className="text-faint">Env</dt>
          <dd className="text-dim">
            <span ref={phaseRef}>RUNWAY</span>
          </dd>
        </dl>
      </div>

      <div
        ref={toastRef}
        aria-live="polite"
        className="pointer-events-none fixed left-1/2 top-20 z-40 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/15 bg-void/85 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink opacity-0 backdrop-blur-md"
      />
    </>
  );
}
