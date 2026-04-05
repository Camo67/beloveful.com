import localAlbums from '../../../../src/lib/local-albums.json';
import { verifyAuth } from '../../_utils/auth';

interface Env {
  DB: D1Database;
  JWT_SECRET: string;
}

type StaticAlbum = {
  region?: string;
  country?: string;
  slug?: string;
  description?: string;
  images?: Array<{
    desktop?: string;
    mobile?: string;
  }>;
};

const LEGACY_COUNTRY_DISPLAY_BY_SLUG: Record<string, string> = {
  india: 'India',
  phillipines: 'Philippines',
};

function jsonResponse(payload: any, init: ResponseInit = {}): Response {
  return new Response(JSON.stringify(payload), {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  });
}

function normalizeUrl(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function toTitleCase(value: string): string {
  return String(value || '')
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
}

function normalizeCountryDisplay(country: string, slug?: string): string {
  const trimmed = String(country || '').trim();
  if (!trimmed) return trimmed;

  const legacyDisplay = slug ? LEGACY_COUNTRY_DISPLAY_BY_SLUG[slug] : undefined;
  if (legacyDisplay) return legacyDisplay;

  if (trimmed === trimmed.toLowerCase()) {
    return toTitleCase(trimmed.replace(/-/g, ' '));
  }

  return trimmed;
}

function chunk<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }
  return chunks;
}

const STATIC_ALBUMS = (Array.isArray(localAlbums) ? localAlbums : []).filter((album): album is StaticAlbum => {
  return !!album && typeof album.slug === 'string' && typeof album.country === 'string' && typeof album.region === 'string';
});

export async function onRequestPost(context: any): Promise<Response> {
  const { request, env } = context as { request: Request; env: Env };
  const db = env.DB as D1Database;

  try {
    const authResult = await verifyAuth(request, env);
    if (!authResult.success) {
      return jsonResponse(authResult, { status: 401 });
    }

    const existingAlbumsResult = await db.prepare('SELECT id, slug, country FROM albums').all();
    const albumIdBySlug = new Map<string, number>();
    const albumCountryBySlug = new Map<string, string>();
    for (const row of existingAlbumsResult.results || []) {
      if (row?.slug) {
        albumIdBySlug.set(String(row.slug), Number(row.id));
        albumCountryBySlug.set(String(row.slug), String(row.country || ''));
      }
    }

    let insertedAlbums = 0;
    for (const [index, album] of STATIC_ALBUMS.entries()) {
      const normalizedCountry = normalizeCountryDisplay(album.country!, album.slug!);
      const existingAlbumId = albumIdBySlug.get(album.slug!);
      if (existingAlbumId) {
        const existingCountry = albumCountryBySlug.get(album.slug!) || '';
        if (existingCountry && existingCountry !== normalizedCountry) {
          await db
            .prepare('UPDATE albums SET country = ? WHERE id = ?')
            .bind(normalizedCountry, existingAlbumId)
            .run();
          albumCountryBySlug.set(album.slug!, normalizedCountry);
        }
        continue;
      }

      const insertAlbum = await db
        .prepare(
          `
          INSERT INTO albums (region, country, slug, description, is_published, sort_order)
          VALUES (?, ?, ?, ?, 1, ?)
          `,
        )
        .bind(album.region!, normalizedCountry, album.slug!, album.description || null, index)
        .run();

      if (insertAlbum.success && insertAlbum.meta?.last_row_id) {
        albumIdBySlug.set(album.slug!, Number(insertAlbum.meta.last_row_id));
        insertedAlbums += 1;
      }
    }

    const existingImagesResult = await db.prepare('SELECT album_id, desktop_url, mobile_url FROM images').all();
    const imageKeyByAlbumId = new Map<number, Set<string>>();
    for (const row of existingImagesResult.results || []) {
      const albumId = Number(row?.album_id);
      if (!Number.isFinite(albumId)) continue;
      const key = `${normalizeUrl(row?.desktop_url)}|${normalizeUrl(row?.mobile_url)}`;
      if (!imageKeyByAlbumId.has(albumId)) {
        imageKeyByAlbumId.set(albumId, new Set<string>());
      }
      imageKeyByAlbumId.get(albumId)!.add(key);
    }

    const insertStatements: D1PreparedStatement[] = [];
    let insertedImages = 0;
    let skippedImages = 0;

    for (const album of STATIC_ALBUMS) {
      const albumId = albumIdBySlug.get(album.slug!);
      if (!albumId) continue;

      const existingKeys = imageKeyByAlbumId.get(albumId) || new Set<string>();
      imageKeyByAlbumId.set(albumId, existingKeys);

      for (const [index, image] of (album.images || []).entries()) {
        const desktopUrl = normalizeUrl(image?.desktop);
        const mobileUrl = normalizeUrl(image?.mobile) || desktopUrl;
        if (!desktopUrl && !mobileUrl) continue;

        const key = `${desktopUrl || mobileUrl}|${mobileUrl || desktopUrl}`;
        if (existingKeys.has(key)) {
          skippedImages += 1;
          continue;
        }

        existingKeys.add(key);
        insertStatements.push(
          db.prepare(
            `
            INSERT INTO images (
              album_id,
              title,
              description,
              desktop_url,
              mobile_url,
              is_published,
              sort_order
            )
            VALUES (?, ?, ?, ?, ?, 1, ?)
            `,
          ).bind(albumId, null, null, desktopUrl || mobileUrl, mobileUrl || desktopUrl, index),
        );
        insertedImages += 1;
      }
    }

    for (const statements of chunk(insertStatements, 100)) {
      await db.batch(statements);
    }

    return jsonResponse(
      {
        success: true,
        insertedAlbums,
        insertedImages,
        skippedImages,
        totalAlbums: STATIC_ALBUMS.length,
        totalImages: STATIC_ALBUMS.reduce((sum, album) => sum + (Array.isArray(album.images) ? album.images.length : 0), 0),
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error('Import static portfolio error:', error);
    return jsonResponse(
      {
        success: false,
        error: error?.message || 'Failed to import portfolio into admin',
      },
      { status: 500 },
    );
  }
}
