// Image upload API with Cloudinary integration
import { verifyAuth } from '../_utils/auth';

interface Env {
  DB: D1Database;
  JWT_SECRET: string;
  CLOUDINARY_CLOUD_NAME: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
}

// Generate Cloudinary signature for secure uploads
async function generateSignature(params: any, apiSecret: string): Promise<string> {
  // Sort parameters alphabetically and create query string
  const sortedParams = Object.keys(params)
    .sort()
    .map(key => `${key}=${params[key]}`)
    .join('&');
  
  // Add API secret
  const stringToSign = sortedParams + apiSecret;
  
  // Create SHA-1 hash
  const encoder = new TextEncoder();
  const data = encoder.encode(stringToSign);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
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
    
    // Parse multipart form data
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const albumId = formData.get('album_id') as string;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const folder = formData.get('folder') as string || 'portfolio';
    
    if (!file) {
      return new Response(JSON.stringify({
        success: false,
        error: 'No file provided'
      }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      return new Response(JSON.stringify({
        success: false,
        error: 'File must be an image'
      }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Convert file to base64 for Cloudinary
    const arrayBuffer = await file.arrayBuffer();
    const base64String = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
    const dataURI = `data:${file.type};base64,${base64String}`;
    
    // Generate timestamp and signature for Cloudinary
    const timestamp = Math.floor(Date.now() / 1000);
    const params = {
      timestamp: timestamp,
      folder: folder,
      transformation: 'c_limit,w_2000,h_2000,q_auto:good'
    };
    
    const signature = await generateSignature(params, env.CLOUDINARY_API_SECRET);
    
    // Upload to Cloudinary
    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append('file', dataURI);
    cloudinaryFormData.append('api_key', env.CLOUDINARY_API_KEY);
    cloudinaryFormData.append('timestamp', timestamp.toString());
    cloudinaryFormData.append('folder', folder);
    cloudinaryFormData.append('transformation', 'c_limit,w_2000,h_2000,q_auto:good');
    cloudinaryFormData.append('signature', signature);
    
    const cloudinaryResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: cloudinaryFormData
      }
    );
    
    if (!cloudinaryResponse.ok) {
      const errorData = await cloudinaryResponse.text();
      console.error('Cloudinary upload failed:', errorData);
      throw new Error('Failed to upload image to Cloudinary');
    }
    
    const cloudinaryResult = await cloudinaryResponse.json();
    
    // Generate mobile version URL (assuming you want a different transformation for mobile)
    const desktopUrl = cloudinaryResult.secure_url;
    const mobileUrl = desktopUrl.replace('/upload/', '/upload/c_limit,w_800,h_800,q_auto:good/');
    
    // Save to database
    const imageResult = await db.prepare(`
      INSERT INTO images (
        album_id, title, description, desktop_url, mobile_url, 
        cloudinary_public_id, is_published, sort_order
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      albumId || null,
      title || file.name,
      description || null,
      desktopUrl,
      mobileUrl,
      cloudinaryResult.public_id,
      true,
      0
    ).run();
    
    if (!imageResult.success) {
      throw new Error('Failed to save image to database');
    }
    
    // Get the created image
    const image = await db.prepare('SELECT * FROM images WHERE id = ?').bind(imageResult.meta.last_row_id).first();
    
    return new Response(JSON.stringify({
      success: true,
      image,
      cloudinary: cloudinaryResult
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Image upload error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message || 'Failed to upload image'
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}