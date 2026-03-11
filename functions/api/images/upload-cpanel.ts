import { verifyAuth } from '../_utils/auth';

interface Env {
  DB: D1Database;
  JWT_SECRET: string;
  CPANEL_IMAGES_BASE_URL?: string;
}

interface AlbumRecord {
  id: number;
  region: string;
  country: string;
  slug: string;
}

interface ParsedPath {
  original: string;
  sourcePath: string;
  region: string;
  country: string;
  fileName: string;
  publicUrl: string;
}

type ImportResult =
  | {
      status: 'imported';
      input: string;
      album_id: number;
      album_region: string;
      album_country: string;
      image_id: number;
      public_url: string;
    }
  | {
      status: 'skipped';
      input: string;
      album_id?: number;
      album_region?: string;
      album_country?: string;
      image_id?: number;
      public_url?: string;
      reason: string;
    }
  | {
      status: 'error';
      input: string;
      reason: string;
    };

const TRAVEL_REGIONS = [
  'Africa',
  'Asia',
  'Central America & Caribbean',
  'Europe & Scandinavia',
  'Middle East',
  'North America',
  'South America',
  'Oceania',
];

const TRAVEL_REGIONS_BY_NORMALIZED = new Map(
  TRAVEL_REGIONS.map((region) => [normalizeLabel(region), region]),
);

const IMAGE_EXTENSION_REGEX = /\.(avif|bmp|gif|heic|jpeg|jpg|png|svg|tif|tiff|webp)$/i;

function jsonResponse(payload: any, init: ResponseInit = {}): Response {
  return new Response(JSON.stringify(payload), {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  });
}

function normalizeLabel(value: string): string {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '');
}

