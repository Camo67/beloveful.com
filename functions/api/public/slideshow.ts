// Public API to fetch active slideshow images for the frontend
interface Env {
  DB: D1Database;
}

export async function onRequestGet(context: any): Promise<Response> {
  const { env } = context;
  const db = env.DB as D1Database;
  
  try {
    // Get active slideshow images
    const images = await db.prepare(`
      SELECT id, title, desktop_url, mobile_url, sort_order
      FROM slideshow_images
      WHERE is_active = 1
      ORDER BY sort_order, created_at
    `).all();
    
    return new Response(JSON.stringify({
      success: true,
      images: images.results || []
    }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
      }
    });
    
  } catch (error) {
    console.error('Get slideshow error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to fetch slideshow images'
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}