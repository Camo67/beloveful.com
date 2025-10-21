/* Minimal Express server (CommonJS) exposing three endpoints used by the client-side `useImages` hook.
   This file is identical in behavior to server/images.js but saved as .cjs so Node will run it as
   CommonJS even when the project `package.json` has "type": "module".
*/
const express = require('express');
const path = require('path');

// Allow requiring TypeScript files in this small dev server by registering ts-node
try {
  require('ts-node').register({
    transpileOnly: true,
    compilerOptions: { module: 'commonjs' }
  });
} catch (e) {
  // ts-node may not be installed yet; the server will error later if modules can't be loaded.
  // We leave the explicit error handling to the caller.
}

// Try importing project data modules (may be TypeScript/Esm in this repo). If that fails,
// fall back to sample arrays so the dev images API can run standalone.
let data = null;
let cloud = null;
try {
  data = require(path.join(__dirname, '..', 'src', 'lib', 'data'));
  cloud = require(path.join(__dirname, '..', 'src', 'lib', 'cloudinaryAlbums'));
} catch (err) {
  console.warn('Could not load project data modules, falling back to sample image lists:', err.message);
  data = { ALBUMS: [] };
  cloud = { CLOUDINARY_ALBUMS: [] };
}

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

// Insert a Cloudinary transformation string after '/upload/' if the URL is a Cloudinary delivery URL.
function insertCloudinaryTransform(originalUrl, transform) {
  if (!originalUrl || typeof originalUrl !== 'string') return originalUrl;
  try {
    const u = new URL(originalUrl);
    if (!/res\.cloudinary\.com$/i.test(u.hostname) && !u.hostname.endsWith('.cloudinary.com')) return originalUrl;
    // If the URL already contains a transform like '/upload/f_auto' then don't double-insert.
    if (/\/upload\/[^/]+/.test(u.pathname) && /\/upload\/f_auto|q_auto|w_/.test(u.pathname)) {
      return originalUrl;
    }
    // Insert the transform after '/upload/'
    u.pathname = u.pathname.replace(/\/upload\//, `/upload/${transform}/`);
    return u.toString();
  } catch (e) {
    // fallback string replacement for non-absolute or unparsable URLs
    if (originalUrl.includes('/upload/') && !originalUrl.includes('/upload/f_auto')) {
      return originalUrl.replace('/upload/', `/upload/${transform}/`);
    }
    return originalUrl;
  }
}

const DEFAULT_CLOUDINARY_TRANSFORM = 'f_auto,q_auto,w_1200';

app.get('/api/travel-images', (req, res) => {
  try {
    // If we don't have real album data, return a small set of sample images so the client can render.
    if (!data || !(data.ALBUMS && data.ALBUMS.length)) {
      return res.json([
        'https://picsum.photos/id/1018/1200/800',
        'https://picsum.photos/id/1025/1200/800',
        'https://picsum.photos/id/1035/1200/800'
      ]);
    }
    const albums = (data.ALBUMS || []).filter(a => a.region !== 'Erasing Borders' && a.region !== 'Logo' && a.slug !== 'erasing-borders');
    const urls = albums.map(a => extractDesktop((a.images || [])[0])).filter(Boolean);
    res.json(urls.length ? urls : [
      'https://picsum.photos/id/1018/1200/800'
    ]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'failed' });
  }
});

app.get('/api/project-images', (req, res) => {
  try {
    if (!data || !(data.PROJECTS && data.PROJECTS.length)) {
      return res.json([
        'https://picsum.photos/id/1050/1200/800',
        'https://picsum.photos/id/1060/1200/800'
      ]);
    }
    const projects = (data.PROJECTS || []);
    const urls = projects.map(p => extractDesktop((p.images || [])[0])).filter(Boolean);
    res.json(urls.length ? urls : ['https://picsum.photos/id/1050/1200/800']);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'failed' });
  }
});

app.get('/api/logos', (req, res) => {
  try {
    if (!cloud || !(cloud.CLOUDINARY_ALBUMS && cloud.CLOUDINARY_ALBUMS.length)) {
      return res.json([
        'https://picsum.photos/id/237/400/400',
        'https://picsum.photos/id/1084/400/400'
      ]);
    }
    const logosAlbum = (cloud.CLOUDINARY_ALBUMS || []).find(a => a.slug === 'logos' || a.slug === 'logo');
    if (logosAlbum && logosAlbum.images && logosAlbum.images.length) {
      return res.json(logosAlbum.images.map(i => extractDesktop(i)).filter(Boolean));
    }
    const logoAlbums = (data.ALBUMS || []).filter(a => a.region === 'Logo');
    const urls = logoAlbums.flatMap(a => (a.images || []).map(i => extractDesktop(i))).filter(Boolean);
    res.json(urls.length ? urls : ['https://picsum.photos/id/237/400/400']);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'failed' });
  }
});

if (require.main === module) {
  app.listen(port, () => console.log(`Images API running on http://localhost:${port}`));
}

module.exports = app;
