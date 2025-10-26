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