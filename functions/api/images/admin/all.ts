// API function to get all images for admin
import { verifyAuth } from '../../_utils/auth';

interface Env {
  DB: D1Database;
  JWT_SECRET: string;
}

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
    
    // Get URL parameters for filtering
    const url = new URL(request.url);
    const albumId = url.searchParams.get('album_id');
    
    let query = `
      SELECT i.*, a.country, a.region 
      FROM images i
      LEFT JOIN albums a ON i.album_id = a.id
    `;
    let params: any[] = [];
    
    if (albumId) {
      query += ' WHERE i.album_id = ?';
      params.push(albumId);
    }
    
    query += ' ORDER BY i.sort_order, i.created_at DESC';
    
    const stmt = params.length > 0 ? db.prepare(query).bind(...params) : db.prepare(query);
    const images = await stmt.all();
    
    return new Response(JSON.stringify({
      success: true,
      images: images.results || []
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Get images error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to fetch images'
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
    
    const { 
      album_id, 
      title, 
      description, 
      desktop_url, 
      mobile_url, 
      cloudinary_public_id, 
      is_published = true, 
      sort_order = 0 
    } = await request.json();
    
    if (!desktop_url || !mobile_url) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Desktop and mobile URLs are required'
      }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Create new image
    const result = await db.prepare(`
      INSERT INTO images (
        album_id, title, description, desktop_url, mobile_url, 
        cloudinary_public_id, is_published, sort_order
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      album_id || null, 
      title || null, 
      description || null, 
      desktop_url, 
      mobile_url, 
      cloudinary_public_id || null, 
      is_published, 
      sort_order
    ).run();
    
    if (!result.success) {
      throw new Error('Failed to create image record');
    }
    
    // Get the created image
    const image = await db.prepare('SELECT * FROM images WHERE id = ?').bind(result.meta.last_row_id).first();
    
    return new Response(JSON.stringify({
      success: true,
      image
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Create image error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message || 'Failed to create image'
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}