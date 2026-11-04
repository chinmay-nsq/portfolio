import { achievements, education } from "@/data/portfolio";
import { parsePeriod } from "@/lib/catalogue";
import Card from "../ui/Card";
import GuideCard from "../ui/GuideCard";
import Counter from "../ui/Counter";

export default function Wins() {
  return (
    <section id="wins" className="shell scroll-mt-14 pt-24">
      <GuideCard label="Wins" title="Small trophies." slot={4}>
        The four I&apos;d bring up if you asked over coffee.
      </GuideCard>

      <Card as="article" call={"HONOURS\nv. 1"} className="mt-6">
        <ul className="grid gap-x-10 pt-7 sm:grid-cols-2">
          {achievements.map((a) => (
            <li key={a.title} className="pb-7">
              <div className="font-display text-[clamp(2.6rem,5vw,3.5rem)] font-semibold leading-none tracking-[-0.03em] tabular-nums">
                {a.count !== undefined ? <Counter value={a.count} suffix={a.suffix} /> : a.value}
              </div>
              <h3 className="mt-4 text-[17px] font-semibold leading-7">{a.title}</h3>
              <p className="text-[16px] leading-7 text-ink-2">{a.text}</p>
            </li>
          ))}
        </ul>
      </Card>

      <Card as="article" call={"HOLDINGS\nEDU"} className="mt-6">
        <h3 className="font-display text-[clamp(1.6rem,3vw,2.1rem)] font-semibold leading-[1.15] tracking-[-0.02em]">
          Where I studied.
        </h3>
        <ol className="mt-7 space-y-7">
          {education.map((e) => (
            <li key={e.school} className="grid gap-x-8 sm:grid-cols-[1fr_auto]">
              <div>
                <p className="text-[17px] font-semibold leading-7">{e.school}</p>
                <p className="text-[16px] leading-7 text-ink-2">
                  {e.degree}
                  {e.note && <span> · {e.note}</span>}
                </p>
              </div>
              <p className="typed text-ink-2 sm:text-right">
                {e.place}, {parsePeriod(e.period).start}–{parsePeriod(e.period).end.match(/\d{4}/)?.[0]}
              </p>
            </li>
          ))}
        </ol>
      </Card>
    </section>
  );
}
