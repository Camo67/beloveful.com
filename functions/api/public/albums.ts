// Public API to fetch published albums for the frontend
interface Env {
  DB: D1Database;
}

export async function onRequestGet(context: any): Promise<Response> {
  const { env } = context;
  const db = env.DB as D1Database;
  
  try {
    // Get all published albums with their images
    const albums = await db.prepare(`
      SELECT 
        a.id, a.region, a.country, a.slug, a.description, a.sort_order,
        COUNT(i.id) as image_count
      FROM albums a
      LEFT JOIN images i ON a.id = i.album_id AND i.is_published = 1
      WHERE a.is_published = 1
      GROUP BY a.id
      ORDER BY a.region, a.sort_order, a.country
    `).all();
    
    return new Response(JSON.stringify({
      success: true,
      albums: albums.results || []
    }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
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