# Bluehost cPanel Image Setup (No Cloudinary)

## Architecture Overview

This application uses **Bluehost cPanel** for image hosting, NOT Cloudinary.

### Image Storage
- **Host**: Bluehost cPanel
- **Path**: `/public_html/beloveful.com/public_html/images`
- **Access**: Direct HTTP URLs from Bluehost server
- **Management**: FTP/SFTP for uploads, admin panel for database entries

### Why Stub Cloudinary Files Exist

The `src/lib/cloudinary-assets/` directory contains stub files to:
1. Satisfy build requirements (some legacy code references these paths)
2. Prevent build errors during deployment
3. Maintain backward compatibility with old imports

These files are **empty/minimal** and not used in production.

---

## Image Workflow

### 1. Upload Images to Bluehost

**Option A: FTP Client (FileZilla, Cyberduck, etc.)**
```
Host: 67.222.38.79 (or your domain)
Username: belovefu
Password: [your FTP password]
Port: 21
Path: /public_html/beloveful.com/public_html/images
```

**Option B: cPanel File Manager**
1. Log in to Bluehost cPanel
2. Go to Files → File Manager
3. Navigate to `/public_html/beloveful.com/public_html/images`
4. Upload images to appropriate folders

### 2. Organize by Region/Country

Structure your images like this:
```
/images/
├── Africa/
│   ├── Egypt/
│   │   ├── photo1.jpg
│   │   └── photo2.jpg
│   └── Kenya/
│       └── safari.jpg
├── Asia/
│   ├── Japan/
│   │   └── tokyo.jpg
│   └── Thailand/
│       └── bangkok.jpg
├── Europe & Scandinavia/
│   └── France/
│       └── paris.jpg
└── ...
```

### 3. Import into Database (Local Dev)

```bash
# Start local dev server
npm run dev

# Go to Admin Panel > Images > Upload Images
# Click "Scan Bluehost FTP" to auto-detect images
# Review and import
```

### 4. Deploy to Production

```bash
npm run build
npm run deploy
```

Images are served directly from Bluehost URLs - no Cloudinary needed!

---

## URL Format

Images are accessed via:
```
https://beloveful.com/Website%20beloveful.com/[Region]/[Country]/[filename.jpg]
```

Example:
```
https://beloveful.com/Website%20beloveful.com/Africa/Egypt/photo1.jpg
```

---

## Admin Panel Features

### Scan Bluehost FTP
- Automatically detects all images on your Bluehost server
- Parses region/country from folder structure
- Creates albums automatically
- Sets map pin thumbnails

### Manual Path Entry
If FTP scanning isn't available, manually enter paths:
```
/Website beloveful.com/Africa/Egypt/photo1.jpg
/Website beloveful.com/Asia/Japan/tokyo.jpg
```

### Image Management
- Add metadata (title, description, alt text)
- Organize into albums
- Set publish status
- Reorder within albums

---

## Configuration

### Local Development (.env.local)

```env
# Bluehost FTP (for admin panel scanning)
CPANEL_FTP_HOST=67.222.38.79
CPANEL_FTP_USER=belovefu
CPANEL_FTP_PASSWORD=your_password
CPANEL_FTP_ROOT=/public_html/beloveful.com/public_html/images
CPANEL_FTP_PORT=21
CPANEL_FTP_SECURE=false

# Public URL base
CPANEL_IMAGES_BASE_URL=/Website%20beloveful.com
```

### Production (Cloudflare Workers)

No FTP credentials needed in production! Images are served directly from Bluehost.

Set in Cloudflare dashboard if needed:
```bash
wrangler secret put CPANEL_IMAGES_BASE_URL
# Value: /Website%20beloveful.com
```

---

## Troubleshooting

### Images Not Showing Up

1. **Check file permissions on Bluehost**
   - Files should be readable (644)
   - Folders should be executable (755)

2. **Verify URL is accessible**
   ```bash
   curl -I https://beloveful.com/Website%20beloveful.com/Africa/Egypt/photo1.jpg
   ```

3. **Clear browser cache**
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

### FTP Connection Failed

See [FTP_SETUP_GUIDE.md](FTP_SETUP_GUIDE.md) for detailed troubleshooting.

### Build Errors About Missing Cloudinary Files

The stub files in `src/lib/cloudinary-assets/` prevent build errors. They're empty and unused.

If you see errors like:
```
Could not load prefix-mapped.json
```

The stub files should resolve this. If not, clear build cache:
```bash
rm -rf dist/
rm -rf .wrangler/
npm run build
```

---

## Migration from Cloudinary (If Applicable)

If you previously used Cloudinary and migrated to Bluehost:

1. **Download all images from Cloudinary**
2. **Upload to Bluehost** in proper folder structure
3. **Update database** with new Bluehost URLs
4. **Remove Cloudinary dependencies** from package.json (optional)
5. **Update wrangler.toml** to remove Cloudinary secrets (optional)

---

## Benefits of Bluehost-Only Approach

✅ **Cost**: No Cloudinary subscription fees
✅ **Simplicity**: One hosting provider for everything
✅ **Control**: Direct file access via FTP/cPanel
✅ **Performance**: Images served from same server as website
✅ **Privacy**: No third-party image hosting

---

## Support

For FTP issues: [FTP_SETUP_GUIDE.md](FTP_SETUP_GUIDE.md)
For Cloudflare deployment: [CLOUDFLARE_ENV_SETUP.md](CLOUDFLARE_ENV_SETUP.md)
For admin panel: Use the built-in help in the admin interface

---

**Last Updated**: 2026-05-20
**Status**: Bluehost-only setup, Cloudinary removed
