// Image upload API using WordPress Media Library (REST API).
//
// This endpoint is admin-protected (JWT) and stores metadata in D1.
// The actual image binary is uploaded to WordPress so the website can serve it from WP.
import { verifyAuth } from '../_utils/auth';

interface Env {
  DB: D1Database;
  JWT_SECRET: string;

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

function pickWpImageUrl(payload: WpMediaUploadResponse, preferredSizes: string[]): string {
  const sizes = payload?.media_details?.sizes || {};
  for (const size of preferredSizes) {
    const hit = sizes?.[size]?.source_url;
    if (typeof hit === 'string' && hit.trim()) return hit;
  }
  return payload?.source_url || '';
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
    if (!uploadEndpoint || !wpUsername || !wpAppPassword) {
      return jsonResponse(
        {
          success: false,
          error:
            'WordPress credentials not configured. Set WP_BASE_URL, WP_USERNAME, WP_APP_PASSWORD.',
        },
        { status: 500 },
      );
    }

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

    // Upload binary to WordPress Media Library
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
      return jsonResponse(
        {
          success: false,
          error: 'Failed to upload image to WordPress',
          details: wpPayload || wpUploadText,
        },
        { status: 502 },
      );
    }

    // Optional: update title/alt/caption on the WP attachment
    // This is best-effort; failures shouldn't block the D1 insert.
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

    // Pick URLs for desktop/mobile
    const desktopUrl = pickWpImageUrl(wpPayload, ['large', 'full']);
    const mobileUrl = pickWpImageUrl(wpPayload, ['medium_large', 'medium', 'large', 'full']);

    if (!desktopUrl || !mobileUrl) {
      return jsonResponse(
        { success: false, error: 'WordPress upload succeeded but no usable URLs returned' },
        { status: 502 },
      );
    }

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
        desktopUrl,
        mobileUrl,
        // Keep schema backwards-compatible; store WP media id here.
        `wp:${wpPayload.id}`,
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
        wordpress: wpPayload,
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
