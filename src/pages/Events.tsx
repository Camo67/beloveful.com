import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { CalendarDays, Clock3, ExternalLink, Loader2, MapPin } from "lucide-react";
import { Header } from "@/components/Header";
import FooterStrip from "@/components/FooterStrip";
import PageContainer from "@/components/PageContainer";
import { Button } from "@/components/ui/button";
import { GENERATED_EXHIBITIONS } from "@/lib/generatedExhibitions";
import { applyUpcomingEventOverrides } from "@/lib/upcomingEventOverrides";
import { getUpcomingPublishedEvents } from "@/lib/publishedEvents";

interface UpcomingEvent {
  id: string;
  title: string;
  start: string;
  end?: string;
  location: string;
  description: string;
  url: string;
  isAllDay: boolean;
  imageUrl?: string;
  imageAlt?: string;
  imageFit?: "cover" | "contain";
  badgeLabel?: string;
  scheduleLabel?: string;
}

interface UpcomingEventsResponse {
  success: boolean;
  sourceConfigured: boolean;
  events: UpcomingEvent[];
  requestedMonth?: string;
  refreshedAt?: string;
  error?: string;
}

const CHICAGO_TIME_ZONE = "America/Chicago";
const EVENTS_CALENDAR_EMAIL = "events@beloveful.com";
const DEFAULT_PUBLIC_ZOHO_CALENDAR_ID =
  import.meta.env.VITE_EVENTS_CALENDAR_ID?.trim() ||
  "zz08011230de9f7af37169de9dbf574e3b7645706b02352eb08a17c13b60aab14fa1ecb5cda8c6b0b8df5e7960b4b7ff3d69be4a81";
const DEFAULT_ZOHO_EMBED_URL = `https://calendar.zoho.com/zc/ui/embed/#${new URLSearchParams({
  calendar: DEFAULT_PUBLIC_ZOHO_CALENDAR_ID,
  title: EVENTS_CALENDAR_EMAIL,
  type: "1",
  language: "en",
  timezone: CHICAGO_TIME_ZONE,
  showTitle: "1",
  showTimezone: "1",
  view: "month",
  showDetail: "0",
  theme: "1",
  eventColorType: "light",
  calendarColor: "#d96666",
}).toString()}`;
const RESPONSIVE_CALENDAR_HEIGHT = "clamp(640px, 84vh, 920px)";

function isDateOnly(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function parseEventDate(value: string): Date | null {
  if (!value) return null;

  if (isDateOnly(value)) {
    const [year, month, day] = value.split("-").map(Number);
    return new Date(Date.UTC(year, month - 1, day));
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatDateValue(value: string, options: Intl.DateTimeFormatOptions): string {
  const date = parseEventDate(value);
  if (!date) return value;

  return new Intl.DateTimeFormat("en-US", {
    ...options,
    timeZone: isDateOnly(value) ? "UTC" : CHICAGO_TIME_ZONE,
  }).format(date);
}

function formatEventSchedule(event: UpcomingEvent): string {
  if (event.scheduleLabel) {
    return event.scheduleLabel;
  }

  if (!event.start) {
    return "Date coming soon";
  }

  if (event.isAllDay || isDateOnly(event.start)) {
    const startLabel = formatDateValue(event.start, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    if (event.end && event.end !== event.start) {
      const endLabel = formatDateValue(event.end, {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

      return `${startLabel} - ${endLabel} • All day`;
    }

    return `${startLabel} • All day`;
  }

  const startDate = parseEventDate(event.start);
  if (!startDate) return event.start;

  const startLabel = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: CHICAGO_TIME_ZONE,
  }).format(startDate);

  if (!event.end) {
    return `${startLabel} • Chicago time`;
  }

  const endDate = parseEventDate(event.end);
  if (!endDate) {
    return `${startLabel} • Chicago time`;
  }

  const sameDay =
    new Intl.DateTimeFormat("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: CHICAGO_TIME_ZONE,
    }).format(startDate) ===
    new Intl.DateTimeFormat("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: CHICAGO_TIME_ZONE,
    }).format(endDate);

  if (sameDay) {
    const endTime = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: CHICAGO_TIME_ZONE,
      timeZoneName: "short",
    }).format(endDate);

    return `${startLabel} - ${endTime}`;
  }

  const endLabel = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: CHICAGO_TIME_ZONE,
    timeZoneName: "short",
  }).format(endDate);

  return `${startLabel} - ${endLabel}`;
}

function getEventBadge(event: UpcomingEvent): { month: string; day: string } {
  if (!event.start) {
    return { month: "TBD", day: "?" };
  }

  return {
    month: formatDateValue(event.start, { month: "short" }).toUpperCase(),
    day: formatDateValue(event.start, { day: "numeric" }),
  };
}

function formatUrlLabel(value: string): string {
  try {
    const url = new URL(value);
    return url.hostname.replace(/^www\./, "");
  } catch {
    return value;
  }
}

