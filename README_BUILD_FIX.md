# Beloveful.com - Bluehost cPanel Image Hosting

## 🎯 Quick Start

### For Local Development

1. **Setup FTP credentials** (for admin panel image scanning):
   ```bash
   npm run ftp:setup
   ```

2. **Start dev server**:
   ```bash
   npm run dev
   ```

3. **Access admin panel**:
   - URL: `http://localhost:8080/adminlogin`
   - Use admin credentials to login

### For Production Deployment

```bash
npm run build
npm run deploy
```

---

## 📸 Image Hosting: Bluehost cPanel ONLY

This application uses **Bluehost cPanel** for all image hosting. **Cloudinary is NOT used.**

### Image Storage
- **Location**: Bluehost server at `/public_html/beloveful.com/public_html/images`
- **Access**: Direct HTTP URLs from your domain
- **Upload**: Via FTP, SFTP, or cPanel File Manager

### Admin Panel Features
- **Scan Bluehost FTP**: Auto-detect and import images
- **Manual Path Entry**: Add images by entering paths
- **Album Management**: Organize by region/country
- **Metadata Editing**: Add titles, descriptions, alt text

---

## 📚 Documentation

### Essential Guides
- **[BLUEHOST_ONLY_SETUP.md](BLUEHOST_ONLY_SETUP.md)** - Complete Bluehost setup guide
- **[FTP_SETUP_GUIDE.md](FTP_SETUP_GUIDE.md)** - FTP configuration and troubleshooting
- **[CLOUDFLARE_ENV_SETUP.md](CLOUDFLARE_ENV_SETUP.md)** - Cloudflare deployment details

### FTP Tools
- **Setup Wizard**: `npm run ftp:setup` - Interactive credential configuration
- **Test Connection**: `npm run ftp:test` - Verify FTP connectivity
- **Diagnostic Script**: `node test-ftp-connection.js` - Detailed diagnostics

### Troubleshooting
- **[FTP_FIX_SUMMARY.md](FTP_FIX_SUMMARY.md)** - FTP connection issues
- **[VERIFICATION_CHECKLIST.md](VERIFICATION_CHECKLIST.md)** - Testing checklist

---

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React + TypeScript + Vite
- **Backend**: Cloudflare Workers (Hono framework)
- **Database**: Cloudflare D1 (SQLite)
- **Storage**: Bluehost cPanel (images), Cloudflare R2 (optional)
- **Deployment**: Cloudflare Pages/Workers

### Image Flow
```
User uploads to Bluehost (FTP/cPanel)
    ↓
Admin scans via FTP (local dev)
    ↓
Image paths stored in D1 database
    ↓
Frontend displays from Bluehost URLs
    ↓
Deployed to Cloudflare Workers
```

---

## 🔧 Common Tasks

### Adding New Images

**Method 1: FTP Upload + Admin Scan** (Recommended)
1. Upload images to Bluehost via FTP
2. Run local dev: `npm run dev`
3. Admin Panel → Images → Upload → "Scan Bluehost FTP"
4. Import detected images
5. Deploy: `npm run deploy`

**Method 2: Manual Path Entry**
1. Upload images to Bluehost
2. Admin Panel → Images → Upload
3. Manually enter paths like:
   ```
   /Website beloveful.com/Africa/Egypt/photo.jpg
   ```
4. Click "Import Paths"

### Managing Albums
- Albums are auto-created from folder structure
- Region/Country detected from path
- Can be edited in admin panel

### Updating Existing Images
1. Replace file on Bluehost via FTP
2. Same filename = same URL
3. No database changes needed

---

## ⚙️ Configuration

### Environment Variables

**Local Development (.env.local)**:
```env
CPANEL_FTP_HOST=67.222.38.79
CPANEL_FTP_USER=belovefu
CPANEL_FTP_PASSWORD=your_password
CPANEL_FTP_ROOT=/public_html/beloveful.com/public_html/images
```

**Production (Cloudflare)**:
- Set via `wrangler secret put` if needed
- Most secrets not required (images served from Bluehost)

See [CLOUDFLARE_ENV_SETUP.md](CLOUDFLARE_ENV_SETUP.md) for details.

---

## 🚀 Deployment

### Prerequisites
- Cloudflare account
- Wrangler CLI installed
- Domain configured in Cloudflare

### Deploy Steps
```bash
# Build the app
npm run build

# Deploy to Cloudflare
npm run deploy
```

### Post-Deploy
- Test image loading
- Verify admin panel access
- Check database migrations

---

## 🐛 Troubleshooting

### Build Fails with "prefix-mapped.json not found"
✅ **Fixed**: Stub files created in `src/lib/cloudinary-assets/`
If still failing, clear cache:
```bash
rm -rf dist/ .wrangler/
npm run build
```

### FTP Connection Issues
See [FTP_SETUP_GUIDE.md](FTP_SETUP_GUIDE.md)

### Images Not Loading
1. Check Bluehost file permissions (644 for files, 755 for folders)
2. Verify URL is accessible directly
3. Clear browser cache

### Admin Panel Not Working
1. Ensure you're logged in
2. Check browser console for errors
3. Verify database is initialized

---

## 📞 Support

- **FTP Issues**: See [FTP_SETUP_GUIDE.md](FTP_SETUP_GUIDE.md)
- **Build Issues**: See [BLUEHOST_ONLY_SETUP.md](BLUEHOST_ONLY_SETUP.md)
- **Deployment**: See [CLOUDFLARE_ENV_SETUP.md](CLOUDFLARE_ENV_SETUP.md)

---

## 📝 Notes

- **No Cloudinary**: All images hosted on Bluehost
- **Local FTP Scanning**: Admin feature runs locally, not in production
- **Direct URLs**: Images served directly from Bluehost server
- **Stub Files**: `cloudinary-assets/` contains empty stubs to prevent build errors

---

**Last Updated**: 2026-05-20
**Version**: Bluehost-only setup
