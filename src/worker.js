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

// ---------------------------------------------------------------------------
// Public contact form delivery.
// Restored from the former functions/api/contact.ts handler that was removed
// during the "Clean site tooling" cleanup, which left /api/public/contact with
// no backend (so the contact form failed for every visitor). Sends submissions
// via Resend or MailChannels and returns JSON the Contact page understands
// ({ success: true } on delivery, a 5xx error otherwise so the page can offer
// the mailto fallback).
// ---------------------------------------------------------------------------

const CONTACT_EMAIL = 'tony@beloveful.com';
const CONTACT_DEFAULT_FROM_EMAIL = 'website@beloveful.com';
const CONTACT_DEFAULT_FROM_NAME = 'Beloveful Contact Form';
const CONTACT_DEFAULT_MAILCHANNELS_URL = 'https://api.mailchannels.net/tx/v1/send';
const CONTACT_DEFAULT_RESEND_URL = 'https://api.resend.com/emails';
const CONTACT_DEFAULT_REQUEST_TIMEOUT_MS = 10000;

function contactJsonResponse(payload, init = {}) {
  return new Response(JSON.stringify(payload), {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      ...(init.headers || {}),
    },
  });
}

function sanitizeValue(value, maxLength = 1200) {
  return String(value ?? '').trim().slice(0, maxLength);
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function parseTimeoutMs(value) {
  const parsed = Number.parseInt(String(value ?? '').trim(), 10);
  if (!Number.isFinite(parsed)) {
    return CONTACT_DEFAULT_REQUEST_TIMEOUT_MS;
  }
  return Math.min(Math.max(parsed, 1000), 30000);
}

function formatMailboxAddress(email, name) {
  const safeEmail = sanitizeValue(email, 160);
  const safeName = sanitizeValue(name, 160).replace(/["<>]/g, '');
  return safeName ? `${safeName} <${safeEmail}>` : safeEmail;
}

async function fetchWithTimeout(input, init, timeoutMs) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeoutId);
  }
}

function isAbortError(error) {
  return error instanceof Error && error.name === 'AbortError';
}

function buildContactSubject(payload, name) {
  const provided = sanitizeValue(payload.subject, 160);
  if (provided) return provided;
  if (sanitizeValue(payload.image, 400)) return 'Print Inquiry';
  if (sanitizeValue(payload.workshop, 160)) {
    return `Workshop Inquiry: ${sanitizeValue(payload.workshop, 160)}`;
  }
  return `Website Inquiry from ${name || 'Visitor'}`;
}

function buildContactTextBody(payload, request, name, email, message) {
  const submittedAt = new Date().toISOString();
  const url = new URL(request.url);
  return [
    `Name: ${name}`,
    `Email: ${email}`,
    payload.source ? `Source: ${sanitizeValue(payload.source, 120)}` : '',
    payload.workshop ? `Workshop: ${sanitizeValue(payload.workshop, 160)}` : '',
    payload.region ? `Region: ${sanitizeValue(payload.region, 120)}` : '',
    payload.country ? `Country: ${sanitizeValue(payload.country, 120)}` : '',
    payload.variant ? `Variant: ${sanitizeValue(payload.variant, 160)}` : '',
    payload.image ? `Image: ${sanitizeValue(payload.image, 600)}` : '',
    `Submitted: ${submittedAt}`,
    `Origin: ${url.origin}`,
    '',
    'Message:',
    message || '(No message provided)',
  ]
    .filter(Boolean)
    .join('\n');
}

