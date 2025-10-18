# Spotify Web SDK Setup Guide

This guide will help you set up the Spotify Web SDK integration in your Beloveful Visions photography portfolio.

## Prerequisites

- Spotify Premium account (required for Web SDK playback)
- A Spotify Developer account

## Step 1: Create a Spotify App

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account
3. Click "Create app"
4. Fill in the details:
   - **App name**: Beloveful Visions Web Player
   - **App description**: Photography portfolio with integrated music player
   - **Website**: https://beloveful.com (or your domain)
   - **Redirect URI**: `https://beloveful.com` (or `http://localhost:8080` for development)
   - **API/SDKs**: Check "Web API" and "Web Playback SDK"
5. Accept the terms and create the app

## Step 2: Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. In the Spotify Developer Dashboard, copy your Client ID
3. Add it to `.env.local`:
   ```
   VITE_SPOTIFY_CLIENT_ID=your_client_id_here
   ```

## Step 3: Configure Redirect URIs

In your Spotify app settings, add these redirect URIs:

### Production:
- `https://beloveful.com`
- `https://www.beloveful.com`

### Development:
- `http://localhost:8080`
- `http://127.0.0.1:8080`

## Step 4: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the page with the Spotify component
3. Click "Show Web Player" to switch from embed to SDK
4. Click "Login to Spotify" and authenticate
5. You should see the player interface with controls

## Features

The Spotify Web SDK integration provides:

- **Full playback control**: Play, pause, skip tracks, adjust volume
- **Track information**: Current track, artist, album artwork, progress
- **Playlist browsing**: View and select tracks from your playlists
- **Authentication**: Secure OAuth login flow
- **Error handling**: User-friendly error messages and recovery
- **Responsive design**: Works on desktop and mobile devices

## Customization

### Change the Default Playlist

Edit the `PLAYLIST_URI` constant in `SpotifyPlaylist.tsx`:
```typescript
const PLAYLIST_URI = 'spotify:playlist:YOUR_PLAYLIST_ID';
```

### Modify Scopes

Update the scopes in the `useSpotifyPlayer` hook call:
```typescript
scopes: ['streaming', 'user-read-email', 'user-read-private', 'playlist-read-public']
```

Available scopes:
- `streaming`: Control playback
- `user-read-email`: Read user email
- `user-read-private`: Read user profile
- `playlist-read-public`: Read public playlists
- `playlist-read-private`: Read private playlists
- `user-read-playback-state`: Read playback state
- `user-modify-playback-state`: Control playback

## Troubleshooting

### "Premium Required" Error
The Spotify Web SDK requires a Spotify Premium account for playback.

### Authentication Errors
- Check that your Client ID is correct
- Verify redirect URIs match exactly (including protocol)
- Ensure your Spotify app has Web Playback SDK enabled

### Playback Issues
- Only works in secure contexts (HTTPS or localhost)
- User must actively interact with the page before playback
- Check browser console for detailed error messages

### CORS Issues
If you encounter CORS errors, make sure:
- Your redirect URIs are correctly configured
- You're using the Web Playback SDK, not the regular Web API for playback control

## Security Notes

- Client ID is public and safe to include in frontend code
- Never include your Client Secret in frontend code
- The access token is stored securely in localStorage
- Tokens expire automatically and require re-authentication
- Use HTTPS in production to protect the authentication flow

## Additional Resources

- [Spotify Web Playback SDK Documentation](https://developer.spotify.com/documentation/web-playback-sdk/)
- [Spotify Web API Reference](https://developer.spotify.com/documentation/web-api/)
- [OAuth 2.0 Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization/)