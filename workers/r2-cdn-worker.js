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

      // Unified image endpoint with fallback support
      if (pathname === '/images' && searchParams.has('src')) {
        return await handleCloudinaryFallback(request, env, corsHeaders);
      }
      
      // Serve files from R2 first
      if (pathname.startsWith('/images/') || pathname.startsWith('/assets/')) {
        const served = await handleFileServing(request, env, pathname, searchParams, corsHeaders);
        // If not found and we have a src fallback, try to fetch and cache
        if (served.status === 404 && searchParams.has('src')) {
          return await handleCloudinaryFallback(request, env, corsHeaders, pathname);
        }
        return served;
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

/**
 * Read-through cache: fetch from Cloudinary and optionally store to R2
 */
async function handleCloudinaryFallback(request, env, corsHeaders, pathname) {
  try {
    const url = new URL(request.url);
    const src = url.searchParams.get('src');
    if (!src) {
      return new Response('Missing src parameter', { status: 400, headers: corsHeaders });
    }

    // Only allow Cloudinary sources
    const srcUrl = new URL(src);
    if (srcUrl.hostname !== 'res.cloudinary.com') {
      return new Response('Forbidden domain', { status: 403, headers: corsHeaders });
    }

    // Fetch the image from Cloudinary
    const upstream = await fetch(src, {
      headers: { 'User-Agent': 'BELOVEFUL-Photography-Site/1.0' },
    });
    if (!upstream.ok) {
      return new Response('Upstream not found', { status: 404, headers: corsHeaders });
    }

    // Prefer a deterministic key derived from Cloudinary public_id
    function publicKeyFromCloudinary(urlObj) {
      try {
        const segments = urlObj.pathname.split('/').filter(Boolean);
        // Expect: /<cloud_name>/image/upload/(transformations?)/v<digits>?/<path/to/public_id>.<ext>
        const cloudName = segments[0] || 'cloudinary';
        const uploadIdx = segments.findIndex((s) => s === 'upload');
        if (uploadIdx === -1) throw new Error('no upload segment');
        // Slice after 'upload'
        let tail = segments.slice(uploadIdx + 1);
        // Drop transformation segments until we hit either a version (v123...) or a filename with dot
        while (tail.length && !/^v\d+$/i.test(tail[0]) && !/\./.test(tail[0])) {
          tail.shift();
        }
        // Drop version segment if present
        if (tail.length && /^v\d+$/i.test(tail[0])) {
          tail.shift();
        }
        // Remaining tail is the public path (may include folders) and should contain a filename with ext
        if (!tail.length) throw new Error('no public id tail');
        const publicPath = tail.join('/');
        // Ensure we have an extension; if not, try to infer from original path regex
        if (!/\.[a-z0-9]+$/i.test(publicPath)) {
          const m = urlObj.pathname.match(/\.(avif|webp|jpe?g|png|gif|tiff|heic)$/i);
          const ext = m ? m[0].toLowerCase() : '.jpg';
          return `images/cloudinary/${cloudName}/${publicPath}${ext}`;
        }
        return `images/cloudinary/${cloudName}/${publicPath}`;
      } catch {
        return null;
      }
    }

    let key = publicKeyFromCloudinary(srcUrl);

    // Fallback to hash key if parsing fails
    if (!key) {
      const m = srcUrl.pathname.match(/\.(avif|webp|jpe?g|png|gif|tiff|heic)$/i);
      const ext = m ? m[0].toLowerCase() : '';
      const encoder = new TextEncoder();
      const digest = await crypto.subtle.digest('SHA-256', encoder.encode(src));
      const hash = Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, '0')).join('');
      key = `images/cloudinary/${hash}${ext}`;
    }

    // If caller requested a specific pathname like /images/..., prefer storing under that key as well
    let storeKey = key;
    if (pathname && pathname.startsWith('/images/')) {
      const candidate = pathname.slice(1); // drop leading /
      if (!candidate.endsWith('/')) {
        storeKey = candidate;
      }
    }

    // Optionally store into R2
    const contentType = upstream.headers.get('Content-Type') || 'image/jpeg';
    const cacheControl = 'public, max-age=31536000, immutable';

    if (env.CACHE_FALLBACK === 'true') {
      // Clone the response body for storage and streaming
      const body1 = upstream.body ? upstream.body.tee() : null;
      if (body1) {
        const [forStore, forClient] = body1;
        await env.BELOVEFUL_BUCKET.put(storeKey, forStore, {
          httpMetadata: { contentType, cacheControl },
        });
        return new Response(forClient, {
          status: 200,
          headers: {
            ...corsHeaders,
            'Content-Type': contentType,
            'Cache-Control': cacheControl,
            'X-Source': 'cloudinary-cached',
          },
        });
      }
    }

    // If not caching, just stream
    return new Response(upstream.body, {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': contentType,
        'Cache-Control': cacheControl,
        'X-Source': 'cloudinary',
      },
    });
  } catch (err) {
    console.error('Fallback error:', err);
    return new Response('Internal Server Error', { status: 500, headers: corsHeaders });
  }
}
