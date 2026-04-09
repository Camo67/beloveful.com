import { applyUpcomingEventOverrides } from '../../../src/lib/upcomingEventOverrides';

interface Env {
  ZOHO_PUBLIC_EVENTS_FEED_URL?: string;
  ZOHO_PUBLIC_CALENDAR_ID?: string;
}

type UpcomingEvent = {
  id: string;
  title: string;
  start: string;
  end?: string;
  location: string;
  description: string;
  url: string;
  isAllDay: boolean;
  imageUrl?: string;
};

type UpcomingEventWithTiming = UpcomingEvent & {
  _startMs: number;
  _endMs: number;
};

const DEFAULT_TIME_ZONE = 'America/Chicago';
const DEFAULT_PUBLIC_ZOHO_CALENDAR_ID =
  'zz08011230de9f7af37169de9dbf574e3b7645706b02352eb08a17c13b60aab14fa1ecb5cda8c6b0b8df5e7960b4b7ff3d69be4a81';
const DAY_MS = 24 * 60 * 60 * 1000;
const ZOHO_MONTH_LOOKAHEAD = 12;
const EVENT_ARRAY_KEYS = ['events', 'items', 'data', 'entries', 'results', 'upcoming'];
const SOCIAL_IMAGE_META_KEYS = ['twitter:image', 'twitter:image:src', 'og:image'];
const SOCIAL_IMAGE_CACHE = new Map<string, string>();

function jsonResponse(payload: unknown, init: ResponseInit = {}): Response {
  return new Response(JSON.stringify(payload), {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  });
}

function toRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object' ? (value as Record<string, unknown>) : null;
}

function firstNonEmpty(...values: unknown[]): string {
  for (const value of values) {
    if (typeof value !== 'string') continue;
    const trimmed = value.trim();
    if (trimmed) return trimmed;
  }
  return '';
}

function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, ' ');
}

function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>');
}

function normalizeWhitespace(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

function cleanText(value: unknown): string {
  if (typeof value !== 'string') return '';
  return normalizeWhitespace(stripHtml(value));
}

function parseMetaAttributes(tag: string): Record<string, string> {
  const attributes: Record<string, string> = {};
  const attributePattern = /([a-zA-Z:-]+)\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+))/g;

  for (const match of tag.matchAll(attributePattern)) {
    const key = match[1].toLowerCase();
    const rawValue = match[3] ?? match[4] ?? match[5] ?? '';
    attributes[key] = decodeHtmlEntities(rawValue.trim());
  }

  return attributes;
}

function extractSocialImageFromHtml(html: string, pageUrl: string): string {
  const metaTags = html.match(/<meta\b[^>]*>/gi) || [];

  for (const metaKey of SOCIAL_IMAGE_META_KEYS) {
    for (const tag of metaTags) {
      const attributes = parseMetaAttributes(tag);
      const key = (attributes.name || attributes.property || '').toLowerCase();
      const content = attributes.content || '';

      if (key !== metaKey || !content) continue;

      try {
        return new URL(content, pageUrl).toString();
      } catch {
        return content;
      }
    }
  }

  return '';
}

function extractFirstUrl(...values: unknown[]): string {
  const directMatchPattern = /https?:\/\/[^\s<>"']+/i;

  for (const value of values) {
    if (typeof value !== 'string') continue;
    const trimmed = value.trim();
    if (!trimmed) continue;
    if (/^https?:\/\//i.test(trimmed)) {
      return trimmed;
    }
    const match = trimmed.match(directMatchPattern);
    if (match) {
      return match[0].replace(/[),.;]+$/, '');
    }
  }

  return '';
}

function isMonthKey(value: string): boolean {
  return /^\d{4}-\d{2}$/.test(value);
}

function formatDateOnly(year: number, month: number, day: number): string {
  return [
    String(year).padStart(4, '0'),
    String(month).padStart(2, '0'),
    String(day).padStart(2, '0'),
  ].join('-');
}

function parseDateOnlyString(value: string): { year: number; month: number; day: number } | null {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;

  return {
    year: Number(match[1]),
    month: Number(match[2]),
    day: Number(match[3]),
  };
}

