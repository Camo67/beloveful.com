/* Minimal Express server exposing three endpoints used by the client-side `useImages` hook.
   This file is optional — you can run it with `node server/images.js` in dev, or
   integrate it into your existing dev server (e.g., Vite proxy) if needed.
*/
const express = require('express');
const path = require('path');

// Import compiled data sources
const data = require(path.join(__dirname, '..', 'src', 'lib', 'data'));
const cloud = require(path.join(__dirname, '..', 'src', 'lib', 'cloudinaryAlbums'));

const app = express();
const port = process.env.PORT || 4001;

// Helper to safely get desktop URLs from album images
function extractDesktop(img) {
  if (!img) return null;
  if (typeof img === 'string') return img;
  if (img.desktop) return img.desktop;
  if (img.mobile) return img.mobile;
  return null;
}

app.get('/api/travel-images', (req, res) => {
  try {
    const albums = (data.ALBUMS || []).filter(a => a.region !== 'Erasing Borders' && a.region !== 'Logo' && a.slug !== 'erasing-borders');
    const urls = albums.map(a => extractDesktop((a.images || [])[0])).filter(Boolean);
    res.json(urls);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'failed' });
  }
});

app.get('/api/project-images', (req, res) => {
  try {
    const projects = (data.PROJECTS || []);
    const urls = projects.map(p => extractDesktop((p.images || [])[0])).filter(Boolean);
    res.json(urls);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'failed' });
  }
});

app.get('/api/logos', (req, res) => {
  try {
    const logosAlbum = (cloud.CLOUDINARY_ALBUMS || []).find(a => a.slug === 'logos' || a.slug === 'logo');
    if (logosAlbum && logosAlbum.images && logosAlbum.images.length) {
      return res.json(logosAlbum.images.map(i => extractDesktop(i)).filter(Boolean));
    }
    const logoAlbums = (data.ALBUMS || []).filter(a => a.region === 'Logo');
    const urls = logoAlbums.flatMap(a => (a.images || []).map(i => extractDesktop(i))).filter(Boolean);
    res.json(urls);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'failed' });
  }
});

if (require.main === module) {
  app.listen(port, () => console.log(`Images API running on http://localhost:${port}`));
}

module.exports = app;