function buildContactHtmlBody(payload, request, name, email, message) {
  const submittedAt = new Date().toISOString();
  const url = new URL(request.url);
  const rows = [
    ['Name', name],
    ['Email', email],
    ['Source', sanitizeValue(payload.source, 120)],
    ['Workshop', sanitizeValue(payload.workshop, 160)],
    ['Region', sanitizeValue(payload.region, 120)],
    ['Country', sanitizeValue(payload.country, 120)],
    ['Variant', sanitizeValue(payload.variant, 160)],
    ['Image', sanitizeValue(payload.image, 600)],
    ['Submitted', submittedAt],
    ['Origin', url.origin],
  ].filter(([, value]) => value);

  const tableRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px 6px 0;font-weight:600;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:6px 0;">${escapeHtml(value)}</td></tr>`,
    )
    .join('');

  return `<!doctype html>
<html lang="en">
  <body style="font-family:Arial,sans-serif;color:#111827;line-height:1.6;">
    <h1 style="font-size:20px;margin-bottom:16px;">New Beloveful contact form submission</h1>
    <table style="border-collapse:collapse;margin-bottom:24px;">${tableRows}</table>
    <h2 style="font-size:16px;margin-bottom:8px;">Message</h2>
    <div style="white-space:pre-wrap;border:1px solid #e5e7eb;border-radius:12px;padding:16px;">${escapeHtml(
      message || '(No message provided)',
    )}</div>
  </body>
</html>`;
}

async function sendContactViaMailchannels(apiUrl, fromEmail, fromName, toEmail, replyToName, replyToEmail, subject, textBody, htmlBody, timeoutMs) {
  return fetchWithTimeout(
    apiUrl,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: toEmail }] }],
        from: { email: fromEmail, name: fromName },
        reply_to: { email: replyToEmail, name: replyToName || replyToEmail },
        subject,
        content: [
          { type: 'text/plain', value: textBody },
          { type: 'text/html', value: htmlBody },
        ],
      }),
    },
    timeoutMs,
  );
}

async function sendContactViaResend(apiUrl, apiKey, fromEmail, fromName, toEmail, replyToName, replyToEmail, subject, textBody, htmlBody, timeoutMs) {
  return fetchWithTimeout(
    apiUrl,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: formatMailboxAddress(fromEmail, fromName),
        to: [toEmail],
        subject,
        text: textBody,
        html: htmlBody,
        reply_to: formatMailboxAddress(replyToEmail, replyToName || replyToEmail),
      }),
    },
    timeoutMs,
  );
}

function describeEndpoint(apiUrl) {
  try {
    const url = new URL(apiUrl);
    return `${url.origin}${url.pathname}`;
  } catch {
    return apiUrl;
  }
}

function getMailchannelsEndpoints(env) {
  const customUrl = sanitizeValue(env.MAILCHANNELS_API_URL, 400);
  if (!customUrl || customUrl === CONTACT_DEFAULT_MAILCHANNELS_URL) {
    return [CONTACT_DEFAULT_MAILCHANNELS_URL];
  }
  return [customUrl, CONTACT_DEFAULT_MAILCHANNELS_URL];
}

function getResendEndpoint(env) {
  return sanitizeValue(env.RESEND_API_URL, 400) || CONTACT_DEFAULT_RESEND_URL;
}

function resolveContactDeliveryMode(env) {
  const configuredMode = sanitizeValue(env.CONTACT_FORM_DELIVERY_MODE, 40).toLowerCase();
  if (configuredMode === 'log' || configuredMode === 'mailchannels' || configuredMode === 'resend') {
    return configuredMode;
  }
  if (sanitizeValue(env.RESEND_API_KEY, 400)) {
    return 'resend';
  }
  return 'mailchannels';
}

