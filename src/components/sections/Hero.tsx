"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { scrollTo } from "@/lib/scroll";
import { profile } from "@/data/portfolio";
import Arrow from "../ui/Arrow";
import Chip from "../ui/Chip";
import Fn from "../ui/Fn";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .from("[data-hero-in]", { y: 30, opacity: 0, duration: 1.3, stagger: 0.09 })
        .from("[data-chip]", { y: 80, opacity: 0, duration: 1.6 }, 0.35);
      // the chip settles into place as you scroll toward it
      gsap.fromTo(
        "[data-chip-scale]",
        { scale: 0.88 },
        { scale: 1, ease: "none", scrollTrigger: { trigger: "[data-chip]", start: "top bottom", end: "center 55%", scrub: true } },
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} id="top" className="overflow-hidden pb-24 pt-32 text-center sm:pt-40">
      <div className="wrap">
        <h1 data-hero-in className="font-display text-[clamp(4rem,15vw,9.5rem)] font-semibold leading-[0.9] tracking-[-0.05em]">
          {profile.firstName}.<span className="sr-only"> {profile.name}, full-stack software engineer.</span>
        </h1>
        <p data-hero-in className="launch-gradient mt-4 font-display text-[clamp(1.8rem,4.6vw,3.25rem)] font-semibold leading-tight tracking-[-0.03em]">
          Full-stack. Fully tested.
        </p>
        <p data-hero-in className="lede mt-6">
          The engineer behind an app 5,000+ people use every day.
          <Fn n={1} /> Now building GenieHire, an AI recruitment platform, at {profile.company}.
        </p>
        <div data-hero-in className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          <a
            href="#order"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#order", 1.4);
            }}
            className="btn btn-accent"
          >
            Hire
          </a>
          <a
            href="#performance"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#performance", 1.2);
            }}
            className="btn-link"
          >
            Learn more <Arrow />
          </a>
        </div>

        <div data-chip className="mx-auto mt-20 w-[min(72vw,360px)]">
          <div data-chip-scale>
            <Chip />
          </div>
        </div>
        <p className="mt-12 text-[15px] text-ink-2">
          Powered by the C1 chip. Designed in Pune. Runs on curiosity.
        </p>
      </div>
    </section>
  );
}
