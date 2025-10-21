// Small helpers for image URL optimization (Cloudinary-friendly)
export function optimizeCloudinaryUrl(url: string, options?: { f?: string; q?: string }) {
  if (!url) return url;
  try {
    const u = new URL(url);
    const params = u.searchParams;
    if (options?.f) params.set('f', options.f);
    if (options?.q) params.set('q', options.q);
    u.search = params.toString();
    return u.toString();
  } catch (e) {
    // Not an absolute URL, append params conservatively
    const sep = url.includes('?') ? '&' : '?';
    const parts: string[] = [];
    if (options?.f) parts.push(`f=${options.f}`);
    if (options?.q) parts.push(`q=${options.q}`);
    return parts.length ? `${url}${sep}${parts.join('&')}` : url;
  }
}

export const CLOUDINARY_DEFAULT_OPTS = { f: 'auto', q: 'auto' };
