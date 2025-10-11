# Beloveful R2 CDN Setup Guide

This guide explains how to set up and use Cloudflare R2 Object Storage as a CDN for your Beloveful photography portfolio.

## 📋 Overview

Your R2 bucket is configured to serve as a high-performance CDN for static assets, with features including:

- ✅ Custom domain (`cdn.beloveful.com`)
- ✅ Automatic image optimization
- ✅ Global edge caching via Cloudflare
- ✅ CORS configuration for web apps
- ✅ Secure file uploads with progress tracking
- ✅ React component integration

## 🏗 Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│ React App       │───▶│ CDN Worker       │───▶│ R2 Bucket       │
│ (beloveful.com) │    │ (cdn.beloveful.) │    │ (beloveful)     │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌──────────────────┐
                       │ Cloudflare Edge  │
                       │ Cache Network    │
                       └──────────────────┘
```

## 🚀 Quick Start

### 1. Deploy the CDN Worker

```bash
# Make the setup script executable and run it
chmod +x ./scripts/setup-r2-cdn.sh
./scripts/setup-r2-cdn.sh
```

This script will:
- Update your R2 bucket CORS policy for production
- Deploy the CDN Worker to both development and production
- Provide DNS setup instructions

### 2. Configure DNS

Add these DNS records to your Cloudflare domain:

```
Type: CNAME
Name: cdn
Target: beloveful-r2-cdn.your-subdomain.workers.dev
Proxy: ✅ (Orange cloud)
```

### 3. Test the Setup

```bash
# Test CDN availability
curl -I https://cdn.beloveful.com/health

# Test file upload
curl -X POST \
  -F 'file=@test-image.jpg' \
  -F 'path=portfolio/test' \
  https://cdn.beloveful.com/api/upload
```

## 📁 File Organization

Your R2 bucket follows this structure:

```
beloveful/
├── images/
│   ├── portfolio/
│   │   ├── EGY-1.jpg
│   │   ├── HK-1.jpg
│   │   └── ...
│   ├── slideshow/
│   │   └── ...
│   └── workshops/
│       └── ...
├── uploads/
│   └── user-uploads/
└── assets/
    ├── logos/
    └── documents/
```

## 🔧 React Integration

### Basic File Upload

```tsx
import { uploadToR2 } from '@/lib/r2';

const handleUpload = async (file: File) => {
  const result = await uploadToR2(file, 'portfolio/new-shoot');
  
  if (result.success) {
    console.log('File uploaded:', result.url);
  } else {
    console.error('Upload failed:', result.error);
  }
};
```

### Using the Upload Component

```tsx
import { R2Upload } from '@/components/R2Upload';

function AdminPanel() {
  const handleUploadComplete = (results) => {
    results.forEach(result => {
      if (result.success) {
        // Add to your data store
        console.log('New image available:', result.url);
      }
    });
  };

  return (
    <R2Upload
      uploadPath="portfolio/latest"
      maxFiles={20}
      onUploadComplete={handleUploadComplete}
    />
  );
}
```

### Optimized Image URLs

```tsx
import { getOptimizedImageUrl, getResponsiveImageUrls } from '@/lib/r2';

// Single optimized image
const optimizedUrl = getOptimizedImageUrl('images/portfolio/EGY-1.jpg', {
  width: 800,
  quality: 85,
  format: 'webp'
});

// Responsive image set
const responsiveUrls = getResponsiveImageUrls('images/portfolio/EGY-1.jpg');

// Use in your component
<img
  src={responsiveUrls.desktop}
  srcSet={`
    ${responsiveUrls.mobile} 640w,
    ${responsiveUrls.tablet} 1024w,
    ${responsiveUrls.desktop} 1440w,
    ${responsiveUrls.large} 1920w
  `}
  sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1440px"
  alt="Photography"
