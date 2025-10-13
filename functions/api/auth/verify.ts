// JWT verification for admin authentication
interface Env {
  DB: D1Database;
  JWT_SECRET: string;
}

async function verifyJWT(token: string, secret: string): Promise<any> {
  try {
    const [header, body, signature] = token.split('.');
    
    // Verify signature
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );
    
    const signatureBuffer = Uint8Array.from(atob(signature), c => c.charCodeAt(0));
    const isValid = await crypto.subtle.verify(
      'HMAC', 
      key, 
      signatureBuffer, 
      encoder.encode(`${header}.${body}`)
    );
    
    if (!isValid) {
      throw new Error('Invalid signature');
    }
    
    // Parse payload
    const payload = JSON.parse(atob(body));
    
    // Check expiration
    if (payload.exp < Date.now()) {
      throw new Error('Token expired');
    }
    
    return payload;
  } catch (error) {
    throw new Error('Invalid token');
  }
}

export async function onRequestPost(context: any): Promise<Response> {
  const { request, env } = context;
  const db = env.DB as D1Database;
  
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Authorization token required'
      }), { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const token = authHeader.substring(7);
    const payload = await verifyJWT(token, env.JWT_SECRET);
    
    // Get current user data from database
    const user = await db.prepare(
      'SELECT id, username, email, role, created_at, updated_at FROM users WHERE id = ?'
    ).bind(payload.userId).first();
    
    if (!user) {
      return new Response(JSON.stringify({
        success: false,
        error: 'User not found'
      }), { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    return new Response(JSON.stringify({
      success: true,
      user
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Token verification error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Invalid or expired token'
    }), { 
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}