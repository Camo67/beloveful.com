import { Hono } from 'hono';

const albumRoutes = new Hono();

// Get all albums with their images
albumRoutes.get('/', async (c) => {
  try {
    const stmt = c.env.DB.prepare(`
      SELECT 
        a.id,
        a.country,
        a.slug,
        a.description,
        a.cover_image_desktop,
        a.cover_image_mobile,
        a.sort_order,
        a.is_published,
        r.name as region,
        r.slug as region_slug
      FROM albums a
      JOIN regions r ON a.region_id = r.id
      WHERE a.is_published = 1
      ORDER BY r.sort_order, a.sort_order, a.country
    `);
    
    const albums = await stmt.all();
    
    // Get images for each album
    for (const album of albums.results) {
      const imageStmt = c.env.DB.prepare(`
        SELECT id, desktop_url, mobile_url, title, description, alt_text, sort_order
        FROM images
        WHERE album_id = ? AND is_published = 1
        ORDER BY sort_order, id
      `);
      
      const images = await imageStmt.bind(album.id).all();
      album.images = images.results.map(img => ({
        id: img.id,
        desktop: img.desktop_url,
        mobile: img.mobile_url,
        title: img.title,
        description: img.description,
        altText: img.alt_text
      }));
    }

    return c.json({
      success: true,
      albums: albums.results
    });
  } catch (error) {
    console.error('Get albums error:', error);
    return c.json({ error: 'Failed to fetch albums' }, 500);
  }
});

// Get single album by region and country slug
albumRoutes.get('/:region/:country', async (c) => {
  try {
    const { region, country } = c.req.param();
    
    const stmt = c.env.DB.prepare(`
      SELECT 
        a.id,
        a.country,
        a.slug,
        a.description,
        a.cover_image_desktop,
        a.cover_image_mobile,
        r.name as region,
        r.slug as region_slug
      FROM albums a
      JOIN regions r ON a.region_id = r.id
      WHERE r.slug = ? AND a.slug = ? AND a.is_published = 1
    `);
    
    const album = await stmt.bind(region, country).first();
    
    if (!album) {
      return c.json({ error: 'Album not found' }, 404);
    }

    // Get images for the album
    const imageStmt = c.env.DB.prepare(`
      SELECT id, desktop_url, mobile_url, title, description, alt_text, sort_order
      FROM images
      WHERE album_id = ? AND is_published = 1
      ORDER BY sort_order, id
    `);
    
    const images = await imageStmt.bind(album.id).all();
    album.images = images.results.map(img => ({
      id: img.id,
      desktop: img.desktop_url,
      mobile: img.mobile_url,
      title: img.title,
      description: img.description,
      altText: img.alt_text
    }));

    return c.json({
      success: true,
      album
    });
  } catch (error) {
    console.error('Get album error:', error);
    return c.json({ error: 'Failed to fetch album' }, 500);
  }
});

// Admin: Create new album
albumRoutes.post('/admin/create', async (c) => {
  try {
    const { region_id, country, slug, description, cover_image_desktop, cover_image_mobile, sort_order } = await c.req.json();
    
    if (!region_id || !country || !slug) {
      return c.json({ error: 'Region ID, country, and slug are required' }, 400);
    }

    const stmt = c.env.DB.prepare(`
      INSERT INTO albums (region_id, country, slug, description, cover_image_desktop, cover_image_mobile, sort_order)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    
    const result = await stmt.bind(
      region_id, 
      country, 
      slug, 
      description || null,
      cover_image_desktop || null,
      cover_image_mobile || null,
      sort_order || 0
    ).run();

    if (!result.success) {
      throw new Error('Failed to create album');
    }

    return c.json({
      success: true,
      album_id: result.meta.last_row_id,
      message: 'Album created successfully'
    });
  } catch (error) {
    console.error('Create album error:', error);
    return c.json({ error: 'Failed to create album' }, 500);
  }
});

// Admin: Update album
albumRoutes.put('/admin/:id', async (c) => {
  try {
    const { id } = c.req.param();
    const { region_id, country, slug, description, cover_image_desktop, cover_image_mobile, sort_order, is_published } = await c.req.json();

    const stmt = c.env.DB.prepare(`
      UPDATE albums 
      SET region_id = ?, country = ?, slug = ?, description = ?, 
          cover_image_desktop = ?, cover_image_mobile = ?, sort_order = ?, 
          is_published = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    
    const result = await stmt.bind(
      region_id, 
      country, 
      slug, 
      description,
      cover_image_desktop,
      cover_image_mobile,
      sort_order,
      is_published,
      id
    ).run();

    if (!result.success) {
      throw new Error('Failed to update album');
    }

    return c.json({
      success: true,
      message: 'Album updated successfully'
    });
  } catch (error) {
    console.error('Update album error:', error);
    return c.json({ error: 'Failed to update album' }, 500);
  }
});

// Admin: Delete album
albumRoutes.delete('/admin/:id', async (c) => {
  try {
    const { id } = c.req.param();

    // Delete album (images will be deleted due to CASCADE)
    const stmt = c.env.DB.prepare('DELETE FROM albums WHERE id = ?');
    const result = await stmt.bind(id).run();

    if (!result.success) {
      throw new Error('Failed to delete album');
    }

    return c.json({
      success: true,
      message: 'Album deleted successfully'
    });
  } catch (error) {
    console.error('Delete album error:', error);
    return c.json({ error: 'Failed to delete album' }, 500);
  }
});

// Admin: Get all albums (including unpublished)
albumRoutes.get('/admin/all', async (c) => {
  try {
    const stmt = c.env.DB.prepare(`
      SELECT 
        a.id,
        a.region_id,
        a.country,
        a.slug,
        a.description,
        a.cover_image_desktop,
        a.cover_image_mobile,
        a.sort_order,
        a.is_published,
        a.created_at,
        a.updated_at,
        r.name as region,
        r.slug as region_slug
      FROM albums a
      JOIN regions r ON a.region_id = r.id
      ORDER BY r.sort_order, a.sort_order, a.country
    `);
    
    const albums = await stmt.all();
    
    // Get image count for each album
    for (const album of albums.results) {
      const countStmt = c.env.DB.prepare('SELECT COUNT(*) as count FROM images WHERE album_id = ?');
      const count = await countStmt.bind(album.id).first();
      album.image_count = count.count;
    }

    return c.json({
      success: true,
      albums: albums.results
    });
  } catch (error) {
    console.error('Get admin albums error:', error);
    return c.json({ error: 'Failed to fetch albums' }, 500);
  }
});

// Admin: Reorder albums
albumRoutes.put('/admin/reorder', async (c) => {
  try {
    const { albums } = await c.req.json();
    
    if (!Array.isArray(albums)) {
      return c.json({ error: 'Albums must be an array' }, 400);
    }

    // Update sort order for each album
    const stmt = c.env.DB.prepare('UPDATE albums SET sort_order = ? WHERE id = ?');
    
    for (let i = 0; i < albums.length; i++) {
      await stmt.bind(i, albums[i].id).run();
    }

    return c.json({
      success: true,
      message: 'Albums reordered successfully'
    });
  } catch (error) {
    console.error('Reorder albums error:', error);
    return c.json({ error: 'Failed to reorder albums' }, 500);
  }
});

export { albumRoutes };