function formatCompactDate(year: number, month: number, day: number): string {
  return `${String(year).padStart(4, '0')}${String(month).padStart(2, '0')}${String(day).padStart(2, '0')}`;
}

function parseCompactDateString(
  value: string,
): { year: number; month: number; day: number } | null {
  const match = value.match(/^(\d{4})(\d{2})(\d{2})$/);
  if (!match) return null;

  return {
    year: Number(match[1]),
    month: Number(match[2]),
    day: Number(match[3]),
  };
}

function subtractOneDay(dateOnly: string): string {
  const parts = parseDateOnlyString(dateOnly);
  if (!parts) return dateOnly;

  const date = new Date(Date.UTC(parts.year, parts.month - 1, parts.day));
  date.setUTCDate(date.getUTCDate() - 1);

  return formatDateOnly(
    date.getUTCFullYear(),
    date.getUTCMonth() + 1,
    date.getUTCDate(),
  );
}

function getTimeZoneOffsetMs(date: Date, timeZone: string): number {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  });

  const parts = formatter.formatToParts(date);
  const partMap: Record<string, string> = {};

  for (const part of parts) {
    if (part.type !== 'literal') {
      partMap[part.type] = part.value;
    }
  }

  const utcMs = Date.UTC(
    Number(partMap.year),
    Number(partMap.month) - 1,
    Number(partMap.day),
    Number(partMap.hour),
    Number(partMap.minute),
    Number(partMap.second),
  );

  return utcMs - date.getTime();
}

function zonedDateTimeToUtcMs(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  second: number,
  timeZone: string,
): number {
  const wallClockMs = Date.UTC(year, month - 1, day, hour, minute, second);
  let result = wallClockMs;

  for (let index = 0; index < 3; index += 1) {
    const offset = getTimeZoneOffsetMs(new Date(result), timeZone);
    const adjusted = wallClockMs - offset;
    if (adjusted === result) break;
    result = adjusted;
  }

  return result;
}

type ParsedTimestamp = {
  raw: string;
  timestampMs: number;
  isAllDay: boolean;
};

type ZohoEmbeddedEventRecord = Record<string, string | number | boolean | unknown[]>;

function parseTimestamp(value: unknown, defaultTimeZone = DEFAULT_TIME_ZONE): ParsedTimestamp | null {
  const record = toRecord(value);
  if (record) {
    return (
      parseTimestamp(record.dateTime, firstNonEmpty(record.timeZone, record.timezone, defaultTimeZone)) ||
      parseTimestamp(record.date, firstNonEmpty(record.timeZone, record.timezone, defaultTimeZone)) ||
      parseTimestamp(record.value, firstNonEmpty(record.timeZone, record.timezone, defaultTimeZone))
    );
  }

  if (typeof value === 'number') {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return null;
    return {
      raw: date.toISOString(),
      timestampMs: date.getTime(),
      isAllDay: false,
    };
  }

  if (typeof value !== 'string') return null;

  const trimmed = value.trim();
  if (!trimmed) return null;

  const dateOnly = parseDateOnlyString(trimmed);
  if (dateOnly) {
    return {
      raw: trimmed,
      timestampMs: zonedDateTimeToUtcMs(
        dateOnly.year,
        dateOnly.month,
        dateOnly.day,
        0,
        0,
        0,
        defaultTimeZone,
      ),
      isAllDay: true,
    };
  }

  const compactDateOnly = trimmed.match(/^(\d{4})(\d{2})(\d{2})$/);
  if (compactDateOnly) {
    return {
      raw: formatDateOnly(
        Number(compactDateOnly[1]),
        Number(compactDateOnly[2]),
        Number(compactDateOnly[3]),
      ),
      timestampMs: zonedDateTimeToUtcMs(
        Number(compactDateOnly[1]),
        Number(compactDateOnly[2]),
        Number(compactDateOnly[3]),
        0,
        0,
        0,
        defaultTimeZone,
      ),
      isAllDay: true,
    };
  }

  const compactDateTime = trimmed.match(
    /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})?(Z)?$/,
  );
  if (compactDateTime) {
    const year = Number(compactDateTime[1]);
    const month = Number(compactDateTime[2]);
    const day = Number(compactDateTime[3]);
    const hour = Number(compactDateTime[4]);
    const minute = Number(compactDateTime[5]);
    const second = Number(compactDateTime[6] || '0');
    const utcMs = compactDateTime[7]
      ? Date.UTC(year, month - 1, day, hour, minute, second)
      : zonedDateTimeToUtcMs(year, month, day, hour, minute, second, defaultTimeZone);

    return {
      raw: new Date(utcMs).toISOString(),
      timestampMs: utcMs,
      isAllDay: false,
    };
  }

  const parsed = new Date(trimmed);
  if (Number.isNaN(parsed.getTime())) return null;

  return {
    raw: parsed.toISOString(),
    timestampMs: parsed.getTime(),
    isAllDay: false,
  };
}

