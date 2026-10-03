"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/** Minimal ring + dot pointer. Only active on fine-pointer devices. */
export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    const root = document.documentElement;
    root.classList.add("has-reticle");

    gsap.set([ring, dot], { xPercent: -50, yPercent: -50, opacity: 0 });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });
    const dotX = gsap.quickTo(dot, "x", { duration: 0.06, ease: "none" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.06, ease: "none" });
    let visible = false;
    const show = (on: boolean) => {
      visible = on;
      gsap.to([ring, dot], { opacity: on ? 1 : 0, duration: 0.3, overwrite: "auto" });
    };

    const onMove = (e: PointerEvent) => {
      if (!visible) {
        gsap.set(ring, { x: e.clientX, y: e.clientY });
        show(true);
      }
      ringX(e.clientX);
      ringY(e.clientY);
      dotX(e.clientX);
      dotY(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const hit = (e.target as Element | null)?.closest("a, button, [data-cursor]");
      gsap.to(ring, {
        scale: hit ? 1.7 : 1,
        backgroundColor: hit ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0)",
        borderColor: hit ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.35)",
        duration: 0.35,
        ease: "power3.out",
        overwrite: "auto",
      });
    };
    const onDown = () => gsap.to(ring, { scale: 0.7, duration: 0.15, overwrite: "auto" });
    const onUp = () => gsap.to(ring, { scale: 1, duration: 0.3, ease: "back.out(3)", overwrite: "auto" });
    const onLeave = () => show(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      root.classList.remove("has-reticle");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-200 hidden h-9 w-9 rounded-full border border-white/35 [@media(hover:hover)_and_(pointer:fine)]:block"
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-201 hidden h-1 w-1 rounded-full bg-white [@media(hover:hover)_and_(pointer:fine)]:block"
      />
    </>
  );
}
