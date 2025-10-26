import { useQuery } from '@tanstack/react-query';
import { HOME_SLIDESHOW, SlideshowImage } from '@/lib/data';

const loadHomepageSlideshow = async (): Promise<SlideshowImage[]> => {
  return HOME_SLIDESHOW;
};

export const useSlideshow = () => {
  return useQuery<SlideshowImage[]>({
    queryKey: ['slideshow'],
    queryFn: loadHomepageSlideshow,
    staleTime: 1000 * 60 * 60, // 1 hour
    retry: 0,
  });
};
