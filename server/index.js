import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { jwt } from 'hono/jwt';
import { logger } from 'hono/logger';
import { authRoutes } from './routes/auth.js';
import { contentRoutes } from './routes/content.js';
import { imageRoutes } from './routes/images.js';
import { albumRoutes } from './routes/albums.js';

const app = new Hono();

// Middleware
app.use('*', logger());
app.use('*', cors({
  origin: ['http://localhost:8080', 'https://beloveful.com', 'https://www.beloveful.com'],
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

// Health check
app.get('/api/health', (c) => c.json({ status: 'ok', timestamp: new Date().toISOString() }));

// Routes
app.route('/api/auth', authRoutes);
app.route('/api/content', contentRoutes);
app.route('/api/images', imageRoutes);
app.route('/api/albums', albumRoutes);

// Protected routes middleware
app.use('/api/admin/*', async (c, next) => {
  const authHeader = c.req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  const token = authHeader.slice(7);
  try {
    const payload = await jwt.verify(token, c.env.JWT_SECRET);
    c.set('user', payload);
    await next();
  } catch (error) {
    return c.json({ error: 'Invalid token' }, 401);
  }
});

// Error handler
app.onError((err, c) => {
  console.error(err);
  return c.json({ error: 'Internal Server Error' }, 500);
});

export default app;