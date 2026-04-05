import { useQuery } from '@tanstack/react-query';
import { ALBUMS } from '@/lib/data'; // Data from prefix-mapped.json
import { getWorkingImageUrl } from '@/lib/image-utils';

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
              slug: a.slug,
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
          if (album?.slug) dbBySlug.set(album.slug, album);
        }

        const mergedAlbums = ALBUMS.map((staticAlbum) => {
          const dbAlbum = dbBySlug.get(staticAlbum.slug);
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
          if (!ALBUMS.find((album) => album.slug === dbAlbum.slug)) {
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
  return useQuery({
    queryKey: ['album', region, country],
    queryFn: async () => {
      console.log(`🌍 Loading album for ${region}/${country} (static + DB)`);

      const staticAlbum = ALBUMS.find(album => 
        normalizeRegion(album.region) === normalizeRegion(region) && 
        album.slug === country
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
      
      const album = staticAlbum || dbAlbum;
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

      for (const image of (staticAlbum?.images || [])) addUnique(image);
      for (const image of (dbAlbum?.images || [])) addUnique(image);
      
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
        images: verifiedImages
      };
    },
    staleTime: Infinity, // Cache forever since static data doesn't change
    retry: false, // No need to retry static data
  });
};
