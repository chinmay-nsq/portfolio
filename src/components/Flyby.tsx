"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIntro } from "./IntroContext";
import { JetMark } from "./Jet";

export const FLYBY_EVENT = "cl:flyby";

/** Occasional fighter-jet flybys crossing the background. Click the logo to call one in. */
export default function Flyby() {
  const layer = useRef<HTMLDivElement>(null);
  const revealed = useIntro();

  useEffect(() => {
    const el = layer.current;
    if (!revealed || !el || prefersReducedMotion()) return;

    const jets = Array.from(el.querySelectorAll<HTMLElement>("[data-fly]"));
    let call: gsap.core.Tween | null = null;
    let flying = false;

    const fly = () => {
      if (flying) return;
      flying = true;
      const W = window.innerWidth;
      const H = window.innerHeight;
      const ltr = Math.random() < 0.5;
      const x0 = ltr ? -160 : W + 160;
      const x1 = ltr ? W + 160 : -160;
      const y0 = H * (0.55 + Math.random() * 0.4);
      const y1 = H * (Math.random() * 0.35);
      const rotation = (Math.atan2(x1 - x0, -(y1 - y0)) * 180) / Math.PI;
      const formation = Math.random() < 0.6 ? jets.length : 1;

      const tl = gsap.timeline({ onComplete: () => { flying = false; } });
      jets.slice(0, formation).forEach((jet, i) => {
        const back = i * 90; // wingman trails behind and to the side
        const side = i === 0 ? 0 : i % 2 ? -46 : 46;
        tl.fromTo(
          jet,
          { x: x0 + (ltr ? -back : back), y: y0 + back * 0.35 + side, rotation, opacity: 0 },
          {
            x: x1,
            y: y1 + side,
            opacity: 0.55,
            duration: 3.8,
            ease: "power1.in",
          },
          i * 0.12,
        );
        tl.to(jet, { opacity: 0, duration: 0.3 }, ">-0.3");
      });
    };

    const schedule = (delay: number) => {
      call = gsap.delayedCall(delay, () => {
        fly();
        schedule(16 + Math.random() * 14);
      });
    };
    schedule(7);

    window.addEventListener(FLYBY_EVENT, fly);
    return () => {
      call?.kill();
      window.removeEventListener(FLYBY_EVENT, fly);
      gsap.killTweensOf(jets);
    };
  }, [revealed]);

  return (
    <div
      ref={layer}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-1 overflow-hidden"
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          data-fly
          className="absolute left-0 top-0 text-ink/80 opacity-0"
          style={{ width: i === 0 ? 26 : 20, marginLeft: i === 0 ? -13 : -10, marginTop: -22 }}
        >
          <span
            className="absolute left-1/2 top-[88%] h-[900%] w-px -translate-x-1/2"
            style={{ background: "linear-gradient(180deg, rgba(236,236,241,.35), transparent)" }}
          />
          <JetMark />
        </div>
      ))}
    </div>
  );
}
