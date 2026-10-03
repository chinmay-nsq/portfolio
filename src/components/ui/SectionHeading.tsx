"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  index: string;
  label: string;
  title: string;
  /** Optional second line, rendered in a quieter tone. */
  muted?: string;
  center?: boolean;
  className?: string;
};

export default function SectionHeading({ index, label, title, muted, center = false, className = "" }: Props) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || prefersReducedMotion()) return;
      const heading = el.querySelector("h2") as HTMLElement;
      const eyebrow = el.querySelector("[data-eyebrow]") as HTMLElement;

      gsap.from(eyebrow, {
        y: 12,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });

      SplitText.create(heading, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 108,
            duration: 1.15,
            stagger: 0.1,
            ease: "power4.out",
            scrollTrigger: { trigger: heading, start: "top 88%", once: true },
          }),
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className={`${center ? "text-center" : ""} ${className}`}>
      <p data-eyebrow className={`eyebrow ${center ? "justify-center" : ""}`}>
        <span className="text-faint">{index}</span>
        {label}
      </p>
      <h2 className="h2 mt-5">
        {title}
        {muted && (
          <>
            <br />
            <span className="text-faint">{muted}</span>
          </>
        )}
      </h2>
    </div>
  );
}
