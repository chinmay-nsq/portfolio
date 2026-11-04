import type { ReactNode } from "react";

type Props = {
  /** Typed top-left: the call number. */
  call?: ReactNode;
  /** Top-right: usually a <Stamp>. */
  stamp?: ReactNode;
  as?: "div" | "article" | "section";
  className?: string;
  bodyClassName?: string;
  children: ReactNode;
};

/** A plain index card with a punched hole at the bottom for the rod. */
export default function Card({ call, stamp, as: Tag = "div", className = "", bodyClassName = "", children }: Props) {
  return (
    <Tag className={`card ${className}`}>
      <div className="card-head">
        <div className="typed shrink-0 whitespace-nowrap text-ink-2">{call}</div>
        {stamp && <div className="shrink-0 pt-1">{stamp}</div>}
      </div>
      <div className={`relative pt-4 ${bodyClassName}`}>{children}</div>
    </Tag>
  );
}
