import { useMemo } from "react";
import { Header } from "@/components/Header";
import FooterStrip from "@/components/FooterStrip";
import PageContainer from "@/components/PageContainer";
import { usePageContent } from "@/hooks/use-page-content";
import { useSiteSettings } from "@/hooks/use-site-settings";
import { CalendarDays, ExternalLink, MapPin } from "lucide-react";

interface UpcomingEvent {
  title: string;
  start_date: string;
  end_date?: string;
  venue?: string;
  location?: string;
  description?: string;
  image_url?: string;
  image_alt?: string;
  event_url?: string;
  cta_label?: string;
}

const SHORT_DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});

const FULL_DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
});

const EVENTS_CONTENT_DEFAULTS = {
  eyebrow: "Events",
  title: "Events & Schedule",
  intro:
    "Use the live calendar below for current availability, confirmed viewings, and scheduling updates.",
  schedule_heading: "Upcoming Schedule",
  schedule_intro:
    "Confirmed events can be featured here with poster-style imagery, dates, locations, and direct links.",
  schedule_empty:
    "Confirmed upcoming events will appear here soon. Until then, use the live calendar below or reach out directly for a verified schedule update.",
  upcoming_events_json: "[]",
  calendar_heading: "Schedule a Viewing",
  calendar_body:
    "This live calendar is the only published source of current availability and upcoming event timing.",
  calendar_note:
    "If you need something that is not reflected on the calendar, reach out directly for a verified update.",
  archive_heading: "Exhibition Archive",
  archive_body:
    "Past exhibition listings are temporarily offline while they are being reviewed for accuracy. For verified exhibition history or event questions, please contact Tony directly.",
  archive_button: "Email Tony",
};

function parseDate(value?: string) {
  if (!value) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function formatEventDateRange(startRaw?: string, endRaw?: string) {
  const start = parseDate(startRaw);
  const end = parseDate(endRaw) ?? start;

  if (!start || !end) {
    return "";
  }

  if (start.toDateString() === end.toDateString()) {
    return FULL_DATE_FORMATTER.format(start);
  }

  return `${SHORT_DATE_FORMATTER.format(start)} - ${FULL_DATE_FORMATTER.format(end)}`;
}

function formatEventBadge(startRaw?: string, endRaw?: string) {
  const start = parseDate(startRaw);
  const end = parseDate(endRaw) ?? start;

  if (!start || !end) {
    return "Confirmed Event";
  }

  if (start.toDateString() === end.toDateString()) {
    return SHORT_DATE_FORMATTER.format(start);
  }

  return `${SHORT_DATE_FORMATTER.format(start)} to ${SHORT_DATE_FORMATTER.format(end)}`;
}

function parseUpcomingEvents(raw: string): UpcomingEvent[] {
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === "object")
      .map((item) => ({
        title: String(item.title || "").trim(),
        start_date: String(item.start_date || "").trim(),
        end_date: String(item.end_date || "").trim() || undefined,
        venue: String(item.venue || "").trim() || undefined,
        location: String(item.location || "").trim() || undefined,
        description: String(item.description || "").trim() || undefined,
        image_url: String(item.image_url || "").trim() || undefined,
        image_alt: String(item.image_alt || "").trim() || undefined,
        event_url: String(item.event_url || "").trim() || undefined,
        cta_label: String(item.cta_label || "").trim() || undefined,
      }))
      .filter((item) => item.title && item.start_date);
  } catch {
    return [];
  }
}

