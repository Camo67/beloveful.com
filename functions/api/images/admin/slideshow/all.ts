// API function for slideshow management
import { verifyAuth } from '../../../_utils/auth';

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
    
    // Get all slideshow images
    const images = await db.prepare(`
      SELECT * FROM slideshow_images
      ORDER BY sort_order, created_at
    `).all();
    
    return new Response(JSON.stringify({
      success: true,
      images: images.results || []
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
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
      title, 
      desktop_url, 
      mobile_url, 
      cloudinary_public_id, 
      sort_order = 0, 
      is_active = true 
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
    
    // Create new slideshow image
    const result = await db.prepare(`
      INSERT INTO slideshow_images (
        title, desktop_url, mobile_url, cloudinary_public_id, sort_order, is_active
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(
      title || null,
      desktop_url,
      mobile_url,
      cloudinary_public_id || null,
      sort_order,
      is_active
    ).run();
    
    if (!result.success) {
      throw new Error('Failed to create slideshow image');
    }
    
    // Get the created image
    const image = await db.prepare('SELECT * FROM slideshow_images WHERE id = ?').bind(result.meta.last_row_id).first();
    
    return new Response(JSON.stringify({
      success: true,
      image
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Create slideshow image error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message || 'Failed to create slideshow image'
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function onRequestPut(context: any): Promise<Response> {
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
    
    const url = new URL(request.url);
    const imageId = url.pathname.split('/').pop();
    
    if (!imageId) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Image ID required'
      }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const updates = await request.json();
    const allowedFields = ['title', 'desktop_url', 'mobile_url', 'sort_order', 'is_active'];
    const updateFields = Object.keys(updates).filter(key => allowedFields.includes(key));
    
    if (updateFields.length === 0) {
      return new Response(JSON.stringify({
        success: false,
        error: 'No valid fields to update'
      }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Build update query
    const setClause = updateFields.map(field => `${field} = ?`).join(', ');
    const values = updateFields.map(field => updates[field]);
    values.push(imageId);
    
    const result = await db.prepare(`
      UPDATE slideshow_images 
      SET ${setClause}
      WHERE id = ?
    `).bind(...values).run();
    
    if (!result.success) {
      throw new Error('Failed to update slideshow image');
    }
    
    // Get the updated image
    const image = await db.prepare('SELECT * FROM slideshow_images WHERE id = ?').bind(imageId).first();
    
    return new Response(JSON.stringify({
      success: true,
      image
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Update slideshow image error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message || 'Failed to update slideshow image'
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function onRequestDelete(context: any): Promise<Response> {
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
    
    const url = new URL(request.url);
    const imageId = url.pathname.split('/').pop();
    
    if (!imageId) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Image ID required'
      }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const result = await db.prepare('DELETE FROM slideshow_images WHERE id = ?').bind(imageId).run();
    
    if (!result.success) {
      throw new Error('Failed to delete slideshow image');
    }
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Slideshow image deleted successfully'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Delete slideshow image error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message || 'Failed to delete slideshow image'
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}