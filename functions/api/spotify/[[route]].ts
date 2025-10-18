import { Hono } from 'hono';
import { cors } from 'hono/cors';

interface Env {
  SPOTIFY_CLIENT_ID: string;
  SPOTIFY_CLIENT_SECRET: string;
  SPOTIFY_REDIRECT_URI: string; // e.g. https://beloveful.com/api/spotify/callback (or http://localhost:8787/api/spotify/callback for local)
}

const SCOPES = [
  'streaming',
  'user-read-email',
  'user-read-private',
  'user-read-playback-state',
  'user-modify-playback-state',
  'playlist-read-private',
  'playlist-read-collaborative',
  'app-remote-control'
];

const COOKIE_NAME = 'spotify_refresh_token';

function isSecure(url: string) {
  try { return new URL(url).protocol === 'https:'; } catch { return false; }
}

function setRefreshCookie(refresh: string, reqUrl: string) {
  const secure = isSecure(reqUrl);
  const attrs = [
    `${COOKIE_NAME}=${encodeURIComponent(refresh)}`,
    'HttpOnly',
    'Path=/',
    'SameSite=Lax',
    secure ? 'Secure' : ''
  ].filter(Boolean);
  return attrs.join('; ');
}

function clearRefreshCookie(reqUrl: string) {
  const secure = isSecure(reqUrl);
  const attrs = [
    `${COOKIE_NAME}=; Max-Age=0`,
    'HttpOnly',
    'Path=/',
    'SameSite=Lax',
    secure ? 'Secure' : ''
  ].filter(Boolean);
  return attrs.join('; ');
}

const app = new Hono<{ Bindings: Env }>();

app.use('*', cors({
  origin: ['http://localhost:8080', 'http://localhost:8081', 'http://127.0.0.1:8080', 'https://beloveful.com', 'https://www.beloveful.com'],
  allowMethods: ['GET', 'POST'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Redirect user to Spotify consent screen
app.get('/login', (c) => {
  const clientId = c.env.SPOTIFY_CLIENT_ID;
  const redirectUri = c.env.SPOTIFY_REDIRECT_URI;
  const state = crypto.randomUUID();

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: SCOPES.join(' '),
    state,
    show_dialog: 'true',
  });

  const url = `https://accounts.spotify.com/authorize?${params.toString()}`;
  return c.redirect(url, 302);
});

// Spotify OAuth callback - exchange code for tokens and store refresh in cookie
app.get('/callback', async (c) => {
  const url = new URL(c.req.url);
  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');
  if (error) {
    return c.text(`Spotify auth error: ${error}`, 400);
  }
  if (!code) {
    return c.text('Missing code', 400);
  }

  const basic = btoa(`${c.env.SPOTIFY_CLIENT_ID}:${c.env.SPOTIFY_CLIENT_SECRET}`);
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: c.env.SPOTIFY_REDIRECT_URI,
  });

  const resp = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });

  if (!resp.ok) {
    const t = await resp.text();
    return c.text(`Token exchange failed: ${t}`, 500);
  }
  const json: any = await resp.json();
  const refresh = json.refresh_token as string | undefined;

  const headers = new Headers({ 'Content-Type': 'text/html' });
  if (refresh) {
    headers.append('Set-Cookie', setRefreshCookie(refresh, c.req.url));
  }

  // Redirect back to app root
  headers.append('Location', '/');
  return new Response('<html><body>Auth complete. You can close this window.</body></html>', { status: 302, headers });
});

// Provide a short-lived access token using the stored refresh token cookie
app.get('/access-token', async (c) => {
  const cookie = c.req.header('Cookie') || '';
  const match = cookie.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  const refresh = match ? decodeURIComponent(match[1]) : '';
  if (!refresh) {
    return c.json({ error: 'Not authenticated' }, 401);
  }

  const basic = btoa(`${c.env.SPOTIFY_CLIENT_ID}:${c.env.SPOTIFY_CLIENT_SECRET}`);
  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refresh,
  });

  const resp = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });

  if (!resp.ok) {
    const t = await resp.text();
    // Clear invalid cookie
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Set-Cookie', clearRefreshCookie(c.req.url));
    return new Response(JSON.stringify({ error: 'Token refresh failed', details: t }), { status: 401, headers });
  }

  const json: any = await resp.json();
  const result = {
    access_token: json.access_token,
    token_type: json.token_type,
    expires_in: json.expires_in,
    scope: json.scope,
  };

  // Spotify may rotate refresh_token
  if (json.refresh_token) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Set-Cookie', setRefreshCookie(json.refresh_token, c.req.url));
    return new Response(JSON.stringify(result), { status: 200, headers });
  }

  return c.json(result, 200);
});

// Logout - clear refresh cookie
app.post('/logout', async (c) => {
  const headers = new Headers({ 'Content-Type': 'application/json' });
  headers.append('Set-Cookie', clearRefreshCookie(c.req.url));
  return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
});

export default app;