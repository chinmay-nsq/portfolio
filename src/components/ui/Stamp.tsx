import type { ReactNode } from "react";

// uneven ink: a speckled mask so the stamp never looks like a flat badge
const INK = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' seed='7'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 2.6 0 0 0 -.35'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

/** A rubber date stamp. Red ink only for `current`; everything else is stamped in gray. */
export default function Stamp({ children, current = false, className = "" }: { children: ReactNode; current?: boolean; className?: string }) {
  return (
    <span
      data-stamp
      className={`typed inline-block -rotate-[4deg] whitespace-nowrap rounded-[3px] border-2 px-2.5 text-[12px] font-bold uppercase leading-[24px] tracking-[0.1em] sm:text-[13px] ${
        current ? "border-stamp/85 text-stamp" : "border-ink-3/70 text-ink-3"
      } ${className}`}
      style={{ WebkitMaskImage: INK, maskImage: INK, WebkitMaskSize: "160px", maskSize: "160px" }}
    >
      {children}
    </span>
  );
}
