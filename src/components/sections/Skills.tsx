import { subjectIndex } from "@/lib/catalogue";
import Card from "../ui/Card";
import GuideCard from "../ui/GuideCard";

const groups = subjectIndex();

/** The subject index: each skill points at the cards where it was actually used. */
export default function Skills() {
  return (
    <section id="index" className="shell scroll-mt-14 pt-24">
      <GuideCard label="Skills" title="Subject index." slot={3}>
        Every tool I reach for, and where in this drawer you can see me use it. The ones without a page number are
        ones I use and haven&apos;t written a card about yet.
      </GuideCard>

      <Card as="article" call={"INDEX\nA–Z"} className="mt-6">
        <div className="gap-x-12 md:columns-2">
          {groups.map((g) => (
            <div key={g.id} className="mb-7 break-inside-avoid">
              <h3 className="typed font-bold uppercase tracking-[0.08em] text-ink">{g.label}</h3>
              <ul>
                {g.entries.map((e) => (
                  <li key={e.name} className="flex items-baseline gap-2 text-[16px] leading-7">
                    <span className="shrink-0 font-medium">{e.name}</span>
                    {e.refs.length > 0 && (
                      <>
                        <span aria-hidden="true" className="min-w-4 flex-1 translate-y-[-5px] border-b border-dotted border-ink/35" />
                        <span className="typed min-w-0 text-right !text-[13px] text-ink-2">
                          <span className="sr-only">used at </span>
                          {e.refs.join(", ")}
                        </span>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}
