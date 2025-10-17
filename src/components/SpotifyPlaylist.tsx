export default function SpotifyPlaylist() {
  return (
    <div className="w-full">
      <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <iframe 
          data-testid="embed-iframe" 
          style={{ borderRadius: '12px' }} 
          src="https://open.spotify.com/embed/playlist/6Gy5nsKnrYir1tOx9pBuxW?utm_source=generator" 
          width="100%" 
          height="352" 
          frameBorder="0" 
          allowFullScreen 
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
          loading="lazy"
          title="Spotify Playlist"
        />
      </div>
    </div>
  );
}