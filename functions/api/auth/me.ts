// Cloudflare Workers API function to get current user info
import { verifyAuth } from '../_utils/auth';

interface Env {
  DB: D1Database;
  JWT_SECRET: string;
}

export async function onRequestGet(context: any): Promise<Response> {
  const { request, env } = context;
  
  try {
    const authResult = await verifyAuth(request, env);
    
    if (authResult.success) {
      // Return user information without sensitive data
      return new Response(JSON.stringify({
        success: true,
        user: {
          id: authResult.user.id,
          username: authResult.user.username,
          email: authResult.user.email,
          role: authResult.user.role,
          created_at: authResult.user.created_at
        }
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      return new Response(JSON.stringify({
        success: false,
        error: authResult.error
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
  } catch (error) {
    console.error('Get user info error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Internal server error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}