/>
```

## 🔐 Security & CORS

Your bucket is configured with these CORS settings:

```json
{
  "AllowedOrigins": [
    "https://beloveful.com",
    "https://www.beloveful.com", 
    "https://cdn.beloveful.com",
    "http://localhost:8080"
  ],
  "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
  "AllowedHeaders": ["*"],
  "ExposeHeaders": ["ETag"],
  "MaxAgeSeconds": 3000
}
```

## 🎨 Image Optimization Features

The CDN Worker supports these optimization parameters:

| Parameter | Description | Example |
|-----------|-------------|---------|
| `w` | Width in pixels | `?w=800` |
| `h` | Height in pixels | `?h=600` |
| `q` | Quality (1-100) | `?q=85` |
| `f` | Format (auto, webp, avif, jpg, png) | `?f=webp` |

Example optimized URLs:
```
https://cdn.beloveful.com/images/portfolio/EGY-1.jpg?w=800&q=85&f=webp
https://cdn.beloveful.com/images/slideshow/hero.jpg?w=1920&h=1080&q=90
```

## 💰 Cost Management

### Pricing Estimates (Monthly)

| Usage | Storage | Requests | Bandwidth | Total |
|-------|---------|----------|-----------|-------|
| Small | 10GB ($0.15) | 10K ops ($0.40) | 100GB ($0.36) | ~$0.91 |
| Medium | 50GB ($0.75) | 100K ops ($4.00) | 500GB ($1.80) | ~$6.55 |
| Large | 200GB ($3.00) | 1M ops ($40.00) | 2TB ($7.20) | ~$50.20 |

### Cost Optimization Tips

1. **Use appropriate image formats**: WebP saves ~30% bandwidth vs JPEG
2. **Set proper cache headers**: Reduces repeat requests
3. **Monitor usage**: Use Cloudflare Analytics to track consumption
4. **Compress uploads**: Use quality settings between 80-90 for photos

## 🔍 Monitoring & Analytics

### View R2 Usage

```bash
# List bucket contents
wrangler r2 bucket list

# View specific bucket info
wrangler r2 bucket info beloveful

# Monitor worker logs
wrangler tail beloveful-r2-cdn
```

### Performance Monitoring

The CDN Worker includes built-in performance headers:

```
X-Cache-Status: HIT/MISS
X-Processing-Time: 45ms  
X-Image-Optimization: applied/available-but-not-applied
```

## 🛠 Advanced Configuration

### Enable Cloudflare Image Resizing

1. Go to Cloudflare Dashboard > Speed > Optimization
2. Enable "Image Resizing" (paid feature)
3. Update worker environment variable: `CF_IMAGE_RESIZING = "true"`
4. Redeploy: `cd workers && wrangler deploy --env production`

### Custom Upload Paths

```tsx
// Organize by date
const datePath = `portfolio/${new Date().getFullYear()}/${new Date().getMonth() + 1}`;
await uploadToR2(file, datePath);

// Organize by country/region
const countryPath = `portfolio/countries/${countryCode.toLowerCase()}`;
await uploadToR2(file, countryPath);

// Generate from your existing naming convention
import { generateImagePath } from '@/lib/r2';
const path = generateImagePath('EGY', 42, 'portfolio');
// Results in: 'images/portfolio/EGY-42.jpg'
```

### Batch Operations

```tsx
import { batchUpload } from '@/lib/r2';

const files = [...]; // File array from input
const results = await batchUpload(files, 'portfolio/batch-upload', (completed, total) => {
  console.log(`Progress: ${completed}/${total}`);
});

// Filter successful uploads
const successful = results.filter(r => r.success);
console.log(`Successfully uploaded ${successful.length} files`);
```

## 🚨 Troubleshooting

### Common Issues

**CORS Errors**
```bash
# Re-apply CORS policy
wrangler r2 bucket cors put beloveful --file /tmp/cors-policy.json
```

**Worker Not Responding**
```bash
# Check worker deployment
wrangler whoami
cd workers && wrangler deploy --env production
```

**DNS Not Resolving**
```bash
# Check DNS propagation
nslookup cdn.beloveful.com
# Wait 5-10 minutes for propagation
```

**Large File Upload Failures**
```tsx
// Use signed URLs for files > 25MB
import { uploadWithSignedUrl } from '@/lib/r2';

const publicUrl = await uploadWithSignedUrl(largeFile, 'path/filename.jpg');
```

### Debug Mode

Enable verbose logging in the worker:

```javascript
// In workers/r2-cdn-worker.js
console.log('Debug:', { pathname, method: request.method });
```

Then view logs:
```bash
wrangler tail beloveful-r2-cdn --format pretty
```

## 📞 Support

For additional help:

1. **Cloudflare Docs**: [developers.cloudflare.com/r2](https://developers.cloudflare.com/r2)
2. **Wrangler CLI**: [developers.cloudflare.com/workers/wrangler](https://developers.cloudflare.com/workers/wrangler/)
3. **Community**: [discord.gg/cloudflaredev](https://discord.gg/cloudflaredev)

---

## 🎯 Next Steps

After setup completion:

1. **Migrate existing assets** from Cloudinary to R2 (optional)
2. **Set up automated backups** using Cloudflare scheduled workers
3. **Implement analytics** to track image performance
4. **Add image compression** pipeline for uploaded files
5. **Configure custom cache rules** for different asset types

Your Beloveful R2 CDN is now ready for production! 🎉