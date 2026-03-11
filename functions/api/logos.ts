import { CLIENT_LOGOS } from '../../src/lib/generated/clientLogos';

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
  const urls = Array.isArray(CLIENT_LOGOS) ? CLIENT_LOGOS : [];
  return jsonResponse(urls);
}

