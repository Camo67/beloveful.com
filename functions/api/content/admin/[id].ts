import { verifyAuth } from '../../_utils/auth';

interface Env {
  DB: D1Database;
  JWT_SECRET: string;
}

const CONTENT_TYPES = new Set(['text', 'html', 'markdown']);

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

    const blockId = params?.id;
    if (!blockId) {
      return jsonResponse({ success: false, error: 'Block ID required' }, { status: 400 });
    }

    let updates: any;
    try {
      updates = await request.json();
    } catch {
      return jsonResponse({ success: false, error: 'Invalid JSON body' }, { status: 400 });
    }

    const fields: string[] = [];
    const values: any[] = [];

    if (Object.prototype.hasOwnProperty.call(updates || {}, 'page_key')) {
      const pageKey = String(updates.page_key || '').trim();
      if (!pageKey) {
        return jsonResponse({ success: false, error: 'Page is required' }, { status: 400 });
      }
      fields.push('page_key = ?');
      values.push(pageKey);
    }

    if (Object.prototype.hasOwnProperty.call(updates || {}, 'content_key')) {
      const contentKey = String(updates.content_key || '').trim();
      if (!contentKey) {
        return jsonResponse({ success: false, error: 'Block key is required' }, { status: 400 });
      }
      fields.push('content_key = ?');
      values.push(contentKey);
    }

    if (Object.prototype.hasOwnProperty.call(updates || {}, 'content_value')) {
      fields.push('content_value = ?');
      values.push(String(updates.content_value || ''));
    }

    if (Object.prototype.hasOwnProperty.call(updates || {}, 'content_type')) {
      const contentType = String(updates.content_type || '').trim().toLowerCase();
      if (!CONTENT_TYPES.has(contentType)) {
        return jsonResponse({ success: false, error: 'Invalid content type' }, { status: 400 });
      }
      fields.push('content_type = ?');
      values.push(contentType);
    }

    if (fields.length === 0) {
      return jsonResponse({ success: false, error: 'No valid fields to update' }, { status: 400 });
    }

    values.push(blockId);

    const result = await db
      .prepare(`UPDATE page_content SET ${fields.join(', ')} WHERE id = ?`)
      .bind(...values)
      .run();

    if (!result.success) {
      throw new Error('Failed to update content block');
    }

    const block = await db.prepare('SELECT * FROM page_content WHERE id = ?').bind(blockId).first();
    if (!block) {
      return jsonResponse({ success: false, error: 'Content block not found' }, { status: 404 });
    }

    return jsonResponse({ success: true, block }, { status: 200 });
  } catch (error: any) {
    console.error('Update content block error:', error);

    if (String(error?.message || '').includes('UNIQUE')) {
      return jsonResponse(
        {
          success: false,
          error: 'A block with that page and key already exists',
        },
        { status: 409 },
      );
    }

    return jsonResponse(
      { success: false, error: error?.message || 'Failed to update content block' },
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

    const blockId = params?.id;
    if (!blockId) {
      return jsonResponse({ success: false, error: 'Block ID required' }, { status: 400 });
    }

    const result = await db.prepare('DELETE FROM page_content WHERE id = ?').bind(blockId).run();
    if (!result.success) {
      throw new Error('Failed to delete content block');
    }

    return jsonResponse({ success: true, message: 'Content block deleted successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Delete content block error:', error);
    return jsonResponse(
      { success: false, error: error?.message || 'Failed to delete content block' },
      { status: 500 },
    );
  }
}
