import { useEffect, useState, useCallback, useRef } from 'react';

export interface SpotifyPlayerState {
  is_paused: boolean;
  is_active: boolean;
  position: number;
  duration: number;
  track_window: {
    current_track: {
      id: string;
      uri: string;
      name: string;
      artists: Array<{ name: string; uri: string }>;
      album: {
        name: string;
        images: Array<{ url: string; height: number; width: number }>;
      };
    };
  };
}

export interface UseSpotifyPlayerProps {
  clientId: string;
}

export function useSpotifyPlayer({ clientId }: UseSpotifyPlayerProps) {
  const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const [deviceId, setDeviceId] = useState<string>('');
  const [playerState, setPlayerState] = useState<SpotifyPlayerState | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string>('');
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout>();

  // Login to Spotify via backend
  const login = useCallback(() => {
    window.location.href = '/api/spotify/login';
  }, []);

  // Logout
  const logout = useCallback(async () => {
    try {
      await fetch('/api/spotify/logout', { method: 'POST', credentials: 'include' });
    } catch (e) {
      console.warn('Spotify logout request failed (ignored)');
    }
    if (player) player.disconnect();
    setLoggedIn(false);
    setPlayer(null);
    setIsReady(false);
    setIsConnected(false);
    setPlayerState(null);
    setDeviceId('');
  }, [player]);

  // Helper to fetch access token from backend
  const fetchAccessToken = useCallback(async (): Promise<string | null> => {
    try {
      const res = await fetch('/api/spotify/access-token', { credentials: 'include' });
      if (!res.ok) return null;
      const data = await res.json();
      if (data?.access_token) return data.access_token as string;
      return null;
    } catch {
      return null;
    }
  }, []);

  // Initialize Spotify Web SDK after first successful token fetch
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const token = await fetchAccessToken();
      if (!token || cancelled) return;
      setLoggedIn(true);

      const script = document.createElement('script');
      script.src = 'https://sdk.scdn.co/spotify-player.js';
      script.async = true;
      document.body.appendChild(script);

      window.onSpotifyWebPlaybackSDKReady = () => {
        const spotifyPlayer = new window.Spotify.Player({
          name: 'Beloveful Visions Web Player',
          getOAuthToken: async (callback: (token: string) => void) => {
            const t = await fetchAccessToken();
            if (t) callback(t);
          },
          volume: 0.5,
        });

      spotifyPlayer.addListener('ready', ({ device_id }: { device_id: string }) => {
        console.log('Ready with Device ID', device_id);
        setDeviceId(device_id);
        setIsReady(true);
        setIsConnected(true);
        setError('');
      });

      spotifyPlayer.addListener('not_ready', ({ device_id }: { device_id: string }) => {
        console.log('Device ID has gone offline', device_id);
        setIsReady(false);
        setIsConnected(false);
      });

      spotifyPlayer.addListener('initialization_error', ({ message }: { message: string }) => {
        console.error('Failed to initialize', message);
        setError(`Initialization error: ${message}`);
      });

      spotifyPlayer.addListener('authentication_error', ({ message }: { message: string }) => {
        console.error('Failed to authenticate', message);
        setError(`Authentication error: ${message}`);
        // Clear invalid token
        localStorage.removeItem('spotify_access_token');
        setAccessToken('');
      });

      spotifyPlayer.addListener('account_error', ({ message }: { message: string }) => {
        console.error('Failed to validate Spotify account', message);
        setError(`Account error: ${message}`);
      });

      spotifyPlayer.addListener('playback_error', ({ message }: { message: string }) => {
        console.error('Failed to perform playback', message);
        setError(`Playback error: ${message}`);
      });

      spotifyPlayer.addListener('player_state_changed', (state: SpotifyPlayerState | null) => {
        if (!state) return;
        setPlayerState(state);
      });

      spotifyPlayer.connect().then((success: boolean) => {
        if (success) {
          setPlayer(spotifyPlayer);
        } else {
          setError('Failed to connect to Spotify');
        }
      });
    };

    return () => {
      const currentInterval = intervalRef.current;
      if (currentInterval) clearInterval(currentInterval);
      script.remove();
    };
  })();

  return () => { cancelled = true; };
  }, [fetchAccessToken]);

  // Player controls
  const play = useCallback(async (uri?: string) => {
    if (!player || !deviceId) return;

    const body = uri ? { uris: [uri] } : undefined;
    
    try {
      const token = await fetchAccessToken();
      if (!token) { setError('Not authenticated'); return; }
      await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.error('Error playing track:', err);
      setError('Failed to play track');
    }
  }, [player, deviceId, fetchAccessToken]);

  const pause = useCallback(async () => {
    if (!player) return;
    try {
      await player.pause();
    } catch (err) {
      console.error('Error pausing track:', err);
    }
  }, [player]);

  const resume = useCallback(async () => {
    if (!player) return;
    try {
      await player.resume();
    } catch (err) {
      console.error('Error resuming track:', err);
    }
  }, [player]);

  const skipToNext = useCallback(async () => {
    if (!player) return;
    try {
      await player.nextTrack();
    } catch (err) {
      console.error('Error skipping to next track:', err);
    }
  }, [player]);

  const skipToPrevious = useCallback(async () => {
    if (!player) return;
    try {
      await player.previousTrack();
    } catch (err) {
      console.error('Error skipping to previous track:', err);
    }
  }, [player]);

  const setVolume = useCallback(async (volume: number) => {
    if (!player) return;
    try {
      await player.setVolume(volume);
    } catch (err) {
      console.error('Error setting volume:', err);
    }
  }, [player]);

  const seek = useCallback(async (position: number) => {
    if (!player) return;
    try {
      await player.seek(position);
    } catch (err) {
      console.error('Error seeking:', err);
    }
  }, [player]);

  return {
    player,
    deviceId,
    playerState,
    isReady,
    accessToken: loggedIn,
    isConnected,
    error,
    login,
    logout,
    play,
    pause,
    resume,
    skipToNext,
    skipToPrevious,
    setVolume,
    seek,
  };
}
