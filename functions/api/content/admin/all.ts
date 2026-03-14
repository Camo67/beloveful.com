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

export async function onRequestGet(context: any): Promise<Response> {
  const { request, env } = context as { request: Request; env: Env };
  const db = env.DB as D1Database;

  try {
    const authResult = await verifyAuth(request, env);
    if (!authResult.success) {
      return jsonResponse(authResult, { status: 401 });
    }

    const url = new URL(request.url);
    const pageKey = url.searchParams.get('page_key')?.trim();

    let query = 'SELECT * FROM page_content';
    const params: any[] = [];

    if (pageKey) {
      query += ' WHERE page_key = ?';
      params.push(pageKey);
    }

    query += ' ORDER BY page_key ASC, content_key ASC';

    const statement = params.length > 0 ? db.prepare(query).bind(...params) : db.prepare(query);
    const blocks = await statement.all();

    return jsonResponse(
      {
        success: true,
        blocks: blocks.results || [],
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error('Get content blocks error:', error);
    return jsonResponse(
      {
        success: false,
        error: error?.message || 'Failed to fetch content blocks',
      },
      { status: 500 },
    );
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

    const payload = await request.json();
    const pageKey = String(payload?.page_key || '').trim();
    const contentKey = String(payload?.content_key || '').trim();
    const contentValue = String(payload?.content_value || '');
    const contentType = String(payload?.content_type || 'text').trim().toLowerCase();

    if (!pageKey || !contentKey) {
      return jsonResponse(
        {
          success: false,
          error: 'Page and block key are required',
        },
        { status: 400 },
      );
    }

    if (!CONTENT_TYPES.has(contentType)) {
      return jsonResponse(
        {
          success: false,
          error: 'Invalid content type',
        },
        { status: 400 },
      );
    }

    const result = await db
      .prepare(
        `
          INSERT INTO page_content (
            page_key,
            content_key,
            content_value,
            content_type
          )
          VALUES (?, ?, ?, ?)
        `,
      )
      .bind(pageKey, contentKey, contentValue, contentType)
      .run();

    if (!result.success) {
      throw new Error('Failed to create content block');
    }

    const block = await db
      .prepare('SELECT * FROM page_content WHERE id = ?')
      .bind(result.meta.last_row_id)
      .first();

    return jsonResponse(
      {
        success: true,
        block,
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error('Create content block error:', error);

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
      {
        success: false,
        error: error?.message || 'Failed to create content block',
      },
      { status: 500 },
    );
  }
}
