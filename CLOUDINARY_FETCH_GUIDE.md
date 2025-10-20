# Cloudinary Fetch URLs for R2 Images

This guide shows how to serve R2 images through Cloudinary without uploading them.

## How Cloudinary Fetch Works

Instead of uploading images to Cloudinary, you can use their "fetch" feature to pull images from R2 on-demand:

```
https://res.cloudinary.com/{cloud_name}/image/fetch/{remote_url}
```

## Prerequisites

1. **R2 Bucket with Public Access** (or signed URLs)
2. **Cloudinary Account** (free tier works)
3. **Environment Variables** set

## Setup

### 1. Get R2 Public URL

Enable public access on your R2 bucket or set up a custom domain:

```bash
# Via Cloudflare Dashboard:
# R2 > beloveful bucket > Settings > Public Access > Allow Access
# Copy the public URL: https://pub-xxxxx.r2.dev
```

### 2. Set Environment Variables

Add to `.env.local`:

```bash
# Cloudinary
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name

# R2 Access (for listing objects)
R2_ENDPOINT=https://xxxxx.r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=your_access_key
R2_SECRET_ACCESS_KEY=your_secret_key
R2_PUBLIC_URL=https://pub-xxxxx.r2.dev
```

### 3. Generate Fetch URLs

```bash
node scripts/generate-cloudinary-fetch-urls.mjs
```

This creates `cloudinary-fetch-urls.json` with all your R2 images as Cloudinary fetch URLs.

## URL Examples

### Basic Fetch
```
Original R2:
https://pub-xxxxx.r2.dev/EGY-001.jpg

Cloudinary Fetch:
https://res.cloudinary.com/your_cloud/image/fetch/https://pub-xxxxx.r2.dev/EGY-001.jpg
```

### With Transformations

```
# Auto format & quality optimization
https://res.cloudinary.com/your_cloud/image/fetch/f_auto,q_auto/https://pub-xxxxx.r2.dev/EGY-001.jpg

# Resize to width 800px
https://res.cloudinary.com/your_cloud/image/fetch/w_800/https://pub-xxxxx.r2.dev/EGY-001.jpg

# Thumbnail 400x300 crop fill
https://res.cloudinary.com/your_cloud/image/fetch/w_400,h_300,c_fill/https://pub-xxxxx.r2.dev/EGY-001.jpg

# Responsive with device pixel ratio
https://res.cloudinary.com/your_cloud/image/fetch/w_auto,dpr_auto/https://pub-xxxxx.r2.dev/EGY-001.jpg
```

## Benefits

✅ **No Upload** - Images stay on R2  
✅ **CDN Caching** - Cloudinary caches fetched images  
✅ **Transformations** - On-the-fly resizing, format conversion  
✅ **Optimization** - Auto format (WebP, AVIF) and quality  
✅ **Free Tier** - Works with Cloudinary free plan

## Integration

Update `src/lib/data.ts` to use fetch URLs:

```typescript
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const R2_PUBLIC_URL = import.meta.env.VITE_R2_PUBLIC_URL;

function buildCloudinaryFetchUrl(r2Key: string, transforms?: string) {
  const r2Url = `${R2_PUBLIC_URL}/${r2Key}`;
  const baseUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/fetch`;
  return transforms 
    ? `${baseUrl}/${transforms}/${r2Url}`
    : `${baseUrl}/${r2Url}`;
}

// Usage
const desktopUrl = buildCloudinaryFetchUrl('EGY-001.jpg', 'f_auto,q_auto,w_1920');
const mobileUrl = buildCloudinaryFetchUrl('EGY-001.jpg', 'f_auto,q_auto,w_800');
```

## Testing

Test a single image:

```bash
# Replace with your actual values
CLOUD_NAME="your_cloud_name"
R2_URL="https://pub-xxxxx.r2.dev/EGY-001.jpg"

curl -I "https://res.cloudinary.com/$CLOUD_NAME/image/fetch/$R2_URL"
```

Should return `200 OK` if working correctly.

## Troubleshooting

### 403 Forbidden
- Check R2 bucket has public access enabled
- Verify R2 public URL is correct

### 404 Not Found
- Verify image exists in R2
- Check URL encoding (spaces, special chars)

### Slow First Load
- First fetch takes longer (Cloudinary caches after)
- Subsequent loads are fast (served from CDN)

## Cost Considerations

**Cloudinary Free Tier:**
- 25 GB storage
- 25 GB bandwidth/month
- Fetch URLs count toward bandwidth

**R2 Costs:**
- Storage: $0.015/GB/month
- Egress: FREE (Cloudflare)

**Best of Both Worlds:**
- Store in R2 (cheap storage)
- Serve via Cloudinary fetch (transformations + CDN)
- Only Cloudinary bandwidth consumed
