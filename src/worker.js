// Continent & Country mapping
const CONTINENT_MAP = {
  'Africa': 'africa_id',
  'Asia': 'asia_id',
  'Australia & New Zealand': 'australia_id',
  'Central America & Caribbean': 'central_america_id',
  'Europe & Scandinavia': 'europe_id',
  'Middle East': 'middle_east_id',
  'North America': 'north_america_id',
  'Oceania': 'oceania_id',
  'South America': 'south_america_id'
};

const COUNTRY_MAP = {
  'Egypt': 'egypt_id',
  'Ethiopia': 'ethiopia_id',
  'Morocco': 'morocco_id',
  'Namibia': 'namibia_id',
  'South Africa': 'south_africa_id',
  // Add more countries as needed
};

async function handleMetadataSync(request, env) {
  // CORS headers
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers });
  }

  try {
    const { continentFolder, countryFolder } = await request.json();

    if (!continentFolder || !countryFolder) {
      return new Response(
        JSON.stringify({ error: 'continentFolder and countryFolder required' }),
        { status: 400, headers }
      );
    }

    const continentId = CONTINENT_MAP[continentFolder];
    const countryId = COUNTRY_MAP[countryFolder];

    if (!continentId || !countryId) {
      return new Response(
        JSON.stringify({ error: 'Invalid continent or country' }),
        { status: 400, headers }
      );
    }

    const cloudName = env.CLOUDINARY_CLOUD_NAME;
    const apiKey = env.CLOUDINARY_API_KEY;
    const apiSecret = env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return new Response(
        JSON.stringify({ error: 'Cloudinary credentials not configured' }),
        { status: 500, headers }
      );
    }

    // Search assets in folder: continent/country/*
    const searchExpr = `asset_folder:${continentFolder}/${countryFolder}/*`;
    let nextCursor;
    let updated = 0;
    const maxUpdates = 500;

    do {
      const searchUrl = new URL(`https://api.cloudinary.com/v1_1/${cloudName}/resources/search`);
      const searchParams = {
        expression: searchExpr,
        max_results: 100,
      };
      if (nextCursor) {
        searchParams.next_cursor = nextCursor;
      }

      const authHeader = 'Basic ' + btoa(`${apiKey}:${apiSecret}`);
      const searchResponse = await fetch(searchUrl, {
        method: 'POST',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchParams),
      });

      if (!searchResponse.ok) {
        throw new Error(`Search failed: ${searchResponse.statusText}`);
      }

      const searchResult = await searchResponse.json();
      nextCursor = searchResult.next_cursor;

      for (const asset of searchResult.resources) {
        const updateUrl = `https://api.cloudinary.com/v1_1/${cloudName}/resources/${asset.resource_type}/upload/${asset.public_id}`;
        
        await fetch(updateUrl, {
          method: 'POST',
          headers: {
            'Authorization': authHeader,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            metadata: {
              continent_id: continentId,
              country_id: countryId,
            },
          }),
        }).catch(console.error);
        
        updated++;
      }
    } while (nextCursor && updated < maxUpdates);

    return new Response(
      JSON.stringify({ success: true, updated }),
      { headers }
    );
  } catch (error) {
    console.error('Sync failed:', error);
    return new Response(
      JSON.stringify({ error: 'Sync failed', message: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Handle API routes first
    if (pathname === '/api/health') {
      return new Response(
        JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (pathname === '/api/sync-metadata' && request.method === 'POST') {
      return handleMetadataSync(request, env);
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
    
    // Try to get static assets
    const response = await env.ASSETS.fetch(request);
    
    if (response.status !== 404) {
      return response;
    }
    
    // If the request is for a static asset (has file extension) and not found, return 404
    if (pathname.includes('.') && !pathname.endsWith('/')) {
      return new Response('Not Found', { status: 404 });
    }
    
    // For all other routes (SPA routes), serve index.html
    const indexRequest = new Request(`${url.origin}/index.html`, request);
    return env.ASSETS.fetch(indexRequest);
  },
};
