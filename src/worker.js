import { onRequestPost as authLoginPost } from '../functions/api/auth/login.ts';
import {
  onRequestGet as authSetupGet,
  onRequestPost as authSetupPost,
} from '../functions/api/auth/setup.ts';
import { onRequestPost as authVerifyPost } from '../functions/api/auth/verify.ts';
import { onRequestPost as authChangePasswordPost } from '../functions/api/auth/change-password.ts';
import { onRequestPost as contactPost } from '../functions/api/contact.ts';
import { onRequestGet as albumsGet } from '../functions/api/albums/index.ts';
import { onRequestGet as albumBySlugGet } from '../functions/api/albums/[slug].ts';
import {
  onRequestGet as albumsAdminAllGet,
  onRequestPost as albumsAdminAllPost,
} from '../functions/api/albums/admin/all.ts';
import { onRequestPost as albumsAdminSeedPost } from '../functions/api/albums/admin/seed.ts';
import {
  onRequestPut as albumsAdminIdPut,
  onRequestDelete as albumsAdminIdDelete,
} from '../functions/api/albums/admin/[id].ts';
import {
  onRequestGet as imagesAdminAllGet,
  onRequestPost as imagesAdminAllPost,
} from '../functions/api/images/admin/all.ts';
import {
  onRequestPut as imagesAdminIdPut,
  onRequestDelete as imagesAdminIdDelete,
} from '../functions/api/images/admin/[id].ts';
import {
  onRequestGet as slideshowAdminAllGet,
  onRequestPost as slideshowAdminAllPost,
} from '../functions/api/images/admin/slideshow/all.ts';
import {
  onRequestPut as slideshowAdminIdPut,
  onRequestDelete as slideshowAdminIdDelete,
} from '../functions/api/images/admin/slideshow/[id].ts';
import {
  onRequestGet as contentAdminAllGet,
  onRequestPost as contentAdminAllPost,
} from '../functions/api/content/admin/all.ts';
import {
  onRequestPut as contentAdminIdPut,
  onRequestDelete as contentAdminIdDelete,
} from '../functions/api/content/admin/[id].ts';
import { onRequestPost as imagesUploadPost } from '../functions/api/images/upload.ts';
import { onRequestPost as imagesUploadCpanelPost } from '../functions/api/images/upload-cpanel.ts';
import { onRequestGet as publicAlbumsGet } from '../functions/api/public/albums.ts';
import { onRequestGet as publicAlbumBySlugGet } from '../functions/api/public/albums/[slug].ts';
import { onRequestGet as publicSlideshowGet } from '../functions/api/public/slideshow.ts';
import { onRequestGet as publicWorkshopsGet } from '../functions/api/public/workshops.ts';
import { onRequestGet as upcomingEventsGet } from '../functions/api/events/upcoming.ts';
import { onRequestGet as travelImagesGet } from '../functions/api/travel-images.ts';
import { onRequestGet as projectImagesGet } from '../functions/api/project-images.ts';
import { onRequestGet as logosGet } from '../functions/api/logos.ts';

// Continent & Country mapping remains in Bluehost CMS if needed,
// but not required in the edge worker anymore.

function renderMissingFrontendHint() {
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Beloveful Local Dev</title>
    <style>
      :root {
        color-scheme: light;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        background: linear-gradient(135deg, #f7f5ef, #ece6d7);
        color: #1d1d1d;
      }
      main {
        width: min(40rem, calc(100vw - 2rem));
        padding: 2rem;
        border-radius: 1rem;
        background: rgba(255, 255, 255, 0.9);
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
      }
      h1 {
        margin-top: 0;
      }
      code {
        padding: 0.15rem 0.35rem;
        border-radius: 0.35rem;
        background: #f3eee4;
      }
      p:last-child {
        margin-bottom: 0;
      }
    </style>
  </head>
  <body>
    <main>
      <h1>Frontend assets are not available on this port</h1>
      <p>This port serves the Cloudflare Worker and API routes.</p>
      <p>If you are developing locally, open the Vite dev server URL printed by <code>npm run dev</code> in your terminal. It is usually <code>http://localhost:8080/</code>.</p>
      <p>If you expect the worker to serve the site directly, build the frontend first so <code>dist/index.html</code> exists.</p>
      <p>API check: <code>/api/health</code></p>
    </main>
  </body>
</html>`;

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

function methodNotAllowed(allowedMethods) {
  return new Response('Method Not Allowed', {
    status: 405,
    headers: {
      Allow: allowedMethods.join(', '),
    },
  });
}

function createFunctionContext(request, env, params = {}) {
  return { request, env, params };
}

function normalizePrintInnovationProduct(product) {
  const variants = Array.isArray(product.variants)
    ? product.variants
        .filter((variant) => variant && variant.available !== false)
        .map((variant) => ({
          id: variant.id,
          title: variant.title || variant.option1 || 'Print',
          price: Number.parseFloat(variant.price || '0'),
          available: variant.available !== false,
          checkoutUrl: `https://www.printinnovationlab.com/cart/${variant.id}:1?checkout`,
        }))
    : [];
  const images = Array.isArray(product.images)
    ? product.images.map((image) => image?.src).filter(Boolean)
    : [];
  const minPrice = variants.length
    ? Math.min(...variants.map((variant) => variant.price).filter(Number.isFinite))
    : 0;

  return {
    id: product.id,
    title: product.title,
    handle: product.handle,
    description: product.body_html || '',
    vendor: product.vendor || '',
    tags: product.tags || [],
    image: images[0] || '',
    images,
    minPrice,
    variants,
    productUrl: `https://www.printinnovationlab.com/products/${product.handle}`,
    buyUrl: variants[0]?.checkoutUrl || `https://www.printinnovationlab.com/products/${product.handle}`,
    updatedAt: product.updated_at || null,
  };
}

