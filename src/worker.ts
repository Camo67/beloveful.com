export default {
  /**
   * Fetch handler. First try the static asset. If it's 404 and the request
   * looks like an SPA route, serve /index.html so client-side routing works.
   */
  async fetch(request: Request, env: any, ctx: ExecutionContext): Promise<Response> {
    // Try static file first
    let resp = await env.ASSETS.fetch(request);

    // If not found, send index.html for SPA routes (no extension and GET)
    if (resp.status === 404 && isLikelySpaRoute(request)) {
      const url = new URL(request.url);
      const indexReq = new Request(new URL("/index.html", url.origin), request);
      resp = await env.ASSETS.fetch(indexReq);
    }

    return resp;
  },
} satisfies ExportedHandler;

function isLikelySpaRoute(request: Request): boolean {
  const url = new URL(request.url);
  const methodOk = request.method === "GET";
  const hasExtension = /\.[a-z0-9]+$/i.test(url.pathname);
  const isApi = url.pathname.startsWith("/api");
  return methodOk && !hasExtension && !isApi;
}
