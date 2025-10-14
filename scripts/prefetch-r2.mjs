#!/usr/bin/env node
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, 'src');
const BASE = process.env.CDN_BASE || process.env.VITE_ASSET_BASE_URL || 'http://localhost:8787';
const CONCURRENCY = parseInt(process.env.PREFETCH_CONCURRENCY || '6', 10);

async function listFiles(dir) {
  const out = [];
  async function walk(d) {
    const entries = await readdir(d, { withFileTypes: true });
    for (const e of entries) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) await walk(p);
      else if (/\.(ts|tsx)$/i.test(e.name)) out.push(p);
    }
  }
  await walk(dir);
  return out;
}

function extractCloudinaryUrls(content) {
  const urls = new Set();
  const re = /https?:\/\/res\.cloudinary\.com\/[\w\-./%?=&]+/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    urls.add(m[0]);
  }
  return urls;
}

async function gatherUrls() {
  const files = await listFiles(SRC_DIR);
  const all = new Set();
  for (const f of files) {
    const txt = await readFile(f, 'utf8');
    for (const u of extractCloudinaryUrls(txt)) all.add(u);
  }
  return Array.from(all);
}

async function prefetch(urls) {
  console.log(`Prefetching ${urls.length} images via ${BASE} ...`);
  let inFlight = 0;
  let idx = 0;
  let ok = 0, fail = 0;

  return new Promise((resolve) => {
    const pump = () => {
      while (inFlight < CONCURRENCY && idx < urls.length) {
        const u = urls[idx++];
        inFlight++;
        const target = `${BASE}/images?src=${encodeURIComponent(u)}`;
        fetch(target)
          .then(async (res) => {
            if (res.ok) ok++; else fail++;
          })
          .catch(() => { fail++; })
          .finally(() => {
            inFlight--;
            if (ok + fail === urls.length) {
              console.log(`Done. OK: ${ok}, Failed: ${fail}`);
              resolve();
            } else {
              pump();
            }
          });
      }
    };
    pump();
  });
}

(async () => {
  try {
    const urls = await gatherUrls();
    if (urls.length === 0) {
      console.log('No Cloudinary URLs found in src/.');
      process.exit(0);
    }
    await prefetch(urls);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
