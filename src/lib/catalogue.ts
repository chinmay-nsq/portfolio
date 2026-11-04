import { experience, projects, skillGroups } from "@/data/portfolio";

const YEAR = /\d{4}/;

/** "Feb 2025 — Sept 2025" → { start: "2025", end: "SEPT 2025" }; "2025 — Present" → end "PRESENT". */
export function parsePeriod(period: string) {
  const [from, to = from] = period.split(/\s*[—–]\s*/);
  const start = from.match(YEAR)?.[0] ?? to.match(YEAR)?.[0] ?? "";
  return { start, end: to.trim().toUpperCase() };
}

/** A three-letter cutter, the way a library shelves "Lale" under LAL. */
export const cutter = (name: string) => name.replace(/[^a-z]/gi, "").slice(0, 3).toUpperCase();

/** Catalogue tracings: "1. React. 2. Node.js." */
export const tracings = (tags: string[]) => tags.map((t, i) => `${i + 1}. ${t}.`).join(" ");

// "React" and "React.js" are the same subject, and so are "AWS" and "AWS EC2"
const subject = (s: string) =>
  s
    .toLowerCase()
    .replace(/\.js$/, "")
    .replace(/^aws\b.*/, "aws")
    .trim();

export type IndexEntry = { name: string; refs: string[] };

/** The subject index: every skill, cross-referenced to the jobs and projects that list it. */
export function subjectIndex() {
  const sources = [
    ...experience.map((j) => ({ name: j.company, tags: j.tags })),
    ...projects.map((p) => ({ name: p.name, tags: p.tags })),
  ];
  return skillGroups.map((g) => ({
    id: g.id,
    label: g.label,
    entries: g.items.map<IndexEntry>((item) => ({
      name: item,
      refs: [...new Set(sources.filter((s) => s.tags.some((t) => subject(t) === subject(item))).map((s) => s.name))],
    })),
  }));
}