async function handleContactForm(request, env) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return contactJsonResponse({ success: false, error: 'Invalid request body' }, { status: 400 });
  }

  // Honeypot: silently accept obvious bots without delivering anything.
  if (sanitizeValue(payload.website, 200)) {
    return contactJsonResponse({ success: true });
  }

  const name = sanitizeValue(payload.name, 120);
  const email = sanitizeValue(payload.email, 160).toLowerCase();
  const message = sanitizeValue(payload.message, 5000);

  if (!name || !email) {
    return contactJsonResponse({ success: false, error: 'Name and email are required' }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return contactJsonResponse({ success: false, error: 'Please enter a valid email address' }, { status: 400 });
  }

  const toEmail = sanitizeValue(env.CONTACT_FORM_TO_EMAIL, 160) || CONTACT_EMAIL;
  const fromEmail = sanitizeValue(env.CONTACT_FORM_FROM_EMAIL, 160) || CONTACT_DEFAULT_FROM_EMAIL;
  const fromName = sanitizeValue(env.CONTACT_FORM_FROM_NAME, 160) || CONTACT_DEFAULT_FROM_NAME;
  const subject = buildContactSubject(payload, name);
  const textBody = buildContactTextBody(payload, request, name, email, message);
  const htmlBody = buildContactHtmlBody(payload, request, name, email, message);
  const deliveryMode = resolveContactDeliveryMode(env);
  const requestTimeoutMs = parseTimeoutMs(env.CONTACT_FORM_REQUEST_TIMEOUT_MS);

  if (deliveryMode === 'log') {
    console.log('Contact form submission', { toEmail, subject, textBody });
    return contactJsonResponse({ success: true, mode: 'log' });
  }

  if (deliveryMode === 'resend' && !sanitizeValue(env.RESEND_API_KEY, 400)) {
    console.error('Contact form delivery misconfigured: RESEND_API_KEY is missing');
    return contactJsonResponse(
      { success: false, error: 'We could not send your message right now. Please try again shortly.' },
      { status: 500, headers: { 'X-Contact-Delivery-Failed': 'resend-misconfigured' } },
    );
  }

  try {
    if (deliveryMode === 'resend') {
      const apiUrl = getResendEndpoint(env);
      const response = await sendContactViaResend(
        apiUrl,
        sanitizeValue(env.RESEND_API_KEY, 400),
        fromEmail,
        fromName,
        toEmail,
        name,
        email,
        subject,
        textBody,
        htmlBody,
        requestTimeoutMs,
      );
      if (response.ok) {
        return contactJsonResponse({ success: true });
      }
      const errorText = await response.text();
      console.error('Contact form delivery failed', 'resend', describeEndpoint(apiUrl), response.status, errorText);
      return contactJsonResponse(
        { success: false, error: 'We could not send your message right now. Please try again shortly.' },
        { status: 502, headers: { 'X-Contact-Delivery-Failed': 'resend' } },
      );
    }

    // Default: MailChannels (with an optional custom endpoint tried first).
    const endpoints = getMailchannelsEndpoints(env);
    let lastErrorText = '';
    for (const apiUrl of endpoints) {
      const response = await sendContactViaMailchannels(
        apiUrl,
        fromEmail,
        fromName,
        toEmail,
        name,
        email,
        subject,
        textBody,
        htmlBody,
        requestTimeoutMs,
      );
      if (response.ok) {
        return contactJsonResponse({ success: true });
      }
      lastErrorText = await response.text();
      console.error('Contact form delivery failed', 'mailchannels', describeEndpoint(apiUrl), response.status, lastErrorText);
    }
    return contactJsonResponse(
      { success: false, error: 'We could not send your message right now. Please try again shortly.' },
      { status: 502, headers: { 'X-Contact-Delivery-Failed': 'mailchannels' } },
    );
  } catch (error) {
    console.error('Contact form request failed', deliveryMode, isAbortError(error) ? `timeout after ${requestTimeoutMs}ms` : error);
    return contactJsonResponse(
      { success: false, error: 'We could not send your message right now. Please try again shortly.' },
      { status: 500, headers: { 'X-Contact-Delivery-Failed': isAbortError(error) ? `${deliveryMode}-timeout` : deliveryMode } },
    );
  }
}

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

    // Public contact form (used by the Contact page and print/workshop inquiries).
    if (pathname === '/api/contact' || pathname === '/api/public/contact') {
      if (request.method === 'OPTIONS') {
        return new Response(null, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        });
      }
      if (request.method !== 'POST') {
        return methodNotAllowed(['POST', 'OPTIONS']);
      }
      return handleContactForm(request, env);
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
