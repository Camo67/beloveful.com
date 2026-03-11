// Public album detail API (no auth).
// Returns a single published album + its published images.

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
  const { env, params } = context as { env: Env; params: { slug?: string } };
  const db = env.DB as D1Database;

  try {
    const slug = params?.slug;
    if (!slug) {
      return jsonResponse({ success: false, error: 'Album slug required' }, { status: 400 });
    }

    const album = await db
      .prepare(
        `
        SELECT id, region, country, slug, description
        FROM albums
        WHERE slug = ? AND is_published = 1
        LIMIT 1
        `,
      )
      .bind(slug)
      .first();

    if (!album) {
      return jsonResponse({ success: false, error: 'Album not found' }, { status: 404 });
    }

    const imagesResult = await db
      .prepare(
        `
        SELECT id, title, description, desktop_url, mobile_url, sort_order, created_at
        FROM images
        WHERE album_id = ? AND is_published = 1
        ORDER BY sort_order, created_at, id
        `,
      )
      .bind(album.id)
      .all();

    const images = (imagesResult.results || []).map((img: any) => ({
      id: img.id,
      title: img.title,
      description: img.description,
      desktop: img.desktop_url,
      mobile: img.mobile_url,
      sort_order: img.sort_order,
      created_at: img.created_at,
    }));

    return jsonResponse(
      {
        success: true,
        album: {
          id: album.id,
          region: album.region,
          country: album.country,
          slug: album.slug,
          title: album.country,
          description: album.description,
          images,
        },
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error('Public album error:', error);
    return jsonResponse({ success: false, error: 'Failed to fetch album' }, { status: 500 });
  }
}

