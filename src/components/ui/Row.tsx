"use client";

import { useId, useState, type ReactNode } from "react";

type Props = {
  title: ReactNode;
  subtitle: ReactNode;
  meta?: ReactNode;
  defaultOpen?: boolean;
  children: ReactNode;
};

/** One line of a list ("title, one line about it") that opens to show the details. */
export default function Row({ title, subtitle, meta, defaultOpen = false, children }: Props) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();

  return (
    <li className="-mx-3">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className="group grid w-full grid-cols-[1fr_auto] items-baseline gap-x-4 rounded-lg px-3 py-2.5 text-left transition-colors duration-150 [@media(hover:hover)]:hover:bg-surface"
      >
        <span className="min-w-0">
          <span className="font-medium">{title}</span>
          <span className="block text-ink-2 sm:inline">
            <span className="hidden sm:inline"> · </span>
            {subtitle}
          </span>
        </span>
        <span className="flex items-center gap-3 tabular-nums text-ink-3">
          {meta}
          <svg
            viewBox="0 0 16 16"
            aria-hidden="true"
            className={`h-3 w-3 shrink-0 transition-transform duration-200 ease-[var(--ease-out)] ${open ? "rotate-90 text-ink" : ""}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 3.5L10.5 8 6 12.5" />
          </svg>
        </span>
      </button>

      <div
        id={id}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[var(--ease-out)] ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden" inert={!open}>
          <div className="px-3 pb-4 pt-1 text-ink-2">{children}</div>
        </div>
      </div>
    </li>
  );
}
