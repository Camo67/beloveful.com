// Cloudflare Workers API function for admin authentication
import { hashPassword } from '../../../src/lib/database';

interface Env {
  DB: D1Database;
  JWT_SECRET: string;
}

// Simple JWT implementation for Cloudflare Workers
async function signJWT(payload: any, secret: string): Promise<string> {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = btoa(JSON.stringify({ ...payload, exp: Date.now() + 24 * 60 * 60 * 1000 })); // 24 hours
  
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

export async function onRequestPost(context: any): Promise<Response> {
  const { request, env } = context;
  const db = env.DB as D1Database;
  
  try {
    const { username, password } = await request.json();
    
    if (!username || !password) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Username and password are required'
      }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Get user from database
    const user = await db.prepare(
      'SELECT * FROM users WHERE username = ? OR email = ?'
    ).bind(username, username).first();
    
    if (!user) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Invalid credentials'
      }), { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Verify password
    const hashedInput = await hashPassword(password);
    if (hashedInput !== user.password_hash) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Invalid credentials'
      }), { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Create JWT token
    const token = await signJWT({
      userId: user.id,
      username: user.username,
      role: user.role
    }, env.JWT_SECRET);
    
    // Return success with user data (exclude password)
    const { password_hash, ...userData } = user;
    
    return new Response(JSON.stringify({
      success: true,
      token,
      user: userData
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Login error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Internal server error'
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}