// Image upload API using WordPress Media Library when configured,
// with Cloudflare R2 as an automatic fallback.
//
// This endpoint is admin-protected (JWT) and stores metadata in D1.
import { verifyAuth } from '../_utils/auth';

interface Env {
  DB: D1Database;
  JWT_SECRET: string;
  R2_BUCKET?: R2Bucket;

  // WordPress REST API configuration
  WP_BASE_URL: string; // e.g. "https://example.com" (or "https://example.com/wp-json")
  WP_USERNAME: string; // WP username with permission to upload media
  WP_APP_PASSWORD: string; // WP application password (spaces allowed; they are stripped)
}

function jsonResponse(payload: any, init: ResponseInit = {}): Response {
  return new Response(JSON.stringify(payload), {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  });
}

function resolveWpMediaEndpoint(baseUrl: string): string {
  const trimmed = String(baseUrl || '').trim().replace(/\/+$/, '');
  if (!trimmed) return '';
  if (trimmed.endsWith('/wp-json')) return `${trimmed}/wp/v2/media`;
  if (trimmed.includes('/wp-json/')) {
    // If someone passes "https://example.com/wp-json/wp/v2", normalize to ".../wp-json/wp/v2/media"
    const idx = trimmed.indexOf('/wp-json/');
    return `${trimmed.slice(0, idx + '/wp-json'.length)}/wp/v2/media`;
  }
  return `${trimmed}/wp-json/wp/v2/media`;
}

function resolveWpMediaUpdateEndpoint(baseUrl: string, mediaId: number): string {
  const trimmed = String(baseUrl || '').trim().replace(/\/+$/, '');
  if (!trimmed) return '';
  if (trimmed.endsWith('/wp-json')) return `${trimmed}/wp/v2/media/${mediaId}`;
  if (trimmed.includes('/wp-json/')) {
    const idx = trimmed.indexOf('/wp-json/');
    return `${trimmed.slice(0, idx + '/wp-json'.length)}/wp/v2/media/${mediaId}`;
  }
  return `${trimmed}/wp-json/wp/v2/media/${mediaId}`;
}

function basicAuthHeader(username: string, appPassword: string): string {
  const cleanPassword = String(appPassword || '').replace(/\s+/g, '');
  const raw = `${username}:${cleanPassword}`;
  return `Basic ${btoa(raw)}`;
}

function sanitizeFilename(name: string): string {
  const base = (name || 'upload').split(/[\\/]/).pop() || 'upload';
  // WordPress is fine with spaces, but keep it simple and avoid weird control characters.
  return base.replace(/[\\r\\n\\t\\0]/g, '').slice(0, 200);
}

type WpMediaUploadResponse = {
  id: number;
  source_url: string;
  title?: { raw?: string; rendered?: string };
  alt_text?: string;
  caption?: { raw?: string; rendered?: string };
  media_details?: {
    sizes?: Record<string, { source_url: string }>;
  };
};

interface AlbumRecord {
  id: number;
  region: string;
  country: string;
  slug: string;
}

type UploadResult = {
  storage: 'wordpress' | 'r2';
  desktopUrl: string;
  mobileUrl: string;
  storageId: string;
  wordpress?: WpMediaUploadResponse;
  r2Key?: string;
};

function pickWpImageUrl(payload: WpMediaUploadResponse, preferredSizes: string[]): string {
  const sizes = payload?.media_details?.sizes || {};
  for (const size of preferredSizes) {
    const hit = sizes?.[size]?.source_url;
    if (typeof hit === 'string' && hit.trim()) return hit;
  }
  return payload?.source_url || '';
}

function sanitizePathSegment(value: string): string {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'upload';
}

function getFileExtension(filename: string, mimeType: string): string {
  const fileMatch = filename.toLowerCase().match(/\.([a-z0-9]+)$/);
  if (fileMatch?.[1]) return fileMatch[1];

  const mimeMap: Record<string, string> = {
    'image/avif': 'avif',
    'image/gif': 'gif',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
  };

  return mimeMap[mimeType] || 'bin';
}

function encodeR2KeyForUrl(key: string): string {
  return key
    .split('/')
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join('/');
}

function buildR2ObjectKey(album: AlbumRecord | null, filename: string, mimeType: string): string {
  const extension = getFileExtension(filename, mimeType);
  const baseName = sanitizePathSegment(filename.replace(/\.[^/.]+$/, '')) || 'image';
  const region = sanitizePathSegment(album?.region || 'uploads');
  const slug = sanitizePathSegment(album?.slug || album?.country || 'unassigned');
  const uniquePrefix = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}`;

  return `portfolio/${region}/${slug}/${uniquePrefix}-${baseName}.${extension}`;
}

async function uploadToR2(
  bucket: R2Bucket,
  request: Request,
  album: AlbumRecord | null,
  file: File,
): Promise<UploadResult> {
  const filename = sanitizeFilename(file.name);
  const key = buildR2ObjectKey(album, filename, file.type || 'application/octet-stream');

  await bucket.put(key, await file.arrayBuffer(), {
    httpMetadata: {
      contentType: file.type || 'application/octet-stream',
      contentDisposition: `inline; filename="${filename.replace(/"/g, '')}"`,
    },
  });

  const publicUrl = `${new URL(request.url).origin}/r2/${encodeR2KeyForUrl(key)}`;

  return {
    storage: 'r2',
    desktopUrl: publicUrl,
    mobileUrl: publicUrl,
    storageId: `r2:${key}`,
    r2Key: key,
  };
}

