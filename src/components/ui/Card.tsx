import type { ReactNode } from "react";

type Props = {
  /** Typed in the top-left margin, above the red rule: the call number. */
  call?: ReactNode;
  /** Top-right, above the red rule: usually a <Stamp>. */
  stamp?: ReactNode;
  as?: "div" | "article" | "section";
  className?: string;
  bodyClassName?: string;
  children: ReactNode;
};

/** A ruled index card with a punched hole at the bottom for the rod. */
export default function Card({ call, stamp, as: Tag = "div", className = "", bodyClassName = "", children }: Props) {
  return (
    <Tag className={`card ${className}`}>
      <div className="card-head">
        <div className="typed whitespace-pre-line text-ink-2">{call}</div>
        {stamp && <div className="shrink-0 pt-1">{stamp}</div>}
      </div>
      {/* 7px nudge sits 28px-leading text on the blue rules */}
      <div className={`relative pt-[7px] ${bodyClassName}`}>{children}</div>
    </Tag>
  );
}
