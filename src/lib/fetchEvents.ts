/** Organizer UUID for Tome Forró Berlin e.V. in the dance-events feed.
 *  Lets us mark our own events without hand-curating a list. */
export const TOME_FORRO_HOST_ID = 'b1929a66-8b9c-411f-abd5-bcf99acae4f5';

export interface ForroEvent {
  uuid: string;
  title: string;
  type: 'social' | 'class' | 'festival';
  date: string;
  time: string;
  endTime?: string;
  venue: string;
  description: string;
  pictureUrl?: string;
  detailUrl: string;
  hostId?: string;
  hostName?: string;
}

function mapType(tags: string[]): 'social' | 'class' | 'festival' {
  if (tags.includes('Lesson')) return 'class';
  if (tags.includes('Festival')) return 'festival';
  return 'social';
}

function toBerlin(iso: string): { date: string; time: string } {
  const d = new Date(iso);
  return {
    date: d.toLocaleDateString('sv-SE', { timeZone: 'Europe/Berlin' }),
    time: d.toLocaleTimeString('en-GB', { timeZone: 'Europe/Berlin', hour: '2-digit', minute: '2-digit', hour12: false }),
  };
}

export async function getUpcomingBerlinEvents(): Promise<ForroEvent[]> {
  const now = new Date().toISOString();
  const url =
    `https://api.dance-events-app.com/events/` +
    `?location_distance=50000&location_point=13.405,52.52` +
    `&filter_domain=forr%C3%B3&filter_start_date_gt=${encodeURIComponent(now)}&page_limit=50`;

  let data: { results: any[] };
  try {
    const res = await fetch(url);
    if (!res.ok) return [];
    data = await res.json();
  } catch {
    return [];
  }

  return data.results.map((e: any) => {
    const start = toBerlin(e.start_date);
    const end = e.end_date ? toBerlin(e.end_date) : null;
    return {
      uuid: e.uuid,
      title: e.name,
      type: mapType(e.tags ?? []),
      date: start.date,
      time: start.time,
      endTime: end?.time,
      venue: e.location?.[0]?.data?.locationMainText ?? '',
      description: e.short_description || '',
      pictureUrl: e.event_picture_link ?? undefined,
      detailUrl: `https://service.dance-events-app.com/plugin/event/${e.uuid}`,
      hostId: e.host ?? undefined,
      hostName: e.host_details?.username ?? undefined,
    };
  });
}
