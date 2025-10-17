export const config = { runtime: 'edge' };

interface Episode {
  title: string;
  audioUrl: string | null;
  link: string | null;
  pubDate: string | null;
  duration: string | null;
  image: string | null;
  source: string;
}

const FEEDS = [
  { url: 'https://anchor.fm/s/1412fa20/podcast/rss', source: 'medium-large' },
  { url: 'https://anchor.fm/s/10a9753a0/podcast/rss', source: 'beloveful' },
];

function decodeHtml(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function textBetween(xml: string, tag: string): string | null {
  const m = xml.match(new RegExp(`<${tag}[^>]*>(.*?)</${tag}>`, 'is'));
  return m ? decodeHtml(m[1].trim()) : null;
}

function attrFromTag(xml: string, tag: string, attr: string): string | null {
  const m = xml.match(new RegExp(`<${tag}[^>]*${attr}="([^"]+)"[^>]*>`, 'i'));
  return m ? decodeHtml(m[1]) : null;
}

function parseRss(xml: string, source: string): Episode[] {
  const items = xml.match(/<item[\s\S]*?<\/item>/gi) || [];
  const channelImage = attrFromTag(xml, 'itunes:image', 'href') || null;

  return items.map((block) => {
    const title = textBetween(block, 'title') || 'Untitled';
    const link = textBetween(block, 'link');
    const pubDate = textBetween(block, 'pubDate');
    const duration = textBetween(block, 'itunes:duration');

    let audioUrl: string | null = null;
    const enclosureMatch = block.match(/<enclosure[^>]*url="([^"]+)"[^>]*>/i);
    if (enclosureMatch) {
      audioUrl = enclosureMatch[1];
    } else {
      const mediaMatch = block.match(/<media:content[^>]*url="([^"]+)"[^>]*>/i);
      if (mediaMatch) audioUrl = mediaMatch[1];
    }

    const image = attrFromTag(block, 'itunes:image', 'href') || channelImage;

    return { title, audioUrl, link, pubDate, duration, image, source } as Episode;
  });
}

function parseDate(d: string | null): number {
  if (!d) return 0;
  const ts = Date.parse(d);
  return Number.isNaN(ts) ? 0 : ts;
}

export default async function handler(_req: Request): Promise<Response> {
  try {
    const lists = await Promise.all(
      FEEDS.map(async (f) => {
        const res = await fetch(f.url, { headers: { 'User-Agent': 'Beloveful-Playlist/1.0' } });
        if (!res.ok) throw new Error(`Fetch failed ${f.url} (${res.status})`);
        const xml = await res.text();
        return parseRss(xml, f.source);
      })
    );

    const episodes = lists.flat().filter((e) => !!e.audioUrl);
    episodes.sort((a, b) => parseDate(b.pubDate) - parseDate(a.pubDate));

    const limited = episodes.slice(0, 50);

    return new Response(JSON.stringify({ episodes: limited }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Failed to build playlist', message: err?.message || String(err) }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
}