import { mapToCdnUrl } from './image-utils';

export interface AlbumImageCandidate {
  desktop?: string | null;
  mobile?: string | null;
}

interface CleanAlbumImagesOptions {
  albumSlug?: string | null;
  country?: string | null;
  strictNoThumbs?: boolean;
  dedupeByIdentity?: boolean;
}

const THUMB_IMAGE_PATTERN =
  /(?:-nggid|nggid|120x90|180x0|0x360|300x200x100|thumbnail|_thumb)/i;

function safeDecode(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function normalizeAlbumIdentity(value?: string | null): string {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-');
}

function resolveImageUrl(url?: string | null): string {
  if (!url || typeof url !== 'string') return '';

  const trimmed = url.trim();
  if (!trimmed) return '';

  return mapToCdnUrl(trimmed) ?? trimmed;
}

function normalizeImageRecord(
  image?: AlbumImageCandidate | null,
): { desktop: string; mobile: string } | null {
  if (!image) return null;

  const desktop = resolveImageUrl(image.desktop);
  const mobile = resolveImageUrl(image.mobile);
  const normalizedDesktop = desktop || mobile;
  const normalizedMobile = mobile || desktop;

  if (!normalizedDesktop && !normalizedMobile) {
    return null;
  }

  return {
    desktop: normalizedDesktop,
    mobile: normalizedMobile,
  };
}

export function isThumbImageUrl(url?: string | null): boolean {
  if (!url || typeof url !== 'string') return false;
  return THUMB_IMAGE_PATTERN.test(safeDecode(url));
}

export function getImageIdentityKey(url?: string | null): string {
  if (!url || typeof url !== 'string') return '';

  const decoded = safeDecode(url.trim()).split(/[?#]/)[0];
  let filename = decoded;

  try {
    filename = new URL(decoded).pathname.split('/').pop() || decoded;
  } catch {
    filename = decoded.split('/').pop() || decoded;
  }

  filename = filename.replace(/\s*\(\d+\)(?=\.[^.]+$)/i, '');
  filename = filename.replace(/-nggid.*$/i, '');
  filename = filename.replace(/\.(jpe?g|png|webp|gif|avif)$/i, '');
  filename = filename.replace(/_[a-z0-9]{5,}$/i, '');
  filename = filename.replace(/^indtaj-?$/i, 'indtaj');
  filename = filename.replace(/^ind-madamejodhpur(?:-copy)?$/i, 'madamejodhpur');
  filename = filename.replace(/(?:[_-](?:copy|website)(?:[_-]?\d+)*)+$/i, '');
  filename = filename
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]+/gi, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  return filename.toLowerCase();
}

export function cleanAlbumImages(
  images: AlbumImageCandidate[],
  options: CleanAlbumImagesOptions = {},
): Array<{ desktop: string; mobile: string }> {
  const strictNoThumbs = options.strictNoThumbs ?? false;
  const dedupeByIdentity = options.dedupeByIdentity ?? strictNoThumbs;
  const cleaned: Array<{ desktop: string; mobile: string }> = [];
  const seen = new Set<string>();

  for (const image of images) {
    const normalized = normalizeImageRecord(image);
    if (!normalized) continue;

    const isThumb =
      isThumbImageUrl(normalized.desktop) || isThumbImageUrl(normalized.mobile);
    if (strictNoThumbs && isThumb) {
      continue;
    }

    const exactKey = `${normalized.desktop}|${normalized.mobile}`;
    const identityKey =
      getImageIdentityKey(normalized.desktop || normalized.mobile) || exactKey;
    const dedupeKey = dedupeByIdentity ? identityKey : exactKey;

    if (seen.has(dedupeKey)) {
      continue;
    }

    seen.add(dedupeKey);
    cleaned.push(normalized);
  }

  return cleaned;
}

export function cleanCountryAlbum<
  T extends {
    slug?: string | null;
    country?: string | null;
    images?: AlbumImageCandidate[];
  },
>(album: T): T & { images: Array<{ desktop: string; mobile: string }> } {
  return {
    ...album,
    images: cleanAlbumImages(album.images ?? [], {
      albumSlug: album.slug,
      country: album.country,
    }),
  };
}
