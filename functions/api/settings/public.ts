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
  const { env } = context as { env: Env };
  const db = env.DB as D1Database;

  try {
    const result = await db
      .prepare(
        `
        SELECT key, value
        FROM settings
        WHERE key IN ('contact_email', 'print_email', 'calendly_url')
        ORDER BY key
        `,
      )
      .all();

    const settings = Object.fromEntries(
      (result.results || []).map((row: any) => [String(row.key), String(row.value ?? '')]),
    );

    return jsonResponse({ success: true, settings }, { status: 200 });
  } catch (error: any) {
    console.error('Get public site settings error:', error);
    return jsonResponse({ success: false, error: 'Failed to load site settings' }, { status: 500 });
  }
}
