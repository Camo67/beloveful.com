// src/worker.ts
export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // Optional: force canonical host (www -> apex). Uncomment to enable.
    // if (url.hostname === "www.beloveful.com") {
    //   url.hostname = "beloveful.com";
    //   return Response.redirect(url.toString(), 301);
    // }

    // Try static file first (served from assets = { directory = "dist" })
    let res = await env.ASSETS.fetch(request);

    // SPA fallback for client-side routes: serve index.html on 404 for clean paths
    if (res.status === 404 && isLikelySpaRoute(request)) {
      const indexReq = new Request(new URL("/index.html", url.origin), request);
      res = await env.ASSETS.fetch(indexReq);
    }

    // Add sensible headers
    const h = new Headers(res.headers);

    // Security
    h.set("X-Content-Type-Options", "nosniff");
    h.set("Referrer-Policy", "strict-origin-when-cross-origin");
    // Keep CSP minimal; expand later if you add external scripts/fonts.
    // h.set("Content-Security-Policy", "default-src 'self'; img-src 'self' data: blob:; media-src 'self' blob:; style-src 'self' 'unsafe-inline'; script-src 'self';");

    // Asset vs HTML caching
    const isHTML = (h.get("Content-Type") || "").includes("text/html");
    if (isHTML) {
      // Short cache for HTML
      h.set("Cache-Control", "public, max-age=60, must-revalidate");
    } else {
      // Long, immutable cache for versioned assets (Vite outputs hashed filenames)
      h.set("Cache-Control", "public, max-age=31536000, immutable");
    }

    // Helpful cross-origin hint if you embed from other domains
    h.set("Cross-Origin-Resource-Policy", "cross-origin");

    return new Response(res.body, { status: res.status, statusText: res.statusText, headers: h });
  },
} satisfies ExportedHandler<Env>;

function isLikelySpaRoute(request: Request): boolean {
  const url = new URL(request.url);
  if (request.method !== "GET") return false;
  const isApi = url.pathname.startsWith("/api");
  const hasExt = /\.[a-z0-9]+$/i.test(url.pathname);
  return !isApi && !hasExt;
}

interface Env {
  // Bound automatically by `assets = { directory = "dist" }` in wrangler.toml
  ASSETS: Fetcher;
}