async function handlePrintInnovationProducts() {
  const sourceUrl = 'https://www.printinnovationlab.com/collections/beloveful/products.json?limit=250';

  try {
    const upstream = await fetch(sourceUrl, {
      headers: {
        Accept: 'application/json',
        'User-Agent': 'Beloveful.com catalogue sync',
      },
      cf: {
        cacheTtl: 900,
        cacheEverything: true,
      },
    });

    if (!upstream.ok) {
      return new Response(
        JSON.stringify({ error: 'Print Innovations catalogue unavailable' }),
        {
          status: 502,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store',
          },
        }
      );
    }

    const data = await upstream.json();
    const products = Array.isArray(data.products)
      ? data.products.map(normalizePrintInnovationProduct)
      : [];

    return new Response(
      JSON.stringify({
        source: 'printinnovationlab',
        collection: 'beloveful',
        count: products.length,
        syncedAt: new Date().toISOString(),
        products,
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=900, s-maxage=900',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (error) {
    console.error('Print Innovations catalogue fetch failed', error);
    return new Response(
      JSON.stringify({ error: 'Print Innovations catalogue request failed' }),
      {
        status: 502,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
        },
      }
    );
  }
}

async function dispatchFunctionRoute(request, env) {
  const url = new URL(request.url);
  const { pathname } = url;
  const method = request.method.toUpperCase();

  console.log(`[worker] Dispatching: ${method} ${pathname}`);

  if (pathname === '/api/auth/login') {
    if (method === 'POST') return authLoginPost(createFunctionContext(request, env));
    return methodNotAllowed(['POST']);
  }

  if (pathname === '/api/auth/setup') {
    if (method === 'GET') return authSetupGet(createFunctionContext(request, env));
    if (method === 'POST') return authSetupPost(createFunctionContext(request, env));
    return methodNotAllowed(['GET', 'POST']);
  }

  if (pathname === '/api/auth/verify') {
    if (method === 'POST') return authVerifyPost(createFunctionContext(request, env));
    return methodNotAllowed(['POST']);
  }

  if (pathname === '/api/auth/change-password') {
    if (method === 'POST') return authChangePasswordPost(createFunctionContext(request, env));
    return methodNotAllowed(['POST']);
  }

  if (pathname === '/api/contact' || pathname === '/api/public/contact') {
    if (method === 'POST') return contactPost(createFunctionContext(request, env));
    return methodNotAllowed(['POST']);
  }

  if (pathname === '/api/albums') {
    if (method === 'GET') return albumsGet(createFunctionContext(request, env));
    return methodNotAllowed(['GET']);
  }

  if (pathname === '/api/albums/admin/all') {
    if (method === 'GET') return albumsAdminAllGet(createFunctionContext(request, env));
    if (method === 'POST') return albumsAdminAllPost(createFunctionContext(request, env));
    return methodNotAllowed(['GET', 'POST']);
  }

  if (pathname === '/api/albums/admin/seed') {
    if (method === 'POST') return albumsAdminSeedPost(createFunctionContext(request, env));
    return methodNotAllowed(['POST']);
  }

  const albumAdminIdMatch = pathname.match(/^\/api\/albums\/admin\/([^/]+)$/);
  if (albumAdminIdMatch) {
    const params = { id: decodeURIComponent(albumAdminIdMatch[1]) };
    if (method === 'PUT') return albumsAdminIdPut(createFunctionContext(request, env, params));
    if (method === 'DELETE') return albumsAdminIdDelete(createFunctionContext(request, env, params));
    return methodNotAllowed(['PUT', 'DELETE']);
  }

  if (pathname === '/api/images/admin/all') {
    if (method === 'GET') return imagesAdminAllGet(createFunctionContext(request, env));
    if (method === 'POST') return imagesAdminAllPost(createFunctionContext(request, env));
    return methodNotAllowed(['GET', 'POST']);
  }

  if (pathname === '/api/images/admin/slideshow/all') {
    if (method === 'GET') return slideshowAdminAllGet(createFunctionContext(request, env));
    if (method === 'POST') return slideshowAdminAllPost(createFunctionContext(request, env));
    return methodNotAllowed(['GET', 'POST']);
  }

  const slideshowAdminIdMatch = pathname.match(/^\/api\/images\/admin\/slideshow\/([^/]+)$/);
  if (slideshowAdminIdMatch) {
    const params = { id: decodeURIComponent(slideshowAdminIdMatch[1]) };
    if (method === 'PUT') return slideshowAdminIdPut(createFunctionContext(request, env, params));
    if (method === 'DELETE') return slideshowAdminIdDelete(createFunctionContext(request, env, params));
    return methodNotAllowed(['PUT', 'DELETE']);
  }

  if (pathname === '/api/content/admin/all') {
    if (method === 'GET') return contentAdminAllGet(createFunctionContext(request, env));
    if (method === 'POST') return contentAdminAllPost(createFunctionContext(request, env));
    return methodNotAllowed(['GET', 'POST']);
  }

  const imageAdminIdMatch = pathname.match(/^\/api\/images\/admin\/([^/]+)$/);
  if (imageAdminIdMatch) {
    const params = { id: decodeURIComponent(imageAdminIdMatch[1]) };
    if (method === 'PUT') return imagesAdminIdPut(createFunctionContext(request, env, params));
    if (method === 'DELETE') return imagesAdminIdDelete(createFunctionContext(request, env, params));
    return methodNotAllowed(['PUT', 'DELETE']);
  }

  const contentAdminIdMatch = pathname.match(/^\/api\/content\/admin\/([^/]+)$/);
  if (contentAdminIdMatch) {
    const params = { id: decodeURIComponent(contentAdminIdMatch[1]) };
    if (method === 'PUT') return contentAdminIdPut(createFunctionContext(request, env, params));
    if (method === 'DELETE') return contentAdminIdDelete(createFunctionContext(request, env, params));
    return methodNotAllowed(['PUT', 'DELETE']);
  }

  if (pathname === '/api/images/upload') {
    if (method === 'POST') return imagesUploadPost(createFunctionContext(request, env));
    return methodNotAllowed(['POST']);
  }

  if (pathname === '/api/images/upload-cpanel') {
    if (method === 'POST') return imagesUploadCpanelPost(createFunctionContext(request, env));
    return methodNotAllowed(['POST']);
  }

  if (pathname === '/api/public/albums') {
    if (method === 'GET') return publicAlbumsGet(createFunctionContext(request, env));
    return methodNotAllowed(['GET']);
  }

  const publicAlbumBySlugMatch = pathname.match(/^\/api\/public\/albums\/([^/]+)$/);
  if (publicAlbumBySlugMatch) {
    const params = { slug: decodeURIComponent(publicAlbumBySlugMatch[1]) };
    if (method === 'GET') return publicAlbumBySlugGet(createFunctionContext(request, env, params));
    return methodNotAllowed(['GET']);
  }

  if (pathname === '/api/public/slideshow') {
    if (method === 'GET') return publicSlideshowGet(createFunctionContext(request, env));
    return methodNotAllowed(['GET']);
  }

  if (pathname === '/api/public/workshops') {
    if (method === 'GET') return publicWorkshopsGet(createFunctionContext(request, env));
    return methodNotAllowed(['GET']);
  }

  if (pathname === '/api/print-innovation/products') {
    if (method === 'GET') return handlePrintInnovationProducts();
    return methodNotAllowed(['GET']);
  }

  if (pathname === '/api/events/upcoming') {
    if (method === 'GET') return upcomingEventsGet(createFunctionContext(request, env));
    return methodNotAllowed(['GET']);
  }

  if (pathname === '/api/travel-images') {
    if (method === 'GET') return travelImagesGet(createFunctionContext(request, env));
    return methodNotAllowed(['GET']);
  }

  if (pathname === '/api/project-images') {
    if (method === 'GET') return projectImagesGet(createFunctionContext(request, env));
    return methodNotAllowed(['GET']);
  }

  if (pathname === '/api/logos') {
    if (method === 'GET') return logosGet(createFunctionContext(request, env));
    return methodNotAllowed(['GET']);
  }

  const albumBySlugMatch = pathname.match(/^\/api\/albums\/([^/]+)$/);
  if (albumBySlugMatch) {
    const params = { slug: decodeURIComponent(albumBySlugMatch[1]) };
    if (method === 'GET') return albumBySlugGet(createFunctionContext(request, env, params));
    return methodNotAllowed(['GET']);
  }

  return null;
}

async function handleCheckoutSession(request, env, origin) {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        ...headers,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (!env.STRIPE_SECRET_KEY) {
    return new Response(
      JSON.stringify({ error: 'Stripe is not configured' }),
      { status: 500, headers }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Invalid JSON payload' }),
      { status: 400, headers }
    );
  }

  const priceId = typeof body.priceId === 'string' ? body.priceId.trim() : '';
  const quantity = Number(body.quantity);

  if (!priceId || !Number.isFinite(quantity) || quantity < 1) {
    return new Response(
      JSON.stringify({ error: 'Invalid price or quantity' }),
      { status: 400, headers }
    );
  }

  const params = new URLSearchParams();
  params.append('mode', 'payment');
  params.append('success_url', `${origin}/print-shop?success=true`);
  params.append('cancel_url', `${origin}/print-shop?canceled=true`);
  params.append('line_items[0][price]', priceId);
  params.append('line_items[0][quantity]', Math.floor(quantity).toString());

  try {
    const stripeResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });

    const data = await stripeResponse.json();

    if (!stripeResponse.ok || !data?.url) {
      console.error('Stripe checkout creation failed', data);
      return new Response(
        JSON.stringify({ error: data?.error?.message || 'Unable to create checkout session' }),
        { status: 502, headers }
      );
    }

    return new Response(
      JSON.stringify({ url: data.url }),
      { headers }
    );
  } catch (error) {
    console.error('Stripe API error', error);
    return new Response(
      JSON.stringify({ error: 'Stripe request failed' }),
      { status: 502, headers }
    );
  }
}

