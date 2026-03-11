// Admin-only endpoint to seed the albums table with default country/location folders.
//
// This creates albums even if they have no images yet, so the admin uploader can target them.
// Public pages should still hide empty albums by filtering to those with images.
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

// Keep this list aligned with existing site slugs so public pages can merge static + DB cleanly.
const DEFAULT_ALBUMS: Array<{
  region: string;
  country: string;
  slug: string;
  sort_order?: number;
}> = [
  { region: 'Africa', country: 'Egypt', slug: 'egypt' },
  { region: 'Africa', country: 'Ethiopia', slug: 'ethiopia' },
  { region: 'Africa', country: 'Morocco', slug: 'morocco' },
  { region: 'Africa', country: 'Namibia', slug: 'namibia' },
  { region: 'Africa', country: 'South Africa', slug: 'south-africa' },

  { region: 'Asia', country: 'Hong Kong', slug: 'hong-kong' },
  { region: 'Asia', country: 'India', slug: 'india' },
  { region: 'Asia', country: 'Japan', slug: 'japan' },
  { region: 'Asia', country: 'Myanmar', slug: 'myanmar' },
  { region: 'Asia', country: 'Nepal', slug: 'nepal' },
  { region: 'Asia', country: 'Philippines', slug: 'phillipines' }, // keep legacy slug
  { region: 'Asia', country: 'Thailand', slug: 'thailand' },
  { region: 'Asia', country: 'Vietnam', slug: 'vietnam' },

  { region: 'Central America & Caribbean', country: 'Caribbean', slug: 'caribbean' },
  { region: 'Central America & Caribbean', country: 'Cuba', slug: 'cuba' },
  { region: 'Central America & Caribbean', country: 'Mexico', slug: 'mexico' },
  { region: 'Central America & Caribbean', country: 'Puerto Rico', slug: 'puerto-rico' },

  { region: 'Europe & Scandinavia', country: 'France', slug: 'france' },
  { region: 'Europe & Scandinavia', country: 'Greece', slug: 'greece' },
  { region: 'Europe & Scandinavia', country: 'Italy', slug: 'italy' },
  { region: 'Europe & Scandinavia', country: 'Portugal', slug: 'portugal' },
  { region: 'Europe & Scandinavia', country: 'Spain', slug: 'spain' },
  { region: 'Europe & Scandinavia', country: 'UK & Ireland', slug: 'uk-ireland' },

  { region: 'Middle East', country: 'Jordan', slug: 'jordan' },
  { region: 'Middle East', country: 'Israel / Palestine', slug: 'israel-palestine' },

  { region: 'North America', country: 'Chicago', slug: 'chicago' },
  { region: 'North America', country: 'New York', slug: 'new-york' },

  { region: 'South America', country: 'Argentina', slug: 'argentina' },
];

export async function onRequestPost(context: any): Promise<Response> {
  const { request, env } = context as { request: Request; env: Env };
  const db = env.DB as D1Database;

  try {
    const authResult = await verifyAuth(request, env);
    if (!authResult.success) {
      return jsonResponse(authResult, { status: 401 });
    }

    let inserted = 0;
    const stmt = db.prepare(`
      INSERT OR IGNORE INTO albums (region, country, slug, description, is_published, sort_order)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    for (const [idx, album] of DEFAULT_ALBUMS.entries()) {
      const sort = typeof album.sort_order === 'number' ? album.sort_order : idx;
      const result = await stmt
        .bind(album.region, album.country, album.slug, null, 1, sort)
        .run();
      if (result?.meta?.changes) inserted += result.meta.changes;
    }

    return jsonResponse(
      {
        success: true,
        inserted,
        total: DEFAULT_ALBUMS.length,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error('Seed albums error:', error);
    return jsonResponse({ success: false, error: 'Failed to seed albums' }, { status: 500 });
  }
}

