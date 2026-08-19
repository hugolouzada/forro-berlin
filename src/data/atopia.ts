/** Our weekly event. Defined once and read by the homepage card, the Atopia
 *  page, and the calendar, so the three can never drift apart. */
export const ATOPIA = {
  name: 'Atopia',
  /** Day of week, 0 = Sunday. Wednesday. */
  weekday: 3,
  classStart: '20:00',
  classEnd: '21:00',
  partyStart: '21:00',
  partyEnd: '00:00',
  price: '€10',
  venue: 'Atopia Kaffeehaus',
  street: 'Prenzlauer Allee 187',
  postalCode: '10405',
  city: 'Berlin',
  mapsUrl: 'https://maps.app.goo.gl/JG91tYChA5dey5Uw7',
} as const;

export const ATOPIA_ADDRESS = `${ATOPIA.venue}, ${ATOPIA.street}, ${ATOPIA.postalCode} ${ATOPIA.city}`;

/** The next `count` occurrences as ISO dates, starting today if today is the
 *  weekday. Generated at build time, so the horizon needs to outlast the gap
 *  between deploys — see the staleness note in the plan. */
export function upcomingAtopiaDates(count = 12, from: Date = new Date()): string[] {
  const dates: string[] = [];
  const d = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  d.setDate(d.getDate() + ((ATOPIA.weekday - d.getDay() + 7) % 7));

  for (let i = 0; i < count; i += 1) {
    dates.push(
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    );
    d.setDate(d.getDate() + 7);
  }
  return dates;
}
