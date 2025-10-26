import { useQuery } from '@tanstack/react-query';
import { ALBUMS } from '@/lib/data'; // Data from prefix-mapped.json
import { getWorkingImageUrl } from '@/lib/image-utils';

export const useAlbums = () => {
  return useQuery({
    queryKey: ['albums'],
    queryFn: async () => {
      try {
        console.log('📚 Loading albums from prefix-mapped data');
        // Create a copy of albums with verified image URLs
        const verifiedAlbums = [];
        for (const album of ALBUMS) {
          const verifiedImages = [];
          for (const image of album.images) {
            try {
              // Add a timeout to prevent hanging
              const timeoutPromise = new Promise<string>((_, reject) => {
                setTimeout(() => reject(new Error('Image verification timeout')), 10000); // 10 second timeout
              });
              
              const verifiedUrlPromise = getWorkingImageUrl(image.desktop);
              const verifiedDesktop = await Promise.race([verifiedUrlPromise, timeoutPromise]);
              
              const verifiedMobilePromise = getWorkingImageUrl(image.mobile);
              const verifiedMobile = await Promise.race([verifiedMobilePromise, timeoutPromise]);
              
              verifiedImages.push({
                desktop: verifiedDesktop as string,
                mobile: verifiedMobile as string
              });
            } catch (error) {
              console.warn('Failed to verify image URL:', image, error);
              // Skip broken images
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
        return [];
      }
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    retry: 1,
  });
};

export const useAlbum = (region: string, country: string) => {
  return useQuery({
    queryKey: ['album', region, country],
    queryFn: async () => {
      // Use static Cloudinary data directly
      console.log(`🌍 Loading album for ${region}/${country} from static data`);
      const album = ALBUMS.find(album => 
        album.region.toLowerCase().replace(/\s+/g, '-') === region && 
        album.slug === country
      );
      
      if (!album) {
        return undefined;
      }
      
      // Verify image URLs
      const verifiedImages = [];
      for (const image of album.images) {
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