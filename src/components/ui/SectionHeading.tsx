"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  title: string;
  /** Optional second line, rendered in a quieter tone. */
  muted?: string;
  center?: boolean;
  className?: string;
};

export default function SectionHeading({ title, muted, center = false, className = "" }: Props) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || prefersReducedMotion()) return;
      const heading = el.querySelector("h2") as HTMLElement;

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
      <h2 className="h2">
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
