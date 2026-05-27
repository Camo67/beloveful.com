import { useQuery } from '@tanstack/react-query';
import { SlideshowImage, HOME_SLIDESHOW } from '@/lib/data';

const loadHomepageSlideshow = async (): Promise<SlideshowImage[]> => {
  try {
    const response = await fetch('/api/public/albums', { method: 'GET' });
    const contentType = response.headers.get('content-type') || '';
    if (!response.ok || !contentType.includes('application/json')) {
      return HOME_SLIDESHOW;
    }

    const data = await response.json();
    if (!data?.success || !data?.slideshow) return HOME_SLIDESHOW;

    const { desktop, mobile } = data.slideshow;
    const images: SlideshowImage[] = [];

    // Map files to URLs. Assuming the API returns filenames or full paths.
    // Based on Controllers.php implementation, it returns array of filenames.
    // We need to resolve them against the homepage folders.
  
    const isImg = (f: string) => typeof f === 'string' && /\.(jpe?g|png|webp|avif)$/i.test(f);
    const dFiltered = (Array.isArray(desktop) ? desktop : []).filter(isImg);
    const mFiltered = (Array.isArray(mobile) ? mobile : []).filter(isImg);

    const count = Math.max(dFiltered.length, mFiltered.length);
    for (let i = 0; i < count; i++) {
      const dFile = dFiltered[i] || dFiltered[0] || mFiltered[i] || mFiltered[0];
      const mFile = mFiltered[i] || mFiltered[0] || dFiltered[i] || dFiltered[0];
    
      if (dFile || mFile) {
        images.push({
          desktop: dFile ? `/Website beloveful.com/Homepage/Desktop Landscape/${dFile}` : '',
          mobile: mFile ? `/Website beloveful.com/Homepage/Mobile Portrait/${mFile}` : '',
        });
      }
    }

    return images.length > 0 ? images : HOME_SLIDESHOW;
  } catch (error) {
    console.warn('Using static homepage slideshow fallback:', error);
    return HOME_SLIDESHOW;
  }
};

export const useSlideshow = (_bypassProtection: boolean = false) => {
  const query = useQuery<SlideshowImage[]>({
    queryKey: ['slideshow'],
    queryFn: loadHomepageSlideshow,
    staleTime: 1000 * 60 * 60, // 1 hour
    retry: false,
  });

  return {
    ...query,
    data: (query.data && query.data.length > 0) ? query.data : HOME_SLIDESHOW
  };
};