function slugify(value: string): string {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function stripQuotes(input: string): string {
  const trimmed = input.trim();
  if (trimmed.startsWith('"') && trimmed.endsWith('"')) return trimmed.slice(1, -1);
  if (trimmed.startsWith("'") && trimmed.endsWith("'")) return trimmed.slice(1, -1);
  return trimmed;
}

function decodeSafe(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function splitPathSegments(pathLike: string): string[] {
  return pathLike
    .replace(/\\/g, '/')
    .split('/')
    .map((segment) => decodeSafe(segment).trim())
    .filter(Boolean);
}

function encodePathSegments(pathSegments: string[]): string {
  return pathSegments.map((segment) => encodeURIComponent(segment)).join('/');
}

function parseInputPath(rawInput: string, baseUrl: string): ParsedPath {
  const input = stripQuotes(String(rawInput || ''));
  if (!input) {
    throw new Error('Path is empty');
  }

  const inputWithoutQuery = input.split('?')[0].split('#')[0];

  let urlFromInput: URL | null = null;
  try {
    urlFromInput = new URL(inputWithoutQuery);
  } catch {
    urlFromInput = null;
  }

  const sourcePath = urlFromInput?.pathname || inputWithoutQuery;
  const pathSegments = splitPathSegments(sourcePath);

  if (pathSegments.length < 3) {
    throw new Error('Path must include region, country, and filename');
  }

  const websiteIdx = pathSegments.findIndex(
    (segment) => normalizeLabel(segment) === normalizeLabel('Website beloveful.com'),
  );
  const publicHtmlIdx = pathSegments.findIndex(
    (segment, index) =>
      normalizeLabel(segment) === 'images' &&
      index > 0 &&
      normalizeLabel(pathSegments[index - 1] || '') === 'publichtml',
  );

  let regionIdx = 0;
  if (websiteIdx >= 0) {
    regionIdx = websiteIdx + 1;
  } else if (publicHtmlIdx >= 0) {
    regionIdx = publicHtmlIdx + 1;
  }

  if (pathSegments.length < regionIdx + 3) {
    throw new Error('Could not parse region/country/file from cPanel path');
  }

  const regionRaw = pathSegments[regionIdx];
  const countryRaw = pathSegments[regionIdx + 1];
  const filePathSegments = pathSegments.slice(regionIdx + 2);
  const fileName = filePathSegments[filePathSegments.length - 1] || '';

  if (!IMAGE_EXTENSION_REGEX.test(fileName)) {
    throw new Error('Path does not appear to reference an image file');
  }

  const canonicalRegion = TRAVEL_REGIONS_BY_NORMALIZED.get(normalizeLabel(regionRaw));
  if (!canonicalRegion) {
    throw new Error(`Region "${regionRaw}" is not a recognized travel region`);
  }

  if (!countryRaw) {
    throw new Error('Country segment is missing in path');
  }

  const canonicalCountry = countryRaw.replace(/\s+/g, ' ').trim();
  const relativeSegments = [canonicalRegion, canonicalCountry, ...filePathSegments];
  const encodedRelativePath = encodePathSegments(relativeSegments);

  let publicUrl = '';
  if (urlFromInput) {
    const origin = `${urlFromInput.protocol}//${urlFromInput.host}`;
    const encodedFullPath = encodePathSegments(pathSegments);
    publicUrl = `${origin}/${encodedFullPath}`;
  } else {
    const normalizedBaseUrl = normalizeBaseUrl(baseUrl);
    publicUrl = `${normalizedBaseUrl}/${encodedRelativePath}`;
  }

  return {
    original: rawInput,
    sourcePath,
    region: canonicalRegion,
    country: canonicalCountry,
    fileName,
    publicUrl,
  };
}

function normalizeBaseUrl(baseUrl: string): string {
  const fallback = '/Website%20beloveful.com';
  const value = String(baseUrl || '').trim() || fallback;
  const noTrailing = value.replace(/\/+$/, '');

  if (/^https?:\/\//i.test(noTrailing)) {
    return noTrailing;
  }

  return noTrailing.startsWith('/') ? noTrailing : `/${noTrailing}`;
}

function albumKey(region: string, country: string): string {
  return `${normalizeLabel(region)}|${normalizeLabel(country)}`;
}

function titleFromFileName(fileName: string): string {
  const withoutExtension = fileName.replace(/\.[^/.]+$/, '');
  return withoutExtension
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function generateUniqueSlug(
  db: D1Database,
  preferredCountry: string,
  region: string,
  usedSlugs: Set<string>,
): Promise<string> {
  const countrySlug = slugify(preferredCountry);
  const regionSlug = slugify(region);
  const base = countrySlug || `${regionSlug}-album` || 'album';

  let candidate = base;
  let counter = 2;

  while (usedSlugs.has(candidate)) {
    candidate = `${base}-${counter}`;
    counter += 1;
  }

  while (true) {
    const hit = await db.prepare('SELECT id FROM albums WHERE slug = ? LIMIT 1').bind(candidate).first();
    if (!hit) {
      usedSlugs.add(candidate);
      return candidate;
    }
    candidate = `${base}-${counter}`;
    counter += 1;
  }
}

export async function onRequestPost(context: any): Promise<Response> {
  const { request, env } = context as { request: Request; env: Env };
  const db = env.DB as D1Database;

  try {
    const authResult = await verifyAuth(request, env);
    if (!authResult.success) {
      return jsonResponse(authResult, { status: 401 });
    }

    let body: any;
    try {
      body = await request.json();
    } catch {
      return jsonResponse({ success: false, error: 'Invalid JSON body' }, { status: 400 });
    }

    const rawPaths = Array.isArray(body?.paths)
      ? body.paths
      : Array.isArray(body?.cpanel_paths)
        ? body.cpanel_paths
        : [];
    const paths = rawPaths
      .map((value: any) => (typeof value === 'string' ? value.trim() : ''))
      .filter(Boolean);

    if (!paths.length) {
      return jsonResponse(
        { success: false, error: 'Provide at least one cPanel image path in `paths`' },
        { status: 400 },
      );
    }

    if (paths.length > 300) {
      return jsonResponse(
        { success: false, error: 'Too many paths in one request (max 300)' },
        { status: 400 },
      );
    }

    const createMissingAlbums = body?.create_missing_albums !== false;
    const setPinThumbnail = body?.set_pin_thumbnail !== false;
    const baseUrl = normalizeBaseUrl(
      body?.base_url || env.CPANEL_IMAGES_BASE_URL || '/Website%20beloveful.com',
    );

    const albumsResult = await db
      .prepare('SELECT id, region, country, slug FROM albums')
      .all<AlbumRecord>();
    const albums = (albumsResult.results || []) as AlbumRecord[];

    const albumByKey = new Map<string, AlbumRecord>();
    const usedSlugs = new Set<string>();
    for (const album of albums) {
      albumByKey.set(albumKey(album.region, album.country), album);
      if (album.slug) usedSlugs.add(album.slug);
    }

    const firstImagePerAlbum = new Map<number, number>();
    const results: ImportResult[] = [];

    for (const input of paths) {
      let parsed: ParsedPath;
      try {
        parsed = parseInputPath(input, baseUrl);
      } catch (error: any) {
        results.push({
          status: 'error',
          input,
          reason: error?.message || 'Invalid cPanel path',
        });
        continue;
      }

      const key = albumKey(parsed.region, parsed.country);
      let album = albumByKey.get(key);

      if (!album && !createMissingAlbums) {
        results.push({
          status: 'skipped',
          input,
          reason: `No album found for ${parsed.region} / ${parsed.country}`,
        });
        continue;
      }

      if (!album) {
        const slug = await generateUniqueSlug(db, parsed.country, parsed.region, usedSlugs);
        const created = await db
          .prepare(
            `
            INSERT INTO albums (region, country, slug, description, is_published, sort_order)
            VALUES (?, ?, ?, ?, ?, ?)
            `,
          )
          .bind(parsed.region, parsed.country, slug, null, 1, 0)
          .run();

        if (!created.success) {
          results.push({
            status: 'error',
            input,
            reason: `Failed to create album for ${parsed.region} / ${parsed.country}`,
          });
          continue;
        }

        album = {
          id: Number(created.meta.last_row_id),
          region: parsed.region,
          country: parsed.country,
          slug,
        };
        albumByKey.set(key, album);
      }

      const existing = await db
        .prepare(
          `
          SELECT id
          FROM images
          WHERE album_id = ? AND desktop_url = ?
          LIMIT 1
          `,
        )
        .bind(album.id, parsed.publicUrl)
        .first<{ id: number }>();

      if (existing?.id) {
        if (!firstImagePerAlbum.has(album.id)) {
          firstImagePerAlbum.set(album.id, Number(existing.id));
        }
        results.push({
          status: 'skipped',
          input,
          album_id: album.id,
          album_region: album.region,
          album_country: album.country,
          image_id: Number(existing.id),
          public_url: parsed.publicUrl,
          reason: 'Image already exists in this album',
        });
        continue;
      }

      const title = titleFromFileName(parsed.fileName) || parsed.fileName;
      const insert = await db
        .prepare(
          `
          INSERT INTO images (
            album_id,
            title,
            description,
            desktop_url,
            mobile_url,
            cloudinary_public_id,
            is_published,
            sort_order
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          `,
        )
        .bind(
          album.id,
          title || null,
          null,
          parsed.publicUrl,
          parsed.publicUrl,
          `cpanel:${parsed.sourcePath}`,
          1,
          0,
        )
        .run();

      if (!insert.success) {
        results.push({
          status: 'error',
          input,
          reason: 'Failed to insert image into database',
        });
        continue;
      }

      const imageId = Number(insert.meta.last_row_id);
      if (!firstImagePerAlbum.has(album.id)) {
        firstImagePerAlbum.set(album.id, imageId);
      }

      results.push({
        status: 'imported',
        input,
        album_id: album.id,
        album_region: album.region,
        album_country: album.country,
        image_id: imageId,
        public_url: parsed.publicUrl,
      });
    }

    if (setPinThumbnail) {
      for (const [albumId, imageId] of firstImagePerAlbum.entries()) {
        await db
          .prepare(
            `
            UPDATE images
            SET sort_order = CASE
              WHEN id = ? THEN -1
              WHEN sort_order < 0 THEN 0
              ELSE sort_order
            END
            WHERE album_id = ?
            `,
          )
          .bind(imageId, albumId)
          .run();
      }
    }

    const imported = results.filter((item) => item.status === 'imported').length;
    const skipped = results.filter((item) => item.status === 'skipped').length;
    const failed = results.filter((item) => item.status === 'error').length;

    return jsonResponse(
      {
        success: true,
        summary: {
          total: results.length,
          imported,
          skipped,
          failed,
          set_pin_thumbnail: setPinThumbnail,
          create_missing_albums: createMissingAlbums,
          base_url: baseUrl,
        },
        results,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error('cPanel upload import error:', error);
    return jsonResponse(
      { success: false, error: error?.message || 'Failed to import cPanel image paths' },
      { status: 500 },
    );
  }
}
