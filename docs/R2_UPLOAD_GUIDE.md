# R2 Upload Guide

## Overview

This guide explains how to upload local images to Cloudflare R2 with proper metadata tags and update the codebase to use R2 URLs.

## Prerequisites

- Wrangler CLI installed (`wrangler --version`)
- R2 bucket created (`beloveful` or `beloveful2`)
- R2 bucket configured with public access domain

## Step 1: Configure R2 Public Domain

First, enable public access for your R2 bucket:

```bash
# Via Cloudflare Dashboard:
# 1. Go to R2 → Your Bucket → Settings
# 2. Enable "Public Access"
# 3. Note the public URL (e.g., https://pub-beloveful.r2.dev)
```

Set the environment variable:

```bash
export R2_PUBLIC_URL="https://pub-beloveful.r2.dev"
```

## Step 2: Run Dry Run (Recommended)

Test the upload process without actually uploading:

```bash
DRY_RUN=true node scripts/upload-to-r2-with-tags.mjs
```

This will show you:
- How many images will be uploaded (1,139)
- What tags will be applied to each image
- The R2 key structure

## Step 3: Upload Images to R2

Run the actual upload:

```bash
# Default settings (bucket: beloveful, concurrency: 5)
node scripts/upload-to-r2-with-tags.mjs

# Or customize:
R2_BUCKET=beloveful2 UPLOAD_CONCURRENCY=10 node scripts/upload-to-r2-with-tags.mjs
```

This will:
- Upload all 1,139 images to R2
- Apply metadata tags to each image
- Generate `r2-url-mapping.json` with URL mappings
- Show progress with percentage completion

**Estimated time**: 15-30 minutes depending on network speed

## Step 4: Update Data Files

After upload completes, update your data files:

```bash
node scripts/update-data-urls.mjs
```

This will:
- Read the URL mapping file
- Replace local paths with R2 URLs in `src/lib/data.ts`
- Create a backup at `src/lib/data.ts.backup`
- Show how many replacements were made

## Step 5: Test Locally

```bash
npm run dev
```

Visit http://localhost:8080 and verify:
- Homepage slideshow loads correctly
- Portfolio galleries display images
- Image lightbox works
- All regions/countries show properly

## Step 6: Commit Changes

```bash
git add .
git commit -m "feat: migrate local images to Cloudflare R2 with metadata tags"
git push origin feature/upload-local-images-to-r2
```

## Metadata Tag Structure

Each image is tagged with:

### Region Tags
- `region:africa`
- `region:asia`
- `region:middle-east`
- `region:south-america`
- `region:north-america`
- `region:europe`
- `region:oceania`

### Country Tags
- `country:egypt`
- `country:jordan`
- `country:israel-palestine`
- etc.

### Type Tags
- `type:portfolio` - Portfolio images
- `type:homepage` - Homepage slideshow
- `type:open-edition` - Print shop images
- `type:client-logo` - Client/partner logos

### Additional Tags
- `format:jpg` / `format:png` / `format:webp`
- `filename:<original-name>`
- `layout:desktop-landscape` / `layout:mobile-portrait` (for homepage)
- `print-size:5x7` (for open editions)

## Querying Images by Tags

Once uploaded, you can query R2 images by metadata:

```javascript
// Example: Get all Egypt images
const egyptImages = await r2.list({
  prefix: 'Africa/Egypt/',
  include: ['customMetadata']
});

// Filter by metadata
const portfolioImages = images.filter(img => 
  img.customMetadata?.type === 'portfolio'
);
```

## Rollback Instructions

If something goes wrong:

```bash
# Restore data file from backup
cp src/lib/data.ts.backup src/lib/data.ts

# Delete uploaded R2 objects (if needed)
wrangler r2 object delete beloveful/<key>
```

## Troubleshooting

### Upload Fails
- Check wrangler authentication: `wrangler whoami`
- Verify bucket exists: `wrangler r2 bucket list`
- Check network connection

### URLs Don't Work
- Verify R2 public access is enabled
- Check R2_PUBLIC_URL matches your actual domain
- Ensure CORS is configured on the bucket

### Images Not Loading
- Check browser console for 404 errors
- Verify R2 URLs are correctly formatted
- Test a single R2 URL directly in browser

## Cost Estimates

Cloudflare R2 pricing:
- Storage: $0.015 per GB/month
- Class A operations (uploads): $4.50 per million
- Class B operations (reads): $0.36 per million
- Data egress: **FREE**

For 1,139 images (~5GB estimated):
- Storage: ~$0.08/month
- Upload cost: ~$0.005 (one-time)
- **Reads are free via public domain**

## Next Steps

After successful upload:
1. Update `wrangler.toml` to bind R2 bucket if needed
2. Consider implementing image transformation worker
3. Set up CDN caching headers
4. Monitor R2 analytics in Cloudflare Dashboard
