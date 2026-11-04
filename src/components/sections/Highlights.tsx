"use client";

import { useRef } from "react";
import Fn from "../ui/Fn";
import { useReveal } from "../ui/useReveal";

/** Three big claims, one per screen-width line, each backed by the fine print. */
export default function Highlights() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section ref={root} className="bg-mist py-28 sm:py-36">
      <div className="wrap max-w-[920px] space-y-20 sm:space-y-28">
        <p data-reveal className="headline">
          <span className="text-accent">5,000+</span> people use my app every day.
          <Fn n={1} />
          <span className="block text-ink-3">Most of them never think about it. That&apos;s the point.</span>
        </p>
        <p data-reveal className="headline">
          <span className="text-accent">99.9%</span> uptime.
          <Fn n={2} />
          <span className="block text-ink-3">The other 0.1% taught me a lot.</span>
        </p>
        <p data-reveal className="headline">
          <span className="text-accent">25+</span> REST APIs, designed and shipped.
          <span className="block text-ink-3">Plus a few I&apos;d rather not talk about.</span>
        </p>
      </div>
    </section>
  );
}
