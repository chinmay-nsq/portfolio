"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { fx } from "@/lib/fx";
import { setLenis } from "@/lib/scroll";

/** Drives Lenis from the GSAP ticker so ScrollTrigger and smooth scroll stay in lockstep. */
export default function SmoothScroll({ locked }: { locked: boolean }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      lerp: prefersReducedMotion() ? 1 : 0.085,
      wheelMultiplier: 0.95,
    });
    lenis.stop(); // stays locked until the loader reveals the page
    lenisRef.current = lenis;
    setLenis(lenis);

    lenis.on("scroll", (e: Lenis) => {
      ScrollTrigger.update();
      fx.scrollY = e.scroll;
      fx.progress = e.limit > 0 ? e.scroll / e.limit : 0;
    });

    const tick = (time: number) => {
      lenis.raf(time * 1000);
      fx.velocity = lenis.velocity;
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (locked) lenis.stop();
    else {
      lenis.start();
      // Layout settles once the loader is gone – recompute all trigger positions.
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }
  }, [locked]);

  return null;
}
