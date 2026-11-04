import { achievements, education } from "@/data/portfolio";
import { years } from "@/lib/content";

export default function Wins() {
  return (
    <section id="wins" className="scroll-mt-16 py-24 sm:py-32">
      <div className="col">
        <h2 data-thread="sway" className="section-title">
          Small wins
        </h2>
        <p className="mt-4 max-w-[46ch] text-[17px] leading-relaxed text-ink-2">
          The four I&apos;d bring up if you asked over coffee.
        </p>

        <ul className="mt-10 border-b border-line">
          {achievements.map((a) => (
            <li key={a.title} data-thread="knot" className="relative grid gap-x-8 gap-y-2 border-t border-line py-6 sm:grid-cols-[9rem_1fr]">
              <span className="font-display text-[clamp(2rem,3.4vw,2.6rem)] font-medium leading-none tracking-[-0.03em] text-accent">
                {a.value}
              </span>
              <div>
                <h3 className="text-[17px] font-medium">{a.title}</h3>
                <p className="mt-1 max-w-[60ch] text-[16px] leading-relaxed text-ink-2">{a.text}</p>
              </div>
            </li>
          ))}
        </ul>

        <h3 data-thread="sway" className="mt-20 font-display text-[clamp(1.5rem,2.6vw,2rem)] font-medium tracking-[-0.02em]">
          Where I studied
        </h3>
        <ul className="mt-4 border-b border-line">
          {education.map((e) => (
            <li key={e.school} className="grid gap-x-8 gap-y-1 border-t border-line py-5 sm:grid-cols-[1fr_auto]">
              <div>
                <p className="text-[17px] font-medium">{e.school}</p>
                <p className="text-[15px] text-ink-2">
                  {e.degree}
                  {e.note && <span> · {e.note}</span>}
                </p>
              </div>
              <p className="text-[15px] tabular-nums text-ink-3">
                {e.place}, {years(e.period)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
