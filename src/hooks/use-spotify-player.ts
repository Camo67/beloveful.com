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
  redirectUri: string;
  scopes?: string[];
}

export function useSpotifyPlayer({ clientId, redirectUri, scopes = ['streaming', 'user-read-email', 'user-read-private'] }: UseSpotifyPlayerProps) {
  const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const [deviceId, setDeviceId] = useState<string>('');
  const [playerState, setPlayerState] = useState<SpotifyPlayerState | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [accessToken, setAccessToken] = useState<string>('');
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string>('');
  const intervalRef = useRef<NodeJS.Timeout>();

  // Get access token from URL hash or localStorage
  useEffect(() => {
    const getAccessToken = () => {
      const hash = window.location.hash;
      if (hash) {
        const token = new URLSearchParams(hash.substring(1)).get('access_token');
        if (token) {
          setAccessToken(token);
          localStorage.setItem('spotify_access_token', token);
          // Clear the hash from URL
          window.history.replaceState(null, '', window.location.pathname + window.location.search);
          return token;
        }
      }
      
      // Check localStorage
      const storedToken = localStorage.getItem('spotify_access_token');
      if (storedToken) {
        setAccessToken(storedToken);
        return storedToken;
      }
      
      return null;
    };

    getAccessToken();
  }, []);

  // Login to Spotify
  const login = useCallback(() => {
    const scope = scopes.join('%20');
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&show_dialog=true`;
    window.location.href = authUrl;
  }, [clientId, redirectUri, scopes]);

  // Logout
  const logout = useCallback(() => {
    if (player) {
      player.disconnect();
    }
    localStorage.removeItem('spotify_access_token');
    setAccessToken('');
    setPlayer(null);
    setIsReady(false);
    setIsConnected(false);
    setPlayerState(null);
    setDeviceId('');
  }, [player]);

  // Initialize Spotify Web SDK
  useEffect(() => {
    if (!accessToken) return;

    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const spotifyPlayer = new window.Spotify.Player({
        name: 'Beloveful Visions Web Player',
        getOAuthToken: (callback: (token: string) => void) => {
          callback(accessToken);
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
          console.log('Successfully connected to Spotify Web SDK');
          setPlayer(spotifyPlayer);
        } else {
          console.error('Failed to connect to Spotify Web SDK');
          setError('Failed to connect to Spotify');
        }
      });
    };

    return () => {
      const currentInterval = intervalRef.current;
      if (currentInterval) {
        clearInterval(currentInterval);
      }
      script.remove();
    };
  }, [accessToken]);

  // Player controls
  const play = useCallback(async (uri?: string) => {
    if (!player || !deviceId || !accessToken) return;

    const body = uri ? { uris: [uri] } : undefined;
    
    try {
      await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });
    } catch (err) {
      console.error('Error playing track:', err);
      setError('Failed to play track');
    }
  }, [player, deviceId, accessToken]);

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
    accessToken: !!accessToken,
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