async function uploadToWordPress(
  uploadEndpoint: string,
  wpBaseUrl: string,
  wpUsername: string,
  wpAppPassword: string,
  file: File,
  title: string,
  description: string,
): Promise<UploadResult> {
  const filename = sanitizeFilename(file.name);
  const wpAuth = basicAuthHeader(wpUsername, wpAppPassword);

  const wpUploadResp = await fetch(uploadEndpoint, {
    method: 'POST',
    headers: {
      Authorization: wpAuth,
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Type': file.type || 'application/octet-stream',
      Accept: 'application/json',
    },
    body: file,
  });

  const wpUploadText = await wpUploadResp.text();
  let wpPayload: WpMediaUploadResponse | null = null;
  try {
    wpPayload = JSON.parse(wpUploadText);
  } catch {
    // ignore
  }

  if (!wpUploadResp.ok || !wpPayload?.id) {
    console.error('WordPress media upload failed:', wpUploadResp.status, wpUploadText);
    const error = new Error('Failed to upload image to WordPress');
    (error as any).details = wpPayload || wpUploadText;
    throw error;
  }

  try {
    const updateEndpoint = resolveWpMediaUpdateEndpoint(wpBaseUrl, wpPayload.id);
    const updateBody: any = {};
    if (title.trim()) updateBody.title = title.trim();
    if (description.trim()) updateBody.caption = description.trim();
    if (title.trim()) updateBody.alt_text = title.trim();

    if (updateEndpoint && Object.keys(updateBody).length) {
      await fetch(updateEndpoint, {
        method: 'POST',
        headers: {
          Authorization: wpAuth,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(updateBody),
      }).catch(() => undefined);
    }
  } catch {
    // ignore
  }

  const desktopUrl = pickWpImageUrl(wpPayload, ['large', 'full']);
  const mobileUrl = pickWpImageUrl(wpPayload, ['medium_large', 'medium', 'large', 'full']);

  if (!desktopUrl || !mobileUrl) {
    throw new Error('WordPress upload succeeded but no usable URLs returned');
  }

  return {
    storage: 'wordpress',
    desktopUrl,
    mobileUrl,
    storageId: `wp:${wpPayload.id}`,
    wordpress: wpPayload,
  };
}

export async function onRequestPost(context: any): Promise<Response> {
  const { request, env } = context as { request: Request; env: Env };
  const db = env.DB as D1Database;

  try {
    // Verify admin authentication
    const authResult = await verifyAuth(request, env);
    if (!authResult.success) {
      return jsonResponse(authResult, { status: 401 });
    }

    const wpBaseUrl = env.WP_BASE_URL;
    const wpUsername = env.WP_USERNAME;
    const wpAppPassword = env.WP_APP_PASSWORD;

    const uploadEndpoint = resolveWpMediaEndpoint(wpBaseUrl);

    // Parse multipart form data
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const albumIdRaw = formData.get('album_id') as string | null;
    const title = (formData.get('title') as string | null) ?? '';
    const description = (formData.get('description') as string | null) ?? '';

    const albumId = albumIdRaw && albumIdRaw.trim() ? Number(albumIdRaw) : null;

    if (!file) {
      return jsonResponse({ success: false, error: 'No file provided' }, { status: 400 });
    }

    if (!file.type || !file.type.startsWith('image/')) {
      return jsonResponse({ success: false, error: 'File must be an image' }, { status: 400 });
    }

    const album = albumId
      ? ((await db
          .prepare('SELECT id, region, country, slug FROM albums WHERE id = ? LIMIT 1')
          .bind(albumId)
          .first()) as AlbumRecord | null)
      : null;

    if (albumId && !album) {
      return jsonResponse({ success: false, error: 'Selected album not found' }, { status: 400 });
    }

    const wpConfigured = !!uploadEndpoint && !!wpUsername && !!wpAppPassword;
    let uploadResult: UploadResult | null = null;
    let wpUploadError: any = null;

    if (wpConfigured) {
      try {
        uploadResult = await uploadToWordPress(
          uploadEndpoint,
          wpBaseUrl,
          wpUsername,
          wpAppPassword,
          file,
          title,
          description,
        );
      } catch (error) {
        wpUploadError = error;
        console.warn('WordPress upload failed, trying R2 fallback if available:', error);
      }
    }

    if (!uploadResult && env.R2_BUCKET) {
      uploadResult = await uploadToR2(env.R2_BUCKET, request, album, file);
    }

    if (!uploadResult) {
      if (wpUploadError) {
        return jsonResponse(
          {
            success: false,
            error: wpUploadError?.message || 'Failed to upload image',
            details: wpUploadError?.details,
          },
          { status: 502 },
        );
      }

      return jsonResponse(
        {
          success: false,
          error:
            'No upload storage is configured. Set WordPress credentials or enable the R2 bucket binding.',
        },
        { status: 500 },
      );
    }

    const filename = sanitizeFilename(file.name);

    // Store in database
    const insert = await db
      .prepare(`
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
      `)
      .bind(
        albumId,
        title?.trim() || filename,
        description?.trim() || null,
        uploadResult.desktopUrl,
        uploadResult.mobileUrl,
        uploadResult.storageId,
        1,
        0,
      )
      .run();

    if (!insert.success) {
      throw new Error('Failed to save image to database');
    }

    const image = await db
      .prepare('SELECT * FROM images WHERE id = ?')
      .bind(insert.meta.last_row_id)
      .first();

    return jsonResponse(
      {
        success: true,
        image,
        storage: uploadResult.storage,
        wordpress: uploadResult.wordpress,
        r2_key: uploadResult.r2Key,
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error('Image upload error:', error);
    return jsonResponse(
      { success: false, error: error?.message || 'Failed to upload image' },
      { status: 500 },
    );
  }
}
