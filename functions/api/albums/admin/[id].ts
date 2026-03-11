// API function to update/delete an album for admin
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

    const albumId = params?.id;
    if (!albumId) {
      return jsonResponse({ success: false, error: 'Album ID required' }, { status: 400 });
    }

    let updates: any;
    try {
      updates = await request.json();
    } catch {
      return jsonResponse({ success: false, error: 'Invalid JSON body' }, { status: 400 });
    }

    const allowedFields = new Set([
      'region',
      'country',
      'slug',
      'description',
      'is_published',
      'sort_order',
    ]);

    const fields: string[] = [];
    const values: any[] = [];

    for (const [key, value] of Object.entries(updates || {})) {
      if (!allowedFields.has(key)) continue;

      if (key === 'is_published') {
        // Store booleans as 0/1 for SQLite compatibility
        fields.push(`${key} = ?`);
        values.push(typeof value === 'boolean' ? (value ? 1 : 0) : value);
        continue;
      }

      if (key === 'sort_order') {
        fields.push(`${key} = ?`);
        values.push(Number.isFinite(Number(value)) ? Number(value) : 0);
        continue;
      }

      fields.push(`${key} = ?`);
      values.push(value ?? null);
    }

    if (fields.length === 0) {
      return jsonResponse({ success: false, error: 'No valid fields to update' }, { status: 400 });
    }

    values.push(albumId);

    const result = await db
      .prepare(`UPDATE albums SET ${fields.join(', ')} WHERE id = ?`)
      .bind(...values)
      .run();

    if (!result.success) {
      throw new Error('Failed to update album');
    }

    const album = await db.prepare('SELECT * FROM albums WHERE id = ?').bind(albumId).first();
    if (!album) {
      return jsonResponse({ success: false, error: 'Album not found' }, { status: 404 });
    }

    return jsonResponse({ success: true, album }, { status: 200 });
  } catch (error: any) {
    console.error('Update album error:', error);
    return jsonResponse(
      { success: false, error: error?.message || 'Failed to update album' },
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

    const albumId = params?.id;
    if (!albumId) {
      return jsonResponse({ success: false, error: 'Album ID required' }, { status: 400 });
    }

    // Remove associated images so the admin UI behavior matches expectations.
    await db.prepare('DELETE FROM images WHERE album_id = ?').bind(albumId).run();

    const result = await db.prepare('DELETE FROM albums WHERE id = ?').bind(albumId).run();

    if (!result.success) {
      throw new Error('Failed to delete album');
    }

    return jsonResponse({ success: true, message: 'Album deleted successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Delete album error:', error);
    return jsonResponse(
      { success: false, error: error?.message || 'Failed to delete album' },
      { status: 500 },
    );
  }
}

