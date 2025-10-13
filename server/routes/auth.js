import { Hono } from 'hono';
import { sign, verify } from 'hono/jwt';
import bcrypt from 'bcryptjs';

const authRoutes = new Hono();

// Login endpoint
authRoutes.post('/login', async (c) => {
  try {
    const { username, password } = await c.req.json();
    
    if (!username || !password) {
      return c.json({ error: 'Username and password are required' }, 400);
    }

    // Query user from database
    const stmt = c.env.DB.prepare('SELECT * FROM users WHERE username = ?');
    const user = await stmt.bind(username).first();

    if (!user) {
      return c.json({ error: 'Invalid credentials' }, 401);
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return c.json({ error: 'Invalid credentials' }, 401);
    }

    // Generate JWT token
    const payload = {
      id: user.id,
      username: user.username,
      role: user.role,
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7), // 7 days
    };

    const token = await sign(payload, c.env.JWT_SECRET);

    return c.json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return c.json({ error: 'Login failed' }, 500);
  }
});

// Verify token endpoint
authRoutes.post('/verify', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'No token provided' }, 401);
    }

    const token = authHeader.slice(7);
    const payload = await verify(token, c.env.JWT_SECRET);

    // Get fresh user data
    const stmt = c.env.DB.prepare('SELECT id, username, email, role FROM users WHERE id = ?');
    const user = await stmt.bind(payload.id).first();

    if (!user) {
      return c.json({ error: 'User not found' }, 401);
    }

    return c.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error('Token verification error:', error);
    return c.json({ error: 'Invalid token' }, 401);
  }
});

// Create initial admin user (only if no users exist)
authRoutes.post('/setup', async (c) => {
  try {
    const { username, email, password } = await c.req.json();
    
    if (!username || !email || !password) {
      return c.json({ error: 'Username, email, and password are required' }, 400);
    }

    // Check if any users already exist
    const countStmt = c.env.DB.prepare('SELECT COUNT(*) as count FROM users');
    const result = await countStmt.first();
    
    if (result.count > 0) {
      return c.json({ error: 'Admin user already exists' }, 400);
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create admin user
    const insertStmt = c.env.DB.prepare(`
      INSERT INTO users (username, email, password_hash, role)
      VALUES (?, ?, ?, 'admin')
    `);
    
    const insertResult = await insertStmt.bind(username, email, passwordHash).run();

    if (!insertResult.success) {
      throw new Error('Failed to create user');
    }

    return c.json({
      success: true,
      message: 'Admin user created successfully',
      user: {
        id: insertResult.meta.last_row_id,
        username,
        email,
        role: 'admin',
      },
    });
  } catch (error) {
    console.error('Setup error:', error);
    return c.json({ error: 'Setup failed' }, 500);
  }
});

// Change password endpoint
authRoutes.post('/change-password', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const token = authHeader.slice(7);
    const payload = await verify(token, c.env.JWT_SECRET);

    const { currentPassword, newPassword } = await c.req.json();
    
    if (!currentPassword || !newPassword) {
      return c.json({ error: 'Current and new passwords are required' }, 400);
    }

    // Get current user
    const stmt = c.env.DB.prepare('SELECT password_hash FROM users WHERE id = ?');
    const user = await stmt.bind(payload.id).first();

    if (!user) {
      return c.json({ error: 'User not found' }, 401);
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, user.password_hash);
    if (!isValidPassword) {
      return c.json({ error: 'Current password is incorrect' }, 401);
    }

    // Hash new password
    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    // Update password
    const updateStmt = c.env.DB.prepare(`
      UPDATE users 
      SET password_hash = ?, updated_at = CURRENT_TIMESTAMP 
      WHERE id = ?
    `);
    
    const updateResult = await updateStmt.bind(newPasswordHash, payload.id).run();

    if (!updateResult.success) {
      throw new Error('Failed to update password');
    }

    return c.json({
      success: true,
      message: 'Password updated successfully',
    });
  } catch (error) {
    console.error('Change password error:', error);
    return c.json({ error: 'Failed to change password' }, 500);
  }
});

export { authRoutes };