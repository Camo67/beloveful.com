// Published event schedule used as a fallback for the Events page when the live
// calendar feed (/api/events/upcoming) is unavailable.
//
// Each entry is a real, confirmed 2026 appearance. Images are only attached when
// a genuinely event-specific photo is available — we deliberately do NOT reuse a
// single shared promoter logo across every card (that shared-image behavior was
// the problem reported on the Events page).

export interface PublishedEvent {
  id: string;
  title: string;
  start: string; // YYYY-MM-DD
  end?: string; // YYYY-MM-DD
  location: string;
  description?: string;
  url: string;
  isAllDay: boolean;
  imageUrl?: string;
  badgeLabel?: string;
  scheduleLabel?: string;
}

export const PUBLISHED_EVENTS: PublishedEvent[] = [
  {
    id: "the-other-art-fair-chicago-2026",
    title: "The Other Art Fair Chicago",
    start: "2026-04-09",
    end: "2026-04-12",
    location: "4325 N Ravenswood Ave, Chicago, IL 60613",
    url: "https://www.theotherartfair.com/chicago/",
    isAllDay: true,
    badgeLabel: "Featured Fair",
    scheduleLabel: "Thursday, April 9 2026 - Sunday, April 12 2026",
    imageUrl:
      "https://www.theotherartfair.com/chicago/wp-content/uploads/sites/6/2025/12/TOAFChicagoFall2025DayThree_85-4000x2667.jpeg",
    description:
      "OPENING NIGHT Thursday, April 9: 6 – 10pm. GENERAL ENTRY Friday, April 10: 5 – 10pm, Saturday, April 11: 11am – 7pm, Sunday, April 12: 11am – 6pm. Affordable and original artworks from 115 independent artists with immersive installations, performances, DJs, and a fully stocked bar.",
  },
  {
    id: "one-of-a-kind-art-show-2026",
    title: "One of a Kind Art Show",
    start: "2026-04-24",
    end: "2026-04-26",
    location: "222 W Merchandise Mart Plaza, Chicago, IL 60654",
    url: "https://oneofakindshowchicago.com/spring/",
    isAllDay: true,
    scheduleLabel: "Friday, April 24 2026, 10:00 am - Sunday, April 26 2026, 07:00 pm",
    imageUrl:
      "https://oneof-akind.transforms.svdcdn.com/production/general/OOAK-Winter-2017_207.jpg?w=1200&h=630&q=82&auto=format&fit=crop&dm=1762186817&s=e7eda776f486547960d3548c6b1def1c",
    description:
      "Chicago's favorite spring art event returns to the 7th Floor of The Mart, featuring original work from more than 350 artists, designers, and makers. Find Beloveful at booth 5029.",
  },
  {
    id: "old-town-art-fair-2026",
    title: "Old Town Art Fair",
    start: "2026-06-13",
    end: "2026-06-14",
    location: "1763 N. North Park Avenue, Chicago, IL 60614",
    url: "https://www.oldtownartfair.org/",
    isAllDay: true,
  },
  {
    id: "millennium-art-festival-2026",
    title: "Millennium Art Festival",
    start: "2026-06-27",
    end: "2026-06-28",
    location: "180 N Stetson Ave, Chicago, Illinois 60601",
    url: "https://amdurproductions.com/millennium-art-festival/",
    isAllDay: true,
  },
  {
    id: "southport-art-fest-2026",
    title: "Southport Art Fest",
    start: "2026-07-11",
    end: "2026-07-12",
    location: "3733 N Southport Ave, Chicago, IL 60613",
    url: "https://amdurproductions.com/southport-art-fest/",
    isAllDay: true,
  },
  {
    id: "glencoe-festival-of-art-2026",
    title: "Glencoe Festival of Art",
    start: "2026-07-18",
    end: "2026-07-19",
    location: "700 Vernon Ave, Glencoe, IL 60022",
    url: "https://amdurproductions.com/glencoe-festival-of-art/",
    isAllDay: true,
  },
  {
    id: "art-at-the-glen-2026",
    title: "Art at the Glen",
    start: "2026-07-25",
    end: "2026-07-26",
    location: "2030 Tower Dr, Glenview, IL 60026",
    url: "https://amdurproductions.com/event/2022-art-at-the-glen/",
    isAllDay: true,
  },
  {
    id: "wilmette-art-fair-2026",
    title: "Wilmette Art Fair",
    start: "2026-08-01",
    end: "2026-08-02",
    location: "1141 Central Ave, Wilmette, IL 60091",
    url: "https://amdurproductions.com/wilmette-art-fair/",
    isAllDay: true,
  },
  {
    id: "burr-ridge-art-fair-2026",
    title: "Burr Ridge Art Fair",
    start: "2026-08-08",
    end: "2026-08-09",
    location: "701 Village Center Dr, Burr Ridge, IL 60527",
    url: "https://amdurproductions.com/burr-ridge-art-fair/",
    isAllDay: true,
  },
  {
    id: "printers-row-art-fest-2026",
    title: "Printer's Row Art Fest",
    start: "2026-08-15",
    end: "2026-08-16",
    location: "728 S Dearborn St, Chicago, IL 60605",
    url: "https://amdurproductions.com/printers-row-art-fest-new/",
    isAllDay: true,
  },
  {
    id: "evanston-art-big-fork-festival-2026",
    title: "Evanston Art & Big Fork Festival",
    start: "2026-08-22",
    end: "2026-08-23",
    location: "800 Chicago St, Evanston, IL 60201",
    url: "https://amdurproductions.com/evanston-art-and-big-fork-festival/",
    isAllDay: true,
  },
  {
    id: "magnificent-mile-art-festival-2026",
    title: "The Magnificent Mile Art Festival",
    start: "2026-09-19",
    end: "2026-09-20",
    location: "875 N Michigan Avenue, Chicago, IL 60611",
    url: "https://amdurproductions.com/the-fall-magnificent-mile-art-festival/",
    isAllDay: true,
  },
];

function todayDateString(): string {
  // Compare against the current date in Chicago, where the events take place.
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formatter.format(new Date());
}

/**
 * Published events whose end date is today or later, sorted soonest-first.
 * Used as a graceful fallback when the live calendar feed is unavailable.
 */
export function getUpcomingPublishedEvents(): PublishedEvent[] {
  const today = todayDateString();
  return PUBLISHED_EVENTS.filter((event) => (event.end || event.start) >= today).sort(
    (left, right) => left.start.localeCompare(right.start),
  );
}
