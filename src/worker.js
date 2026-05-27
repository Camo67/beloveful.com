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

async function serveSpaShell(request, env, origin) {
  const indexRequest = new Request(`${origin}/`, request);
  const indexResponse = await env.ASSETS.fetch(indexRequest);

  if (indexResponse.status === 404) {
    return null;
  }

  const headers = new Headers(indexResponse.headers);
  headers.delete('Location');
  headers.set('Content-Type', 'text/html; charset=utf-8');

  return new Response(indexResponse.body, {
    status: 200,
    statusText: 'OK',
    headers,
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

function jsonResponse(data, init = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      ...(init.headers || {}),
    },
  });
}

function getAiModels() {
  return [
    { name: 'qwen-turbo', description: 'Fast Qwen model for everyday agent chat' },
    { name: 'qwen-plus', description: 'Higher quality Qwen model for writing and planning' },
    { name: 'qwen-max', description: 'Advanced Qwen model for deeper reasoning' },
  ];
}

async function callDashScope(env, messages, model = 'qwen-turbo', options = {}) {
  if (!env.DASHSCOPE_API_KEY || env.DASHSCOPE_API_KEY.includes('your_')) {
    return {
      offline: true,
      output: {
        choices: [
          {
            message: {
              role: 'assistant',
              content:
                'The Beloveful agent is wired up, but DASHSCOPE_API_KEY is not configured yet. Add the key to .dev.vars locally and set it as a Cloudflare secret for production.',
            },
          },
        ],
        finish_reason: 'missing_api_key',
      },
      usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
      request_id: `local-${Date.now()}`,
    };
  }

  const response = await fetch(
    'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.DASHSCOPE_API_KEY}`,
        'Content-Type': 'application/json',
        'X-DashScope-SSE': 'disable',
      },
      body: JSON.stringify({
        model,
        input: {
          messages,
        },
        parameters: {
          temperature: options.temperature ?? 0.7,
          max_tokens: options.maxTokens ?? 2000,
          top_p: options.topP ?? 1,
        },
      }),
    }
  );

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.message || `DashScope request failed with ${response.status}`);
  }

  return data;
}

function extractAiText(data) {
  return data?.output?.choices?.[0]?.message?.content || data?.output?.text || '';
}

async function handleAiRoute(request, env) {
  const url = new URL(request.url);
  const { pathname } = url;
  const method = request.method.toUpperCase();

  if (!pathname.startsWith('/api/ai/')) {
    return null;
  }

  try {
    if (method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    if (pathname === '/api/ai/test') {
      if (method !== 'GET') return methodNotAllowed(['GET']);
      const data = await callDashScope(env, [{ role: 'user', content: 'Reply with: AI active' }]);
      return jsonResponse({
        status: data.offline ? 'needs_key' : 'ok',
        message: extractAiText(data) || 'AI endpoint active',
        request_id: data.request_id,
      });
    }

    if (pathname === '/api/ai/models') {
      if (method !== 'GET') return methodNotAllowed(['GET']);
      return jsonResponse({ models: getAiModels() });
    }

    if (pathname === '/api/ai/chat') {
      if (method !== 'POST') return methodNotAllowed(['POST']);
      const body = await request.json();
      const messages = Array.isArray(body.messages) ? body.messages : [];
      if (!messages.length) {
        return jsonResponse({ error: 'messages is required' }, { status: 400 });
      }
      const data = await callDashScope(env, messages, body.model, body.options);
      return jsonResponse(data);
    }

    if (pathname === '/api/ai/generate') {
      if (method !== 'POST') return methodNotAllowed(['POST']);
      const body = await request.json();
      const prompt = typeof body.prompt === 'string' ? body.prompt.trim() : '';
      if (!prompt) {
        return jsonResponse({ error: 'prompt is required' }, { status: 400 });
      }
      const data = await callDashScope(
        env,
        [
          {
            role: 'system',
            content:
              'You are Beloveful Studio Agent, a concise assistant for a travel photography website.',
          },
          { role: 'user', content: prompt },
        ],
        body.model,
        body.options
      );
      return jsonResponse({
        text: extractAiText(data),
        usage: data.usage || { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
        request_id: data.request_id,
      });
    }

    if (pathname === '/api/ai/photo-caption') {
      if (method !== 'POST') return methodNotAllowed(['POST']);
      const body = await request.json();
      const photoDescription = String(body.photoDescription || '').trim();
      const data = await callDashScope(env, [
        {
          role: 'system',
          content: 'Write elegant, accessible captions for travel photography.',
        },
        {
          role: 'user',
          content: `Create one concise caption for this photograph: ${photoDescription}`,
        },
      ]);
      return jsonResponse({ caption: extractAiText(data), request_id: data.request_id });
    }

    if (pathname === '/api/ai/travel-description') {
      if (method !== 'POST') return methodNotAllowed(['POST']);
      const body = await request.json();
      const location = String(body.location || '').trim();
      const data = await callDashScope(env, [
        {
          role: 'system',
          content: 'Write warm, visually grounded travel photography copy.',
        },
        {
          role: 'user',
          content: `Write a short travel photography description for ${location}.`,
        },
      ]);
      return jsonResponse({ description: extractAiText(data), request_id: data.request_id });
    }
  } catch (error) {
    return jsonResponse(
      { error: error instanceof Error ? error.message : 'AI request failed' },
      { status: 502 }
    );
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

    const aiRouteResponse = await handleAiRoute(request, env);
    if (aiRouteResponse) {
      return aiRouteResponse;
    }

    // Serve images from R2
    if (pathname.startsWith('/r2/')) {
      if (!env.R2_BUCKET) {
        return new Response('R2 image binding is not configured for this worker', { status: 503 });
      }

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

    // Cloudflare Assets can redirect unknown extensionless paths back to "/".
    // Serve the React admin shell directly so /adminlogin opens the panel.
    if (pathname === '/adminlogin' || pathname.startsWith('/adminlogin/')) {
      const shellResponse = await serveSpaShell(request, env, url.origin);
      if (shellResponse) return shellResponse;
    }

    // Static asset handling via Wrangler [assets] binding
    const assetResponse = await env.ASSETS.fetch(request);
    if (assetResponse.status !== 404) {
      return assetResponse;
    }

    // SPA fallback: serve index.html when path has no extension
    if (!pathname.includes('.') || pathname.endsWith('/')) {
      const shellResponse = await serveSpaShell(request, env, url.origin);
      if (shellResponse) return shellResponse;
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
