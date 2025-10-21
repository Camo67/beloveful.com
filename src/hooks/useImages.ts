import { useEffect, useState } from 'react';

/**
 * Simple hook to fetch images from an endpoint. No local fallbacks —
 * caller should provide an endpoint that returns a JSON array of strings.
 */
export function useImages(endpoint: string) {
  const [data, setData] = useState<string[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    if (!endpoint) return;
    let cancelled = false;
    setLoading(true);
    fetch(endpoint)
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json();
      })
      .then((json) => {
        if (!cancelled) {
          setData(Array.isArray(json) ? json : []);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err);
          setData([]);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [endpoint]);

  return { data, loading, error } as const;
}

