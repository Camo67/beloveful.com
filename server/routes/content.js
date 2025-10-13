import { Hono } from 'hono';

const contentRoutes = new Hono();

// Get content blocks for a specific page
contentRoutes.get('/:page', async (c) => {
  try {
    const { page } = c.req.param();
    
    const stmt = c.env.DB.prepare(`
      SELECT id, block_type, title, content, image_url, settings, sort_order
      FROM content_blocks
      WHERE page = ? AND is_published = 1
      ORDER BY sort_order, id
    `);
    
    const blocks = await stmt.bind(page).all();
    
    return c.json({
      success: true,
      blocks: blocks.results.map(block => ({
        id: block.id,
        type: block.block_type,
        title: block.title,
        content: block.content,
        imageUrl: block.image_url,
        settings: block.settings ? JSON.parse(block.settings) : {},
        sortOrder: block.sort_order
      }))
    });
  } catch (error) {
    console.error('Get content blocks error:', error);
    return c.json({ error: 'Failed to fetch content blocks' }, 500);
  }
});

// Get site settings
contentRoutes.get('/site/settings', async (c) => {
  try {
    const stmt = c.env.DB.prepare('SELECT key, value FROM site_settings');
    const settings = await stmt.all();
    
    const settingsObj = {};
    settings.results.forEach(setting => {
      settingsObj[setting.key] = setting.value;
    });
    
    return c.json({
      success: true,
      settings: settingsObj
    });
  } catch (error) {
    console.error('Get site settings error:', error);
    return c.json({ error: 'Failed to fetch site settings' }, 500);
  }
});

