export function normalizeAlbumSlug(value?: string | null): string {
  return String(value ?? '')
    .trim()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function sameAlbumSlug(a?: string | null, b?: string | null): boolean {
  const normalizedA = normalizeAlbumSlug(a);
  const normalizedB = normalizeAlbumSlug(b);
  return normalizedA.length > 0 && normalizedA === normalizedB;
}
