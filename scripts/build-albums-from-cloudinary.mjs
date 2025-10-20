import fs from 'node:fs';
import path from 'node:path';
import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config';

// Build src/lib/cloudinaryAlbums.ts by cross-referencing local files with Cloudinary
const LOCAL_ROOT = path.resolve('public/Website beloveful.com');
const OUT_FILE = path.resolve('src/lib/cloudinaryAlbums.ts');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const IGNORE_TOP = new Set(['Homepage','Logo','Clients & Partners','clients','Workshop Photos','Open Edition size 5x7']);
const IMG_EXTS = new Set(['.jpg','.jpeg','.png','.webp','.gif','.avif']);

function listLocal(){
  const files = [];
  const stack = [LOCAL_ROOT];
  while (stack.length){
    const dir = stack.pop();
    for (const e of fs.readdirSync(dir,{withFileTypes:true})){
      const p = path.join(dir,e.name);
      if (e.isDirectory()){
        if (dir === LOCAL_ROOT && IGNORE_TOP.has(e.name)) continue;
        stack.push(p);
      } else if (e.isFile()){
        if (IMG_EXTS.has(path.extname(e.name).toLowerCase())) files.push(p);
      }
    }
  }
  return files;
}

function norm(s){return decodeURIComponent(path.basename(s).toLowerCase());}
function regionCountry(p){
  const parts = p.split(path.sep);
  const i = parts.lastIndexOf('Website beloveful.com');
  return { region: parts[i+1] || 'Misc', country: parts[i+2] || (parts[i+1] === 'Erasing Borders' ? 'Erasing Borders' : 'Misc') };
}

async function fetchCloud(){
  const all=[]; let next;
  // Try Cloudinary Search API to match any path containing "Website beloveful.com"
  do{
    const res = await cloudinary.search
      .expression('resource_type:image AND public_id:*Website beloveful.com/*')
      .max_results(500)
      .next_cursor(next)
      .execute();
    all.push(...(res.resources||[]));
    next = res.next_cursor;
  }while(next);

  // Fallback: classic list with possible full local-path prefix
  if (all.length === 0) {
    const prefixes = [
      'Website beloveful.com/',
      'home/camo/new/beloveful.com/public/Website beloveful.com/'
    ];
    for (const prefix of prefixes) {
      let cur; let next2;
      do{
        cur = await cloudinary.api.resources({type:'upload',resource_type:'image',prefix,max_results:500,next_cursor:next2});
        all.push(...(cur.resources||[]));
        next2 = cur.next_cursor;
      }while(next2);
      if (all.length) break;
    }
  }
  return all;
}

function slugify(s){return s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');}

(async ()=>{
  if (!process.env.CLOUDINARY_CLOUD_NAME){
    console.error('Missing Cloudinary env vars'); process.exit(1);
  }
  const locals = listLocal();
  const localIndex = new Map();
  for(const f of locals){ localIndex.set(norm(f), { ...regionCountry(f) }); }
  const cloud = await fetchCloud();
  const byKey = new Map();
  for(const r of cloud){
    const keyName = norm(r.secure_url || r.url || r.public_id);
    const meta = localIndex.get(keyName);
    if(!meta) continue;
    const key = `${meta.region}::${meta.country}`;
    if(!byKey.has(key)) byKey.set(key,{ region:meta.region, country:meta.country, slug: slugify(meta.country === 'Erasing Borders' ? 'erasing-borders' : meta.country), images: []});
    byKey.get(key).images.push({ desktop: r.secure_url || r.url, mobile: r.secure_url || r.url });
  }
  const albums = Array.from(byKey.values()).sort((a,b)=>a.country.localeCompare(b.country));
  const output = `// Generated ${new Date().toISOString()}\nimport { CountryAlbum } from './data';\n\nexport const CLOUDINARY_ALBUMS: CountryAlbum[] = ${JSON.stringify(albums,null,2)};\n`;
  fs.mkdirSync(path.dirname(OUT_FILE),{recursive:true});
  fs.writeFileSync(OUT_FILE, output);
  console.log(`Wrote ${albums.length} albums with ${albums.reduce((s,a)=>s+a.images.length,0)} images to ${OUT_FILE}`);
})();
