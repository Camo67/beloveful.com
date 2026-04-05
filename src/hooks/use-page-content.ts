import { useQuery } from '@tanstack/react-query';

type ContentDefaults = Record<string, string>;

async function fetchPageContent<T extends ContentDefaults>(
  pageKey: string,
  defaults: T,
): Promise<T> {
  try {
    const response = await fetch(`/api/content/public?page_key=${encodeURIComponent(pageKey)}`);
    if (!response.ok) {
      return defaults;
    }

    const data = await response.json();
    if (!data?.success || typeof data?.content !== 'object' || !data.content) {
      return defaults;
    }

    return {
      ...defaults,
      ...Object.fromEntries(
        Object.entries(data.content).filter((entry): entry is [string, string] => typeof entry[1] === 'string'),
      ),
    };
  } catch {
    return defaults;
  }
}

export function usePageContent<T extends ContentDefaults>(pageKey: string, defaults: T) {
  return useQuery({
    queryKey: ['page-content', pageKey],
    queryFn: () => fetchPageContent(pageKey, defaults),
    staleTime: 1000 * 60 * 5,
    initialData: defaults,
  });
}
