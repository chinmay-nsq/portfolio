"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { scrollTo } from "@/lib/scroll";
import { experience, profile } from "@/data/portfolio";
import { tracings } from "@/lib/catalogue";
import Card from "../ui/Card";
import Stamp from "../ui/Stamp";
import Arrow from "../ui/Arrow";

const current = experience.find((j) => j.current);
const subjects = ["React", "Node.js", "React Native", "AWS", "TypeScript"];

/** The title card: the whole person, in catalogue form. */
export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      // the card slides up out of the drawer, then the stamp comes down on it
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .from("[data-hero-card]", { y: 36, duration: 1.1 })
        .from("[data-stack-edge]", { y: -14, duration: 1, stagger: 0.08 }, 0.1)
        .fromTo("[data-stamp]", { scale: 1.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.28, ease: "power4.in" }, 0.55);
    },
    { scope: root },
  );

  return (
    <section ref={root} id="top" className="shell pb-8 pt-[88px]">
      <div className="relative">
        {/* the next cards in the drawer, peeking out underneath */}
        <div data-stack-edge aria-hidden="true" className="absolute inset-x-5 -bottom-3 top-3 rounded-md bg-[#f4f5f7] shadow-[0_10px_24px_-18px_rgba(23,25,30,.4)]" />
        <div data-stack-edge aria-hidden="true" className="absolute inset-x-10 -bottom-6 top-6 rounded-md bg-[#eceef1] shadow-[0_10px_24px_-18px_rgba(23,25,30,.4)]" />

        <div data-hero-card className="relative">
          <Card
            as="article"
            call={"005.1\nLAL"}
            stamp={current && <Stamp current>Checked out · {current.company}</Stamp>}
          >
            <h1 className="font-display text-[clamp(2.6rem,7.2vw,5.4rem)] font-semibold leading-[56px] tracking-[-0.035em] sm:leading-[84px]">
              Lale, Chinmay Kalyan.
              <span className="sr-only"> Software engineer in {profile.city}, India.</span>
            </h1>

            <p className="mt-7 max-w-[46ch] font-display text-[clamp(1.3rem,2.6vw,1.75rem)] font-medium leading-[28px] tracking-[-0.01em] sm:leading-[42px]">
              Things that ship : web apps, mobile apps and the plumbing in between / by Chinmay Lale.
            </p>

            <div className="typed mt-7 text-ink-2">
              <p>— {profile.city}, India : {profile.company}, 2025–</p>
              <p>1 engineer : full stack ; works in light and dark mode.</p>
            </div>

            <p className="mt-7 max-w-[62ch] text-[17px] leading-7 text-ink-2">
              Includes a React Native app that <b className="font-semibold text-ink">5,000+ people</b> use every day,{" "}
              <b className="font-semibold text-ink">25+</b> REST APIs, and a stubborn habit of keeping production at{" "}
              <b className="font-semibold text-ink">99.9%</b> uptime.
            </p>

            <p className="typed mt-7 text-ink-2">{tracings(subjects)} I. Title.</p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a href={`mailto:${profile.email}`} className="btn btn-ink">
                Email me
              </a>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("#about", 1.2);
                }}
                className="btn btn-line"
              >
                Pull the next card <Arrow dir="down" />
              </a>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
