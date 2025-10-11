/**
 * Beloveful R2 CDN Worker
 * Handles image delivery, optimization, and upload to R2 bucket
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const { pathname, searchParams } = url;

    // CORS headers for all responses
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: corsHeaders
      });
    }

    try {
      // Route handling
      if (pathname.startsWith('/api/upload') && request.method === 'POST') {
        return await handleUpload(request, env, corsHeaders);
      }
      
      if (pathname.startsWith('/api/signed-url') && request.method === 'POST') {
        return await handleSignedUrl(request, env, corsHeaders);
      }
      
      // Serve files from R2
      if (pathname.startsWith('/images/') || pathname.startsWith('/assets/')) {
        return await handleFileServing(request, env, pathname, searchParams, corsHeaders);
      }

      return new Response('Not Found', { 
        status: 404,
        headers: corsHeaders 
      });

    } catch (error) {
      console.error('Worker error:', error);
      return new Response('Internal Server Error', { 
        status: 500,
        headers: corsHeaders 
      });
    }
  },
};

/**
 * Handle file uploads to R2
 */
async function handleUpload(request, env, corsHeaders) {
  const formData = await request.formData();
  const file = formData.get('file');
  const path = formData.get('path') || 'uploads';
  
  if (!file) {
    return new Response(JSON.stringify({ error: 'No file provided' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  // Generate unique filename
  const timestamp = Date.now();
  const randomId = Math.random().toString(36).substring(2);
  const extension = file.name.split('.').pop();
  const filename = `${path}/${timestamp}-${randomId}.${extension}`;

  try {
    // Upload to R2
    await env.BELOVEFUL_BUCKET.put(filename, file.stream(), {
      httpMetadata: {
        contentType: file.type,
        cacheControl: 'public, max-age=31536000', // 1 year
      },
    });

    const publicUrl = `https://cdn.beloveful.com/${filename}`;

    return new Response(JSON.stringify({
      success: true,
      filename,
      url: publicUrl,
      size: file.size,
      type: file.type
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Upload error:', error);
    return new Response(JSON.stringify({ error: 'Upload failed' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

/**
 * Generate signed URLs for secure uploads
 */
async function handleSignedUrl(request, env, corsHeaders) {
  const { filename, contentType } = await request.json();

  if (!filename) {
    return new Response(JSON.stringify({ error: 'Filename required' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  try {
    // Generate signed URL for direct upload to R2
    const signedUrl = await env.BELOVEFUL_BUCKET.put(filename, null, {
      httpMetadata: {
        contentType: contentType || 'application/octet-stream',
        cacheControl: 'public, max-age=31536000',
      },
    });

    return new Response(JSON.stringify({
      signedUrl: signedUrl.toString(),
      filename,
      publicUrl: `https://cdn.beloveful.com/${filename}`
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Signed URL error:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate signed URL' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

/**
 * Serve files from R2 with optimization
 */
async function handleFileServing(request, env, pathname, searchParams, corsHeaders) {
  // Remove leading slash
  const key = pathname.slice(1);
  
  try {
    const object = await env.BELOVEFUL_BUCKET.get(key);
    
    if (!object) {
      return new Response('File not found', { 
        status: 404,
        headers: corsHeaders 
      });
    }

    // Get image optimization parameters
    const width = searchParams.get('w');
    const height = searchParams.get('h');
    const quality = searchParams.get('q') || '85';
    const format = searchParams.get('f');

    let headers = {
      ...corsHeaders,
      'Content-Type': object.httpMetadata?.contentType || 'application/octet-stream',
      'Cache-Control': 'public, max-age=31536000, immutable',
      'ETag': object.httpEtag,
    };

    // Add conditional caching
    const ifNoneMatch = request.headers.get('If-None-Match');
    if (ifNoneMatch === object.httpEtag) {
      return new Response(null, {
        status: 304,
        headers
      });
    }

    let body = object.body;

    // Apply image optimizations if it's an image and CF Image Resizing is available
    if (object.httpMetadata?.contentType?.startsWith('image/') && 
        (width || height || format) && 
        env.CF_IMAGE_RESIZING === 'true') {
      
      const resizeOptions = {
        width: width ? parseInt(width) : undefined,
        height: height ? parseInt(height) : undefined,
        quality: parseInt(quality),
        format: format || 'auto',
        fit: 'cover'
      };

      // Note: This would require Cloudflare Image Resizing service
      // For now, we'll serve the original image
      headers['X-Image-Optimization'] = 'available-but-not-applied';
    }

    return new Response(body, { headers });

  } catch (error) {
    console.error('File serving error:', error);
    return new Response('Internal Server Error', { 
      status: 500,
      headers: corsHeaders 
    });
  }
}