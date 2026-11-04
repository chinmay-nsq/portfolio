"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { benchmarks } from "@/data/portfolio";
import Fn from "../ui/Fn";
import { useReveal } from "../ui/useReveal";

const MAX = Math.max(100, ...benchmarks.map((b) => b.after));

/** "Before me / after me" benchmark bars. The "after" bar grows in when it scrolls into view. */
export default function Performance() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-bar]").forEach((bar) => {
          gsap.from(bar, {
            scaleX: 0,
            duration: 1.4,
            ease: "expo.out",
            scrollTrigger: { trigger: bar, start: "top 90%", once: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="performance" className="scroll-mt-14 py-28 sm:py-36">
      <div className="wrap text-center">
        <h2 data-reveal className="headline">
          Performance.
          <span className="block text-ink-3">Every version faster than the last.</span>
        </h2>
        <p data-reveal className="lede mt-6">
          Before I touched it, and after. Measured, not vibes.
        </p>
      </div>

      <div className="wrap mt-16 max-w-[860px] space-y-12">
        {benchmarks.map((b) => (
          <div key={b.label} data-reveal>
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-[17px] font-medium">{b.label}</h3>
              <p className="shrink-0 whitespace-nowrap font-display text-[clamp(1.4rem,3vw,2rem)] font-semibold tracking-[-0.02em] text-accent">
                {b.result}
                <Fn n={b.note} />
              </p>
            </div>
            <div className="mt-4 space-y-2 text-[13px] text-ink-2">
              <div className="flex items-center gap-3">
                <span className="w-20 shrink-0">Before me</span>
                <span className="h-2.5 rounded-full bg-line" style={{ width: `calc((100% - 5.75rem) * ${100 / MAX})` }} />
              </div>
              <div className="flex items-center gap-3">
                <span className="w-20 shrink-0 font-medium text-ink">After me</span>
                <span
                  data-bar
                  className="h-2.5 origin-left rounded-full bg-[linear-gradient(90deg,var(--color-g1),var(--color-g2))]"
                  style={{ width: `calc((100% - 5.75rem) * ${b.after / MAX})` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
