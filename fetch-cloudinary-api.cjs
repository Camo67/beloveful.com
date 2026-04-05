const https = require('https');
const crypto = require('crypto');
const fs = require('fs');

// Cloudinary credentials from the URL
const CLOUD_NAME = 'dvwdoezk1';
const API_KEY = '677574118368433';
const API_SECRET = 'e82ozhF6xSU28rT-PI1oa-qsLZo';

console.log('🔍 Fetching Cloudinary resources...');

// Function to make authenticated API request
function fetchCloudinaryResources() {
  return new Promise((resolve, reject) => {
    const timestamp = Math.round(Date.now() / 1000);
    
    // Create signature for authentication
    const params = `max_results=500&timestamp=${timestamp}`;
    const signature = crypto
      .createHash('sha1')
      .update(params + API_SECRET)
      .digest('hex');
    
    const postData = `${params}&api_key=${API_KEY}&signature=${signature}`;
    
    const options = {
      hostname: 'api.cloudinary.com',
      port: 443,
      path: `/v1_1/${CLOUD_NAME}/resources/image`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    };
    
    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const result = JSON.parse(data);
            resolve(result);
          } catch (e) {
            reject(new Error('Failed to parse response: ' + e.message));
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });
    
    req.on('error', (e) => {
      reject(e);
    });
    
    req.write(postData);
    req.end();
  });
}

// Country mapping
const countryMap = {
  'PAL': { region: 'Middle East', country: 'Israel | Palestine', slug: 'israel-palestine' },
  'JOR': { region: 'Middle East', country: 'Jordan', slug: 'jordan' },
  'CHI': { region: 'Asia', country: 'China', slug: 'china' },
  'JAP': { region: 'Asia', country: 'Japan', slug: 'japan' },
  'HK': { region: 'Asia', country: 'Hong Kong', slug: 'hong-kong' },
  'IND': { region: 'Asia', country: 'India', slug: 'india' },
  'MYA': { region: 'Asia', country: 'Myanmar', slug: 'myanmar' },
  'NEP': { region: 'Asia', country: 'Nepal', slug: 'nepal' },
  'THAI': { region: 'Asia', country: 'Thailand', slug: 'thailand' },
  'PHI': { region: 'Asia', country: 'Philippines', slug: 'philippines' },
  'VIET': { region: 'Asia', country: 'Vietnam', slug: 'vietnam' },
  'EGY': { region: 'Africa', country: 'Egypt', slug: 'egypt' },
  'NAM': { region: 'Africa', country: 'Namibia', slug: 'namibia' },
  'ETH': { region: 'Africa', country: 'Ethiopia', slug: 'ethiopia' },
  'ARG': { region: 'South America', country: 'Argentina', slug: 'argentina' },
  'ITA': { region: 'Europe', country: 'Italy', slug: 'italy' },
  'GRC': { region: 'Europe', country: 'Greece', slug: 'greece' },
  'GRE': { region: 'Europe', country: 'Greece', slug: 'greece' },
  'FRA': { region: 'Europe', country: 'France', slug: 'france' },
  'PORT': { region: 'Europe', country: 'Portugal', slug: 'portugal' },
  'IRL': { region: 'Europe', country: 'Ireland', slug: 'ireland' },
  'UK': { region: 'Europe', country: 'United Kingdom', slug: 'united-kingdom' },
  'ESP': { region: 'Europe', country: 'Spain', slug: 'spain' },
  'SPA': { region: 'Europe', country: 'Spain', slug: 'spain' },
};

