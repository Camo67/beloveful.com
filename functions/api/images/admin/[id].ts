// API function to update/delete an image for admin
import { verifyAuth } from '../../_utils/auth';

interface Env {
  DB: D1Database;
  JWT_SECRET: string;
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

export async function onRequestPut(context: any): Promise<Response> {
  const { request, env, params } = context as { request: Request; env: Env; params: { id?: string } };
  const db = env.DB as D1Database;

  try {
    const authResult = await verifyAuth(request, env);
    if (!authResult.success) {
      return jsonResponse(authResult, { status: 401 });
    }

    const imageId = params?.id;
    if (!imageId) {
      return jsonResponse({ success: false, error: 'Image ID required' }, { status: 400 });
    }

    let updates: any;
    try {
      updates = await request.json();
    } catch {
      return jsonResponse({ success: false, error: 'Invalid JSON body' }, { status: 400 });
    }

    const allowedFields = new Set([
      'album_id',
      'title',
      'description',
      'desktop_url',
      'mobile_url',
      'cloudinary_public_id',
      'is_published',
      'sort_order',
    ]);

    const fields: string[] = [];
    const values: any[] = [];

    for (const [key, value] of Object.entries(updates || {})) {
      if (!allowedFields.has(key)) continue;

      if (key === 'is_published') {
        fields.push(`${key} = ?`);
        values.push(typeof value === 'boolean' ? (value ? 1 : 0) : value);
        continue;
      }

      if (key === 'sort_order') {
        fields.push(`${key} = ?`);
        values.push(Number.isFinite(Number(value)) ? Number(value) : 0);
        continue;
      }

      if (key === 'album_id') {
        fields.push(`${key} = ?`);
        // Allow null/empty string to unset album.
        if (value === '' || value === undefined) values.push(null);
        else values.push(value);
        continue;
      }

      fields.push(`${key} = ?`);
      values.push(value ?? null);
    }

    if (fields.length === 0) {
      return jsonResponse({ success: false, error: 'No valid fields to update' }, { status: 400 });
    }

    values.push(imageId);

    const result = await db
      .prepare(`UPDATE images SET ${fields.join(', ')} WHERE id = ?`)
      .bind(...values)
      .run();

    if (!result.success) {
      throw new Error('Failed to update image');
    }

    const image = await db.prepare('SELECT * FROM images WHERE id = ?').bind(imageId).first();
    if (!image) {
      return jsonResponse({ success: false, error: 'Image not found' }, { status: 404 });
    }

    return jsonResponse({ success: true, image }, { status: 200 });
  } catch (error: any) {
    console.error('Update image error:', error);
    return jsonResponse(
      { success: false, error: error?.message || 'Failed to update image' },
      { status: 500 },
    );
  }
}

export async function onRequestDelete(context: any): Promise<Response> {
  const { request, env, params } = context as { request: Request; env: Env; params: { id?: string } };
  const db = env.DB as D1Database;

  try {
    const authResult = await verifyAuth(request, env);
    if (!authResult.success) {
      return jsonResponse(authResult, { status: 401 });
    }

    const imageId = params?.id;
    if (!imageId) {
      return jsonResponse({ success: false, error: 'Image ID required' }, { status: 400 });
    }

    const result = await db.prepare('DELETE FROM images WHERE id = ?').bind(imageId).run();

    if (!result.success) {
      throw new Error('Failed to delete image');
    }

    return jsonResponse({ success: true, message: 'Image deleted successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Delete image error:', error);
    return jsonResponse(
      { success: false, error: error?.message || 'Failed to delete image' },
      { status: 500 },
    );
  }
}

