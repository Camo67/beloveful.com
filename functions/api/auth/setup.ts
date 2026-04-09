import { hashPassword } from '../../../src/lib/database';

interface Env {
  DB: D1Database;
  JWT_SECRET: string;
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

async function signJWT(payload: any, secret: string): Promise<string> {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = btoa(JSON.stringify({ ...payload, exp: Date.now() + 24 * 60 * 60 * 1000 }));

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(`${header}.${body}`));
  const signatureB64 = btoa(String.fromCharCode(...new Uint8Array(signature)));

  return `${header}.${body}.${signatureB64}`;
}

async function getUserCount(db: D1Database): Promise<number> {
  const result = await db.prepare('SELECT COUNT(*) as count FROM users').first<{ count: number }>();
  return Number(result?.count ?? 0);
}

function authInitError(error: unknown): Response | null {
  const message = error instanceof Error ? error.message : String(error);

  if (message.includes('no such table: users')) {
    return jsonResponse({
      success: false,
      error: 'Authentication database is not initialized yet'
    }, 500);
  }

  return null;
}

export async function onRequestGet(context: any): Promise<Response> {
  const { env } = context;
  const db = env.DB as D1Database;

  try {
    const userCount = await getUserCount(db);

    return jsonResponse({
      success: true,
      needsSetup: userCount === 0,
    });
  } catch (error) {
    console.error('Setup status error:', error);
    return authInitError(error) ?? jsonResponse({
      success: false,
      error: 'Failed to check admin setup status'
    }, 500);
  }
}

export async function onRequestPost(context: any): Promise<Response> {
  const { request, env } = context;
  const db = env.DB as D1Database;

  try {
    const { username, email, password } = await request.json();

    if (!username || !email || !password) {
      return jsonResponse({
        success: false,
        error: 'Username, email, and password are required'
      }, 400);
    }

    if (password.length < 8) {
      return jsonResponse({
        success: false,
        error: 'Password must be at least 8 characters long'
      }, 400);
    }

    const userCount = await getUserCount(db);
    if (userCount > 0) {
      return jsonResponse({
        success: false,
        error: 'Admin user already exists'
      }, 400);
    }

    const passwordHash = await hashPassword(password);
    const insertResult = await db.prepare(
      'INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)'
    ).bind(username.trim(), email.trim().toLowerCase(), passwordHash, 'admin').run();

    if (!insertResult.success) {
      throw new Error('Failed to create admin user');
    }

    const user = await db.prepare(
      'SELECT id, username, email, role, created_at, updated_at FROM users WHERE id = ?'
    ).bind(insertResult.meta.last_row_id).first();

    if (!user) {
      throw new Error('Admin user was created but could not be loaded');
    }

    const token = await signJWT({
      userId: user.id,
      username: user.username,
      role: user.role,
    }, env.JWT_SECRET);

    return jsonResponse({
      success: true,
      token,
      user,
    }, 201);
  } catch (error) {
    console.error('Setup error:', error);
    return authInitError(error) ?? jsonResponse({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create admin user'
    }, 500);
  }
}