// Main execution
async function main() {
  try {
    const cloudinaryData = await fetchCloudinaryResources();
    
    // Save raw data
    fs.writeFileSync('cloudinary-full-data.json', JSON.stringify(cloudinaryData, null, 2));
    console.log(`✅ Fetched ${cloudinaryData.resources.length} resources from Cloudinary`);
    
    // Process into albums
    const albums = {};
    let totalProcessed = 0;
    
    for (const resource of cloudinaryData.resources) {
      const filename = resource.public_id.split('/').pop();
      
      // Find country code
      let countryCode = null;
      for (const code of Object.keys(countryMap)) {
        if (filename.startsWith(code + '-') || filename.startsWith(code + '_')) {
          countryCode = code;
          break;
        }
      }
      
      if (!countryCode) continue;
      
      const countryInfo = countryMap[countryCode];
      const key = countryInfo.slug;
      
      if (!albums[key]) {
        albums[key] = {
          ...countryInfo,
          images: []
        };
      }
      
      albums[key].images.push({
        desktop: resource.secure_url,
        mobile: resource.secure_url
      });
      
      totalProcessed++;
    }
    
    // Generate TypeScript output
    let output = `// Generated from Cloudinary API (${totalProcessed} images)
import { CountryAlbum } from './data';

export const CLOUDINARY_ALBUMS: CountryAlbum[] = [
`;
    
    const sortedKeys = Object.keys(albums).sort();
    for (const key of sortedKeys) {
      const album = albums[key];
      
      output += `  {
    "region": "${album.region}",
    "country": "${album.country}",
    "slug": "${album.slug}",
    "images": [
`;
      
      for (const img of album.images) {
        output += `      {
        "desktop": "${img.desktop}",
        "mobile": "${img.mobile}"
      },
`;
      }
      
      output += `    ]
  },
`;
    }
    
    // Add Erasing Borders
    output += `  {
    "region": "Erasing Borders",
    "country": "Erasing Borders",
    "slug": "erasing-borders",
    "images": [
      {
        "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/CHI-Beloveful6.jpg",
        "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/CHI-Beloveful6.jpg"
      },
      {
        "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/Tony%20Menias%20-%20Two%20Girls%20in%20Window.jpg",
        "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/Tony%20Menias%20-%20Two%20Girls%20in%20Window.jpg"
      }
    ]
  }
];
`;
    
    fs.writeFileSync('src/lib/cloudinaryAlbums.ts', output);
    
    console.log('\n📊 Portfolio Summary:');
    let totalImages = 0;
    for (const key of sortedKeys) {
      const album = albums[key];
      totalImages += album.images.length;
      console.log(`✅ ${album.country} (${album.region}): ${album.images.length} images`);
    }
    console.log(`\n📈 Total: ${sortedKeys.length} countries, ${totalImages} working Cloudinary images`);
    console.log('📁 Updated: src/lib/cloudinaryAlbums.ts');
    console.log('\n🔄 Restart your dev server to see the working images!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    
    // Fallback: Use the existing Cloudinary URLs from your text file
    console.log('\n🔄 Falling back to existing cloudinary_urls.txt...');
    
    if (fs.existsSync('cloudinary_urls.txt')) {
      const data = fs.readFileSync('cloudinary_urls.txt', 'utf8');
      const lines = data.split('\n');
      
      const albums = {};
      let count = 0;
      
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith('https://res.cloudinary.com')) continue;
        
        const url = trimmed.split("'")[0].trim();
        if (!url.includes('/upload/') || !url.endsWith('.jpg')) continue;
        
        const filename = url.split('/').pop();
        
        let countryCode = null;
        for (const code of Object.keys(countryMap)) {
          if (filename.startsWith(code + '-') || filename.startsWith(code + '_')) {
            countryCode = code;
            break;
          }
        }
        
        if (!countryCode) continue;
        
        const countryInfo = countryMap[countryCode];
        const key = countryInfo.slug;
        
        if (!albums[key]) {
          albums[key] = {
            ...countryInfo,
            images: []
          };
        }
        
        albums[key].images.push({
          desktop: url,
          mobile: url
        });
        
        count++;
      }
      
      // Generate fallback output
      let output = `// Generated from cloudinary_urls.txt fallback (${count} images)
import { CountryAlbum } from './data';

export const CLOUDINARY_ALBUMS: CountryAlbum[] = [
`;
      
      const sortedKeys = Object.keys(albums).sort();
      for (const key of sortedKeys) {
        const album = albums[key];
        
        output += `  {
    "region": "${album.region}",
    "country": "${album.country}",
    "slug": "${album.slug}",
    "images": [
`;
        
        for (const img of album.images) {
          output += `      {
        "desktop": "${img.desktop}",
        "mobile": "${img.mobile}"
      },
`;
        }
        
        output += `    ]
  },
`;
      }
      
      output += `];
`;
      
      fs.writeFileSync('src/lib/cloudinaryAlbums.ts', output);
      
      console.log(`✅ Fallback complete: ${count} images from cloudinary_urls.txt`);
      console.log('📁 Updated: src/lib/cloudinaryAlbums.ts');
    }
  }
}

main();