export default function Events() {
  const { data: content } = usePageContent("events", EVENTS_CONTENT_DEFAULTS);
  const { data: siteSettings } = useSiteSettings();
  const upcomingEvents = useMemo(() => {
    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    return parseUpcomingEvents(content.upcoming_events_json)
      .filter((event) => {
        const endDate = parseDate(event.end_date) ?? parseDate(event.start_date);
        return !endDate || endDate >= startOfToday;
      })
      .sort((left, right) => {
        const leftDate = parseDate(left.start_date);
        const rightDate = parseDate(right.start_date);

        if (!leftDate && !rightDate) return 0;
        if (!leftDate) return 1;
        if (!rightDate) return -1;
        return leftDate.getTime() - rightDate.getTime();
      });
  }, [content.upcoming_events_json]);

  const calendarEmbedUrl =
    import.meta.env.VITE_EVENTS_CALENDAR_EMBED ??
    "https://calendar.zoho.com/zc/ui/embed/#calendar=zz08011230de9f7af37169de9dbf574e3b7645706b02352eb08a17c13b60aab14fa1ecb5cda8c6b0b8df5e7960b4b7ff3d69be4a81&title=workshop%40beloveful.com&type=1&language=en&timezone=America%2FNew_York&showTitle=1&showTimezone=1&view=month&showDetail=0&theme=1&eventColorType=light&calendarColor=%23bfbf4d";

  const archiveEmailHref = `mailto:${siteSettings.contact_email}?subject=${encodeURIComponent(
    "Beloveful events inquiry",
  )}`;

  return (
    <div className="min-h-screen">
      <Header variant="default" />

      <PageContainer className="space-y-10 md:space-y-16">
        <div className="space-y-3 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-muted-foreground">{content.eyebrow}</p>
          <h1 className="text-3xl font-light text-black dark:text-white md:text-4xl">{content.title}</h1>
          <p className="mx-auto max-w-2xl text-sm text-gray-600 dark:text-gray-400 md:text-base">
            {content.intro}
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-light text-black dark:text-white">{content.schedule_heading}</h2>
            <p className="max-w-3xl text-sm text-gray-600 dark:text-gray-400 md:text-base">
              {content.schedule_intro}
            </p>
          </div>

          {upcomingEvents.length > 0 ? (
            <div className="grid gap-6">
              {upcomingEvents.map((event) => {
                const locationLine = [event.venue, event.location].filter(Boolean).join(" • ");

                return (
                  <article
                    key={`${event.title}-${event.start_date}`}
                    className="overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-950"
                  >
                    <div className="grid md:grid-cols-[280px_1fr]">
                      <div className="relative min-h-[220px] overflow-hidden bg-stone-100 dark:bg-stone-900">
                        {event.image_url ? (
                          <img
                            src={event.image_url}
                            alt={event.image_alt || event.title}
                            className="h-full w-full object-cover"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_top,_#f5f5f4,_#d6d3d1_58%,_#a8a29e)] px-6 text-center text-2xl font-light tracking-[0.2em] text-stone-800 dark:bg-[radial-gradient(circle_at_top,_#292524,_#1c1917_58%,_#0c0a09)] dark:text-stone-100">
                            {event.title}
                          </div>
                        )}

                        <div className="absolute left-4 top-4 inline-flex rounded-full bg-black/80 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-white backdrop-blur dark:bg-white/85 dark:text-black">
                          {formatEventBadge(event.start_date, event.end_date)}
                        </div>
                      </div>

                      <div className="flex flex-col justify-between gap-6 p-6 md:p-8">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <h3 className="text-2xl font-light text-black dark:text-white">{event.title}</h3>

                            <div className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <div className="flex items-start gap-2">
                                <CalendarDays className="mt-0.5 h-4 w-4 shrink-0" />
                                <span>{formatEventDateRange(event.start_date, event.end_date)}</span>
                              </div>

                              {locationLine ? (
                                <div className="flex items-start gap-2">
                                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                                  <span>{locationLine}</span>
                                </div>
                              ) : null}
                            </div>
                          </div>

                          {event.description ? (
                            <p className="max-w-3xl text-sm leading-7 text-gray-700 dark:text-gray-300 md:text-base">
                              {event.description}
                            </p>
                          ) : null}
                        </div>

                        {event.event_url ? (
                          <div>
                            <a
                              href={event.event_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-sm font-medium text-black transition hover:opacity-70 dark:text-white"
                            >
                              {event.cta_label || "View Event"}
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-[28px] border border-dashed border-gray-300 bg-stone-50 px-6 py-10 text-center dark:border-gray-700 dark:bg-stone-950">
              <p className="mx-auto max-w-3xl text-sm text-gray-600 dark:text-gray-400 md:text-base">
                {content.schedule_empty}
              </p>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
          <div className="space-y-4 text-center">
            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-black dark:text-white">{content.calendar_heading}</h2>
              <p className="mx-auto max-w-3xl text-muted-foreground">{content.calendar_body}</p>
            </div>

            <div className="mx-auto max-w-5xl">
              <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <iframe
                  src={calendarEmbedUrl}
                  width="100%"
                  height="600"
                  frameBorder="0"
                  scrolling="no"
                  title="Beloveful events calendar"
                />
              </div>
            </div>

            <p className="mx-auto max-w-3xl text-sm text-muted-foreground">{content.calendar_note}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-dashed border-gray-300 p-6 dark:border-gray-700">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
            <h2 className="text-2xl font-light text-black dark:text-white">{content.archive_heading}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 md:text-base">{content.archive_body}</p>
            <a
              href={archiveEmailHref}
              className="inline-flex items-center justify-center rounded-md bg-black px-5 py-2 text-sm font-medium text-white transition hover:opacity-85 dark:bg-white dark:text-black"
            >
              {content.archive_button}
            </a>
          </div>
        </div>
      </PageContainer>

      <FooterStrip />
    </div>
  );
}
