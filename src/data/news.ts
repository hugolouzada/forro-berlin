// PLACEHOLDER DATA — typesetting only, same status as exampleEvents.json.
// Seeded with example announcements so the News card and page have real
// content to lay out. Replace with actual announcements before launch.
export interface NewsItem {
  title: string;
  detail?: string;
  /** ISO date. Item is dropped once this date has passed. */
  until?: string;
}

export const NEWS: NewsItem[] = [
  {
    title: 'Atopia closed 27/08 for renovations',
    detail: 'No class or social this Wednesday — the venue is closed for renovation work. We resume the following week as normal.',
    until: '2026-08-28',
  },
  {
    title: 'Board elections coming up',
    detail: 'Tome Forró Berlin e.V. is holding elections for its Vorstand. Details on how to stand or vote will follow.',
    until: '2026-11-01',
  },
];

/** Active items (not past their `until` date), soonest-expiring first. */
export function activeNews(items: NewsItem[] = NEWS, today = new Date()): NewsItem[] {
  return items
    .filter(n => !n.until || new Date(n.until) >= today)
    .sort((a, b) => {
      if (!a.until) return 1;
      if (!b.until) return -1;
      return a.until.localeCompare(b.until);
    });
}