function getEventSortMs(event: UpcomingEvent): number {
  const parsed = parseEventDate(event.start);
  return parsed ? parsed.getTime() : Number.MAX_SAFE_INTEGER;
}

function getYearMonthInTimeZone(date: Date, timeZone: string): string {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
  });
  const parts = formatter.formatToParts(date);
  const map: Record<string, string> = {};

  for (const part of parts) {
    if (part.type !== "literal") {
      map[part.type] = part.value;
    }
  }

  return `${map.year}-${map.month}`;
}

function getEventYearMonth(value: string): string {
  if (isDateOnly(value)) {
    return value.slice(0, 7);
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return "";
  }

  return getYearMonthInTimeZone(parsed, CHICAGO_TIME_ZONE);
}

function formatMonthLabel(monthKey: string): string {
  const [year, month] = monthKey.split("-").map(Number);
  if (!year || !month) {
    return "Current Month";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, 1)));
}

function useCurrentMonthKey(): string {
  const [monthKey, setMonthKey] = useState(() =>
    getYearMonthInTimeZone(new Date(), CHICAGO_TIME_ZONE),
  );

  useEffect(() => {
    const syncMonth = () => {
      setMonthKey(getYearMonthInTimeZone(new Date(), CHICAGO_TIME_ZONE));
    };

    syncMonth();
    const intervalId = window.setInterval(syncMonth, 60_000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return monthKey;
}

function renderEventGrid(events: UpcomingEvent[]) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {events.map((event) => {
        const badge = getEventBadge(event);

        return (
          <article
            key={event.id}
            className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-6 flex flex-col gap-5 shadow-sm"
          >
            {event.imageUrl && (
              <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900">
                <img
                  src={event.imageUrl}
                  alt={event.imageAlt || event.title}
                  className={`h-56 w-full ${
                    event.imageFit === "contain"
                      ? "bg-white object-contain p-6"
                      : "object-cover"
                  }`}
                  loading="lazy"
                />
              </div>
            )}

            <div className="flex items-start justify-between gap-4">
              <div className="w-20 rounded-2xl bg-black text-white dark:bg-white dark:text-black px-3 py-4 text-center">
                <div className="text-[11px] tracking-[0.28em]">{badge.month}</div>
                <div className="text-3xl font-semibold leading-none mt-2">{badge.day}</div>
              </div>
              <span className="inline-flex rounded-full border border-gray-200 dark:border-gray-700 px-3 py-1 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                {event.badgeLabel || (event.isAllDay || isDateOnly(event.start) ? "All Day" : "Timed Event")}
              </span>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-medium text-black dark:text-white">{event.title}</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <CalendarDays className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{formatEventSchedule(event)}</span>
                </div>
                {event.location && (
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>{event.location}</span>
                  </div>
                )}
                {!event.isAllDay && !isDateOnly(event.start) && (
                  <div className="flex items-start gap-2">
                    <Clock3 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Displayed in Chicago time</span>
                  </div>
                )}
              </div>
            </div>

            {event.description && (
              <p className="text-sm leading-6 text-muted-foreground">{event.description}</p>
            )}

            <div className="mt-auto pt-2 space-y-3">
              {event.url ? (
                <>
                  <a href={event.url} target="_blank" rel="noopener noreferrer" className="block">
                    <Button variant="outline" className="w-full gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Event URL
                    </Button>
                  </a>
                  <p className="text-xs text-muted-foreground break-all">
                    {formatUrlLabel(event.url)} • {event.url}
                  </p>
                </>
              ) : (
                <p className="text-xs text-muted-foreground">
                  This event does not currently expose a public event URL.
                </p>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}

async function fetchUpcomingEvents(monthKey: string): Promise<UpcomingEventsResponse> {
  const response = await fetch(`/api/events/upcoming?month=${encodeURIComponent(monthKey)}`, {
    headers: {
      Accept: "application/json",
    },
  });

  const contentType = response.headers.get("content-type") || "";
  const payloadText = await response.text();

  if (!payloadText.trim()) {
    if (response.ok) {
      return {
        success: true,
        sourceConfigured: false,
        events: [],
      };
    }

    throw new Error("Upcoming events API returned an empty response.");
  }

  if (!contentType.includes("application/json")) {
    throw new Error("Upcoming events API returned a non-JSON response.");
  }

  const payload = JSON.parse(payloadText) as UpcomingEventsResponse;
  if (!response.ok && !payload?.success) {
    throw new Error(payload?.error || "Failed to load upcoming events.");
  }

  return payload;
}

export default function Events() {
  const calendarEmbedUrl =
    import.meta.env.VITE_EVENTS_CALENDAR_EMBED?.trim() || DEFAULT_ZOHO_EMBED_URL;
  const exhibitions = GENERATED_EXHIBITIONS;
  const currentMonthKey = useCurrentMonthKey();
  const currentMonthLabel = formatMonthLabel(currentMonthKey);

  const upcomingEventsQuery = useQuery({
    queryKey: ["current-month-events", currentMonthKey],
    queryFn: () => fetchUpcomingEvents(currentMonthKey),
    staleTime: 1000 * 30,
    refetchInterval: 1000 * 60,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: 1,
  });

  const currentMonthEvents = (upcomingEventsQuery.data?.events || [])
    .map(applyUpcomingEventOverrides)
    .filter((event) => getEventYearMonth(event.start) === currentMonthKey)
    .sort((left, right) => getEventSortMs(left) - getEventSortMs(right));
  const sourceConfigured = upcomingEventsQuery.data?.sourceConfigured ?? false;
  const hasLiveEvents = currentMonthEvents.length > 0;
  // When the live calendar feed is unavailable, fall back to the confirmed
  // published schedule so visitors still see real, event-specific cards (each
  // with its own details and link) instead of an error state or a single shared
  // placeholder image repeated across every event.
  const fallbackEvents: UpcomingEvent[] = hasLiveEvents
    ? []
    : getUpcomingPublishedEvents().map((event) => ({
        ...event,
        description: event.description ?? "",
      }));

  return (
    <div className="min-h-screen">
      <Header variant="default" />

      <PageContainer className="space-y-16">
        <div className="text-center space-y-3">
          <p className="text-sm uppercase tracking-[0.35em] text-muted-foreground">Events</p>
          <h1 className="text-3xl md:text-4xl font-light text-black dark:text-white">
            Events & Exhibitions
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Live cards from the public calendar for {currentMonthLabel}, automatically refreshed as calendar events and the month change.
          </p>
        </div>

        <section className="space-y-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-light text-black dark:text-white">{currentMonthLabel}</h2>
              <p className="text-sm text-muted-foreground">
                Current-month events from the Beloveful calendar, with event details and public event images when available.
              </p>
            </div>
            <span className="text-sm text-muted-foreground">
              {hasLiveEvents
                ? `${currentMonthEvents.length} ${currentMonthEvents.length === 1 ? "event" : "events"} this month`
                : `${fallbackEvents.length} upcoming ${fallbackEvents.length === 1 ? "event" : "events"}`}
            </span>
          </div>

          {hasLiveEvents ? (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                This view checks for new calendar events every minute and rolls forward automatically when the month changes.
              </p>
              {renderEventGrid(currentMonthEvents)}
            </div>
          ) : fallbackEvents.length > 0 ? (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Showing the published 2026 schedule while the live calendar feed refreshes. Each card links to the host’s official event page for tickets and details.
              </p>
              {renderEventGrid(fallbackEvents)}
            </div>
          ) : upcomingEventsQuery.isLoading ? (
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-8 text-center text-muted-foreground">
              <div className="inline-flex items-center gap-3">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading this month’s calendar events...
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-8 text-center space-y-2">
              <p className="text-lg text-black dark:text-white">No upcoming events are published right now.</p>
              <p className="text-sm text-muted-foreground">
                {sourceConfigured
                  ? "The list refreshes automatically. Check the embedded calendar below for the live month view while new event cards are published."
                  : "The embedded calendar below stays available for current scheduling details."}
              </p>
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
          <div className="text-center space-y-3">
            <h2 className="text-xl font-semibold text-black dark:text-white">
              {EVENTS_CALENDAR_EMAIL} Calendar
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The public event cards above are normalized from the Zoho feed. The embedded calendar below stays available in month view for Chicago-based scheduling and viewing requests.
            </p>

            <div className="max-w-5xl mx-auto w-full">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-2 sm:p-4">
                <iframe
                  src={calendarEmbedUrl}
                  className="w-full rounded-md"
                  style={{ height: RESPONSIVE_CALENDAR_HEIGHT }}
                  frameBorder="0"
                  scrolling="yes"
                  loading="lazy"
                  title={`${EVENTS_CALENDAR_EMAIL} month calendar`}
                />
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              Calendar times are displayed in Chicago unless your custom embed URL says otherwise.
            </p>
          </div>
        </section>

        <section>
          <div className="space-y-1">
            <h2 className="text-2xl font-light text-black dark:text-white">Past Exhibitions</h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              A selection of exhibitions and shows from recent years.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {exhibitions.map((exhibition, index) => (
              <div key={index} className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-3">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="text-xl font-medium text-black dark:text-white">{exhibition.title}</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                    {exhibition.year}
                  </span>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400">{exhibition.location || "Location available on request"}</p>
                <div className="text-sm">
                  <span
                    className={`px-2 py-1 rounded-full ${
                      exhibition.type === "Solo"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-800"
                        : exhibition.type === "Group"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-800"
                          : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-800"
                    }`}
                  >
                    {exhibition.type}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {exhibitions.filter((exhibition) => exhibition.type === "Solo").length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Solo Exhibitions</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {exhibitions.filter((exhibition) => exhibition.type === "Invitational").length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Invitational</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {exhibitions.filter((exhibition) => exhibition.type === "Group").length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Group Shows</div>
              </div>
            </div>
          </div>
        </section>
      </PageContainer>

      <FooterStrip />
    </div>
  );
}
