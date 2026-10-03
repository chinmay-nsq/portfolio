"use client";

import type { RefObject } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/**
 * Fades + lifts every `[data-reveal]` inside `scope` as it scrolls into view.
 * Optional `data-reveal-delay="0.2"` staggers siblings.
 */
export function useReveal(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 28,
          opacity: 0,
          duration: 0.95,
          delay: Number(el.dataset.revealDelay ?? 0),
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });
    },
    { scope },
  );
}
