import { Hono } from 'hono';

const imageRoutes = new Hono();

// Get slideshow images
imageRoutes.get('/slideshow', async (c) => {
  try {
    const stmt = c.env.DB.prepare(`
      SELECT id, desktop_url, mobile_url, title, description, alt_text, sort_order
      FROM slideshow_images
      WHERE is_published = 1
      ORDER BY sort_order, id
    `);
    
    const images = await stmt.all();
    
    return c.json({
      success: true,
      images: images.results.map(img => ({
        id: img.id,
        desktop: img.desktop_url,
        mobile: img.mobile_url,
        title: img.title,
        description: img.description,
        altText: img.alt_text
      }))
    });
  } catch (error) {
    console.error('Get slideshow images error:', error);
    return c.json({ error: 'Failed to fetch slideshow images' }, 500);
  }
});

// Get images for specific album
imageRoutes.get('/album/:albumId', async (c) => {
  try {
    const { albumId } = c.req.param();
    
    const stmt = c.env.DB.prepare(`
      SELECT id, desktop_url, mobile_url, title, description, alt_text, sort_order
      FROM images
      WHERE album_id = ? AND is_published = 1
      ORDER BY sort_order, id
    `);
    
    const images = await stmt.bind(albumId).all();
    
    return c.json({
      success: true,
      images: images.results.map(img => ({
        id: img.id,
        desktop: img.desktop_url,
        mobile: img.mobile_url,
        title: img.title,
        description: img.description,
        altText: img.alt_text
      }))
    });
  } catch (error) {
    console.error('Get album images error:', error);
    return c.json({ error: 'Failed to fetch album images' }, 500);
  }
});

