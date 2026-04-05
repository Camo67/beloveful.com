import { useQuery } from '@tanstack/react-query';
import { ALBUMS } from '@/lib/data'; // Data from prefix-mapped.json
import { getWorkingImageUrl, mapToCdnUrl, validateAndFixImageUrl } from '@/lib/image-utils';

type ApiAlbumSummary = {
  id: number;
  region: string;
  country: string;
  slug: string;
  description?: string | null;
  image_count: number;
  cover_desktop_url?: string | null;
  cover_mobile_url?: string | null;
};

async function fetchDbAlbumSummaries(): Promise<ApiAlbumSummary[]> {
  const response = await fetch('/api/albums', { method: 'GET' });
  if (!response.ok) return [];
  const data = await response.json();
  if (!data?.success || !Array.isArray(data.albums)) return [];
  return data.albums as ApiAlbumSummary[];
}

const LEGACY_COUNTRY_DISPLAY_BY_SLUG: Record<string, string> = {
  india: 'India',
  phillipines: 'Philippines',
};

function toTitleCase(value: string): string {
  return String(value || '')
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
}

function normalizeAlbumCountry(country: string | undefined, slug?: string, fallback?: string): string {
  const trimmed = String(country || '').trim();

  if (slug && LEGACY_COUNTRY_DISPLAY_BY_SLUG[slug]) {
    return LEGACY_COUNTRY_DISPLAY_BY_SLUG[slug];
  }

  if (!trimmed) {
    return String(fallback || '').trim();
  }

  if (trimmed === trimmed.toLowerCase()) {
    return String(fallback || toTitleCase(trimmed.replace(/-/g, ' '))).trim();
  }

  return trimmed;
}

function normalizeImagePair(image: any): { desktop: string; mobile: string } | null {
  if (!image) return null;

  const rawDesktop = String(image.desktop ?? image.desktop_url ?? '').trim();
  const rawMobile = String(image.mobile ?? image.mobile_url ?? '').trim();

  if (!rawDesktop && !rawMobile) return null;

  const normalizedDesktop = rawDesktop ? (mapToCdnUrl(validateAndFixImageUrl(rawDesktop)) ?? validateAndFixImageUrl(rawDesktop)) : '';
  const normalizedMobile = rawMobile ? (mapToCdnUrl(validateAndFixImageUrl(rawMobile)) ?? validateAndFixImageUrl(rawMobile)) : '';

  if (!normalizedDesktop && !normalizedMobile) return null;

  return {
    desktop: normalizedDesktop || normalizedMobile,
    mobile: normalizedMobile || normalizedDesktop,
  };
}

function dedupeKey(url: string): string {
  if (!url) return '';
  try {
    const parsed = new URL(url, 'https://beloveful.com');
    const decodedPath = decodeURIComponent(parsed.pathname);
    const cleanedPath = decodedPath.replace(/\s*\(\d+\)(?=\.[^./]+$)/, '');
    return `${parsed.origin}${cleanedPath}${parsed.search}`;
  } catch {
    return decodeURIComponent(url).replace(/\s*\(\d+\)(?=\.[^./]+$)/, '');
  }
}

