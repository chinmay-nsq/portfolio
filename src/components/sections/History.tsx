"use client";

import { useRef } from "react";
import { achievements, education } from "@/data/portfolio";
import { years } from "@/lib/content";
import { useReveal } from "../ui/useReveal";

/** Education told as a manufacturing history, and the wins as what comes in the box. */
export default function History() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);
  const timeline = [...education].reverse();

  return (
    <section ref={root} id="history" className="scroll-mt-14 bg-mist py-28 sm:py-36">
      <div className="wrap text-center">
        <h2 data-reveal className="headline">
          Manufacturing history.
          <span className="block text-ink-3">Every build starts somewhere.</span>
        </h2>
      </div>

      <ol className="wrap mt-14 max-w-[860px] space-y-3">
        {timeline.map((e, i) => (
          <li key={e.school} data-reveal className="grid gap-x-8 gap-y-2 rounded-[22px] bg-paper px-6 py-6 sm:grid-cols-[8rem_1fr] sm:px-8">
            <div>
              <p className="font-display text-[22px] font-semibold tracking-[-0.02em] text-accent">{years(e.period)}</p>
              <p className="text-[14px] text-ink-3">{i === 0 ? "First firmware" : "Major update"}</p>
            </div>
            <div>
              <p className="text-[18px] leading-relaxed">{e.story}</p>
              <p className="mt-2 text-[14px] text-ink-3">
                {e.degree}
                {e.note && ` · ${e.note}`} · {e.school}, {e.place}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <div className="wrap mt-28 text-center">
        <h2 data-reveal className="headline">What&apos;s in the box.</h2>
      </div>
      <ul className="wrap mt-14 grid max-w-[860px] gap-3 sm:grid-cols-2">
        {achievements.map((a) => (
          <li key={a.title} data-reveal className="rounded-[22px] bg-paper px-6 py-6 sm:px-8">
            <p className="font-display text-[clamp(2.2rem,4vw,2.75rem)] font-semibold leading-none tracking-[-0.03em]">{a.value}</p>
            <p className="mt-3 text-[17px] font-medium">{a.title}</p>
            <p className="mt-1 text-[15px] leading-relaxed text-ink-2">{a.text}</p>
          </li>
        ))}
        <li data-reveal className="flex flex-col justify-center rounded-[22px] border border-dashed border-line px-6 py-6 text-ink-2 sm:col-span-2 sm:px-8">
          <p className="text-[17px] font-medium text-ink">Also in the box</p>
          <p className="mt-1 text-[15px] leading-relaxed">
            One full-stack engineer, a laptop with too many experiments on it, and an ESP32. Badminton racket sold
            separately.
          </p>
        </li>
      </ul>
    </section>
  );
}
