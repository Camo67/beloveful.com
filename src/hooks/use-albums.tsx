import { useQuery } from '@tanstack/react-query';
import { ALBUMS, type CountryAlbum, type Region } from '@/lib/data'; // Data from prefix-mapped.json
import { normalizeAlbumSlug, sameAlbumSlug } from '@/lib/album-slugs';
import { dedupeAlbumImages, type AlbumImageCandidate } from '@/lib/album-image-utils';
import { mapToCdnUrl } from '@/lib/image-utils';

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

type AlbumCandidate = Omit<CountryAlbum, 'images' | 'region'> & {
  region: Region;
  images: AlbumImageCandidate[];
};

async function fetchDbAlbumSummaries(): Promise<{ albums: ApiAlbumSummary[]; slideshow?: any[]; logos?: string[] }> {
  const response = await fetch('/api/public/albums', { method: 'GET' });
  if (!response.ok) return { albums: [] };
  const data = await response.json();
  if (!data?.success) return { albums: [] };
  return {
    albums: (data.albums || []) as ApiAlbumSummary[],
    slideshow: data.slideshow,
    logos: data.logos
  };
}

function normalizeAlbumRecord(album: AlbumCandidate | CountryAlbum): CountryAlbum {
  return {
    ...album,
    slug: normalizeAlbumSlug(album.slug || album.country),
    images: dedupeAlbumImages(album.images || []),
  };
}

export const useAlbums = () => {
  return useQuery({
    queryKey: ['albums'],
    queryFn: async () => {
      try {
        console.log('📚 Loading albums (static + DB)');

        // Pull DB-provided albums that have images (for new uploads / dynamic additions).
        let dbAlbums: AlbumCandidate[] = [];
        try {
          const { albums: summaries } = await fetchDbAlbumSummaries();
          dbAlbums = summaries
            .filter((a) => a && (a.slug || a.country) && (a.image_count > 0 || (a as any).images?.length > 0))
            .map((a: any) => {
              const rawImages = a.images || [
                {
                  desktop: a.cover_desktop_url || a.cover_mobile_url || '',
                  mobile: a.cover_mobile_url || a.cover_desktop_url || '',
                },
              ].filter((img: any) => !!img.desktop || !!img.mobile);

              return {
                region: a.region as Region,
                country: a.country,
                slug: normalizeAlbumSlug(a.slug || a.country),
                title: a.country,
                description: a.description || undefined,
                images: rawImages.map((img: any) => ({
                  desktop: mapToCdnUrl(img.desktop) || img.desktop,
                  mobile: mapToCdnUrl(img.mobile) || img.mobile,
                })),
              };
            })
            .filter((a) => a.images.length > 0);
        } catch {
          // ignore DB failures and fall back to static only
        }

        // Merge DB albums into static albums by slug.
        // If DB has a cover image for a static album, place it first so map pins and list thumbnails
        // automatically reflect the latest admin uploads.
        const dbBySlug = new Map<string, AlbumCandidate>();
        for (const album of dbAlbums) {
          const slug = normalizeAlbumSlug(album?.slug || album?.country);
          if (slug) {
            dbBySlug.set(slug, { ...album, slug });
          }
        }

        const mergedAlbums = ALBUMS.map((staticAlbum) => {
          const dbAlbum = dbBySlug.get(normalizeAlbumSlug(staticAlbum.slug));
          if (!dbAlbum) return normalizeAlbumRecord(staticAlbum);

          return normalizeAlbumRecord({
            ...staticAlbum,
            description: dbAlbum.description || staticAlbum.description,
            images: [...(dbAlbum.images || []), ...(staticAlbum.images || [])],
          });
        });

        for (const dbAlbum of dbBySlug.values()) {
          if (!ALBUMS.find((album) => sameAlbumSlug(album.slug, dbAlbum.slug))) {
            mergedAlbums.push(normalizeAlbumRecord(dbAlbum));
          }
        }

        return mergedAlbums;
      } catch (error) {
        console.error('Failed to load albums:', error);
        // Return original albums if verification process fails
        return ALBUMS.map(normalizeAlbumRecord);
      }
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
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
        const response = await fetch(`/api/public/albums/${encodeURIComponent(requestedSlug)}`, { method: 'GET' });
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
      
      return {
        ...album,
        slug: normalizeAlbumSlug(album.slug || album.country),
        images: dedupeAlbumImages([
          ...(dbAlbum?.images || []),
          ...(staticAlbum?.images || []),
        ]),
      };
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    retry: 1,
  });
};