function getYearMonthInTimeZone(date: Date, timeZone: string): string {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
  });
  const parts = formatter.formatToParts(date);
  const map: Record<string, string> = {};

  for (const part of parts) {
    if (part.type !== 'literal') {
      map[part.type] = part.value;
    }
  }

  return `${map.year}-${map.month}`;
}

function getEventYearMonth(start: string, timeZone = DEFAULT_TIME_ZONE): string {
  if (/^\d{4}-\d{2}-\d{2}$/.test(start)) {
    return start.slice(0, 7);
  }

  const parsed = new Date(start);
  if (Number.isNaN(parsed.getTime())) return '';

  return getYearMonthInTimeZone(parsed, timeZone);
}

function isCurrentMonthEvent(start: string, timeZone = DEFAULT_TIME_ZONE, now = new Date()): boolean {
  return getEventYearMonth(start, timeZone) === getYearMonthInTimeZone(now, timeZone);
}

async function fetchSocialImageUrl(pageUrl: string): Promise<string> {
  const normalizedUrl = pageUrl.trim();
  if (!normalizedUrl) return '';
  if (SOCIAL_IMAGE_CACHE.has(normalizedUrl)) {
    return SOCIAL_IMAGE_CACHE.get(normalizedUrl) || '';
  }

  try {
    const response = await fetch(normalizedUrl, {
      headers: {
        Accept: 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.8',
      },
    });

    if (!response.ok) {
      SOCIAL_IMAGE_CACHE.set(normalizedUrl, '');
      return '';
    }

    const html = await response.text();
    const imageUrl = extractSocialImageFromHtml(html, normalizedUrl);
    SOCIAL_IMAGE_CACHE.set(normalizedUrl, imageUrl);
    return imageUrl;
  } catch {
    SOCIAL_IMAGE_CACHE.set(normalizedUrl, '');
    return '';
  }
}

async function enrichCurrentMonthEventsWithSocialImages(
  events: UpcomingEvent[],
): Promise<UpcomingEvent[]> {
  return Promise.all(
    events.map(async (event) => {
      if (event.imageUrl || !event.url || !isCurrentMonthEvent(event.start)) {
        return event;
      }

      const imageUrl = await fetchSocialImageUrl(event.url);
      if (!imageUrl) {
        return event;
      }

      return {
        ...event,
        imageUrl,
      };
    }),
  );
}

function formatDateForZohoRange(date: Date): string {
  return [
    String(date.getUTCFullYear()).padStart(4, '0'),
    String(date.getUTCMonth() + 1).padStart(2, '0'),
    String(date.getUTCDate()).padStart(2, '0'),
  ].join('/');
}

function parseZohoTimeParts(value: string): { hour: number; minute: number } | null {
  const match = value.match(/^(\d{2})(\d{2})$/);
  if (!match) return null;

  return {
    hour: Number(match[1]),
    minute: Number(match[2]),
  };
}

function parseZohoDateTime(
  dateValue: string,
  timeValue: string,
  timeZone = DEFAULT_TIME_ZONE,
): ParsedTimestamp | null {
  const dateParts = parseCompactDateString(dateValue);
  const timeParts = parseZohoTimeParts(timeValue);
  if (!dateParts || !timeParts) return null;

  const timestampMs = zonedDateTimeToUtcMs(
    dateParts.year,
    dateParts.month,
    dateParts.day,
    timeParts.hour,
    timeParts.minute,
    0,
    timeZone,
  );

  return {
    raw: new Date(timestampMs).toISOString(),
    timestampMs,
    isAllDay: false,
  };
}

