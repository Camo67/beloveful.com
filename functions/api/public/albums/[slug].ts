// Public API to fetch images for a specific album by slug
interface Env {
  DB: D1Database;
}

export async function onRequestGet(context: any): Promise<Response> {
  const { params, env } = context;
  const db = env.DB as D1Database;
  const slug = params.slug;
  
  try {
    // Get album and its images
    const album = await db.prepare(`
      SELECT a.*, COUNT(i.id) as image_count
      FROM albums a
      LEFT JOIN images i ON a.id = i.album_id AND i.is_published = 1
      WHERE a.slug = ? AND a.is_published = 1
      GROUP BY a.id
    `).bind(slug).first();
    
    if (!album) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Album not found'
      }), { 
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Get images for this album
    const images = await db.prepare(`
      SELECT id, title, description, desktop_url, mobile_url, sort_order
      FROM images 
      WHERE album_id = ? AND is_published = 1
      ORDER BY sort_order, created_at
    `).bind(album.id).all();
    
    return new Response(JSON.stringify({
      success: true,
      album: {
        ...album,
        images: images.results || []
      }
    }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
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