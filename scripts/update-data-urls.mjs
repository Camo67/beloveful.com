#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const MAPPING_FILE = path.join(ROOT, 'r2-url-mapping.json');
const DATA_FILE = path.join(ROOT, 'src/lib/data.ts');

async function updateDataFile() {
  try {
    console.log('📖 Reading URL mapping...');
    const mappingContent = await readFile(MAPPING_FILE, 'utf8');
    const urlMapping = JSON.parse(mappingContent);
    
    console.log(`✓ Loaded ${Object.keys(urlMapping).length} URL mappings\n`);

    console.log('📖 Reading data.ts...');
    let dataContent = await readFile(DATA_FILE, 'utf8');
    
    let replacements = 0;
    
    // Replace each local path with R2 URL
    for (const [localPath, r2Url] of Object.entries(urlMapping)) {
      const escapedLocalPath = localPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escapedLocalPath, 'g');
      const matches = dataContent.match(regex);
      
      if (matches) {
        dataContent = dataContent.replace(regex, r2Url);
        replacements += matches.length;
      }
    }
    
    if (replacements === 0) {
      console.log('⚠️  No replacements made. URLs may already be updated.');
      return;
    }

    console.log(`✓ Made ${replacements} replacements\n`);
    
    // Backup original file
    const backupFile = DATA_FILE + '.backup';
    const originalContent = await readFile(DATA_FILE, 'utf8');
    await writeFile(backupFile, originalContent);
    console.log(`✓ Backup created: ${path.basename(backupFile)}`);
    
    // Write updated content
    await writeFile(DATA_FILE, dataContent);
    console.log(`✓ Updated: ${path.basename(DATA_FILE)}`);
    
    console.log('\n' + '='.repeat(60));
    console.log('✅ URL update complete!');
    console.log('='.repeat(60));
    console.log('\nNext steps:');
    console.log('1. Review the changes in src/lib/data.ts');
    console.log('2. Test the site locally: npm run dev');
    console.log('3. If everything works, commit the changes');
    console.log('4. If something breaks, restore from: src/lib/data.ts.backup');
    
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.error('❌ Error: r2-url-mapping.json not found.');
      console.error('   Run: node scripts/upload-to-r2-with-tags.mjs first');
    } else {
      console.error('❌ Error:', err.message);
    }
    process.exit(1);
  }
}

updateDataFile();