function getZohoCalendarRange(now = new Date()): { start: string; end: string } {
  const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
  const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + ZOHO_MONTH_LOOKAHEAD, 0));

  return {
    start: formatDateForZohoRange(start),
    end: formatDateForZohoRange(end),
  };
}

function normalizeZohoEmbeddedEvent(
  eventKey: string,
  value: ZohoEmbeddedEventRecord,
): UpcomingEventWithTiming | null {
  const title = cleanText(value.SUM);
  const location = cleanText(value.LOC);
  const description = cleanText(value.DESC);
  const startDate = firstNonEmpty(value.SD);
  const endDate = firstNonEmpty(value.ED);
  const startTime = firstNonEmpty(value.ST);
  const endTime = firstNonEmpty(value.ET);
  const url = extractFirstUrl(value.URL, value.LINK, value.PERMALINK, value.EVENTURL);
  const imageUrl = extractFirstUrl(value.IMAGE, value.IMG, value.BANNER, value.POSTER);
  const isAllDay = firstNonEmpty(value.ADAY) === '1';

  let start: ParsedTimestamp | null = null;
  let end: ParsedTimestamp | null = null;

  if (isAllDay) {
    start = parseTimestamp(startDate, DEFAULT_TIME_ZONE);
    end = parseTimestamp(endDate || startDate, DEFAULT_TIME_ZONE);
  } else {
    start = parseZohoDateTime(startDate, startTime || '0000', DEFAULT_TIME_ZONE);
    end = parseZohoDateTime(endDate || startDate, endTime || startTime || '0000', DEFAULT_TIME_ZONE);
  }

  if (!start) return null;

  const normalizedEnd = end || start;
  const finalTitle = title || cleanText(value.NAME) || 'Untitled event';
  const finalEndRaw =
    isAllDay && normalizedEnd.raw === start.raw ? undefined : normalizedEnd.raw;

  return {
    id: firstNonEmpty(value.EID, eventKey, value.UID, value.ID) || eventKey,
    title: finalTitle,
    start: start.raw,
    end: finalEndRaw,
    location,
    description,
    url,
    isAllDay,
    imageUrl,
    _startMs: start.timestampMs,
    _endMs: normalizedEnd.timestampMs,
  };
}

function normalizeZohoEmbeddedEvents(payload: string): UpcomingEventWithTiming[] {
  const parsed = JSON.parse(payload) as unknown[];
  if (!Array.isArray(parsed) || parsed.length < 2) {
    throw new Error('Unexpected Zoho embedded events payload.');
  }

  const primaryMap = toRecord(parsed[1]);
  if (!primaryMap) return [];

  const events: UpcomingEventWithTiming[] = [];

  for (const dayBucket of Object.values(primaryMap)) {
    if (!Array.isArray(dayBucket)) continue;

    for (const rawEntry of dayBucket) {
      const entry = toRecord(rawEntry);
      if (!entry) continue;

      for (const [eventKey, rawValue] of Object.entries(entry)) {
        const value = toRecord(rawValue) as ZohoEmbeddedEventRecord | null;
        if (!value) continue;

        const normalized = normalizeZohoEmbeddedEvent(eventKey, value);
        if (normalized) {
          events.push(normalized);
        }
      }
    }
  }

  return events;
}

