import { useQuery } from '@tanstack/react-query';
import { HOME_SLIDESHOW, SlideshowImage } from '@/lib/data';

const loadHomepageSlideshow = async (): Promise<SlideshowImage[]> => {
  try {
    const response = await fetch('/api/public/slideshow');
    if (!response.ok) {
      return HOME_SLIDESHOW;
    }

    const data = await response.json();
    if (!data?.success || !Array.isArray(data.images) || data.images.length === 0) {
      return HOME_SLIDESHOW;
    }

    return data.images.map((image: any) => ({
      desktop: image.desktop_url || image.mobile_url,
      mobile: image.mobile_url || image.desktop_url,
    }));
  } catch {
    return HOME_SLIDESHOW;
  }
};

export const useSlideshow = (_bypassProtection: boolean = false) => {
  return useQuery<SlideshowImage[]>({
    queryKey: ['slideshow'],
    queryFn: loadHomepageSlideshow,
    staleTime: 1000 * 60 * 60, // 1 hour
    retry: 0,
  });
};
