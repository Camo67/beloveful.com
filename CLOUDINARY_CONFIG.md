# Cloudinary Upload Configuration

## Current Configuration

### Basic Settings
```javascript
{
  overwrite: true,              // Replace existing files
  use_filename: true,           // Use original filename
  unique_filename: false,       // Don't add random suffix
  invalidate: true,             // Clear CDN cache on update
  folder: 'beloveful',          // Base folder in Cloudinary
  tags: ['portfolio', 'beloveful-website']  // Searchable tags
}
```

### File Limits
- **Max file size**: 10MB (free tier limit)
- Files larger than 10MB are automatically skipped
- To increase: upgrade plan at https://cloudinary.com/pricing

### Advanced Options (Commented Out)

#### Async Upload
Process uploads in background (faster for large batches):
```javascript
async: true
```

#### Notification URL
Get webhook when upload completes:
```javascript
notification_url: 'https://your-webhook-url.com/notify'
```

#### Eval Script (Pre-upload)
Run custom code before upload (e.g., check quality):
```javascript
eval: "if(resource_info.quality_analysis.focus < 0.5) { upload_options['tags'] = 'blurry' }"
```

#### On Success Script
Run code after successful upload (e.g., auto-caption):
```javascript
on_success: "current_asset.update({tags: ['autocaption'], context: {caption: e.upload_info?.info?.detection?.captioning?.data?.caption}})"
```

#### Proxy
Route uploads through proxy:
```javascript
proxy: 'http://hostname:port'
```

#### Custom Headers
**Note**: Cloudinary only supports specific headers, not arbitrary custom headers.

Supported headers:
```javascript
headers: {
  'X-Unique-Upload-Id': 'unique-id-123',  // Track uploads
  'User-Agent': 'MyApp/1.0'                // Custom user agent
}
```

⚠️ Arbitrary headers like `X-Custom-Header` will cause errors.

#### Return Delete Token
Get token to delete images later:
```javascript
return_delete_token: true
```

## Folder Structure

Uploads organize as:
```
beloveful/
├── Africa/
│   ├── Egypt/
│   └── Morocco/
├── Asia/
│   ├── China/
│   └── Hong Kong/
├── Middle East/
│   ├── Jordan/
│   └── Israel | Palestine/
└── ...
```

## Usage

### Upload Images
```bash
node upload-to-cloudinary.js
```

### Generate TypeScript Data
```bash
node generate-cloudinary-data.js
```

### Import in Code
```typescript
import { CLOUDINARY_ALBUMS } from './lib/cloudinaryData';
```

## Troubleshooting

### "public_id is invalid"
- Caused by spaces at end of filenames
- Script now automatically trims whitespace

### "File size too large"
- Free tier max: 10MB
- Upgrade plan or compress images before upload

### "Must supply api_key"
- Check `.env.local` has correct credentials
- Restart terminal after adding credentials

### 503 Errors
- Cloudinary server temporarily unavailable
- Script will log error and continue

## Security

⚠️ **IMPORTANT**: Never commit `.env.local` to git!

Add to `.gitignore`:
```
.env.local
cloudinary-upload-report.json
upload-progress.log
```

## Next Steps

1. Run upload: `node upload-to-cloudinary.js`
2. Generate data: `node generate-cloudinary-data.js`
3. Import in `src/lib/data.ts`
4. Update components to use Cloudinary URLs