async function fetchZohoEmbeddedEvents(
  calendarId: string,
  timeZone = DEFAULT_TIME_ZONE,
): Promise<UpcomingEventWithTiming[]> {
  const range = getZohoCalendarRange();
  const endpoint = new URL('https://calendar.zoho.com/cal/embedEve.do');

  endpoint.searchParams.set('calmode', '0');
  endpoint.searchParams.set('ckey', calendarId);
  endpoint.searchParams.set('dateformat', 'yyyy/MM/dd');
  endpoint.searchParams.set('mstart', range.start);
  endpoint.searchParams.set('mend', range.end);
  endpoint.searchParams.set('mode', 'pub');
  endpoint.searchParams.set('tz', timeZone);
  endpoint.searchParams.set('l', 'en');
  endpoint.searchParams.set('type', '1');

  const response = await fetch(endpoint.toString(), {
    headers: {
      Accept: 'application/json, text/plain;q=0.9, */*;q=0.8',
      Referer: 'https://calendar.zoho.com/',
    },
  });

  if (!response.ok) {
    throw new Error(`Zoho embedded events request failed with ${response.status}.`);
  }

  const payload = await response.text();
  return normalizeZohoEmbeddedEvents(payload);
}

function findEventArray(payload: unknown): unknown[] {
  if (Array.isArray(payload)) {
    return payload;
  }

  const record = toRecord(payload);
  if (!record) return [];

  for (const key of EVENT_ARRAY_KEYS) {
    if (Array.isArray(record[key])) {
      return record[key] as unknown[];
    }
  }

  for (const value of Object.values(record)) {
    if (Array.isArray(value)) {
      return value;
    }
  }

  for (const value of Object.values(record)) {
    const nested = findEventArray(value);
    if (nested.length > 0) {
      return nested;
    }
  }

  return [];
}

function buildEventId(parts: Array<string | undefined>): string {
  const base = parts
    .map((part) => (part || '').trim())
    .filter(Boolean)
    .join('|');

  return base || 'untitled-event';
}

function normalizeJsonEvent(value: unknown): UpcomingEventWithTiming | null {
  const event = toRecord(value);
  if (!event) return null;

  const startSource =
    event.start ??
    event.startDate ??
    event.start_date ??
    event.startTime ??
    event.begin ??
    event.from ??
    event.date;
  const endSource =
    event.end ??
    event.endDate ??
    event.end_date ??
    event.endTime ??
    event.until ??
    event.to;

  const eventTimeZone = firstNonEmpty(
    event.timezone,
    event.tzid,
    event.tz,
    toRecord(event.start)?.timeZone,
    toRecord(event.start)?.timezone,
    toRecord(event.end)?.timeZone,
    toRecord(event.end)?.timezone,
    DEFAULT_TIME_ZONE,
  );

  const start = parseTimestamp(startSource, eventTimeZone);
  if (!start) return null;

  const end = parseTimestamp(endSource, eventTimeZone);
  const isAllDay = Boolean(
    event.isAllDay ??
      event.allDay ??
      toRecord(event.start)?.allDay ??
      start.isAllDay ??
      end?.isAllDay,
  );

  const title = cleanText(
    firstNonEmpty(event.title, event.summary, event.name, event.subject, event.eventTitle),
  ) || 'Untitled event';
  const description = cleanText(
    firstNonEmpty(
      event.description,
      event.content,
      event.details,
      event.summaryText,
      event.notes,
      event.body,
    ),
  );
  const location = cleanText(
    firstNonEmpty(event.location, event.venue, event.where, event.place, event.address),
  );
  const url = extractFirstUrl(
    event.url,
    event.link,
    event.htmlLink,
    event.eventUrl,
    event.permalink,
    description,
  );
  const imageUrl = extractFirstUrl(
    event.imageUrl,
    event.image,
    event.image_url,
    event.coverImage,
    event.cover_image,
    event.featuredImage,
    event.featured_image,
    event.bannerImage,
    event.banner_image,
    toRecord(event.image)?.url,
    toRecord(event.coverImage)?.url,
    toRecord(event.featuredImage)?.url,
    toRecord(event.bannerImage)?.url,
  );

  return {
    id: buildEventId([
      firstNonEmpty(event.id, event.uid, event.eventId, event.event_id),
      url,
      title,
      start.raw,
      location,
    ]),
    title,
    start: start.raw,
    end: end?.raw,
    location,
    description,
    url,
    isAllDay,
    imageUrl,
    _startMs: start.timestampMs,
    _endMs: end?.timestampMs ?? (isAllDay ? start.timestampMs + DAY_MS : start.timestampMs),
  };
}

