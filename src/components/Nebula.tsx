"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

const blobs = [
  { cls: "blob-indigo", pos: "-left-[20%] top-[0%]", size: "70vmax", color: "70,84,170", base: 0.13 },
  { cls: "blob-steel", pos: "-right-[24%] top-[34%]", size: "64vmax", color: "70,130,170", base: 0.08 },
  { cls: "blob-warm", pos: "left-[16%] top-[70%]", size: "56vmax", color: "150,90,80", base: 0.05 },
];

/** Soft drifting colour clouds behind the stars. Tint shifts as you ascend. */
export default function Nebula() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.utils.toArray<HTMLElement>(".blob").forEach((el) => {
        gsap.to(el, {
          x: "random(-100, 100)",
          y: "random(-70, 70)",
          scale: "random(0.9, 1.25)",
          duration: "random(14, 22)",
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          repeatRefresh: true,
        });
      });

      const scrub = { start: 0, end: "max", scrub: 1.2 } as const;
      gsap.to(".blob-indigo", { yPercent: -30, opacity: 0.18, ease: "none", scrollTrigger: scrub });
      gsap.to(".blob-steel", { yPercent: -45, opacity: 0.03, ease: "none", scrollTrigger: scrub });
      gsap.to(".blob-warm", { yPercent: -60, opacity: 0.09, ease: "none", scrollTrigger: scrub });
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {blobs.map((b) => (
        <div
          key={b.cls}
          className={`blob ${b.cls} absolute rounded-full ${b.pos}`}
          style={{
            width: b.size,
            height: b.size,
            opacity: b.base,
            background: `radial-gradient(circle, rgba(${b.color},1) 0%, rgba(${b.color},0) 62%)`,
          }}
        />
      ))}
      {/* Vignette keeps focus on the centre */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 45%, rgba(2,3,6,.6) 100%)",
        }}
      />
    </div>
  );
}
