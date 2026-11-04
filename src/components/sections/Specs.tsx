"use client";

import { useRef } from "react";
import { personalSpecs, profile, skillGroups } from "@/data/portfolio";
import { useReveal } from "../ui/useReveal";

const rows: { label: string; value: React.ReactNode }[] = [
  { label: "Model", value: `${profile.name}. Full-stack software engineer, 2024 edition.` },
  { label: "Location", value: `${profile.city}, India. Works in IST, replies in any timezone.` },
  ...skillGroups.map((g) => ({ label: g.label, value: g.items.join(", ") })),
  ...personalSpecs.map((s) => ({ label: s.label, value: s.text })),
];

/** The spec sheet: skills, plus the parts of me that don't fit on a resume. */
export default function Specs() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section ref={root} id="specs" className="scroll-mt-14 py-28 sm:py-36">
      <div className="wrap text-center">
        <h2 data-reveal className="headline">Tech specs.</h2>
      </div>

      <dl data-reveal className="wrap mt-14 max-w-[860px] border-t border-line">
        {rows.map((r) => (
          <div key={r.label} className="grid gap-x-10 gap-y-1 border-b border-line py-6 sm:grid-cols-[13rem_1fr]">
            <dt className="font-display text-[19px] font-semibold tracking-[-0.01em]">{r.label}</dt>
            <dd className="text-[17px] leading-relaxed text-ink-2">{r.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
