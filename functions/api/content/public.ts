interface Env {
  DB: D1Database;
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

export async function onRequestGet(context: any): Promise<Response> {
  const { request, env } = context as { request: Request; env: Env };
  const db = env.DB as D1Database;

  try {
    const url = new URL(request.url);
    const pageKey = url.searchParams.get('page_key');

    if (!pageKey) {
      return jsonResponse({ success: false, error: 'page_key query param is required' }, { status: 400 });
    }

    const result = await db
      .prepare(
        `
        SELECT content_key, content_value
        FROM page_content
        WHERE page_key = ?
        ORDER BY content_key
        `,
      )
      .bind(pageKey)
      .all();

    const content = Object.fromEntries(
      (result.results || []).map((row: any) => [String(row.content_key), String(row.content_value)]),
    );

    return jsonResponse({ success: true, content }, { status: 200 });
  } catch (error: any) {
    console.error('Get public content error:', error);
    return jsonResponse({ success: false, error: 'Failed to load content' }, { status: 500 });
  }
}
