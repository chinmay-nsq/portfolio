import { education, profile, stats } from "@/data/portfolio";
import Card from "../ui/Card";
import GuideCard from "../ui/GuideCard";
import Counter from "../ui/Counter";

const holdings = [
  ["Name", profile.name],
  ["Shelved in", `${profile.city}, ${profile.location}`],
  ["On loan to", profile.company],
  ["Studied", `${education[0].degree}, ${education[0].period.match(/\d{4}$/)?.[0]}`],
  ["Fluent in", "TypeScript, JavaScript, Python, Java"],
];

export default function About() {
  return (
    <section id="about" className="shell scroll-mt-14 pt-6">
      <GuideCard label="About" title="Notes from the author." slot={0}>
        The short version, before you pull the long cards.
      </GuideCard>

      <Card as="article" call={"NOTES\np. 2"} className="mt-6">
        <div className="max-w-[64ch] space-y-7 text-[17px] leading-7 text-ink-2">
          <p className="font-display text-[clamp(1.35rem,2.4vw,1.6rem)] font-medium leading-[1.35] tracking-[-0.01em] text-ink">
            Most of my work lives in the part of an app nobody screenshots.
          </p>
          <p>
            The API that got <b className="font-semibold text-ink">40ms</b> faster. The Redis cache that made invoice
            lookups <b className="font-semibold text-ink">40%</b> quicker. The EC2 deploy that held{" "}
            <b className="font-semibold text-ink">99.9%</b> uptime while thousands of people tapped around on top of it.
            I like that part. A fast app is good manners, and somebody has to write the manners.
          </p>
          <p>
            These days I&apos;m at {profile.company}, building GenieHire, an AI recruitment platform. Before that I
            shipped a React Native app at Social Continent, built web apps from scratch, and wrote an invoice generator
            that cut <b className="font-semibold text-ink">80%</b> of somebody&apos;s manual work.
          </p>
          <p>
            Off the clock I&apos;m reading about planets and fighter jets, or quietly adding to a LeetCode count
            that&apos;s past <b className="font-semibold text-ink">450</b>.
          </p>
        </div>

        <ul className="mt-14 grid gap-x-8 border-y border-ink/10 sm:grid-cols-3">
          {stats.map((s) => (
            <li
              key={s.label}
              className="border-ink/10 py-5 [&:not(:first-child)]:border-t sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:border-t-0 sm:[&:not(:first-child)]:pl-8"
            >
              <p className="font-display text-[clamp(2.4rem,4.4vw,3.25rem)] font-semibold leading-none tracking-[-0.03em] tabular-nums">
                <Counter value={s.value} suffix={s.suffix} decimals={s.decimals} />
              </p>
              <p className="mt-3 text-[15px] leading-6 text-ink-2">{s.label}</p>
            </li>
          ))}
        </ul>

        <dl className="typed mt-14 grid grid-cols-[auto_1fr] gap-x-8 text-ink-2">
          {holdings.map(([k, v]) => (
            <div key={k} className="contents">
              <dt className="uppercase">{k}</dt>
              <dd className="text-ink">{v}</dd>
            </div>
          ))}
        </dl>
      </Card>
    </section>
  );
}
