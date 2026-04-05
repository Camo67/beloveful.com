// Public albums API (no auth).
// Returns only published albums that have at least one published image.

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
        SELECT
          a.id,
          a.region,
          a.country,
          a.slug,
          a.description,
          a.sort_order,
          a.is_published,
          (
            SELECT COUNT(1)
            FROM images i
            WHERE i.album_id = a.id AND i.is_published = 1
          ) AS image_count,
          (
            SELECT i.desktop_url
            FROM images i
            WHERE i.album_id = a.id AND i.is_published = 1
            ORDER BY i.sort_order, i.created_at DESC, i.id DESC
            LIMIT 1
          ) AS cover_desktop_url,
          (
            SELECT i.mobile_url
            FROM images i
            WHERE i.album_id = a.id AND i.is_published = 1
            ORDER BY i.sort_order, i.created_at DESC, i.id DESC
            LIMIT 1
          ) AS cover_mobile_url
        FROM albums a
        WHERE a.is_published = 1
          AND EXISTS (
            SELECT 1
            FROM images i
            WHERE i.album_id = a.id AND i.is_published = 1
          )
        ORDER BY a.region, a.sort_order, a.country
        `,
      )
      .all();

    return jsonResponse(
      {
        success: true,
        albums: result.results || [],
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error('Public albums error:', error);
    return jsonResponse({ success: false, error: 'Failed to fetch albums' }, { status: 500 });
  }
}

