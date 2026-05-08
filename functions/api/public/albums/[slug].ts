// Public API to fetch images for a specific album by slug
import { normalizeAlbumSlug } from '../../../../src/lib/album-slugs';

interface Env {
  DB: D1Database;
}

export async function onRequestGet(context: any): Promise<Response> {
  const { params, env } = context;
  const db = env.DB as D1Database;
  const slug = normalizeAlbumSlug(params.slug);
  
  try {
    // 1. Fetch dynamic filesystem data from Bluehost
    let dynamicData: any = { albums: [] };
    try {
      const bhResponse = await fetch('https://beloveful.com/api/public/sync', {
        headers: { 'Accept': 'application/json' }
      });
      if (bhResponse.ok) {
        dynamicData = await bhResponse.json();
      }
    } catch (e) {
      console.error('Failed to fetch from Bluehost sync:', e);
    }

    // 2. Find the album in dynamic data
    const bhAlbum = (dynamicData.albums || []).find((a: any) => 
      normalizeAlbumSlug(a.slug || a.country) === slug
    );

    // 3. Get metadata from D1
    let dbAlbum = await db.prepare(`
      SELECT * FROM albums WHERE slug = ? OR country = ?
    `).bind(slug, slug).first();

    if (!bhAlbum && !dbAlbum) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Album not found'
      }), { 
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 4. Merge
    const album = {
      ...(bhAlbum || {}),
      ...(dbAlbum || {}),
      slug,
      images: bhAlbum?.images || []
    };

    // If D1 has images and Bluehost doesn't (or we want to fallback), check D1 images
    if (album.images.length === 0 && dbAlbum) {
      const dbImages = await db.prepare(`
        SELECT id, title, description, desktop_url, mobile_url, sort_order
        FROM images 
        WHERE album_id = ? AND is_published = 1
        ORDER BY sort_order, created_at
      `).bind(dbAlbum.id).all();
      album.images = dbImages.results || [];
    }
    
    return new Response(JSON.stringify({
      success: true,
      album
    }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600'
      }
    });
    
  } catch (error) {
    console.error('Get album by slug error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to fetch album'
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