type IcsField = {
  name: string;
  params: Record<string, string>;
  value: string;
};

function unfoldIcsLines(feed: string): string[] {
  const rawLines = feed.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
  const lines: string[] = [];

  for (const line of rawLines) {
    if ((line.startsWith(' ') || line.startsWith('\t')) && lines.length > 0) {
      lines[lines.length - 1] += line.slice(1);
    } else {
      lines.push(line);
    }
  }

  return lines;
}

function parseIcsField(line: string): IcsField | null {
  const separatorIndex = line.indexOf(':');
  if (separatorIndex === -1) return null;

  const header = line.slice(0, separatorIndex);
  const value = line.slice(separatorIndex + 1);
  const [name, ...paramParts] = header.split(';');
  const params: Record<string, string> = {};

  for (const part of paramParts) {
    const [key, ...rest] = part.split('=');
    if (!key) continue;
    params[key.toUpperCase()] = rest.join('=');
  }

  return {
    name: name.toUpperCase(),
    params,
    value,
  };
}

function unescapeIcsText(value: string): string {
  return value
    .replace(/\\n/gi, '\n')
    .replace(/\\,/g, ',')
    .replace(/\\;/g, ';')
    .replace(/\\\\/g, '\\');
}

function getIcsField(fields: Record<string, IcsField[]>, name: string): IcsField | undefined {
  return fields[name]?.[0];
}

function parseIcsTimestamp(field: IcsField | undefined, defaultTimeZone: string): ParsedTimestamp | null {
  if (!field) return null;

  const timeZone = firstNonEmpty(field.params.TZID, defaultTimeZone);
  if (field.params.VALUE === 'DATE') {
    return parseTimestamp(field.value, timeZone);
  }

  return parseTimestamp(field.value, timeZone);
}

function normalizeIcsEvent(fields: Record<string, IcsField[]>): UpcomingEventWithTiming | null {
  const startField = getIcsField(fields, 'DTSTART');
  if (!startField) return null;

  const defaultTimeZone = firstNonEmpty(
    startField.params.TZID,
    getIcsField(fields, 'DTEND')?.params.TZID,
    DEFAULT_TIME_ZONE,
  );
  const start = parseIcsTimestamp(startField, defaultTimeZone);
  if (!start) return null;

  const endField = getIcsField(fields, 'DTEND');
  const end = parseIcsTimestamp(endField, defaultTimeZone);
  const isAllDay = startField.params.VALUE === 'DATE' || start.isAllDay;
  const description = cleanText(unescapeIcsText(getIcsField(fields, 'DESCRIPTION')?.value || ''));
  const title = cleanText(unescapeIcsText(getIcsField(fields, 'SUMMARY')?.value || '')) || 'Untitled event';
  const location = cleanText(unescapeIcsText(getIcsField(fields, 'LOCATION')?.value || ''));
  const url = extractFirstUrl(
    unescapeIcsText(getIcsField(fields, 'URL')?.value || ''),
    description,
  );
  const imageUrl = extractFirstUrl(unescapeIcsText(getIcsField(fields, 'ATTACH')?.value || ''));
  const rawEnd = isAllDay && end?.raw ? subtractOneDay(end.raw) : end?.raw;

  return {
    id: buildEventId([
      cleanText(getIcsField(fields, 'UID')?.value || ''),
      url,
      title,
      start.raw,
      location,
    ]),
    title,
    start: start.raw,
    end: rawEnd,
    location,
    description,
    url,
    isAllDay,
    imageUrl,
    _startMs: start.timestampMs,
    _endMs: end?.timestampMs ?? (isAllDay ? start.timestampMs + DAY_MS : start.timestampMs),
  };
}

function normalizeIcsFeed(payload: string): UpcomingEventWithTiming[] {
  const events: UpcomingEventWithTiming[] = [];
  const lines = unfoldIcsLines(payload);
  let fields: Record<string, IcsField[]> | null = null;

  for (const line of lines) {
    if (line === 'BEGIN:VEVENT') {
      fields = {};
      continue;
    }

    if (line === 'END:VEVENT') {
      if (fields) {
        const event = normalizeIcsEvent(fields);
        if (event) events.push(event);
      }
      fields = null;
      continue;
    }

    if (!fields) continue;

    const field = parseIcsField(line);
    if (!field) continue;

    const existing = fields[field.name] || [];
    existing.push(field);
    fields[field.name] = existing;
  }

  return events;
}

