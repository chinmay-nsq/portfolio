"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  value: number;
  suffix?: string;
  decimals?: number;
  className?: string;
};

const fmt = (n: number, decimals: number) =>
  n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

/** Counts up from 0 when scrolled into view. Server HTML already contains the final value. */
export default function Counter({ value, suffix = "", decimals = 0, className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const obj = { n: 0 };
      el.textContent = fmt(0, decimals) + suffix;
      gsap.to(obj, {
        n: value,
        duration: 2.2,
        ease: "power3.out",
        onUpdate: () => {
          el.textContent = fmt(obj.n, decimals) + suffix;
        },
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
      });
    },
    { scope: ref, dependencies: [value, suffix, decimals] },
  );

  return (
    <span ref={ref} className={className}>
      {fmt(value, decimals)}
      {suffix}
    </span>
  );
}
