// Image proxy for deterring direct downloads
// This would typically be implemented as a backend API route
// For this demo, we'll use a placeholder implementation

export async function imageProxyHandler(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const srcParam = url.searchParams.get('src');
  
  if (!srcParam) {
    return new Response('Missing src parameter', { status: 400 });
  }
  
  try {
    const imageUrl = decodeURIComponent(srcParam);
    
    // Validate that it's one of our allowed domains
    const allowedDomains = ['res.cloudinary.com'];
    const imageUrlObj = new URL(imageUrl);
    
    if (!allowedDomains.includes(imageUrlObj.hostname)) {
      return new Response('Forbidden domain', { status: 403 });
    }
    
    // Fetch the image
    const imageResponse = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'BELOVEFUL-Photography-Site/1.0',
      },
    });
    
    if (!imageResponse.ok) {
      return new Response('Image not found', { status: 404 });
    }
    
    // Create response with protection headers
    const headers = new Headers();
    headers.set('Content-Type', imageResponse.headers.get('Content-Type') || 'image/jpeg');
    headers.set('Content-Disposition', 'inline');
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    headers.set('Cross-Origin-Resource-Policy', 'cross-origin');
    headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    return new Response(imageResponse.body, {
      status: 200,
      headers,
    });
    
  } catch (error) {
    console.error('Image proxy error:', error);
    return new Response('Internal server error', { status: 500 });
  }
}

// For client-side development, we'll bypass the proxy and use direct URLs
export function createImageProxyUrl(originalUrl: string): string {
  // In production, this would route through /api/image-proxy
  // For development, return the original URL
  return originalUrl;
}