import { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, LogIn, LogOut, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useSpotifyPlayer } from '@/hooks/use-spotify-player';
import { useToast } from '@/hooks/use-toast';

// You'll need to get these from your Spotify App settings
const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID || '';
const REDIRECT_URI = typeof window !== 'undefined' ? window.location.origin : '';

// Playlist URI - you can change this to any Spotify playlist URI
const PLAYLIST_URI = 'spotify:playlist:6Gy5nsKnrYir1tOx9pBuxW';

interface SpotifyTrack {
  id: string;
  name: string;
  artists: Array<{ name: string }>;
  album: {
    name: string;
    images: Array<{ url: string }>;
  };
  uri: string;
  duration_ms: number;
}

interface SpotifyPlaylistData {
  tracks: {
    items: Array<{ track: SpotifyTrack }>;
  };
  name: string;
  description: string;
  images: Array<{ url: string }>;
}

export default function SpotifyPlaylist() {
  const [playlist, setPlaylist] = useState<SpotifyPlaylistData | null>(null);
  const [volume, setVolume] = useState([50]);
  const [showWebPlayer, setShowWebPlayer] = useState(false);
  const { toast } = useToast();

  const {
    playerState,
    isReady,
    accessToken,
    isConnected,
    error,
    login,
    logout,
    play,
    pause,
    resume,
    skipToNext,
    skipToPrevious,
    setVolume: setSpotifyVolume,
  } = useSpotifyPlayer({
    clientId: SPOTIFY_CLIENT_ID,
    redirectUri: REDIRECT_URI,
    scopes: ['streaming', 'user-read-email', 'user-read-private', 'playlist-read-public'],
  });

  // Load playlist data when access token is available
  useEffect(() => {
    if (!accessToken || !SPOTIFY_CLIENT_ID) return;

    const fetchPlaylist = async () => {
      try {
        const token = localStorage.getItem('spotify_access_token');
        if (!token) return;

        const response = await fetch(`https://api.spotify.com/v1/playlists/6Gy5nsKnrYir1tOx9pBuxW`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPlaylist(data);
        }
      } catch (err) {
        console.error('Error fetching playlist:', err);
      }
    };

    fetchPlaylist();
  }, [accessToken]);

  // Update Spotify volume when slider changes
  useEffect(() => {
    if (isReady) {
      setSpotifyVolume(volume[0] / 100);
    }
  }, [volume, isReady, setSpotifyVolume]);

  // Handle play/pause toggle
  const handlePlayPause = () => {
    if (!playerState) {
      play(PLAYLIST_URI);
      toast({
        title: "Starting playback",
        description: "Playing the Beloveful Visions playlist",
      });
      return;
    }

    if (playerState.is_paused) {
      resume();
    } else {
      pause();
    }
  };

  // Handle track selection
  const playTrack = (trackUri: string) => {
    play(trackUri);
    toast({
      title: "Now playing",
      description: "Started playing selected track",
    });
  };

  // Show error message if no client ID
  if (!SPOTIFY_CLIENT_ID) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Music className="w-5 h-5" />
            Spotify Integration Setup
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertDescription>
              To enable Spotify playback, you need to:
              <ol className="list-decimal list-inside mt-2 space-y-1">
                <li>Create a Spotify App at <a href="https://developer.spotify.com/dashboard" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">developer.spotify.com/dashboard</a></li>
                <li>Add <code>{REDIRECT_URI}</code> to your app's redirect URIs</li>
                <li>Set <code>VITE_SPOTIFY_CLIENT_ID</code> in your environment variables</li>
              </ol>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  // Format duration from milliseconds to MM:SS
  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Format position from milliseconds
  const formatPosition = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full space-y-4">
      {/* Header with toggle button */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-black dark:text-white">Spotify Playlist</h2>
        <Button
          variant="outline"
          onClick={() => setShowWebPlayer(!showWebPlayer)}
          className="text-sm"
        >
          {showWebPlayer ? 'Show Embed' : 'Show Web Player'}
        </Button>
      </div>

      {/* Error display */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {showWebPlayer ? (
        /* Web SDK Player */
        <div className="space-y-4">
          {/* Login/Logout */}
          {!accessToken ? (
            <Card>
              <CardHeader>
                <CardTitle>Connect to Spotify</CardTitle>
                <CardDescription>
                  Login with your Spotify Premium account to control playback
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={login} className="flex items-center gap-2">
                  <LogIn className="w-4 h-4" />
                  Login to Spotify
                </Button>
              </CardContent>
            </Card>
          ) : (
            /* Player Controls */
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {isConnected ? 'Connected' : 'Connecting...'}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      {isReady ? 'Web Player Ready' : 'Initializing...'}
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={logout}>
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Current Track Info */}
                {playerState?.track_window.current_track && (
                  <div className="flex items-center gap-4">
                    <img
                      src={playerState.track_window.current_track.album.images[0]?.url}
                      alt="Album cover"
                      className="w-16 h-16 rounded-md object-cover"
                    />
                    <div className="min-w-0">
                      <h3 className="font-medium truncate">
                        {playerState.track_window.current_track.name}
                      </h3>
                      <p className="text-sm text-muted-foreground truncate">
                        {playerState.track_window.current_track.artists[0]?.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatPosition(playerState.position)} / {formatDuration(playerState.duration)}
                      </p>
                    </div>
                  </div>
                )}

                {/* Transport Controls */}
                <div className="flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={skipToPrevious}
                    disabled={!isReady}
                  >
                    <SkipBack className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    onClick={handlePlayPause}
                    disabled={!isReady}
                    className="w-12 h-12"
                  >
                    {playerState?.is_paused !== false ? (
                      <Play className="w-5 h-5" />
                    ) : (
                      <Pause className="w-5 h-5" />
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={skipToNext}
                    disabled={!isReady}
                  >
                    <SkipForward className="w-4 h-4" />
                  </Button>
                </div>

                {/* Volume Control */}
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-muted-foreground" />
                  <Slider
                    value={volume}
                    onValueChange={setVolume}
                    max={100}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-sm text-muted-foreground min-w-[2rem]">
                    {volume[0]}%
                  </span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Playlist Tracks */}
          {playlist && accessToken && (
            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  {playlist.images[0] && (
                    <img
                      src={playlist.images[0].url}
                      alt="Playlist cover"
                      className="w-20 h-20 rounded-md object-cover"
                    />
                  )}
                  <div>
                    <CardTitle>{playlist.name}</CardTitle>
                    <CardDescription>{playlist.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {playlist.tracks.items.map((item, index) => (
                    <div
                      key={item.track.id}
                      className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 cursor-pointer group"
                      onClick={() => playTrack(item.track.uri)}
                    >
                      <div className="w-6 text-sm text-muted-foreground text-center group-hover:hidden">
                        {index + 1}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-6 h-6 p-0 hidden group-hover:flex"
                      >
                        <Play className="w-3 h-3" />
                      </Button>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-sm truncate">
                          {item.track.name}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {item.track.artists.map(a => a.name).join(', ')}
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {formatDuration(item.track.duration_ms)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        /* Traditional Embed */
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
          <iframe 
            data-testid="embed-iframe" 
            style={{ borderRadius: '12px' }} 
            src="https://open.spotify.com/embed/playlist/6Gy5nsKnrYir1tOx9pBuxW?utm_source=generator&theme=0" 
            width="100%" 
            height="352" 
            frameBorder="0" 
            allowFullScreen 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
            title="Spotify Playlist"
          />
        </div>
      )}
    </div>
  );
}
