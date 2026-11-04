import { education, profile } from "@/data/portfolio";

// numbers carry the accent
const STATEMENT =
  "Most of my work lives in the part of an app nobody screenshots. An API that got 40ms faster. A Redis cache that made invoice lookups 40% quicker. A deploy that held 99.9% uptime while 5,000+ people used it every day. A fast app is good manners, and somebody has to write the manners.";
const NUMBER = /^\d[\d,.]*(?:\+|%|ms)?\.?$/;

const facts = [
  ["Based in", `${profile.city}, ${profile.location}`],
  ["Studied", `${education[0].degree}, ${education[0].period.match(/\d{4}$/)?.[0]}`],
  ["Off the clock", "Planets, fighter jets, and a LeetCode count past 450"],
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-16 py-24 sm:py-32">
      <div className="col">
        <h2 data-thread="sway" className="section-title">
          About
        </h2>
        <p className="mt-10 font-display text-[clamp(1.5rem,2.8vw,2.25rem)] font-medium leading-[1.25] tracking-[-0.02em]">
          {STATEMENT.split(" ").map((w, i) => (
            <span key={i} className={NUMBER.test(w) ? "text-accent" : undefined}>
              {w}{" "}
            </span>
          ))}
        </p>

        <dl data-thread="sway" className="mt-14 grid gap-6 border-t border-line pt-8 sm:grid-cols-3">
          {facts.map(([k, v]) => (
            <div key={k}>
              <dt className="text-[14px] text-ink-3">{k}</dt>
              <dd className="mt-1 text-[16px] leading-snug">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
