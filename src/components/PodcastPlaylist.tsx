import { useEffect, useMemo, useState } from 'react';

export type Episode = {
  title: string;
  audioUrl: string | null;
  link: string | null;
  pubDate: string | null;
  duration: string | null;
  image: string | null;
  source: string;
};

export default function PodcastPlaylist() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [selected, setSelected] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/rss/playlist', { signal: ctrl.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const list: Episode[] = Array.isArray(data.episodes) ? data.episodes : [];
        setEpisodes(list);
        setSelected(0);
        setError(null);
      } catch (e: any) {
        if (e?.name !== 'AbortError') {
          setError('Failed to load podcast playlist');
        }
      } finally {
        setLoading(false);
      }
    })();
    return () => ctrl.abort();
  }, []);

  const current = episodes[selected];

  const formattedList = useMemo(() => {
    return episodes.map((ep) => ({
      ...ep,
      date: ep.pubDate ? new Date(ep.pubDate).toLocaleDateString() : '',
      dur: ep.duration || '',
    }));
  }, [episodes]);

  if (loading) {
    return <div className="text-black dark:text-white">Loading…</div>;
  }

  if (error) {
    return <div className="text-red-600 dark:text-red-400">{error}</div>;
  }

  if (!current) {
    return <div className="text-black dark:text-white">No episodes found.</div>;
  }

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Now Playing */}
      <div className="md:col-span-2">
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-900">
          <div className="flex items-start gap-4">
            {current.image ? (
              <img src={current.image} alt="Episode" className="w-24 h-24 object-cover rounded-md" />
            ) : (
              <div className="w-24 h-24 rounded-md bg-gray-200 dark:bg-gray-800" />
            )}
            <div className="min-w-0">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">{current.source}</div>
              <h3 className="text-lg font-medium text-black dark:text-white truncate" title={current.title}>
                {current.title}
              </h3>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {current.pubDate ? new Date(current.pubDate).toLocaleString() : ''}
                {current.duration ? ` • ${current.duration}` : ''}
              </div>
            </div>
          </div>
          <div className="mt-4">
            <audio
              controls
              className="w-full"
              src={current.audioUrl ?? undefined}
            >
              Your browser does not support the audio element.
            </audio>
          </div>
          <div className="mt-3">
            {current.link ? (
              <a
                href={current.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 dark:text-blue-400 underline"
              >
                View episode details
              </a>
            ) : null}
          </div>
        </div>
      </div>

      {/* Playlist */}
      <div>
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300">
            Playlist
          </div>
          <ul className="max-h-[520px] overflow-y-auto">
            {formattedList.map((ep, idx) => (
              <li
                key={`${ep.source}-${idx}-${ep.title}`}
                className={`px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 ${
                  idx === selected ? 'bg-gray-100 dark:bg-gray-800' : ''
                }`}
                onClick={() => setSelected(idx)}
                role="button"
                aria-pressed={idx === selected}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <button
                      className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-300"
                      aria-label={idx === selected ? 'Playing' : 'Play'}
                    >
                      {idx === selected ? (
                        <span>▌▌</span>
                      ) : (
                        <span>▶</span>
                      )}
                    </button>
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-0.5">
                      {ep.source} {ep.date ? `• ${ep.date}` : ''} {ep.dur ? `• ${ep.dur}` : ''}
                    </div>
                    <div className="text-sm text-black dark:text-white truncate" title={ep.title}>
                      {ep.title}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}