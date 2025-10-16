#!/usr/bin/env node
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const REGION_FOLDER_MAP = new Map([
  ['Africa', 'Africa'],
  ['Asia', 'Asia'],
  ['Middle East', 'Middle East'],
  ['South America', 'South America'],
  ['North America', 'North America'],
  ['Oceania', 'Oceania'],
  ['Europe & Scandinavia', 'Europe'],
  ['Australia & New Zealand', 'Oceania'],
  ['Central America & Caribbean', 'North America'],
  ['Erasing Borders', 'Erasing Borders'],
]);

function parseRegionCountryFromPath(folderOrPublicId) {
  if (typeof folderOrPublicId !== 'string') return null;
  const parts = folderOrPublicId.split('/');
  const idx = parts.findIndex(p => p.toLowerCase() === 'website beloveful.com');
  if (idx === -1) return null;
  const regionFolder = parts[idx + 1];
  const countryFolder = parts[idx + 2];
  if (!regionFolder) return null;
  const region = REGION_FOLDER_MAP.get(regionFolder) || regionFolder;
  const country = countryFolder || region;
  return { region, country };
}

function extractCodePrefix(publicId) {
  const base = publicId.split('/').pop() || publicId;
  const m = base.match(/^([A-Z]{2,4})[-_]/);
  return m ? m[1] : null;
}

const KNOWN_COUNTRIES = [
  'Egypt','Ethiopia','Namibia','Morocco','South Africa',
  'Hong Kong','India','Japan','Myanmar','Nepal','Philippines','Thailand','Vietnam',
  'Israel | Palestine','Jordan','Saudi Arabia',
  'France','Italy','Greece','Spain','Portugal','UK & Ireland',
  'Chicago','New York','Mexico','Puerto Rico','Caribbean','St. Martin','Cuba','California','Texas',
  'Argentina','Brazil',
  'Australia','New Zealand'
];

function norm(s){
  return String(s).toLowerCase().replace(/[\s_\-]+/g,' ').trim();
}
const COUNTRY_SET = new Set(KNOWN_COUNTRIES.map(norm));

function hasCountryTag(resource){
  const tags = resource.tags || [];
  for (const t of tags){
    const tn = norm(t);
    if (COUNTRY_SET.has(tn)) return true;
    // also accept variations like 'israel-palestine', 'uk and ireland'
    if (tn === 'israel palestine' && COUNTRY_SET.has(norm('Israel | Palestine'))) return true;
    if (tn === 'uk & ireland' || tn === 'uk and ireland') return true;
  }
  return false;
}

function getCountryInfo(resource){
  const byFolder = parseRegionCountryFromPath(resource.folder || resource.public_id);
  if (byFolder) return byFolder;
  const code = extractCodePrefix(resource.public_id);
  // minimal prefix map for disambiguation
  const MAP = {
    EGY:['Egypt','Africa'], ETH:['Ethiopia','Africa'], NAM:['Namibia','Africa'], MOR:['Morocco','Africa'], MAR:['Morocco','Africa'], ZAF:['South Africa','Africa'], RSA:['South Africa','Africa'],
    HK:['Hong Kong','Asia'], IND:['India','Asia'], JPN:['Japan','Asia'], JAP:['Japan','Asia'], MYA:['Myanmar','Asia'], NEP:['Nepal','Asia'], NPL:['Nepal','Asia'], PHI:['Philippines','Asia'], THA:['Thailand','Asia'], THAI:['Thailand','Asia'], VIET:['Vietnam','Asia'],
    PAL:['Israel | Palestine','Middle East'], ISR:['Israel | Palestine','Middle East'], JOR:['Jordan','Middle East'], SAU:['Saudi Arabia','Middle East']
  };
  if (code && MAP[code]){
    const [country, region] = MAP[code];
    return {country, region};
  }
  if (code === 'SA'){
    const folderLc = String(resource.folder||'').toLowerCase();
    if (folderLc.includes('south africa')) return {country:'South Africa', region:'Africa'};
    if (folderLc.includes('saudi')) return {country:'Saudi Arabia', region:'Middle East'};
  }
  return null;
}

async function fetchAll(){
  const all=[]; let cursor=null; do{
    const res = await cloudinary.api.resources({type:'upload',resource_type:'image',max_results:500,next_cursor:cursor,context:true,metadata:true});
    all.push(...res.resources); cursor=res.next_cursor; await new Promise(r=>setTimeout(r,80));
  }while(cursor);
  return all;
}

(async () => {
  const resources = await fetchAll();
  const withCountryTags = resources.filter(hasCountryTag);

  // Determine unmapped
  const unmapped = [];
  for (const r of resources){
    if (!getCountryInfo(r)) unmapped.push(r);
  }
  const unmappedWithCountryTags = unmapped.filter(hasCountryTag);

  const summary = {
    total: resources.length,
    totalWithCountryTags: withCountryTags.length,
    unmappedTotal: unmapped.length,
    unmappedWithCountryTags: unmappedWithCountryTags.length,
  };

  const sample = {
    withCountryTags: withCountryTags.slice(0,20).map(r=>({public_id:r.public_id,tags:r.tags})),
    unmappedWithCountryTags: unmappedWithCountryTags.slice(0,20).map(r=>({public_id:r.public_id,tags:r.tags})),
  };

  const out = { summary, sample };
  const outPath = path.join(process.cwd(),'cloudinary_country_tags_report.json');
  fs.writeFileSync(outPath, JSON.stringify(out,null,2));
  console.log(JSON.stringify(summary));
})();
