import { Hono } from 'hono';

const contentRoutes = new Hono();

// Get content by slug
contentRoutes.get('/:slug', async (c) => {
  try {
    const { slug } = c.req.param();
    
    const stmt = c.env.DB.prepare(`
      SELECT id, title, content, slug, created_at, updated_at
      FROM content
      WHERE slug = ? AND is_published = 1
    `);
    
    const content = await stmt.bind(slug).first();
    
    if (!content) {
      return c.json({ error: 'Content not found' }, 404);
    }
    
    return c.json({
      success: true,
      content: {
        id: content.id,
        title: content.title,
        content: content.content,
        slug: content.slug,
        createdAt: content.created_at,
        updatedAt: content.updated_at
      }
    });
  } catch (error) {
    console.error('Get content error:', error);
    return c.json({ error: 'Failed to fetch content' }, 500);
  }
});

// Get all published content
contentRoutes.get('/', async (c) => {
  try {
    const stmt = c.env.DB.prepare(`
      SELECT id, title, content, slug, created_at, updated_at
      FROM content
      WHERE is_published = 1
      ORDER BY created_at DESC
    `);
    
    const contents = await stmt.all();
    
    return c.json({
      success: true,
      contents: contents.results.map(content => ({
        id: content.id,
        title: content.title,
        content: content.content,
        slug: content.slug,
        createdAt: content.created_at,
        updatedAt: content.updated_at
      }))
    });
  } catch (error) {
    console.error('Get contents error:', error);
    return c.json({ error: 'Failed to fetch contents' }, 500);
  }
});

// Serve JSON files from cloudinary-assets directory
contentRoutes.get('/assets/cloudinary-assets/*', async (c) => {
  const path = c.req.path.replace('/api/content/assets/cloudinary-assets/', '');
  
  try {
    // Construct the file path
    const filePath = `src/lib/cloudinary-assets/${path}`;
    
    // Attempt to fetch the file
    const url = new URL(filePath, c.req.url);
    const fileResponse = await c.env.ASSETS.fetch(url.toString());
    
    if (fileResponse.status === 404) {
      return c.json({ error: 'File not found' }, 404);
    }
    
    return fileResponse;
  } catch (error) {
    console.error('Error serving cloudinary asset:', error);
    return c.json({ error: 'Failed to serve asset' }, 500);
  }
});

// Serve JSON files from portolio directory (note the typo in directory name)
contentRoutes.get('/assets/portolio/*', async (c) => {
  const path = c.req.path.replace('/api/content/assets/portolio/', '');
  
  try {
    // Construct the file path
    const filePath = `src/lib/portolio/${path}`;
    
    // Attempt to fetch the file
    const url = new URL(filePath, c.req.url);
    const fileResponse = await c.env.ASSETS.fetch(url.toString());
    
    if (fileResponse.status === 404) {
      return c.json({ error: 'File not found' }, 404);
    }
    
    return fileResponse;
  } catch (error) {
    console.error('Error serving portfolio asset:', error);
    return c.json({ error: 'Failed to serve asset' }, 500);
  }
});

// Serve the main index.json file from cloudinary-assets
contentRoutes.get('/assets/cloudinary-assets.json', async (c) => {
  try {
    // Construct the file path
    const filePath = 'src/lib/cloudinary-assets/index.json';
    
    // Attempt to fetch the file
    const url = new URL(filePath, c.req.url);
    const fileResponse = await c.env.ASSETS.fetch(url.toString());
    
    if (fileResponse.status === 404) {
      return c.json({ error: 'File not found' }, 404);
    }
    
    return fileResponse;
  } catch (error) {
    console.error('Error serving cloudinary index:', error);
    return c.json({ error: 'Failed to serve index' }, 500);
  }
});

export { contentRoutes };