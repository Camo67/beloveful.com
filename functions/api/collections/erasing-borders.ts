import { Hono } from 'hono';
import { cors } from 'hono/cors';

interface Env {
  CLOUDINARY_CLOUD_NAME: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
  // Optional: explicit collection id; otherwise we fall back to folder search
  CLOUDINARY_ERASING_COLLECTION_ID?: string;
}

interface CloudinaryResource {
  public_id: string;
  secure_url?: string;
  url?: string;
  asset_id?: string;
  format?: string;
  bytes?: number;
  width?: number;
  height?: number;
  created_at?: string;
  folder?: string;
}

const app = new Hono<{ Bindings: Env }>();

app.use('*', cors({
  origin: ['http://localhost:8080', 'http://localhost:8081', 'https://beloveful.com', 'https://www.beloveful.com'],
  allowMethods: ['GET', 'HEAD', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

function authHeader(key: string, secret: string) {
  const b64 = btoa(`${key}:${secret}`);
  return { 'Authorization': `Basic ${b64}` };
}

function normalizeKey(publicId: string): string {
  return publicId
    .replace(/\/(?:Website beloveful\.com|Erasing Borders)\//gi, '/')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9/_-]+/gi, '-')
    .replace(/-+/g, '-')
    .toLowerCase();
}

app.get('/', async (c) => {
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = c.env;
  const collectionId = c.env.CLOUDINARY_ERASING_COLLECTION_ID || c.req.query('collection') || '3571ff078f602017730b7ec57187cbb0';
  const tag = c.req.query('tag') || 'erasing-borders';

  if (!CLOUDINARY_CLOUD_NAME) {
    return c.json({ success: false, error: 'Cloudinary cloud name not configured' }, 500);
  }

  // Cache at edge for 24h to minimize costs
  try {
    // @ts-expect-error Workers runtime provides `caches`
    const cache = caches?.default;
    const cached = cache ? await cache.match(c.req.raw) : null;
    if (cached) return cached;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('Cache lookup failed (non-fatal)', e);
  }

  const images: { desktop: string; mobile: string; created_at?: string; public_id: string }[] = [];
  const seen = new Set<string>();

  // Strategy 0: Use public tag listing via CDN (cheap, cached)
  try {
    const listUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/list/${encodeURIComponent(tag)}.json`;
    const resp = await fetch(listUrl, { cf: { cacheTtl: 86400, cacheEverything: true } as any });
    if (resp.ok) {
      const data: any = await resp.json();
      const resources: any[] = data?.resources || [];
      for (const r of resources) {
        const pid = r.public_id || '';
        const format = r.format || 'jpg';
        if (!pid) continue;
        const url = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${pid}.${format}`;
        const key = normalizeKey(pid);
        if (seen.has(key)) continue;
        seen.add(key);
        images.push({ desktop: url, mobile: url, created_at: r.created_at, public_id: pid });
      }
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('Public tag listing failed, will try API', e);
  }

  // Strategy 1: Try Collections API (requires credentials)
  if (images.length === 0) {
    if (!CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
      // If no creds, return what we have (possibly empty)
      const res = c.json({ success: true, count: images.length, images });
      res.headers.set('Cache-Control', 'public, max-age=86400');
      return res;
    }

    const headers = {
      'Content-Type': 'application/json',
      ...authHeader(CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET),
    } as Record<string, string>;

    let usedFallback = false;
    try {
      let nextCursor: string | undefined = undefined;
      do {
        const url = new URL(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/collections/${collectionId}/assets`);
        if (nextCursor) url.searchParams.set('next_cursor', nextCursor);
        const resp = await fetch(url.toString(), { headers });
        if (!resp.ok) throw new Error(`Collections API error ${resp.status}`);
        const data: any = await resp.json();
        const resources: CloudinaryResource[] = (data?.resources || data?.assets || []) as any;
        for (const r of resources) {
          const secure = (r as any).secure_url || (r as any).url;
          const pid = r.public_id || '';
          if (!secure || !pid) continue;
          const key = normalizeKey(pid);
          if (seen.has(key)) continue;
          seen.add(key);
          images.push({ desktop: secure, mobile: secure, created_at: (r as any).created_at, public_id: pid });
        }
        nextCursor = data?.next_cursor;
      } while (nextCursor);
    } catch {
      usedFallback = true;
    }

    // Strategy 2: Fallback to Search API by folder
    if (usedFallback || images.length === 0) {
      let nextCursor: string | undefined = undefined;
      do {
        const body = {
          expression: 'folder:"Website beloveful.com/Erasing Borders"',
          max_results: 500,
          sort_by: [{ created_at: 'desc' }],
          next_cursor: nextCursor,
        } as any;
        const resp = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/resources/search`, {
          method: 'POST',
          headers,
          body: JSON.stringify(body),
        });
        if (!resp.ok) break;
        const data: any = await resp.json();
        const resources: CloudinaryResource[] = data?.resources || [];
        for (const r of resources) {
          const secure = r.secure_url || r.url;
          const pid = r.public_id || '';
          if (!secure || !pid) continue;
          const key = normalizeKey(pid);
          if (seen.has(key)) continue;
          seen.add(key);
          images.push({ desktop: secure, mobile: secure, created_at: r.created_at, public_id: pid });
        }
        nextCursor = data?.next_cursor;
      } while (nextCursor);
    }
  }

  // Sort newest first
  images.sort((a, b) => {
    const ad = a.created_at ? Date.parse(a.created_at) : 0;
    const bd = b.created_at ? Date.parse(b.created_at) : 0;
    return bd - ad;
  });

  const resp = c.json({ success: true, count: images.length, images });
  resp.headers.set('Cache-Control', 'public, max-age=86400');
  try {
    // @ts-expect-error Workers runtime provides `caches`
    const cache = caches?.default; if (cache) await cache.put(c.req.raw, resp.clone());
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('Cache write failed (non-fatal)', e);
  }
  return resp;
});

export default app;