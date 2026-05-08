// Public API to fetch published albums for the frontend
import { normalizeAlbumSlug } from '../../../src/lib/album-slugs';

interface Env {
  DB: D1Database;
}

export async function onRequestGet(context: any): Promise<Response> {
  const { env } = context;
  const db = env.DB as D1Database;
  
  try {
    // 1. Fetch dynamic filesystem data from Bluehost
    let dynamicData: any = { albums: [], slideshow: [], logos: [] };
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

    // 2. Get metadata from D1 to supplement filesystem data
    const dbAlbums = await db.prepare(`
      SELECT id, slug, country, description, cover_desktop_url, cover_mobile_url
      FROM albums
      WHERE is_published = 1
    `).all();
    
    const metadataBySlug = new Map();
    for (const album of (dbAlbums.results || [])) {
      const s = normalizeAlbumSlug(album.slug || album.country);
      metadataBySlug.set(s, album);
    }

    // 3. Merge: Prefer Bluehost filesystem for structure/images, D1 for metadata
    const mergedAlbums = (dynamicData.albums || []).map((album: any) => {
      const slug = normalizeAlbumSlug(album.slug || album.country);
      const meta = metadataBySlug.get(slug);
      
      return {
        ...album,
        id: meta?.id || null,
        description: meta?.description || album.description || '',
        slug,
        image_count: album.images?.length || 0,
        // If D1 has a specific cover override, we could use it here
      };
    });

    // 4. Also include albums that only exist in D1 (if any)
    const dynamicSlugs = new Set(mergedAlbums.map((a: any) => a.slug));
    for (const [slug, meta] of metadataBySlug) {
      if (!dynamicSlugs.has(slug)) {
        mergedAlbums.push({
          ...meta,
          slug,
          images: [], // No physical images found in sync
          image_count: 0
        });
      }
    }
    
    return new Response(JSON.stringify({
      success: true,
      albums: mergedAlbums,
      slideshow: dynamicData.slideshow,
      logos: dynamicData.logos
    }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
      }
    });
    
  } catch (error) {
    console.error('Get public albums error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to fetch albums'
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
