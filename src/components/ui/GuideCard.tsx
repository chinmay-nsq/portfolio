import type { ReactNode } from "react";

type Props = {
  label: string;
  title: ReactNode;
  children?: ReactNode;
  /** Guide tabs are staggered across the drawer, like the real thing. 0 → far left, 4 → far right. */
  slot?: number;
};

/** The pressboard divider that starts each section of the drawer, with its tab sticking up. */
export default function GuideCard({ label, title, children, slot = 0 }: Props) {
  const left = `${6 + (slot % 5) * 17}%`;
  return (
    <div className="relative pt-10">
      <span
        className="absolute top-0 flex h-11 items-center rounded-t-lg bg-[#c6cfda] px-5 font-display text-[15px] font-semibold text-ink"
        style={{ left }}
      >
        {label}
      </span>
      <div className="relative rounded-md bg-[#c6cfda] px-[clamp(20px,4.5vw,56px)] pb-8 pt-8 shadow-[0_18px_36px_-24px_rgba(23,25,30,.4)]">
        <h2 className="font-display text-[clamp(2rem,4.6vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.025em]">{title}</h2>
        {children && <div className="mt-3 max-w-[58ch] text-[17px] leading-7 text-ink-2">{children}</div>}
      </div>
    </div>
  );
}
