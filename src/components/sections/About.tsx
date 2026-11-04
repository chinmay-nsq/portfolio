"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { education, profile } from "@/data/portfolio";

// the statement, split into words; numbers carry the accent
const STATEMENT =
  "Most of my work lives in the part of an app nobody screenshots. An API that got 40ms faster. A Redis cache that made invoice lookups 40% quicker. A deploy that held 99.9% uptime while 5,000+ people used it every day. A fast app is good manners, and somebody has to write the manners.";
const NUMBER = /^\d[\d,.]*(?:\+|%|ms)?\.?$/;

const facts = [
  ["Based in", `${profile.city}, ${profile.location}`],
  ["Studied", `${education[0].degree}, ${education[0].period.match(/\d{4}$/)?.[0]}`],
  ["Off the clock", "Planets, fighter jets, and a LeetCode count past 450"],
];

export default function About() {
  const root = useRef<HTMLElement>(null);

  // the one scroll moment: words go from faint to full ink as you read down
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-w]",
          { opacity: 0.16 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.05,
            scrollTrigger: { trigger: "[data-statement]", start: "top 80%", end: "bottom 50%", scrub: 0.4 },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="about" className="shell scroll-mt-16 py-24 sm:py-32">
      <div className="section">
        <div className="section-aside">
          <h2 className="section-title">About</h2>
        </div>
        <div className="section-body">
          <p
            data-statement
            className="font-display text-[clamp(1.6rem,3.2vw,2.6rem)] font-medium leading-[1.22] tracking-[-0.02em]"
          >
            {STATEMENT.split(" ").map((w, i) => (
              <span key={i} data-w className={NUMBER.test(w) ? "text-accent" : undefined}>
                {w}{" "}
              </span>
            ))}
          </p>

          <dl className="mt-16 grid gap-6 sm:grid-cols-3">
            {facts.map(([k, v]) => (
              <div key={k}>
                <dt className="text-[14px] text-ink-3">{k}</dt>
                <dd className="mt-1 text-[16px] leading-snug">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
