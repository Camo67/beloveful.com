#!/usr/bin/env node
import { readdir, readFile, mkdtemp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, 'src');
const CONCURRENCY = parseInt(process.env.MIRROR_CONCURRENCY || '4', 10);
const WRANGLER_CONFIG = path.join(ROOT, 'workers', 'wrangler.toml');
const BUCKET = process.env.R2_BUCKET || 'beloveful';

function extractCloudinaryUrls(content) {
  const urls = new Set();
  const re = /https?:\/\/res\.cloudinary\.com\/[\w\-./%?=&]+/g;
  let m;
  while ((m = re.exec(content)) !== null) urls.add(m[0]);
  return urls;
}

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

async function gatherUrls() {
  const files = await listFiles(SRC_DIR);
  const urls = new Set();
  for (const f of files) {
    const txt = await readFile(f, 'utf8');
    for (const u of extractCloudinaryUrls(txt)) urls.add(u);
  }
  return Array.from(urls);
}

function keyFromCloudinary(src) {
  try {
    const u = new URL(src);
    const segments = u.pathname.split('/').filter(Boolean);
    // Expect: /<cloud_name>/image/upload/(transform?)/v<digits>?/<path/to/public_id>.<ext>
    const cloudName = segments[0] || 'cloudinary';
    const uploadIdx = segments.findIndex((s) => s === 'upload');
    if (uploadIdx === -1) throw new Error('no upload segment');
    let tail = segments.slice(uploadIdx + 1);
    while (tail.length && !/^v\d+$/i.test(tail[0]) && !/\./.test(tail[0])) tail.shift();
    if (tail.length && /^v\d+$/i.test(tail[0])) tail.shift();
    if (!tail.length) throw new Error('no public id tail');
    const publicPath = tail.join('/');
    if (!/\.[a-z0-9]+$/i.test(publicPath)) {
      const m = u.pathname.match(/\.(avif|webp|jpe?g|png|gif|tiff|heic)$/i);
      const ext = m ? m[0].toLowerCase() : '.jpg';
      return `images/cloudinary/${cloudName}/${publicPath}${ext}`;
    }
    return `images/cloudinary/${cloudName}/${publicPath}`;
  } catch {
    // Fallback to filename only
    const base = path.basename(src.split('?')[0]);
    return `images/cloudinary/fallback/${base}`;
  }
}

async function runWranglerPut(filePath, key) {
  return new Promise((resolve, reject) => {
    const args = ['--config', WRANGLER_CONFIG, 'r2', 'object', 'put', '--remote', `${BUCKET}/${key}`, '--file', filePath];
    const child = spawn('wrangler', args, { stdio: ['ignore', 'pipe', 'pipe'] });
    let out = '';
    let err = '';
    child.stdout.on('data', (d) => (out += d.toString()));
    child.stderr.on('data', (d) => (err += d.toString()));
    child.on('close', (code) => {
      if (code === 0) resolve(out.trim());
      else reject(new Error(err || `wrangler put failed for ${key}`));
    });
  });
}

async function mirrorAll(urls) {
  const dir = await mkdtemp(path.join(tmpdir(), 'r2-mirror-'));
  let idx = 0, ok = 0, fail = 0, inFlight = 0;

  return new Promise((resolve) => {
    const pump = async () => {
      while (inFlight < CONCURRENCY && idx < urls.length) {
        const src = urls[idx++];
        inFlight++;
        (async () => {
          const key = keyFromCloudinary(src);
          try {
            const res = await fetch(src);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const buf = Buffer.from(await res.arrayBuffer());
            const tmp = path.join(dir, Math.random().toString(36).slice(2));
            await writeFile(tmp, buf);
            await runWranglerPut(tmp, key);
            await rm(tmp, { force: true });
            ok++;
            process.stdout.write(`+ ${key} (ok: ${ok}, fail: ${fail})\n`);
          } catch (e) {
            fail++;
            process.stdout.write(`- ${src} -> ${key} FAILED: ${e.message}\n`);
          } finally {
            inFlight--;
            if (ok + fail === urls.length) {
              resolve({ ok, fail });
            } else {
              pump();
            }
          }
        })();
      }
    };
    pump();
  });
}

(async () => {
  try {
    const urls = await gatherUrls();
    if (urls.length === 0) {
      console.log('No Cloudinary URLs found in src/. Nothing to mirror.');
      process.exit(0);
    }
    console.log(`Found ${urls.length} Cloudinary URLs. Mirroring to R2 bucket "${BUCKET}"...`);
    const { ok, fail } = await mirrorAll(urls);
    console.log(`Done. OK=${ok}, FAIL=${fail}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
