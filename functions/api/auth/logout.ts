// Cloudflare Workers API function for admin logout
import { verifyAuth } from '../_utils/auth';

interface Env {
  DB: D1Database;
  JWT_SECRET: string;
}

export async function onRequestPost(context: any): Promise<Response> {
  const { request, env } = context;
  
  try {
    // Verify the user is authenticated before logging out
    const authResult = await verifyAuth(request, env);
    
    if (!authResult.success) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Not authenticated'
      }), { 
        status: 401,
        headers: { 
          'Content-Type': 'application/json'
        }
      });
    }

    // For JWT-based auth, we can't directly invalidate the token server-side
    // In a production environment, you'd want to implement a token blacklist
    // For now, we just return success to indicate the client should clear local data
    
    return new Response(JSON.stringify({
      success: true
    }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        // Clear the auth cookie
        'Set-Cookie': 'auth_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Strict'
      }
    });
    
  } catch (error) {
    console.error('Logout error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Internal server error'
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}