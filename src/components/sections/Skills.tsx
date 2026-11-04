import { skillsWithUsage } from "@/lib/content";

const groups = skillsWithUsage();

export default function Skills() {
  return (
    <section id="skills" className="shell scroll-mt-16 py-24 sm:py-32">
      <div className="section">
        <div className="section-aside">
          <h2 className="section-title">Toolbox</h2>
          <p className="mt-4 max-w-[30ch] text-[16px] leading-relaxed text-ink-2">
            The dark ones show up in the work above. The lighter ones I use too, they just haven&apos;t made it into a
            project here yet.
          </p>
        </div>

        <dl className="section-body divide-y divide-line border-y border-line">
          {groups.map((g) => (
            <div key={g.id} className="grid gap-x-8 gap-y-2 py-6 sm:grid-cols-[10rem_1fr]">
              <dt className="text-[15px] text-ink-3">{g.label}</dt>
              <dd className="flex flex-wrap gap-x-5 gap-y-1.5 font-display text-[clamp(1.15rem,1.8vw,1.4rem)] tracking-[-0.01em]">
                {g.items.map((s) => (
                  <span key={s.name} className={s.used ? "text-ink" : "text-ink-3"}>
                    {s.name}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
