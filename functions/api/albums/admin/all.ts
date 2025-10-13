// API function to get all albums for admin
interface Env {
  DB: D1Database;
  JWT_SECRET: string;
}

// Import auth verification (we'll create a shared utility)
import { verifyAuth } from '../../_utils/auth';

export async function onRequestGet(context: any): Promise<Response> {
  const { request, env } = context;
  const db = env.DB as D1Database;
  
  try {
    // Verify admin authentication
    const authResult = await verifyAuth(request, env);
    if (!authResult.success) {
      return new Response(JSON.stringify(authResult), { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Get all albums with image counts
    const albums = await db.prepare(`
      SELECT a.*, COUNT(i.id) as image_count
      FROM albums a
      LEFT JOIN images i ON a.id = i.album_id
      GROUP BY a.id
      ORDER BY a.region, a.sort_order, a.country
    `).all();
    
    return new Response(JSON.stringify({
      success: true,
      albums: albums.results || []
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Get albums error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to fetch albums'
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function onRequestPost(context: any): Promise<Response> {
  const { request, env } = context;
  const db = env.DB as D1Database;
  
  try {
    // Verify admin authentication
    const authResult = await verifyAuth(request, env);
    if (!authResult.success) {
      return new Response(JSON.stringify(authResult), { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const { region, country, slug, description, is_published = true, sort_order = 0 } = await request.json();
    
    if (!region || !country || !slug) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Region, country, and slug are required'
      }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Create new album
    const result = await db.prepare(`
      INSERT INTO albums (region, country, slug, description, is_published, sort_order)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(region, country, slug, description || null, is_published, sort_order).run();
    
    if (!result.success) {
      throw new Error('Failed to create album');
    }
    
    // Get the created album
    const album = await db.prepare('SELECT * FROM albums WHERE id = ?').bind(result.meta.last_row_id).first();
    
    return new Response(JSON.stringify({
      success: true,
      album
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Create album error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message || 'Failed to create album'
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}