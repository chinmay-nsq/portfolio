import { achievements, education } from "@/data/portfolio";
import { years } from "@/lib/content";

// the wins get the board's colours, in turn
const WIN_STYLES = ["bg-tile", "bg-sun", "bg-tile", "bg-blue text-white"];

export default function Story() {
  const steps = [...education].reverse();

  return (
    <section id="story" className="shell scroll-mt-20 pt-28">
      <div data-reveal className="flex flex-wrap items-end justify-between gap-4 px-1">
        <h2 className="section-title">The story so far</h2>
        <p className="max-w-[34ch] text-ink-2">Where I studied, and the few wins I&apos;d bring up if you asked over coffee.</p>
      </div>

      <ol className="mt-6 grid gap-3 md:grid-cols-2">
        {steps.map((e, i) => (
          <li key={e.school} data-reveal className="tile flex flex-col p-7" style={{ "--i": i } as React.CSSProperties}>
            <span className="w-fit rounded-full bg-page px-3 py-1 text-[13px] font-medium tabular-nums">{years(e.period)}</span>
            <p className="mt-5 font-display text-[22px] font-semibold leading-snug tracking-[-0.015em]">{e.story}</p>
            <p className="mt-auto pt-5 text-[14px] text-ink-2">
              {e.degree} · {e.school}
            </p>
          </li>
        ))}
      </ol>

      <ul className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {achievements.map((a, i) => (
          <li key={a.title} data-reveal className={`tile flex flex-col ${WIN_STYLES[i % WIN_STYLES.length]}`} style={{ "--i": i } as React.CSSProperties}>
            <p className="tile-big text-[clamp(2.2rem,4vw,3rem)]">{a.value}</p>
            <p className="mt-3 font-medium">{a.title}</p>
            <p className={`mt-1 text-[14px] leading-relaxed ${i === 3 ? "text-white/80" : "text-ink-2"}`}>{a.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