// Admin: Create content block
contentRoutes.post('/admin/blocks', async (c) => {
  try {
    const { 
      page, 
      block_type, 
      title, 
      content, 
      image_url, 
      settings, 
      sort_order 
    } = await c.req.json();
    
    if (!page || !block_type) {
      return c.json({ error: 'Page and block type are required' }, 400);
    }

    const stmt = c.env.DB.prepare(`
      INSERT INTO content_blocks (page, block_type, title, content, image_url, settings, sort_order)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    
    const result = await stmt.bind(
      page,
      block_type,
      title || null,
      content || null,
      image_url || null,
      settings ? JSON.stringify(settings) : null,
      sort_order || 0
    ).run();

    if (!result.success) {
      throw new Error('Failed to create content block');
    }

    return c.json({
      success: true,
      block_id: result.meta.last_row_id,
      message: 'Content block created successfully'
    });
  } catch (error) {
    console.error('Create content block error:', error);
    return c.json({ error: 'Failed to create content block' }, 500);
  }
});

// Admin: Update content block
contentRoutes.put('/admin/blocks/:id', async (c) => {
  try {
    const { id } = c.req.param();
    const { 
      page, 
      block_type, 
      title, 
      content, 
      image_url, 
      settings, 
      sort_order, 
      is_published 
    } = await c.req.json();

    const stmt = c.env.DB.prepare(`
      UPDATE content_blocks 
      SET page = ?, block_type = ?, title = ?, content = ?, 
          image_url = ?, settings = ?, sort_order = ?, 
          is_published = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    
    const result = await stmt.bind(
      page,
      block_type,
      title,
      content,
      image_url,
      settings ? JSON.stringify(settings) : null,
      sort_order,
      is_published,
      id
    ).run();

    if (!result.success) {
      throw new Error('Failed to update content block');
    }

    return c.json({
      success: true,
      message: 'Content block updated successfully'
    });
  } catch (error) {
    console.error('Update content block error:', error);
    return c.json({ error: 'Failed to update content block' }, 500);
  }
});

// Admin: Delete content block
contentRoutes.delete('/admin/blocks/:id', async (c) => {
  try {
    const { id } = c.req.param();

    const stmt = c.env.DB.prepare('DELETE FROM content_blocks WHERE id = ?');
    const result = await stmt.bind(id).run();

    if (!result.success) {
      throw new Error('Failed to delete content block');
    }

    return c.json({
      success: true,
      message: 'Content block deleted successfully'
    });
  } catch (error) {
    console.error('Delete content block error:', error);
    return c.json({ error: 'Failed to delete content block' }, 500);
  }
});

// Admin: Get all content blocks for a page (including unpublished)
contentRoutes.get('/admin/:page/blocks', async (c) => {
  try {
    const { page } = c.req.param();
    
    const stmt = c.env.DB.prepare(`
      SELECT id, block_type, title, content, image_url, settings, 
             sort_order, is_published, created_at, updated_at
      FROM content_blocks
      WHERE page = ?
      ORDER BY sort_order, id
    `);
    
    const blocks = await stmt.bind(page).all();
    
    return c.json({
      success: true,
      blocks: blocks.results.map(block => ({
        id: block.id,
        type: block.block_type,
        title: block.title,
        content: block.content,
        imageUrl: block.image_url,
        settings: block.settings ? JSON.parse(block.settings) : {},
        sortOrder: block.sort_order,
        isPublished: block.is_published,
        createdAt: block.created_at,
        updatedAt: block.updated_at
      }))
    });
  } catch (error) {
    console.error('Get admin content blocks error:', error);
    return c.json({ error: 'Failed to fetch content blocks' }, 500);
  }
});

// Admin: Reorder content blocks
contentRoutes.put('/admin/:page/blocks/reorder', async (c) => {
  try {
    const { page } = c.req.param();
    const { blocks } = await c.req.json();
    
    if (!Array.isArray(blocks)) {
      return c.json({ error: 'Blocks must be an array' }, 400);
    }

    // Update sort order for each block
    const stmt = c.env.DB.prepare('UPDATE content_blocks SET sort_order = ? WHERE id = ? AND page = ?');
    
    for (let i = 0; i < blocks.length; i++) {
      await stmt.bind(i, blocks[i].id, page).run();
    }

    return c.json({
      success: true,
      message: 'Content blocks reordered successfully'
    });
  } catch (error) {
    console.error('Reorder content blocks error:', error);
    return c.json({ error: 'Failed to reorder content blocks' }, 500);
  }
});

// Admin: Update site settings
contentRoutes.put('/admin/site/settings', async (c) => {
  try {
    const settings = await c.req.json();
    
    for (const [key, value] of Object.entries(settings)) {
      const stmt = c.env.DB.prepare(`
        INSERT INTO site_settings (key, value, updated_at)
        VALUES (?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(key) DO UPDATE SET
        value = excluded.value,
        updated_at = CURRENT_TIMESTAMP
      `);
      
      await stmt.bind(key, value).run();
    }

    return c.json({
      success: true,
      message: 'Site settings updated successfully'
    });
  } catch (error) {
    console.error('Update site settings error:', error);
    return c.json({ error: 'Failed to update site settings' }, 500);
  }
});

// Admin: Get all pages with their content blocks
contentRoutes.get('/admin/pages', async (c) => {
  try {
    const stmt = c.env.DB.prepare(`
      SELECT DISTINCT page FROM content_blocks ORDER BY page
    `);
    
    const pages = await stmt.all();
    const result = {};
    
    for (const pageRow of pages.results) {
      const blockStmt = c.env.DB.prepare(`
        SELECT id, block_type, title, content, image_url, settings, 
               sort_order, is_published, created_at, updated_at
        FROM content_blocks
        WHERE page = ?
        ORDER BY sort_order, id
      `);
      
      const blocks = await blockStmt.bind(pageRow.page).all();
      result[pageRow.page] = blocks.results.map(block => ({
        id: block.id,
        type: block.block_type,
        title: block.title,
        content: block.content,
        imageUrl: block.image_url,
        settings: block.settings ? JSON.parse(block.settings) : {},
        sortOrder: block.sort_order,
        isPublished: block.is_published,
        createdAt: block.created_at,
        updatedAt: block.updated_at
      }));
    }
    
    return c.json({
      success: true,
      pages: result
    });
  } catch (error) {
    console.error('Get admin pages error:', error);
    return c.json({ error: 'Failed to fetch pages' }, 500);
  }
});

// Admin: Get available block types
contentRoutes.get('/admin/block-types', async (c) => {
  try {
    const blockTypes = [
      {
        type: 'hero',
        label: 'Hero Section',
        description: 'Large banner section with background image and text overlay',
        fields: ['title', 'content', 'image_url', 'settings']
      },
      {
        type: 'text',
        label: 'Text Block',
        description: 'Rich text content block',
        fields: ['title', 'content']
      },
      {
        type: 'image',
        label: 'Image Block',
        description: 'Single image with optional caption',
        fields: ['title', 'content', 'image_url']
      },
      {
        type: 'gallery',
        label: 'Image Gallery',
        description: 'Collection of images in a grid layout',
        fields: ['title', 'settings']
      },
      {
        type: 'contact_form',
        label: 'Contact Form',
        description: 'Contact form with customizable fields',
        fields: ['title', 'settings']
      },
      {
        type: 'testimonial',
        label: 'Testimonial',
        description: 'Customer testimonial or quote',
        fields: ['title', 'content', 'settings']
      },
      {
        type: 'call_to_action',
        label: 'Call to Action',
        description: 'Button or link to encourage user action',
        fields: ['title', 'content', 'settings']
      },
      {
        type: 'video',
        label: 'Video Block',
        description: 'Embedded video content',
        fields: ['title', 'content', 'settings']
      }
    ];
    
    return c.json({
      success: true,
      blockTypes
    });
  } catch (error) {
    console.error('Get block types error:', error);
    return c.json({ error: 'Failed to fetch block types' }, 500);
  }
});

export { contentRoutes };