type UpcomingEventLike = {
  title: string;
  start: string;
  location: string;
  description?: string;
  url?: string;
  imageUrl?: string;
  badgeLabel?: string;
  scheduleLabel?: string;
};

type UpcomingEventOverride = Partial<
  Pick<UpcomingEventLike, "description" | "url" | "imageUrl" | "badgeLabel" | "scheduleLabel">
>;

function normalizeEventDate(value: string): string {
  if (!value) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value.trim();
  }

  return parsed.toISOString().slice(0, 10);
}

function buildOverrideKey(title: string, start: string, location: string): string {
  return [
    title.trim().toLowerCase(),
    normalizeEventDate(start),
    location.trim().toLowerCase(),
  ].join("|");
}

const UPCOMING_EVENT_OVERRIDES = new Map<string, UpcomingEventOverride>([
  [
    buildOverrideKey(
      "The Other Art Fair Chicago",
      "2026-04-09",
      "4325 N Ravenswood Ave, Chicago, IL 60613",
    ),
    {
      badgeLabel: "Featured Fair",
      scheduleLabel: "Thursday, April 9 2026 - Sunday, April 12 2026",
      url: "https://www.theotherartfair.com/chicago/",
      imageUrl:
        "https://www.theotherartfair.com/chicago/wp-content/uploads/sites/6/2025/12/TOAFChicagoFall2025DayThree_85-4000x2667.jpeg",
      description:
        "OPENING NIGHT Thursday, April 9: 6 – 10pm GENERAL ENTRY Friday, April 10: 5 – 10pm Saturday, April 11: 11am – 7pm Sunday, April 12: 11am – 6pm When the art world as you knew it went one way, we went the other. Where elitism is the norm, we dared to deviate. Art isn’t confined to convention or rule, and how you enjoy it shouldn’t be either. We’ve created something different, and we want you to experience it. We combine affordable and original artworks and 115 independent artists with immersive installations, performances, DJs – and a fully stocked bar. Here, art is for everyone. So why not do something impulsive, get excited, and revel in the creativity? You belong here.",
    },
  ],
  [
    buildOverrideKey(
      "Old Town Art Fair",
      "2026-06-13",
      "1763 N. North Park Avenue Chicago, IL 60614",
    ),
    {
      url: "https://www.oldtownartfair.org/",
    },
  ],
  [
    buildOverrideKey(
      "Milennium Art Fair",
      "2026-06-27",
      "180 N Stetson Ave, Chicago, Illinois 60601",
    ),
    {
      url: "https://amdurproductions.com/millennium-art-festival/",
    },
  ],
  [
    buildOverrideKey(
      "Southport Art Fest",
      "2026-07-11",
      "3733 N Southport Ave, Chicago, IL 60613",
    ),
    {
      url: "https://amdurproductions.com/southport-art-fest/",
    },
  ],
  [
    buildOverrideKey(
      "Glencoe Festival of Art",
      "2026-07-18",
      "700 Vernon Ave, Glencoe, IL 60022",
    ),
    {
      url: "https://amdurproductions.com/glencoe-festival-of-art/",
    },
  ],
  [
    buildOverrideKey(
      "Art at the Glen",
      "2026-07-25",
      "2030 Tower Dr, Glenview, IL 60026",
    ),
    {
      url: "https://amdurproductions.com/event/2022-art-at-the-glen/",
    },
  ],
  [
    buildOverrideKey(
      "Wilmette Art Fair",
      "2026-08-01",
      "1141 Central Ave, Wilmette, IL 60091",
    ),
    {
      url: "https://amdurproductions.com/wilmette-art-fair/",
    },
  ],
  [
    buildOverrideKey(
      "Burr Ridge Art Fair",
      "2026-08-08",
      "701 Village Center Dr, Burr Ridge, IL 60527",
    ),
    {
      url: "https://amdurproductions.com/burr-ridge-art-fair/",
    },
  ],
  [
    buildOverrideKey(
      "Printer’s Row Art Fest",
      "2026-08-15",
      "728 S Dearborn St, Chicago, IL 60605",
    ),
    {
      url: "https://amdurproductions.com/printers-row-art-fest-new/",
    },
  ],
  [
    buildOverrideKey(
      "Evanston Art & Big Fork Festival!",
      "2026-08-22",
      "800 Chicago St, Evanston, IL 60201",
    ),
    {
      url: "https://amdurproductions.com/evanston-art-and-big-fork-festival/",
    },
  ],
  [
    buildOverrideKey(
      "The Magnificent Mile™ Art Festival",
      "2026-09-19",
      "875 N Michigan Avenue, Chicago, IL 60611",
    ),
    {
      url: "https://amdurproductions.com/the-fall-magnificent-mile-art-festival/",
    },
  ],
  [
    buildOverrideKey(
      "One of a Kind Art Show",
      "2026-04-24",
      "222 W Merchandise Mart Plaza, Chicago, IL 60654",
    ),
    {
      scheduleLabel: "Friday, April 24 2026, 10:00 am - Sunday, April 26 2026, 07:00 pm",
      url: "https://oneofakindshowchicago.com/spring/",
      imageUrl:
        "https://oneof-akind.transforms.svdcdn.com/production/general/OOAK-Winter-2017_207.jpg?w=1200&h=630&q=82&auto=format&fit=crop&dm=1762186817&s=e7eda776f486547960d3548c6b1def1c",
      description:
        "Chicago's favorite 3-day spring art event returns in full bloom. The One of a Kind Spring Show takes over the 7th Floor of The Mart from Friday, April 24 through Sunday, April 26, featuring original work from more than 350 artists, designers, and makers across North America, including 35 emerging artists and more than 150 first-time participants. I'll be showcasing at booth 5029, see you then :)",
    },
  ],
]);

export function applyUpcomingEventOverrides<T extends UpcomingEventLike>(event: T): T {
  const override = UPCOMING_EVENT_OVERRIDES.get(
    buildOverrideKey(event.title, event.start, event.location),
  );

  if (!override) {
    return event;
  }

  return {
    ...event,
    ...override,
  };
}
