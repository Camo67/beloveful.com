import { ALBUMS } from '../../src/lib/data';
import { normalizeAlbumSlug, sameAlbumSlug } from '../../src/lib/album-slugs';
import { mapToCdnUrl, validateAndFixImageUrl } from '../../src/lib/image-utils';

interface Env {
  DB?: D1Database;
}

type ApiAlbumSummary = {
  region: string;
  country: string;
  slug: string;
  description?: string | null;
  image_count: number;
  cover_desktop_url?: string | null;
  cover_mobile_url?: string | null;
};

type AlbumImage = {
  desktop: string;
  mobile: string;
};

type TravelAlbum = {
  region: string;
  country: string;
  slug: string;
  description?: string | null;
  images: AlbumImage[];
};

function jsonResponse(payload: unknown, init: ResponseInit = {}): Response {
  return new Response(JSON.stringify(payload), {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  });
}

function normalizeImageUrl(url?: string | null): string {
  const fixedUrl = validateAndFixImageUrl(url);
  return mapToCdnUrl(fixedUrl) ?? fixedUrl;
}

function normalizeImagePair(image: Partial<AlbumImage> | null | undefined): AlbumImage | null {
  if (!image) return null;
  const rawDesktop = String(image.desktop || '').trim();
  const rawMobile = String(image.mobile || image.desktop || '').trim();
  if (!rawDesktop && !rawMobile) return null;
  const desktop = normalizeImageUrl(rawDesktop || rawMobile);
  const mobile = normalizeImageUrl(rawMobile || rawDesktop);
  return {
    desktop: desktop || mobile,
    mobile: mobile || desktop,
  };
}

function isTravelAlbum(album: { region?: string | null; slug?: string | null }): boolean {
  return (
    album?.region !== 'Erasing Borders' &&
    album?.region !== 'Logo' &&
    album?.slug !== 'erasing-borders'
  );
}

function extractFirstDesktopUrl(album: TravelAlbum): string | null {
  const first = Array.isArray(album.images) ? album.images[0] : null;
  if (!first) return null;
  if (typeof first.desktop === 'string' && first.desktop.trim()) return first.desktop;
  if (typeof first.mobile === 'string' && first.mobile.trim()) return first.mobile;
  return null;
}

async function fetchDbAlbumSummaries(db?: D1Database): Promise<ApiAlbumSummary[]> {
  if (!db) return [];

  try {
    const result = await db
      .prepare(
        `
        SELECT
          a.region,
          a.country,
          a.slug,
          a.description,
          (
            SELECT COUNT(1)
            FROM images i
            WHERE i.album_id = a.id AND i.is_published = 1
          ) AS image_count,
          (
            SELECT i.desktop_url
            FROM images i
            WHERE i.album_id = a.id AND i.is_published = 1
            ORDER BY i.sort_order, i.created_at DESC, i.id DESC
            LIMIT 1
          ) AS cover_desktop_url,
          (
            SELECT i.mobile_url
            FROM images i
            WHERE i.album_id = a.id AND i.is_published = 1
            ORDER BY i.sort_order, i.created_at DESC, i.id DESC
            LIMIT 1
          ) AS cover_mobile_url
        FROM albums a
        WHERE a.is_published = 1
          AND EXISTS (
            SELECT 1
            FROM images i
            WHERE i.album_id = a.id AND i.is_published = 1
          )
        ORDER BY a.region, a.sort_order, a.country
        `,
      )
      .all();

    return Array.isArray(result.results) ? (result.results as ApiAlbumSummary[]) : [];
  } catch (error) {
    console.error('Failed to fetch public album summaries for travel images:', error);
    return [];
  }
}

function mergeTravelAlbums(dbAlbums: ApiAlbumSummary[]): TravelAlbum[] {
  const staticAlbums = ALBUMS.filter(isTravelAlbum).map((album) => ({
    region: album.region,
    country: album.country,
    slug: normalizeAlbumSlug(album.slug || album.country),
    description: album.description,
    images: (album.images || [])
      .map((image) => normalizeImagePair(image))
      .filter((image): image is AlbumImage => Boolean(image)),
  }));

  const dbBySlug = new Map(
    dbAlbums
      .filter((album) => album?.slug && album.image_count > 0 && isTravelAlbum(album))
      .map((album) => {
        const slug = normalizeAlbumSlug(album.slug || album.country);
        return [slug, { ...album, slug }];
      }),
  );

  const mergedAlbums = staticAlbums.map((staticAlbum) => {
    const dbAlbum = dbBySlug.get(staticAlbum.slug);
    if (!dbAlbum) {
      return staticAlbum;
    }

    const mergedImages: AlbumImage[] = [];
    const seen = new Set<string>();
    const addUnique = (image: Partial<AlbumImage> | null | undefined) => {
      const normalized = normalizeImagePair(image);
      if (!normalized) return;
      const key = `${normalized.desktop}|${normalized.mobile}`;
      if (seen.has(key)) return;
      seen.add(key);
      mergedImages.push(normalized);
    };

    addUnique({
      desktop: dbAlbum.cover_desktop_url || dbAlbum.cover_mobile_url || '',
      mobile: dbAlbum.cover_mobile_url || dbAlbum.cover_desktop_url || '',
    });

    for (const image of staticAlbum.images) {
      addUnique(image);
    }

    return {
      ...staticAlbum,
      region: dbAlbum.region || staticAlbum.region,
      country: dbAlbum.country || staticAlbum.country,
      description: dbAlbum.description || staticAlbum.description,
      images: mergedImages.length ? mergedImages : staticAlbum.images,
    };
  });

  for (const dbAlbum of dbBySlug.values()) {
    if (mergedAlbums.some((album) => sameAlbumSlug(album.slug, dbAlbum.slug))) continue;

    const image = normalizeImagePair({
      desktop: dbAlbum.cover_desktop_url || dbAlbum.cover_mobile_url || '',
      mobile: dbAlbum.cover_mobile_url || dbAlbum.cover_desktop_url || '',
    });

    if (!image) continue;

    mergedAlbums.push({
      region: dbAlbum.region,
      country: dbAlbum.country,
      slug: dbAlbum.slug,
      description: dbAlbum.description,
      images: [image],
    });
  }

  return mergedAlbums;
}

export async function onRequestGet(context: { env?: Env } = {}): Promise<Response> {
  const dbAlbums = await fetchDbAlbumSummaries(context?.env?.DB);
  const travelAlbums = mergeTravelAlbums(dbAlbums);

  const urls = travelAlbums
    .map(extractFirstDesktopUrl)
    .filter((url): url is string => typeof url === 'string' && url.trim().length > 0);

  return jsonResponse(urls);
}
