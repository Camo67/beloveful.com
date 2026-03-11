import { GENERATED_ERASING_BORDERS } from '../../src/lib/generated/generatedErasingBorders';

function jsonResponse(payload: unknown, init: ResponseInit = {}): Response {
  return new Response(JSON.stringify(payload), {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  });
}

export async function onRequestGet(): Promise<Response> {
  // Keep this endpoint lightweight; just return a handful of project hero images.
  const list = Array.isArray(GENERATED_ERASING_BORDERS) ? GENERATED_ERASING_BORDERS : [];
  const urls = list
    .map((p: any) => p?.images?.desktop || p?.images?.mobile)
    .filter((u: any) => typeof u === 'string' && u.trim())
    .slice(0, 24) as string[];

  return jsonResponse(urls);
}

