// API endpoint to change admin password
import { verifyAuth } from '../_utils/auth';
import { hashPassword } from '../../../src/lib/database';

interface Env {
  DB: D1Database;
  JWT_SECRET: string;
}

export async function onRequestPost(context: any): Promise<Response> {
  const { request, env } = context;
  const db = env.DB as D1Database;
  
  try {
    // Verify admin authentication
    const authResult = await verifyAuth(request, env);
    if (!authResult.success) {
      return new Response(JSON.stringify(authResult), { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const { currentPassword, newPassword } = await request.json();
    
    if (!currentPassword || !newPassword) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Current password and new password are required'
      }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    if (newPassword.length < 8) {
      return new Response(JSON.stringify({
        success: false,
        error: 'New password must be at least 8 characters long'
      }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Get current user with password hash
    const user = await db.prepare(
      'SELECT * FROM users WHERE id = ?'
    ).bind(authResult.user.id).first();
    
    if (!user) {
      return new Response(JSON.stringify({
        success: false,
        error: 'User not found'
      }), { 
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Verify current password
    const currentPasswordHash = await hashPassword(currentPassword);
    if (currentPasswordHash !== user.password_hash) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Current password is incorrect'
      }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Hash new password and update
    const newPasswordHash = await hashPassword(newPassword);
    const result = await db.prepare(
      'UPDATE users SET password_hash = ? WHERE id = ?'
    ).bind(newPasswordHash, authResult.user.id).run();
    
    if (!result.success) {
      throw new Error('Failed to update password');
    }
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Password changed successfully'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Change password error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message || 'Failed to change password'
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}