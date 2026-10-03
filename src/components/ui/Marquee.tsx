"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { fx } from "@/lib/fx";
import { marqueeWords } from "@/data/portfolio";

/** A quiet, instrument-style ticker. Drifts slowly; picks up speed with scroll velocity. */
export default function Marquee() {
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = track.current;
      if (!el || prefersReducedMotion()) return;
      const tween = gsap.to(el, { xPercent: -50, ease: "none", duration: 70, repeat: -1 });
      let speed = 1;
      const tick = () => {
        const target = 1 + Math.min(Math.abs(fx.velocity) * 0.25, 6);
        speed += (target - speed) * 0.06;
        tween.timeScale(speed);
      };
      gsap.ticker.add(tick);
      return () => gsap.ticker.remove(tick);
    },
    { scope: track },
  );

  const set = (
    <div className="flex shrink-0 items-center">
      {marqueeWords.map((w) => (
        <span key={w} className="flex items-center">
          <span>{w}</span>
          <span className="mx-8 h-1 w-1 rounded-full bg-faint/70" aria-hidden="true" />
        </span>
      ))}
    </div>
  );

  return (
    <div
      aria-hidden="true"
      className="relative z-10 overflow-hidden whitespace-nowrap border-y border-white/[0.07] py-4 font-mono text-xs uppercase tracking-[0.2em] text-dim"
      style={{
        maskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
        WebkitMaskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
      }}
    >
      <div ref={track} className="flex w-max">
        {set}
        {set}
      </div>
    </div>
  );
}