// Admin: Upload image to Cloudinary (this would be handled by frontend directly to Cloudinary)
// This endpoint is for storing the metadata after successful upload
imageRoutes.post('/admin/add-to-album', async (c) => {
  try {
    const { 
      album_id, 
      desktop_url, 
      mobile_url, 
      title, 
      description, 
      alt_text, 
      sort_order,
      metadata 
    } = await c.req.json();
    
    if (!album_id || !desktop_url || !mobile_url) {
      return c.json({ error: 'Album ID, desktop URL, and mobile URL are required' }, 400);
    }

    const stmt = c.env.DB.prepare(`
      INSERT INTO images (album_id, desktop_url, mobile_url, title, description, alt_text, sort_order, metadata)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const result = await stmt.bind(
      album_id,
      desktop_url,
      mobile_url,
      title || null,
      description || null,
      alt_text || null,
      sort_order || 0,
      metadata ? JSON.stringify(metadata) : null
    ).run();

    if (!result.success) {
      throw new Error('Failed to add image to album');
    }

    return c.json({
      success: true,
      image_id: result.meta.last_row_id,
      message: 'Image added to album successfully'
    });
  } catch (error) {
    console.error('Add image to album error:', error);
    return c.json({ error: 'Failed to add image to album' }, 500);
  }
});

// Admin: Add image to slideshow
imageRoutes.post('/admin/add-to-slideshow', async (c) => {
  try {
    const { 
      desktop_url, 
      mobile_url, 
      title, 
      description, 
      alt_text, 
      sort_order 
    } = await c.req.json();
    
    if (!desktop_url || !mobile_url) {
      return c.json({ error: 'Desktop URL and mobile URL are required' }, 400);
    }

    const stmt = c.env.DB.prepare(`
      INSERT INTO slideshow_images (desktop_url, mobile_url, title, description, alt_text, sort_order)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    
    const result = await stmt.bind(
      desktop_url,
      mobile_url,
      title || null,
      description || null,
      alt_text || null,
      sort_order || 0
    ).run();

    if (!result.success) {
      throw new Error('Failed to add image to slideshow');
    }

    return c.json({
      success: true,
      image_id: result.meta.last_row_id,
      message: 'Image added to slideshow successfully'
    });
  } catch (error) {
    console.error('Add image to slideshow error:', error);
    return c.json({ error: 'Failed to add image to slideshow' }, 500);
  }
});

// Admin: Update image metadata
imageRoutes.put('/admin/image/:id', async (c) => {
  try {
    const { id } = c.req.param();
    const { title, description, alt_text, sort_order, is_published } = await c.req.json();

    const stmt = c.env.DB.prepare(`
      UPDATE images 
      SET title = ?, description = ?, alt_text = ?, sort_order = ?, 
          is_published = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    
    const result = await stmt.bind(
      title,
      description,
      alt_text,
      sort_order,
      is_published,
      id
    ).run();

    if (!result.success) {
      throw new Error('Failed to update image');
    }

    return c.json({
      success: true,
      message: 'Image updated successfully'
    });
  } catch (error) {
    console.error('Update image error:', error);
    return c.json({ error: 'Failed to update image' }, 500);
  }
});

// Admin: Update slideshow image
imageRoutes.put('/admin/slideshow/:id', async (c) => {
  try {
    const { id } = c.req.param();
    const { title, description, alt_text, sort_order, is_published } = await c.req.json();

    const stmt = c.env.DB.prepare(`
      UPDATE slideshow_images 
      SET title = ?, description = ?, alt_text = ?, sort_order = ?, 
          is_published = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    
    const result = await stmt.bind(
      title,
      description,
      alt_text,
      sort_order,
      is_published,
      id
    ).run();

    if (!result.success) {
      throw new Error('Failed to update slideshow image');
    }

    return c.json({
      success: true,
      message: 'Slideshow image updated successfully'
    });
  } catch (error) {
    console.error('Update slideshow image error:', error);
    return c.json({ error: 'Failed to update slideshow image' }, 500);
  }
});

// Admin: Delete image
imageRoutes.delete('/admin/image/:id', async (c) => {
  try {
    const { id } = c.req.param();

    const stmt = c.env.DB.prepare('DELETE FROM images WHERE id = ?');
    const result = await stmt.bind(id).run();

    if (!result.success) {
      throw new Error('Failed to delete image');
    }

    return c.json({
      success: true,
      message: 'Image deleted successfully'
    });
  } catch (error) {
    console.error('Delete image error:', error);
    return c.json({ error: 'Failed to delete image' }, 500);
  }
});

// Admin: Delete slideshow image
imageRoutes.delete('/admin/slideshow/:id', async (c) => {
  try {
    const { id } = c.req.param();

    const stmt = c.env.DB.prepare('DELETE FROM slideshow_images WHERE id = ?');
    const result = await stmt.bind(id).run();

    if (!result.success) {
      throw new Error('Failed to delete slideshow image');
    }

    return c.json({
      success: true,
      message: 'Slideshow image deleted successfully'
    });
  } catch (error) {
    console.error('Delete slideshow image error:', error);
    return c.json({ error: 'Failed to delete slideshow image' }, 500);
  }
});

// Admin: Reorder images within album
imageRoutes.put('/admin/album/:albumId/reorder', async (c) => {
  try {
    const { albumId } = c.req.param();
    const { images } = await c.req.json();
    
    if (!Array.isArray(images)) {
      return c.json({ error: 'Images must be an array' }, 400);
    }

    // Update sort order for each image
    const stmt = c.env.DB.prepare('UPDATE images SET sort_order = ? WHERE id = ? AND album_id = ?');
    
    for (let i = 0; i < images.length; i++) {
      await stmt.bind(i, images[i].id, albumId).run();
    }

    return c.json({
      success: true,
      message: 'Images reordered successfully'
    });
  } catch (error) {
    console.error('Reorder images error:', error);
    return c.json({ error: 'Failed to reorder images' }, 500);
  }
});

// Admin: Reorder slideshow images
imageRoutes.put('/admin/slideshow/reorder', async (c) => {
  try {
    const { images } = await c.req.json();
    
    if (!Array.isArray(images)) {
      return c.json({ error: 'Images must be an array' }, 400);
    }

    // Update sort order for each image
    const stmt = c.env.DB.prepare('UPDATE slideshow_images SET sort_order = ? WHERE id = ?');
    
    for (let i = 0; i < images.length; i++) {
      await stmt.bind(i, images[i].id).run();
    }

    return c.json({
      success: true,
      message: 'Slideshow images reordered successfully'
    });
  } catch (error) {
    console.error('Reorder slideshow images error:', error);
    return c.json({ error: 'Failed to reorder slideshow images' }, 500);
  }
});

// Admin: Get all images for management
imageRoutes.get('/admin/all', async (c) => {
  try {
    const stmt = c.env.DB.prepare(`
      SELECT 
        i.id,
        i.album_id,
        i.desktop_url,
        i.mobile_url,
        i.title,
        i.description,
        i.alt_text,
        i.sort_order,
        i.is_published,
        i.created_at,
        i.updated_at,
        a.country as album_country,
        r.name as album_region
      FROM images i
      JOIN albums a ON i.album_id = a.id
      JOIN regions r ON a.region_id = r.id
      ORDER BY r.sort_order, a.sort_order, i.sort_order
    `);
    
    const images = await stmt.all();

    return c.json({
      success: true,
      images: images.results
    });
  } catch (error) {
    console.error('Get admin images error:', error);
    return c.json({ error: 'Failed to fetch images' }, 500);
  }
});

// Admin: Get all slideshow images for management
imageRoutes.get('/admin/slideshow/all', async (c) => {
  try {
    const stmt = c.env.DB.prepare(`
      SELECT id, desktop_url, mobile_url, title, description, alt_text, 
             sort_order, is_published, created_at, updated_at
      FROM slideshow_images
      ORDER BY sort_order, id
    `);
    
    const images = await stmt.all();

    return c.json({
      success: true,
      images: images.results
    });
  } catch (error) {
    console.error('Get admin slideshow images error:', error);
    return c.json({ error: 'Failed to fetch slideshow images' }, 500);
  }
});

export { imageRoutes };