// handleMetadataSync was here

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname;
    const acceptHeader = request.headers.get('Accept') || '';
    const isHtmlNavigation =
      (request.method === 'GET' || request.method === 'HEAD') &&
      acceptHeader.includes('text/html');

    // Handle API routes first
    if (pathname === '/api/health') {
      return new Response(
        JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }


    if (pathname === '/api/create-checkout-session') {
      if (request.method === 'POST' || request.method === 'OPTIONS') {
        return handleCheckoutSession(request, env, url.origin);
      }
      return new Response('Method Not Allowed', { status: 405 });
    }

    const functionRouteResponse = await dispatchFunctionRoute(request, env);
    if (functionRouteResponse) {
      return functionRouteResponse;
    }

    // Serve images from R2
    if (pathname.startsWith('/r2/')) {
      const key = pathname.slice(4); // Remove '/r2/' prefix
      
      try {
        const object = await env.R2_BUCKET.get(key);
        
        if (!object) {
          return new Response('Image not found', { status: 404 });
        }

        const headers = new Headers();
        object.writeHttpMetadata(headers);
        headers.set('etag', object.httpEtag);
        headers.set('cache-control', 'public, max-age=31536000, immutable');
        headers.set('access-control-allow-origin', '*');

        return new Response(object.body, { headers });
      } catch (error) {
        console.error('R2 fetch error:', error);
        return new Response('Error fetching image', { status: 500 });
      }
    }

    // Handle OPTIONS for CORS
    if (pathname.startsWith('/api/') && request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    // Static asset handling via Wrangler [assets] binding
    const assetResponse = await env.ASSETS.fetch(request);
    if (assetResponse.status !== 404) {
      return assetResponse;
    }

    // SPA fallback: serve index.html when path has no extension
    if (!pathname.includes('.') || pathname.endsWith('/')) {
      const indexRequest = new Request(`${url.origin}/index.html`, request);
      const indexResponse = await env.ASSETS.fetch(indexRequest);
      if (indexResponse.status !== 404) return indexResponse;
    }

    if (
      isHtmlNavigation &&
      !pathname.startsWith('/api/') &&
      !pathname.startsWith('/r2/')
    ) {
      return renderMissingFrontendHint();
    }

    return new Response('Not Found', { status: 404 });
  },
};
