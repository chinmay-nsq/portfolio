"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { scrollTo } from "@/lib/scroll";
import { profile } from "@/data/portfolio";
import Arrow from "../ui/Arrow";
import LocalTime from "../ui/LocalTime";

const LINES = [["I", "build", "software"], ["that", "5,000+", "people"], ["use", "every", "day."]];

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .from("[data-word]", { yPercent: 110, duration: 1.2, stagger: 0.045 })
        .from("[data-hero-in]", { y: 16, opacity: 0, duration: 1, stagger: 0.08 }, 0.5);
    },
    { scope: root },
  );

  return (
    <section ref={root} id="top" className="shell flex flex-col justify-end pb-12 pt-28 sm:min-h-[100svh] sm:pb-16 sm:pt-32">
      <h1 className="font-display text-[clamp(2.25rem,9.2vw,6rem)] font-medium leading-[0.98] tracking-[-0.04em]">
        <span className="sr-only">{profile.name}: </span>
        {LINES.map((line, i) => (
          <span key={i} className="block overflow-hidden pb-[0.06em]">
            {line.map((w, j) => (
              <span key={j} data-word className={`mr-[0.22em] inline-block ${w === "5,000+" ? "text-accent" : ""}`}>
                {w}
              </span>
            ))}
          </span>
        ))}
      </h1>

      <div className="mt-12 grid gap-8 border-t border-line pt-8 md:grid-cols-12 md:items-end">
        <p data-hero-in className="max-w-[52ch] text-[clamp(1.05rem,1.4vw,1.25rem)] leading-relaxed text-ink-2 md:col-span-7">
          I&apos;m <span className="text-ink">Chinmay Lale</span>, a full-stack engineer. Right now I&apos;m building
          GenieHire, an AI recruitment platform, at {profile.company}. Before that it was React Native apps, Node.js
          APIs and AWS deploys that weren&apos;t allowed to go down.
        </p>
        <div data-hero-in className="flex flex-wrap gap-3 md:col-span-5 md:justify-end">
          <a href={`mailto:${profile.email}`} className="btn btn-accent">
            Email me
          </a>
          <a
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#work", 1.2);
            }}
            className="btn btn-line"
          >
            See my work <Arrow dir="down" />
          </a>
        </div>
      </div>

      <div data-hero-in>
        <LocalTime className="mt-8 text-[15px] text-ink-2" />
      </div>
    </section>
  );
}
