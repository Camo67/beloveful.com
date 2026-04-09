import fs from 'fs/promises';
import path from 'path';

async function debug404Errors() {
  console.log('🔍 Debugging common 404 error causes...\n');
  
  // Check if the main images directory exists
  const imagesDir = '/home2/belovefu/public_html/beloveful.com/public_html/images/';
  try {
    await fs.access(imagesDir);
    console.log(`✅ Images directory exists: ${imagesDir}`);
  } catch {
    console.log(`❌ Images directory missing: ${imagesDir}`);
    console.log(`💡 Create the directory structure: mkdir -p ${imagesDir}`);
  }
  
  // Check for case sensitivity issues
  const regions = ['Asia', 'Europe', 'Africa', 'North America', 'South America', 'Oceania', 'Middle East'];
  
  for (const region of regions) {
    const regionDir = `/home2/belovefu/public_html/beloveful.com/public_html/images/${region}/`;
    try {
      await fs.access(regionDir);
      console.log(`✅ ${region} directory exists: ${regionDir}`);
      
      // Check for subdirectories in each region
      const dirContents = await fs.readdir(regionDir);
      const subdirs = dirContents.filter(item => 
        fs.stat(path.join(regionDir, item)).then(stat => stat.isDirectory()).catch(() => false)
      );
      
      // Resolve promises to get actual subdirectories
      const resolvedSubdirs = [];
      for (const item of dirContents) {
        const itemPath = path.join(regionDir, item);
        const stat = await fs.stat(itemPath).catch(() => null);
        if (stat && stat.isDirectory()) {
          resolvedSubdirs.push(item);
        }
      }
      
      if (resolvedSubdirs.length > 0) {
        console.log(`   Subdirectories: ${resolvedSubdirs.join(', ')}`);
        
        // Check for common case mismatches
        for (const subdir of resolvedSubdirs) {
          const lowerCaseName = subdir.toLowerCase();
          if (subdir !== lowerCaseName) {
            console.log(`⚠️  Case mismatch detected: '${subdir}' should be '${lowerCaseName}'`);
          }
        }
      } else {
        console.log(`   No subdirectories found in ${regionDir}`);
      }
    } catch {
      console.log(`❌ ${region} directory missing: ${regionDir}`);
    }
  }
  
  // Check if .htaccess is blocking access
  const htaccessPath = '/home2/belovefu/public_html/beloveful.com/public_html/.htaccess';
  try {
    const htaccessContent = await fs.readFile(htaccessPath, 'utf8');
    console.log('\n📝 Found .htaccess file, checking for image-related rules...');
    
    if (htaccessContent.includes('RewriteRule')) {
      console.log('🔍 Found RewriteRule directives, reviewing for potential conflicts:');
      
      const lines = htaccessContent.split('\n');
      let inRewriteBlock = false;
      
      for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine.includes('RewriteEngine On')) {
          inRewriteBlock = true;
          console.log(`   ${trimmedLine}`);
        } else if (inRewriteBlock && trimmedLine.startsWith('#')) {
          // Skip comments
        } else if (inRewriteBlock && trimmedLine.startsWith('<IfModule') || trimmedLine.startsWith('</IfModule>')) {
          // Start/end modules
          console.log(`   ${trimmedLine}`);
          if (trimmedLine.startsWith('</IfModule>')) {
            inRewriteBlock = false;
          }
        } else if (inRewriteBlock && trimmedLine.includes('images')) {
          console.log(`⚠️  Image-related rule: ${trimmedLine}`);
        } else if (inRewriteBlock && trimmedLine.startsWith('RewriteRule') && trimmedLine.includes('\\.(jpe?g|png|gif|webp|svg)$')) {
          console.log(`⚠️  Image file extension rule: ${trimmedLine}`);
        } else if (inRewriteBlock && trimmedLine.startsWith('</IfModule>')) {
          inRewriteBlock = false;
        }
      }
    } else {
      console.log('✅ No rewrite rules affecting images detected');
    }
  } catch {
    console.log('\nℹ️  No .htaccess file found in document root');
  }
  
  // Check file permissions
  try {
    const stats = await fs.stat('/home2/belovefu/public_html/beloveful.com/public_html/images/');
    console.log(`\n📁 Images directory permissions: ${stats.mode.toString(8).slice(-3)}`);
    console.log('💡 Recommended: 755 for directories, 644 for files');
  } catch {
    console.log('\n📁 Could not check permissions for images directory');
  }
  
  // Check if there are any files in the expected India path
  const indiaPath = '/home2/belovefu/public_html/beloveful.com/public_html/images/Asia/india/';
  try {
    const indiaFiles = await fs.readdir(indiaPath);
    console.log(`\n🇮🇳 India directory contains ${indiaFiles.length} files/directories`);
    if (indiaFiles.length > 0) {
      console.log(`   Sample files: ${indiaFiles.slice(0, 5).join(', ')}${indiaFiles.length > 5 ? '...' : ''}`);
    }
  } catch {
    console.log(`\n❌ India directory does not exist: ${indiaPath}`);
    console.log(`💡 Create it with: mkdir -p ${indiaPath}`);
  }
  
  // Summary of common fixes
  console.log('\n🔧 Common fixes for 404 errors:');
  console.log('   1. Ensure directory names match the paths in your code (case-sensitive)');
  console.log('   2. Set correct file permissions: chmod 644 for images, 755 for directories');
  console.log('   3. Check .htaccess for conflicting rewrite rules');
  console.log('   4. Verify the document root is set correctly in hosting panel');
  console.log('   5. Restart the web server after making changes');
}

debug404Errors().catch(console.error);