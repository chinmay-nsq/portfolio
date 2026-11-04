import { achievements, education, experience, profile, projects, skillGroups } from "@/data/portfolio";
import { years } from "@/lib/content";
import Intro from "@/components/sections/Intro";
import Desk from "@/components/sections/Desk";
import Contact from "@/components/sections/Contact";
import Section from "@/components/ui/Section";
import Row from "@/components/ui/Row";
import Highlight from "@/components/ui/Highlight";

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((t) => (
        <li key={t} className="relative pl-4">
          <span aria-hidden="true" className="absolute left-0 top-[0.75em] h-[3px] w-[3px] rounded-full bg-ink-3" />
          <Highlight text={t} />
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  return (
    <div className="page">
      <Intro />

      <Section label="Now" i={2}>
        <p>
          Building GenieHire at {profile.company}. Trying to get an ESP32 to do more than blink. Playing badminton
          whenever someone says yes.
        </p>
      </Section>

      <Section id="work" label="Work" i={3}>
        <ul>
          {experience.map((job) => (
            <Row key={`${job.company}-${job.role}`} title={job.company} subtitle={job.role} meta={years(job.period)} defaultOpen={job.current}>
              <Bullets items={job.points} />
              <p className="mt-3 text-[13px] text-ink-3">
                {job.location} · {job.tags.join(", ")}
              </p>
            </Row>
          ))}
        </ul>
      </Section>

      <Section id="projects" label="Projects" i={4}>
        <ul>
          {projects.map((p) => (
            <Row key={p.id} title={p.name} subtitle={p.tagline} meta={years(p.period)}>
              <Bullets items={p.points} />
              <p className="mt-3 text-[13px] text-ink-3">{p.tags.join(", ")}</p>
              {(p.live || p.repo) && (
                <p className="mt-2 flex gap-4 text-[13px]">
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noreferrer" className="link text-ink">
                      Live site
                    </a>
                  )}
                  {p.repo && (
                    <a href={p.repo} target="_blank" rel="noreferrer" className="link text-ink">
                      Source code
                    </a>
                  )}
                </p>
              )}
            </Row>
          ))}
        </ul>
      </Section>

      <Section id="desk" label="On my desk" i={5} wide>
        <Desk />
      </Section>

      <Section label="Studied" i={6}>
        <ol className="space-y-4">
          {[...education].reverse().map((e) => (
            <li key={e.school}>
              <p className="tabular-nums text-ink-3">{years(e.period)}</p>
              <p>{e.story}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section label="Wins" i={7}>
        <ul className="space-y-3">
          {achievements.map((a) => (
            <li key={a.title}>
              <span className="font-medium">{a.value}</span> {a.title}
              <span className="block text-ink-2">{a.text}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section label="Toolbox" i={8}>
        <dl className="space-y-1.5">
          {skillGroups.map((g) => (
            <div key={g.id} className="grid gap-x-4 sm:grid-cols-[110px_1fr]">
              <dt className="text-ink-3">{g.label}</dt>
              <dd>{g.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="contact" label="Say hi" i={9}>
        <Contact />
      </Section>

      <footer className="settle mt-24 flex flex-wrap justify-between gap-2 border-t border-line pt-6 text-[13px] text-ink-3" style={{ "--i": 10 } as React.CSSProperties}>
        <span>Ship it. Then make it faster.</span>
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
      </footer>
    </div>
  );
}
