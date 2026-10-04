"use client";

import { useEffect, useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  word: string;
  /** Upper limit for the type size, in px (the word otherwise grows to fill its container). */
  maxSize?: number;
  /** How much of the word tucks behind whatever follows it, as a fraction of its height. */
  overlap?: number;
  align?: "left" | "center";
  className?: string;
};

/**
 * A huge word that sits BEHIND the cards that follow it: the top of the letters peeks out above them,
 * the rest is hidden by the (frosted) cards. It fits itself to its container, reveals on scroll, and
 * drifts slower than the page so the overlap shifts as you scroll — that is what sells the depth.
 *
 * Put it directly before the card group and give those cards the `depth-card` class.
 * (DOM order does the layering: this comes first, so the cards paint over it.)
 */
export default function DepthWord({ word, maxSize = 340, overlap = 0.2, align = "left", className = "" }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const probe = useRef<HTMLSpanElement>(null);
  const inner = useRef<HTMLSpanElement>(null);

  // Fit the type to the container width (re-fit on resize and once the web font has loaded)
  useEffect(() => {
    const el = wrap.current;
    const ruler = probe.current;
    if (!el || !ruler) return;
    const fit = () => {
      const per100 = ruler.getBoundingClientRect().width; // width of the word at 100px
      if (!per100) return;
      el.style.fontSize = `${Math.min(maxSize, (el.clientWidth / per100) * 100)}px`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    void document.fonts?.ready.then(fit);
    return () => ro.disconnect();
  }, [maxSize, word]);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !inner.current || !wrap.current) return;

      // letters rise out of a mask when the word scrolls into view
      gsap.from(inner.current, {
        yPercent: 105,
        duration: 1.3,
        ease: "power4.out",
        scrollTrigger: { trigger: wrap.current, start: "top 92%", once: true },
      });

      // a "far away" layer: it moves less than the cards in front of it
      gsap.fromTo(
        wrap.current,
        { y: -34 },
        {
          y: 34,
          ease: "none",
          scrollTrigger: { trigger: wrap.current, start: "top bottom", end: "bottom top", scrub: 0.6 },
        },
      );
    },
    { scope: wrap, dependencies: [word] },
  );

  return (
    <div
      ref={wrap}
      aria-hidden="true"
      className={`pointer-events-none relative select-none ${className}`}
      style={{
        fontSize: "clamp(4rem, 16vw, 14rem)", // pre-JS fallback
        marginBottom: `${-overlap}em`,
        textAlign: align,
      }}
    >
      {/* zero-size clipping box: the ruler is wider than a phone, and must not widen the page */}
      <span className="invisible absolute left-0 top-0 h-0 w-0 overflow-hidden">
        <span
          ref={probe}
          className="inline-block whitespace-nowrap font-display font-semibold uppercase tracking-[-0.05em]"
          style={{ fontSize: 100 }}
        >
          {word}
        </span>
      </span>
      <div className="overflow-hidden pt-[0.04em]" style={{ lineHeight: 0.86 }}>
        <span
          ref={inner}
          className="inline-block whitespace-nowrap bg-clip-text font-display font-semibold uppercase tracking-[-0.05em] text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(255,255,255,.92) 0%, rgba(255,255,255,.55) 45%, rgba(255,255,255,.1) 100%)",
            WebkitBackgroundClip: "text",
          }}
        >
          {word}
        </span>
      </div>
    </div>
  );
}
