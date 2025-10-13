// Shared authentication utilities for API functions

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

export async function verifyAuth(request: Request, env: any): Promise<{ success: boolean; user?: any; error?: string }> {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        success: false,
        error: 'Authorization token required'
      };
    }
    
    const token = authHeader.substring(7);
    const payload = await verifyJWT(token, env.JWT_SECRET);
    
    // Get current user data from database
    const user = await env.DB.prepare(
      'SELECT id, username, email, role, created_at, updated_at FROM users WHERE id = ?'
    ).bind(payload.userId).first();
    
    if (!user) {
      return {
        success: false,
        error: 'User not found'
      };
    }
    
    return {
      success: true,
      user
    };
    
  } catch (error) {
    return {
      success: false,
      error: 'Invalid or expired token'
    };
  }
}

export async function requireAdmin(request: Request, env: any): Promise<{ success: boolean; user?: any; error?: string }> {
  const authResult = await verifyAuth(request, env);
  
  if (!authResult.success) {
    return authResult;
  }
  
  if (authResult.user.role !== 'admin') {
    return {
      success: false,
      error: 'Admin access required'
    };
  }
  
  return authResult;
}