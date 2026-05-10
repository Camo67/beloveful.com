type PrintInnovationVariant = {
  id?: number | string;
  title?: string;
  option1?: string;
  price?: string | number;
  available?: boolean;
};

type PrintInnovationImage = {
  src?: string;
};

type PrintInnovationProduct = {
  id?: number | string;
  title?: string;
  handle?: string;
  body_html?: string;
  vendor?: string;
  tags?: string[] | string;
  images?: PrintInnovationImage[];
  variants?: PrintInnovationVariant[];
  updated_at?: string;
};

type CloudflareRequestInit = RequestInit & {
  cf?: {
    cacheTtl?: number;
    cacheEverything?: boolean;
  };
};

const SOURCE_URL =
  'https://www.printinnovationlab.com/collections/beloveful/products.json?limit=250';

function jsonResponse(payload: unknown, init: ResponseInit = {}): Response {
  return new Response(JSON.stringify(payload), {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      ...(init.headers || {}),
    },
  });
}

function methodNotAllowed(): Response {
  return new Response('Method Not Allowed', {
    status: 405,
    headers: {
      Allow: 'GET',
      'Access-Control-Allow-Origin': '*',
    },
  });
}

function normalizeTags(tags: PrintInnovationProduct['tags']): string[] {
  if (Array.isArray(tags)) return tags.filter((tag) => typeof tag === 'string');
  if (typeof tags === 'string') {
    return tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);
  }
  return [];
}

function normalizeProduct(product: PrintInnovationProduct) {
  const handle = typeof product.handle === 'string' ? product.handle : '';
  const variants = Array.isArray(product.variants)
    ? product.variants
        .filter((variant) => variant && variant.available !== false && variant.id)
        .map((variant) => {
          const id = String(variant.id);
          const price = Number.parseFloat(String(variant.price || '0'));

          return {
            id,
            title: variant.title || variant.option1 || 'Print',
            price: Number.isFinite(price) ? price : 0,
            available: variant.available !== false,
            checkoutUrl: `https://www.printinnovationlab.com/cart/${id}:1?checkout`,
          };
        })
    : [];

  const images = Array.isArray(product.images)
    ? product.images.map((image) => image?.src).filter((src): src is string => Boolean(src))
    : [];
  const finitePrices = variants.map((variant) => variant.price).filter(Number.isFinite);
  const productUrl = handle
    ? `https://www.printinnovationlab.com/products/${handle}`
    : 'https://www.printinnovationlab.com/collections/beloveful';

  return {
    id: product.id,
    title: product.title || 'Untitled print',
    handle,
    description: product.body_html || '',
    vendor: product.vendor || '',
    tags: normalizeTags(product.tags),
    image: images[0] || '',
    images,
    minPrice: finitePrices.length ? Math.min(...finitePrices) : 0,
    variants,
    productUrl,
    buyUrl: variants[0]?.checkoutUrl || productUrl,
    updatedAt: product.updated_at || null,
  };
}

export async function onRequestOptions(): Promise<Response> {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function onRequestGet(): Promise<Response> {
  try {
    const requestInit: CloudflareRequestInit = {
      headers: {
        Accept: 'application/json',
        'User-Agent': 'Beloveful.com catalogue sync',
      },
      cf: {
        cacheTtl: 900,
        cacheEverything: true,
      },
    };
    const upstream = await fetch(SOURCE_URL, requestInit);

    if (!upstream.ok) {
      return jsonResponse(
        {
          success: false,
          error: 'Print Innovations catalogue unavailable',
        },
        {
          status: 502,
          headers: {
            'Cache-Control': 'no-store',
          },
        },
      );
    }

    const data = (await upstream.json()) as { products?: PrintInnovationProduct[] };
    const products = Array.isArray(data.products) ? data.products.map(normalizeProduct) : [];

    return jsonResponse(
      {
        success: true,
        source: 'printinnovationlab',
        collection: 'beloveful',
        count: products.length,
        syncedAt: new Date().toISOString(),
        products,
      },
      {
        headers: {
          'Cache-Control': 'public, max-age=900, s-maxage=900',
        },
      },
    );
  } catch (error) {
    console.error('Print Innovations catalogue fetch failed', error);

    return jsonResponse(
      {
        success: false,
        error: 'Print Innovations catalogue request failed',
      },
      {
        status: 502,
        headers: {
          'Cache-Control': 'no-store',
        },
      },
    );
  }
}

export async function onRequest(): Promise<Response> {
  return methodNotAllowed();
}
