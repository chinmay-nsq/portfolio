import type { ReactNode } from "react";

type Props = { id?: string; label: string; i: number; wide?: boolean; children: ReactNode };

/**
 * A labelled block: the label sits in its own narrow column on wider screens, above the content on phones.
 * `wide` puts the label on top and lets the content break out past the text column on desktop.
 */
export default function Section({ id, label, i, wide = false, children }: Props) {
  return (
    <section
      id={id}
      className={`settle mt-20 grid gap-x-10 gap-y-4 sm:mt-24 ${wide ? "lg:-mx-28" : "sm:grid-cols-[120px_1fr]"}`}
      style={{ "--i": i } as React.CSSProperties}
    >
      <h2 className="text-ink-2">{label}</h2>
      <div className="min-w-0">{children}</div>
    </section>
  );
}
