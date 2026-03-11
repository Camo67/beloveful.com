import localAlbums from '../../src/lib/local-albums.json';

function jsonResponse(payload: unknown, init: ResponseInit = {}): Response {
  return new Response(JSON.stringify(payload), {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  });
}

function extractFirstDesktopUrl(album: any): string | null {
  const first = Array.isArray(album?.images) ? album.images[0] : null;
  if (!first) return null;
  if (typeof first === 'string') return first;
  if (typeof first?.desktop === 'string' && first.desktop.trim()) return first.desktop;
  if (typeof first?.mobile === 'string' && first.mobile.trim()) return first.mobile;
  return null;
}

export async function onRequestGet(): Promise<Response> {
  const albums = Array.isArray(localAlbums) ? localAlbums : [];

  // Travel portfolio: exclude non-travel collections.
  const urls = albums
    .filter((a: any) => a?.region !== 'Erasing Borders' && a?.region !== 'Logo' && a?.slug !== 'erasing-borders')
    .map(extractFirstDesktopUrl)
    .filter((u: any) => typeof u === 'string' && u.trim()) as string[];

  return jsonResponse(urls);
}