function normalizeJsonFeed(payload: unknown): UpcomingEventWithTiming[] {
  return findEventArray(payload)
    .map((event) => normalizeJsonEvent(event))
    .filter((event): event is UpcomingEventWithTiming => Boolean(event));
}

function normalizeFeed(payload: string, contentType: string): UpcomingEventWithTiming[] {
  const trimmed = payload.trim();

  if (contentType.includes('application/json') || trimmed.startsWith('{') || trimmed.startsWith('[')) {
    const parsed = JSON.parse(trimmed);
    return normalizeJsonFeed(parsed);
  }

  if (
    contentType.includes('text/calendar') ||
    contentType.includes('application/ics') ||
    trimmed.includes('BEGIN:VCALENDAR')
  ) {
    return normalizeIcsFeed(trimmed);
  }

  throw new Error('Unsupported feed format. Use a public JSON or ICS feed URL.');
}

function dedupeAndSort(events: UpcomingEventWithTiming[]): UpcomingEvent[] {
  const now = Date.now();
  const seen = new Set<string>();

  const upcomingEvents = events
    .filter((event) => event._endMs >= now)
    .sort((left, right) => left._startMs - right._startMs)
    .filter((event) => {
      if (seen.has(event.id)) return false;
      seen.add(event.id);
      return true;
    });

  return upcomingEvents.map((event) => ({
    id: event.id,
    title: event.title,
    start: event.start,
    end: event.end,
    location: event.location,
    description: event.description,
    url: event.url,
    isAllDay: event.isAllDay,
    imageUrl: event.imageUrl,
  }));
}

export async function onRequestGet(context: { env: Env; request: Request }): Promise<Response> {
  const feedUrl = context.env.ZOHO_PUBLIC_EVENTS_FEED_URL?.trim() || '';
  const calendarId =
    context.env.ZOHO_PUBLIC_CALENDAR_ID?.trim() || DEFAULT_PUBLIC_ZOHO_CALENDAR_ID;
  const requestUrl = new URL(context.request.url);
  const requestedMonth = requestUrl.searchParams.get('month')?.trim() || '';
  const normalizedMonth = isMonthKey(requestedMonth) ? requestedMonth : '';

  try {
    let events: UpcomingEvent[] = [];
    let sourceConfigured = false;

    if (feedUrl) {
      sourceConfigured = true;
      const response = await fetch(feedUrl, {
        headers: {
          Accept: 'application/json, text/calendar;q=0.9, text/plain;q=0.8',
        },
      });

      if (!response.ok) {
        return jsonResponse(
          {
            success: false,
            sourceConfigured: true,
            events: [],
            error: `Zoho feed request failed with ${response.status}.`,
          },
          { status: 502 },
        );
      }

      const payload = await response.text();
      const contentType = response.headers.get('content-type') || '';
      events = dedupeAndSort(normalizeFeed(payload, contentType));
    } else if (calendarId) {
      sourceConfigured = true;
      events = dedupeAndSort(await fetchZohoEmbeddedEvents(calendarId));
    }

    events = await enrichCurrentMonthEventsWithSocialImages(
      events.map((event) => applyUpcomingEventOverrides(event)),
    );
    if (normalizedMonth) {
      events = events.filter((event) => getEventYearMonth(event.start) === normalizedMonth);
    }

    return jsonResponse(
      {
        success: true,
        sourceConfigured,
        requestedMonth: normalizedMonth || getYearMonthInTimeZone(new Date(), DEFAULT_TIME_ZONE),
        refreshedAt: new Date().toISOString(),
        events,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Upcoming events feed error:', error);
    return jsonResponse(
      {
        success: false,
        sourceConfigured: true,
        events: [],
        error: 'Unable to normalize the public Zoho events feed.',
      },
      { status: 500 },
    );
  }
}
