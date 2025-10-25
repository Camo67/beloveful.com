import { Hono } from 'hono';

type Bindings = {
  ASSETS: { fetch: typeof fetch };
};

const app = new Hono<{ Bindings: Bindings }>();

// Serve JSON files from cloudinary-assets directory
app.get('/cloudinary-assets/*', async (c) => {
  const filePath = c.req.path.replace('/api/public/assets', '');
  
  try {
    // Try to serve the file directly from the assets
    const file = await c.env.ASSETS.fetch(c.req.url, {
      method: 'GET',
    });
    
    if (file.status === 404) {
      return c.json({ error: 'File not found' }, 404);
    }
    
    return file;
  } catch (error) {
    console.error('Error serving cloudinary asset:', error);
    return c.json({ error: 'Failed to serve asset' }, 500);
  }
});

// Serve JSON files from portolio directory
app.get('/portolio/*', async (c) => {
  const filePath = c.req.path.replace('/api/public/assets', '');
  
  try {
    // Try to serve the file directly from the assets
    const file = await c.env.ASSETS.fetch(c.req.url, {
      method: 'GET',
    });
    
    if (file.status === 404) {
      return c.json({ error: 'File not found' }, 404);
    }
    
    return file;
  } catch (error) {
    console.error('Error serving portfolio asset:', error);
    return c.json({ error: 'Failed to serve asset' }, 500);
  }
});

// Serve the main index.json file from cloudinary-assets
app.get('/cloudinary-assets.json', async (c) => {
  try {
    const file = await c.env.ASSETS.fetch(new Request(new URL('/src/lib/cloudinary-assets/index.json', c.req.url).toString()));
    
    if (file.status === 404) {
      return c.json({ error: 'File not found' }, 404);
    }
    
    return file;
  } catch (error) {
    console.error('Error serving cloudinary index:', error);
    return c.json({ error: 'Failed to serve index' }, 500);
  }
});

export default app;