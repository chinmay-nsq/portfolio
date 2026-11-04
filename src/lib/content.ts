/** "Feb 2025 — Sept 2025" → "2025", "2024 — 2025" style years for compact rows. */
export function years(period: string) {
  const found = period.match(/\d{4}/g) ?? [];
  const present = /present/i.test(period);
  const [first, last] = [found[0], found[found.length - 1]];
  if (present) return `${first} – now`;
  return first === last ? first : `${first} – ${last}`;
}

