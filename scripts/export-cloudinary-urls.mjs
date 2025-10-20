import { v2 as cloudinary } from 'cloudinary';
import fs from 'node:fs';
import path from 'node:path';
import 'dotenv/config';

// Exports a flat list of secure Cloudinary image URLs found under
// the 'Website beloveful.com/' folder prefix to src/lib/cloudinary_urls.txt

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

async function fetchAllUrls(prefix = 'Website beloveful.com/') {
  const urls = [];
  let next_cursor;
  do {
    const res = await cloudinary.api.resources({
      type: 'upload',
      resource_type: 'image',
      prefix,
      max_results: 500,
      next_cursor,
    });
    urls.push(...(res.resources || []).map((r) => r.secure_url || r.url).filter(Boolean));
    next_cursor = res.next_cursor;
  } while (next_cursor);
  return urls;
}

async function main() {
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.error('Missing Cloudinary credentials. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET');
    process.exit(1);
  }

  const urls = await fetchAllUrls();
  const outPath = path.resolve('src/lib/cloudinary_urls.txt');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, urls.join('\n') + '\n');
  console.log(`Wrote ${urls.length} URLs to ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