export const useAlbums = () => {
  return useQuery({
    queryKey: ['albums'],
    queryFn: async () => {
      try {
        console.log('📚 Loading albums (static + DB)');

        // Pull DB-provided albums that have images (for new uploads / dynamic additions).
        let dbAlbums: any[] = [];
        try {
          const summaries = await fetchDbAlbumSummaries();
          dbAlbums = summaries
            .filter((a) => a && a.slug)
            .map((a) => {
              const country = normalizeAlbumCountry(a.country, a.slug);
              return {
                region: a.region,
                country,
                slug: a.slug,
                title: country,
                description: a.description || undefined,
                imageCount: Number(a.image_count) || 0,
                images: [
                  {
                    desktop: a.cover_desktop_url || a.cover_mobile_url || '',
                    mobile: a.cover_mobile_url || a.cover_desktop_url || '',
                  },
                ].filter((img) => !!img.desktop || !!img.mobile),
              };
            });
        } catch {
          // ignore DB failures and fall back to static only
        }

        // Merge DB albums into static albums by slug.
        // If DB has a cover image for a static album, place it first so map pins and list thumbnails
        // automatically reflect the latest admin uploads.
        const dbBySlug = new Map<string, any>();
        for (const album of dbAlbums) {
          if (album?.slug) dbBySlug.set(album.slug, album);
        }

        const mergedAlbums = ALBUMS.map((staticAlbum) => {
          const dbAlbum = dbBySlug.get(staticAlbum.slug);
          if (!dbAlbum) return staticAlbum;
          const dbHasImages = (dbAlbum.imageCount || 0) > 0 && dbAlbum.images.length > 0;

          return {
            ...staticAlbum,
            region: dbAlbum.region || staticAlbum.region,
            country: dbAlbum.country || staticAlbum.country,
            title: dbAlbum.country || staticAlbum.title,
            description: dbAlbum.description || staticAlbum.description,
            imageCount: dbHasImages
              ? dbAlbum.imageCount
              : (staticAlbum.imageCount ?? staticAlbum.images.length),
            images: dbHasImages ? dbAlbum.images : staticAlbum.images,
          };
        }) as typeof ALBUMS;

        for (const dbAlbum of dbBySlug.values()) {
          if ((dbAlbum.imageCount || 0) > 0 && !ALBUMS.find((album) => album.slug === dbAlbum.slug)) {
            mergedAlbums.push(dbAlbum);
          }
        }

        // Create a copy of albums with verified image URLs
        const verifiedAlbums = [];
        for (const album of mergedAlbums) {
          const verifiedImages = [];
          // Process only the first image for verification to improve performance
          if (album.images.length > 0) {
            const firstImage = album.images[0];
            try {
              // Add a timeout to prevent hanging
              const timeoutPromise = new Promise<string>((_, reject) => {
                setTimeout(() => reject(new Error('Image verification timeout')), 5000); // 5 second timeout
              });
              
              const verifiedUrlPromise = getWorkingImageUrl(firstImage.desktop);
              const verifiedDesktop = await Promise.race([verifiedUrlPromise, timeoutPromise]);
              
              const verifiedMobilePromise = getWorkingImageUrl(firstImage.mobile);
              const verifiedMobile = await Promise.race([verifiedMobilePromise, timeoutPromise]);
              
              verifiedImages.push({
                desktop: verifiedDesktop as string,
                mobile: verifiedMobile as string
              });
              
              // Add the rest of the images without verification for performance
              verifiedImages.push(...album.images.slice(1));
            } catch (error) {
              console.warn('Failed to verify first image URL:', firstImage, error);
              // Use all images as-is if verification fails
              verifiedImages.push(...album.images);
            }
          }
          
          verifiedAlbums.push({
            ...album,
            images: verifiedImages
          });
        }
        return verifiedAlbums;
      } catch (error) {
        console.error('Failed to load albums:', error);
        // Return original albums if verification process fails
        return ALBUMS;
      }
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    retry: 1,
  });
};

export const useAlbum = (region: string, country: string) => {
  const normalizeRegion = (value: string) =>
    value.toLowerCase().replace(/[^a-z]/g, "");
  const normalizeSlug = (value: string) =>
    value.toLowerCase().trim();
  return useQuery({
    queryKey: ['album', region, country],
    queryFn: async () => {
      console.log(`🌍 Loading album for ${region}/${country} (static + DB)`);

      const regionKey = normalizeRegion(region);
      const slugKey = normalizeSlug(country);
      const staticAlbum = ALBUMS.find(album => 
        normalizeRegion(album.region) === regionKey && 
        normalizeSlug(album.slug) === slugKey
      );
      const fallbackAlbum = staticAlbum || ALBUMS.find(album =>
        normalizeSlug(album.slug) === slugKey
      );

      // Try DB album (may include new uploads).
      let dbAlbum: any | null = null;
      try {
        const response = await fetch(`/api/albums/${encodeURIComponent(country)}`, { method: 'GET' });
        if (response.ok) {
          const data = await response.json();
          if (data?.success && data?.album) {
            dbAlbum = data.album;
          }
        }
      } catch {
        // ignore; keep fallback behavior
      }

      const album = fallbackAlbum || dbAlbum;
      if (!album) {
        return undefined;
      }

      const mergedImages: Array<{ desktop: string; mobile: string }> = [];
      const seen = new Set<string>();
      const addUnique = (img: any) => {
        const normalized = normalizeImagePair(img);
        if (!normalized) return;
        const key = `${dedupeKey(normalized.desktop)}|${dedupeKey(normalized.mobile)}`;
        if (seen.has(key)) return;
        seen.add(key);
        mergedImages.push(normalized);
      };

      for (const image of staticAlbum?.images || []) addUnique(image);
      for (const image of dbAlbum?.images || []) addUnique(image);
      
      // Verify image URLs (skip broken ones)
      const verifiedImages: Array<{ desktop: string; mobile: string }> = [];
      for (const image of mergedImages) {
        try {
          const verifiedDesktop = await getWorkingImageUrl(image.desktop);
          const verifiedMobile = await getWorkingImageUrl(image.mobile);
          verifiedImages.push({
            desktop: verifiedDesktop,
            mobile: verifiedMobile
          });
        } catch (error) {
          console.warn('Failed to verify image URL:', image, error);
          // Skip broken images
        }
      }
      
      return {
        ...album,
        region: dbAlbum?.region || staticAlbum?.region || album.region,
        country: normalizeAlbumCountry(dbAlbum?.country, dbAlbum?.slug, staticAlbum?.country || album.country),
        title: normalizeAlbumCountry(dbAlbum?.country, dbAlbum?.slug, staticAlbum?.title || album.title),
        description: dbAlbum?.description || staticAlbum?.description || album.description,
        imageCount: verifiedImages.length,
        images: verifiedImages
      };
    },
    staleTime: Infinity, // Cache forever since static data doesn't change
    retry: false, // No need to retry static data
  });
};
