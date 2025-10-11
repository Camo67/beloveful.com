export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Try to get the asset first
    const response = await env.ASSETS.fetch(request);
    
    // If the asset is found, return it
    if (response.status !== 404) {
      return response;
    }
    
    // If the request is for a static asset (has file extension) and not found, return 404
    const pathname = url.pathname;
    if (pathname.includes('.') && !pathname.endsWith('/')) {
      return new Response('Not Found', { status: 404 });
    }
    
    // For all other routes (SPA routes), serve index.html
    const indexRequest = new Request(`${url.origin}/index.html`, request);
    return env.ASSETS.fetch(indexRequest);
  },
};