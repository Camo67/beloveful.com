import { useQuery } from '@tanstack/react-query';
import { ALBUMS } from '@/lib/data'; // Data from prefix-mapped.json
import { normalizeAlbumSlug, sameAlbumSlug } from '@/lib/album-slugs';
import { mapToCdnUrl, validateAndFixImageUrl } from '@/lib/image-utils';

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

function normalizeImageUrl(url?: string | null): string {
  const fixedUrl = validateAndFixImageUrl(url);
  return mapToCdnUrl(fixedUrl) ?? fixedUrl;
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
            .filter((a) => a && a.slug && a.image_count > 0)
            .map((a) => ({
              region: a.region,
              country: a.country,
              slug: normalizeAlbumSlug(a.slug || a.country),
              title: a.country,
              description: a.description || undefined,
              images: [
                {
                  desktop: a.cover_desktop_url || a.cover_mobile_url || '',
                  mobile: a.cover_mobile_url || a.cover_desktop_url || '',
                },
              ].filter((img) => !!img.desktop || !!img.mobile),
            }))
            .filter((a) => a.images.length > 0);
        } catch {
          // ignore DB failures and fall back to static only
        }

        // Merge DB albums into static albums by slug.
        // If DB has a cover image for a static album, place it first so map pins and list thumbnails
        // automatically reflect the latest admin uploads.
        const dbBySlug = new Map<string, any>();
        for (const album of dbAlbums) {
          const slug = normalizeAlbumSlug(album?.slug || album?.country);
          if (slug) {
            dbBySlug.set(slug, { ...album, slug });
          }
        }

        const mergedAlbums = ALBUMS.map((staticAlbum) => {
          const dbAlbum = dbBySlug.get(normalizeAlbumSlug(staticAlbum.slug));
          if (!dbAlbum) return staticAlbum;

          const mergedImages: Array<{ desktop: string; mobile: string }> = [];
          const seen = new Set<string>();
          const addUnique = (img: any) => {
            if (!img) return;
            const desktop = String(img.desktop || '').trim();
            const mobile = String(img.mobile || '').trim();
            if (!desktop && !mobile) return;
            const key = `${desktop}|${mobile}`;
            if (seen.has(key)) return;
            seen.add(key);
            mergedImages.push({ desktop: desktop || mobile, mobile: mobile || desktop });
          };

          for (const image of dbAlbum.images || []) addUnique(image);
          for (const image of staticAlbum.images || []) addUnique(image);

          return {
            ...staticAlbum,
            description: dbAlbum.description || staticAlbum.description,
            images: mergedImages.length ? mergedImages : staticAlbum.images,
          };
        });

        for (const dbAlbum of dbBySlug.values()) {
          if (!ALBUMS.find((album) => sameAlbumSlug(album.slug, dbAlbum.slug))) {
            mergedAlbums.push(dbAlbum);
          }
        }

        const normalizedAlbums = mergedAlbums.map((album) => ({
          ...album,
          slug: normalizeAlbumSlug(album.slug || album.country),
          images: (album.images || []).map((image) => ({
            desktop: normalizeImageUrl(image.desktop),
            mobile: normalizeImageUrl(image.mobile || image.desktop),
          })),
        }));

        return normalizedAlbums.map((album) => ({
            ...album,
            images: album.images.filter((image) => !!image.desktop || !!image.mobile),
          }));
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
  return useQuery({
    queryKey: ['album', region, country],
    queryFn: async () => {
      console.log(`🌍 Loading album for ${region}/${country} (static + DB)`);
      const requestedSlug = normalizeAlbumSlug(country);

      const staticAlbum = ALBUMS.find(album => 
        normalizeRegion(album.region) === normalizeRegion(region) && 
        sameAlbumSlug(album.slug, requestedSlug)
      );

      // Try DB album (may include new uploads).
      let dbAlbum: any | null = null;
      try {
        const response = await fetch(`/api/albums/${encodeURIComponent(requestedSlug)}`, { method: 'GET' });
        if (response.ok) {
          const data = await response.json();
          if (data?.success && data?.album) {
            dbAlbum = {
              ...data.album,
              slug: normalizeAlbumSlug(data.album.slug || data.album.country),
            };
          }
        }
      } catch {
        // ignore; keep fallback behavior
      }
      
      const album = dbAlbum
        ? {
            ...(staticAlbum || {}),
            ...dbAlbum,
          }
        : staticAlbum;
      if (!album) {
        return undefined;
      }

      const mergedImages: Array<{ desktop: string; mobile: string }> = [];
      const seen = new Set<string>();
      const addUnique = (img: any) => {
        if (!img) return;
        const desktop = String(img.desktop || '').trim();
        const mobile = String(img.mobile || '').trim();
        if (!desktop && !mobile) return;
        const key = `${desktop}|${mobile}`;
        if (seen.has(key)) return;
        seen.add(key);
        mergedImages.push({ desktop: desktop || mobile, mobile: mobile || desktop });
      };

      for (const image of (dbAlbum?.images || [])) addUnique(image);
      for (const image of (staticAlbum?.images || [])) addUnique(image);
      
      const normalizedImages = mergedImages.map((image) => ({
        desktop: normalizeImageUrl(image.desktop),
        mobile: normalizeImageUrl(image.mobile || image.desktop),
      }));
      
      return {
        ...album,
        slug: normalizeAlbumSlug(album.slug || album.country),
        images: normalizedImages.filter((image) => !!image.desktop || !!image.mobile),
      };
    },
    staleTime: 1000 * 60 * 5, // Refetch periodically so backend image-path fixes propagate
    retry: 1,
  });
};
