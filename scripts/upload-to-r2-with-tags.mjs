#!/usr/bin/env node
import { readdir, stat, readFile, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import path from 'node:path';

const ROOT = process.cwd();
const SOURCE_DIR = path.join(ROOT, 'public/Website beloveful.com');
const BUCKET = process.env.R2_BUCKET || 'beloveful';
const CONCURRENCY = parseInt(process.env.UPLOAD_CONCURRENCY || '5', 10);
const DRY_RUN = process.env.DRY_RUN === 'true';

// Parse folder structure to extract region/country metadata
function parsePathMetadata(filePath) {
  const relative = path.relative(SOURCE_DIR, filePath);
  const parts = relative.split(path.sep);
  
  const metadata = {
    path: relative,
    tags: []
  };

  // Extract region and country from path structure
  // Format: Region/Country/image.jpg or Homepage/Type/image.jpg
  if (parts.length >= 2) {
    const region = parts[0];
    metadata.tags.push(`region:${region.toLowerCase().replace(/\s+/g, '-')}`);
    
    if (parts.length >= 3) {
      const country = parts[1];
      metadata.tags.push(`country:${country.toLowerCase().replace(/\s+/g, '-')}`);
    }
    
    // Add type tag
    if (region === 'Homepage') {
      metadata.tags.push('type:homepage');
      metadata.tags.push(`layout:${parts[1].toLowerCase().replace(/\s+/g, '-')}`);
    } else if (region === 'Open Edition size 5x7') {
      metadata.tags.push('type:open-edition');
      metadata.tags.push('print-size:5x7');
    } else if (region === 'Clients & Partners' || region === 'clients') {
      metadata.tags.push('type:client-logo');
    } else {
      metadata.tags.push('type:portfolio');
    }
  }

  // Add file metadata
  const ext = path.extname(filePath).toLowerCase();
  metadata.tags.push(`format:${ext.slice(1)}`);
  
  // Add filename as tag
  const filename = path.basename(filePath, ext);
  metadata.tags.push(`filename:${filename}`);

  return metadata;
}

// Get all image files recursively
async function getAllImageFiles(dir) {
  const files = [];
  
  async function walk(currentDir) {
    try {
      const entries = await readdir(currentDir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(currentDir, entry.name);
        
        if (entry.isDirectory()) {
          await walk(fullPath);
        } else if (entry.isFile()) {
          const ext = path.extname(entry.name).toLowerCase();
          if (['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif'].includes(ext)) {
            files.push(fullPath);
          }
        }
      }
    } catch (err) {
      console.error(`Error reading directory ${currentDir}:`, err.message);
    }
  }
  
  await walk(dir);
  return files;
}

// Upload single file to R2 with metadata
async function uploadFileToR2(filePath) {
  const metadata = parsePathMetadata(filePath);
  const r2Key = metadata.path;
  
  if (DRY_RUN) {
    console.log(`[DRY RUN] Would upload: ${r2Key}`);
    console.log(`  Tags: ${metadata.tags.join(', ')}`);
    return { success: true, key: r2Key, dryRun: true };
  }

  return new Promise((resolve, reject) => {
    // Build metadata JSON for R2 custom metadata
    const customMetadata = {};
    metadata.tags.forEach(tag => {
      const [key, value] = tag.split(':');
      customMetadata[key] = value;
    });

    const args = [
      'r2', 'object', 'put',
      `${BUCKET}/${r2Key}`,
      '--file', filePath,
      '--content-type', getContentType(filePath)
    ];

    // Note: Wrangler CLI doesn't support custom metadata flags
    // Metadata is preserved in folder structure instead

    const child = spawn('wrangler', args, { 
      stdio: ['ignore', 'pipe', 'pipe'] 
    });

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (data) => stdout += data.toString());
    child.stderr.on('data', (data) => stderr += data.toString());

    child.on('close', (code) => {
      if (code === 0) {
        resolve({ 
          success: true, 
          key: r2Key, 
          tags: metadata.tags 
        });
      } else {
        reject(new Error(`Upload failed for ${r2Key}: ${stderr || stdout}`));
      }
    });

    child.on('error', (err) => {
      reject(new Error(`Failed to spawn wrangler: ${err.message}`));
    });
  });
}

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const types = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
    '.avif': 'image/avif'
  };
  return types[ext] || 'application/octet-stream';
}

// Upload all files with concurrency control
async function uploadAll(files) {
  let idx = 0;
  let inFlight = 0;
  let completed = 0;
  let failed = 0;
  const total = files.length;
  const results = [];

  console.log(`Starting upload of ${total} files to R2 bucket "${BUCKET}"...`);
  console.log(`Concurrency: ${CONCURRENCY}${DRY_RUN ? ' [DRY RUN MODE]' : ''}\n`);

  return new Promise((resolve) => {
    const pump = () => {
      while (inFlight < CONCURRENCY && idx < files.length) {
        const file = files[idx++];
        inFlight++;

        uploadFileToR2(file)
          .then((result) => {
            completed++;
            results.push(result);
            const percent = ((completed + failed) / total * 100).toFixed(1);
            console.log(`✓ [${percent}%] ${result.key} (${result.tags?.length || 0} tags)`);
          })
          .catch((err) => {
            failed++;
            console.error(`✗ Failed: ${path.basename(file)} - ${err.message}`);
          })
          .finally(() => {
            inFlight--;
            if (completed + failed === total) {
              resolve({ completed, failed, results });
            } else {
              pump();
            }
          });
      }
    };

    pump();
  });
}

// Generate URL mapping file
async function generateUrlMapping(results) {
  const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL || `https://pub-${BUCKET}.r2.dev`;
  
  const mapping = results
    .filter(r => r.success)
    .reduce((acc, r) => {
      const localPath = `/Website beloveful.com/${r.key}`;
      const r2Url = `${R2_PUBLIC_URL}/${r.key}`;
      acc[localPath] = r2Url;
      return acc;
    }, {});

  return mapping;
}

// Main execution
(async () => {
  try {
    console.log('🔍 Scanning for images...\n');
    const files = await getAllImageFiles(SOURCE_DIR);
    
    if (files.length === 0) {
      console.log('No image files found.');
      process.exit(0);
    }

    console.log(`Found ${files.length} image files\n`);

    const { completed, failed, results } = await uploadAll(files);

    console.log('\n' + '='.repeat(60));
    console.log(`✅ Upload complete!`);
    console.log(`   Successful: ${completed}`);
    console.log(`   Failed: ${failed}`);
    console.log(`   Total: ${files.length}`);
    console.log('='.repeat(60));

    if (!DRY_RUN && completed > 0) {
      console.log('\n📝 Generating URL mapping...');
      const mapping = await generateUrlMapping(results);
      
      await writeFile(
        path.join(ROOT, 'r2-url-mapping.json'),
        JSON.stringify(mapping, null, 2)
      );
      
      console.log('✓ URL mapping saved to r2-url-mapping.json');
      console.log('\nNext steps:');
      console.log('1. Review the URL mapping');
      console.log('2. Run: node scripts/update-data-urls.mjs');
      console.log('3. Test the site with R2 URLs');
    }

    process.exit(failed > 0 ? 1 : 0);
  } catch (err) {
    console.error('Fatal error:', err);
    process.exit(1);
  }
})();
