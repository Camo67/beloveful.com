/**
 * Migration script to import existing static data into the database
 * Run this after setting up the database schema to populate initial data
 */

import { ALBUMS, HOME_SLIDESHOW } from '../src/lib/data.js';

const REGION_MAPPING = {
  'Africa': 1,
  'Asia': 2,
  'Middle East': 3,
  'South America': 4,
  'North America': 5,
  'Europe': 6,
  'Oceania': 7,
  'Erasing Borders': 8
};

export default {
  async fetch(request, env) {
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    const url = new URL(request.url);
    if (url.pathname !== '/migrate') {
      return new Response('Not found', { status: 404 });
    }

    try {
      console.log('Starting data migration...');

      // Check if data already exists
      const existingAlbums = await env.DB.prepare('SELECT COUNT(*) as count FROM albums').first();
      if (existingAlbums.count > 0) {
        return new Response(JSON.stringify({
          success: false,
          message: 'Database already contains album data. Skipping migration.'
        }), {
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Migrate albums
      let albumCount = 0;
      let imageCount = 0;

      for (const album of ALBUMS) {
        const regionId = REGION_MAPPING[album.region];
        if (!regionId) {
          console.warn(`Unknown region: ${album.region}`);
          continue;
        }

        // Create album
        const albumResult = await env.DB.prepare(`
          INSERT INTO albums (region_id, country, slug, sort_order, is_published)
          VALUES (?, ?, ?, ?, 1)
        `).bind(regionId, album.country, album.slug, albumCount).run();

        if (!albumResult.success) {
          console.error(`Failed to create album: ${album.country}`);
          continue;
        }

        const albumId = albumResult.meta.last_row_id;
        albumCount++;

        // Add images for this album
        for (let i = 0; i < album.images.length; i++) {
          const image = album.images[i];
          const imageResult = await env.DB.prepare(`
            INSERT INTO images (album_id, desktop_url, mobile_url, sort_order, is_published)
            VALUES (?, ?, ?, ?, 1)
          `).bind(albumId, image.desktop, image.mobile, i).run();

          if (imageResult.success) {
            imageCount++;
          }
        }
      }

      // Migrate slideshow images
      let slideshowCount = 0;
      for (let i = 0; i < HOME_SLIDESHOW.length; i++) {
        const slide = HOME_SLIDESHOW[i];
        const result = await env.DB.prepare(`
          INSERT INTO slideshow_images (desktop_url, mobile_url, sort_order, is_published)
          VALUES (?, ?, ?, 1)
        `).bind(slide.desktop, slide.mobile, i).run();

        if (result.success) {
          slideshowCount++;
        }
      }

      console.log(`Migration completed: ${albumCount} albums, ${imageCount} images, ${slideshowCount} slideshow images`);

      return new Response(JSON.stringify({
        success: true,
        message: 'Data migration completed successfully',
        stats: {
          albums: albumCount,
          images: imageCount,
          slideshowImages: slideshowCount
        }
      }), {
        headers: { 'Content-Type': 'application/json' }
      });

    } catch (error) {
      console.error('Migration failed:', error);
      return new Response(JSON.stringify({
        success: false,
        message: 'Migration failed',
        error: error.message
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
};