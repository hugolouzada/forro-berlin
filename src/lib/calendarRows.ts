import { getUpcomingBerlinEvents, TOME_FORRO_HOST_ID, type ForroEvent } from './fetchEvents';
import { ATOPIA, ATOPIA_ADDRESS, upcomingAtopiaDates } from '../data/atopia';

// PLACEHOLDER — see src/data/exampleEvents.json. Remove this import and the
// spread below before the site goes public.
import exampleData from '../data/exampleEvents.json';

export interface CalendarRow {
  date: string;
  time: string;
  endTime?: string;
  title: string;
  venue: string;
  kind: 'class' | 'event';
  ours: boolean;
  special?: boolean;
  href?: string;
  slug?: string;
}

// PLACEHOLDER pricing — a flat figure for typesetting. The feed carries a
// per-event `price` string (e.g. "Drop in, 10/5 Class ticket"), so this can
// be wired to real data once the display format is agreed.
export const PLACEHOLDER_PRICE = '€10';

/** The feed's three types collapse to the two tags we surface:
 *  a lesson is a "class", anything else (social, festival) is an "event". */
function kindOf(e: ForroEvent): 'class' | 'event' {
  return e.type === 'class' ? 'class' : 'event';
}

/** Where a row points, and whether that leaves the site.
 *
 *  Three cases, in order: the feed gives us a detail URL outright; our own
 *  events carry a slug for their page here; anything else has no page of its
 *  own and falls back to the calendar, so no row is ever a dead end.
 *
 *  Shared by the Special event card and the calendar rows so the two can
 *  never resolve the same event to different destinations. */
export function resolveEventLink(row: CalendarRow, base: string): { href: string; external: boolean } {
  return {
    href: row.href ?? (row.slug ? `${base}/our-events/${row.slug}` : `${base}/calendar`),
    external: /^https?:\/\//.test(row.href ?? ''),
  };
}

/** Every upcoming row, sorted. Shared by the calendar page and the homepage
 *  card so the two can never show a different "next three". */
export async function getCalendarRows(base: string): Promise<CalendarRow[]> {
  const live: CalendarRow[] = (await getUpcomingBerlinEvents()).map(e => ({
    date: e.date,
    time: e.time,
    endTime: e.endTime,
    title: e.title,
    venue: e.venue,
    kind: kindOf(e),
    ours: e.hostId === TOME_FORRO_HOST_ID,
    href: `${e.detailUrl}?backgroundColor=121212`,
  }));

  // Our weekly is not in the aggregator feed, so it is generated locally from
  // the single source of truth in src/data/atopia.ts. Build-time generation
  // means the horizon has to outlast the gap between deploys.
  const atopia: CalendarRow[] = upcomingAtopiaDates(12).map(date => ({
    date,
    time: ATOPIA.classStart,
    endTime: ATOPIA.partyEnd,
    title: `${ATOPIA.name} — weekly forró night`,
    venue: ATOPIA_ADDRESS,
    kind: 'event',
    ours: true,
    href: `${base}/atopia`,
  }));

  const examples = exampleData.events as CalendarRow[];

  return [...live, ...atopia, ...examples].sort((a, b) =>
    (a.date + a.time).localeCompare(b.date + b.time)
  );
}
