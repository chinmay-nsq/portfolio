import { experience, projects, skillGroups } from "@/data/portfolio";

/** "Feb 2025 — Sept 2025" → "2025", "2024 — 2025" style years for compact rows. */
export function years(period: string) {
  const found = period.match(/\d{4}/g) ?? [];
  const present = /present/i.test(period);
  const [first, last] = [found[0], found[found.length - 1]];
  if (present) return `${first} – now`;
  return first === last ? first : `${first} – ${last}`;
}

// "React" and "React.js" are the same skill, and so are "AWS" and "AWS EC2"
const key = (s: string) =>
  s
    .toLowerCase()
    .replace(/\.js$/, "")
    .replace(/^aws\b.*/, "aws")
    .trim();

/** Skill groups, with each skill marked if a job or project on this page lists it. */
export function skillsWithUsage() {
  const used = new Set([...experience.flatMap((j) => j.tags), ...projects.flatMap((p) => p.tags)].map(key));
  return skillGroups.map((g) => ({
    ...g,
    items: g.items.map((name) => ({ name, used: used.has(key(name)) })),
  }));
}
