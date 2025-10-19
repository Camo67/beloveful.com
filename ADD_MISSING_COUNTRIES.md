# Adding Missing Countries to Portfolio

This guide will help you add the 4 missing countries (178 images) to your Beloveful Photography portfolio.

## 📊 Missing Countries Summary

| Country | Region | Images | Folder Path |
|---------|--------|--------|-------------|
| **South Africa** | Africa | 16 | `Africa/South Africa` |
| **Portugal** | Europe | 24 | `Europe & Scandinavia/Portugal` |
| **New York** | North America | 88 | `North America/New York` |
| **Cuba** | North America | 50 | `Central America & Caribbean/Cuba` |

**Total:** 178 images across 4 countries

---

## 🚀 Quick Start

### Step 1: Set Up Cloudinary Credentials

You'll need your Cloudinary API credentials. If you don't have them:

1. Log in to [Cloudinary Console](https://console.cloudinary.com/)
2. Go to Dashboard
3. Find your credentials:
   - **Cloud Name:** `dvwdoezk1` (you already have this)
   - **API Key:** (found in dashboard)
   - **API Secret:** (found in dashboard)

**Set environment variables:**

```bash
export CLOUDINARY_CLOUD_NAME='dvwdoezk1'
export CLOUDINARY_API_KEY='your_api_key_here'
export CLOUDINARY_API_SECRET='your_api_secret_here'
```

To make these permanent, add them to your `~/.bashrc` or `~/.zshrc`:

```bash
echo "export CLOUDINARY_CLOUD_NAME='dvwdoezk1'" >> ~/.bashrc
echo "export CLOUDINARY_API_KEY='your_api_key_here'" >> ~/.bashrc
echo "export CLOUDINARY_API_SECRET='your_api_secret_here'" >> ~/.bashrc
source ~/.bashrc
```

---

### Step 2: Upload Images to Cloudinary

Run the upload script:

```bash
./scripts/upload-missing-countries.sh
```

This will:
- ✅ Upload all 178 images from the 4 missing countries
- ✅ Maintain folder structure: `Website beloveful.com/{Region}/{Country}/{filename}`
- ✅ Show progress for each upload
- ✅ Display summary of successful/failed uploads

**Expected output:**
```
🌄 Uploading Missing Countries to Cloudinary
==============================================

✅ Cloudinary credentials found
   Cloud Name: dvwdoezk1

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 Uploading: South Africa
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Folder: Africa/South Africa
   Prefix: ZAF

📤 Uploading: DSCF6215.jpg
✅ Success
...
```

---

### Step 3: Import Images into Portfolio

Once uploads complete, run the Cloudinary import script:

```bash
node scripts/import-cloudinary.cjs
```

This will:
- ✅ Fetch all images from your Cloudinary account
- ✅ Organize them by region and country
- ✅ Generate updated `src/lib/data.ts` with all albums
- ✅ Create a backup of your existing data.ts

**Expected output:**
```
🚀 Starting Cloudinary import process...

☁️ Connected to Cloudinary: dvwdoezk1

🔍 Fetching all images from Cloudinary...
📄 Fetching page 1
📸 Found 500 images on this page
...

✅ Total images fetched: 1103

🗂️ Organizing images by country and region...

📊 Organization Results:
   Albums: 45
   Slideshow images: 20
   Total images: 1103

🌍 Albums by region:
   Africa: 5 albums
   Asia: 8 albums
   Europe: 7 albums
   Middle East: 2 albums
   North America: 8 albums
   South America: 2 albums
   Oceania: 2 albums
   Erasing Borders: 1 album

💾 Backup created: src/lib/data.ts.backup.1234567890
✅ Updated: src/lib/data.ts

🎉 Import completed successfully!
📸 Imported 1103 images from Cloudinary
🗂️ Created 45 albums across 8 regions
🎠 Generated slideshow with 20 images
```

---

### Step 4: Verify the Changes

Start the development server:

```bash
npm run dev
```

Visit `http://localhost:8080/portfolio` and verify:

1. ✅ **Africa** section now has **South Africa**
2. ✅ **Europe** section now has **Portugal**
3. ✅ **North America** section now has **New York** and **Cuba**
4. ✅ All images display correctly
5. ✅ Gallery and lightbox work properly

---

## 🔍 Troubleshooting

### Issue: "Cloudinary credentials not set"

**Solution:**
```bash
# Check if credentials are set
echo $CLOUDINARY_CLOUD_NAME
echo $CLOUDINARY_API_KEY
echo $CLOUDINARY_API_SECRET

# If empty, export them again
export CLOUDINARY_CLOUD_NAME='dvwdoezk1'
export CLOUDINARY_API_KEY='your_api_key_here'
export CLOUDINARY_API_SECRET='your_api_secret_here'
```

### Issue: Upload script fails

**Solution:**
- Verify credentials are correct
- Check internet connection
- Ensure `curl` is installed: `which curl`
- Try uploading a single country first (edit script to comment out others)

### Issue: Import script doesn't detect new images

**Solution:**
- Verify images uploaded successfully to Cloudinary
- Check Cloudinary console: https://console.cloudinary.com/
- Navigate to Media Library and confirm images are there
- Wait a few minutes for Cloudinary to index new uploads
- Re-run import script

### Issue: Country doesn't appear in portfolio

**Possible causes:**
1. Folder structure in Cloudinary doesn't match expected format
2. Country code mapping in import script doesn't recognize folder name
3. Images didn't upload successfully

**Solution:**
```bash
# Check what was actually uploaded
node -e "
const { v2: cloudinary } = require('cloudinary');
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

cloudinary.search
  .expression('folder:Website\\\\ beloveful.com/*')
  .max_results(10)
  .execute()
  .then(result => console.log(JSON.stringify(result.resources, null, 2)));
"
```

---

## 📝 What Changed

### Files Modified

1. **`src/lib/data.ts`** (automatically backed up)
   - Added 4 new albums (South Africa, Portugal, New York, Cuba)
   - Added 178 new images total
   - Maintained existing structure and regions

### Scripts Created

1. **`scripts/upload-missing-countries.sh`**
   - Uploads images from public folder to Cloudinary
   - Maintains folder structure
   - Provides progress feedback

2. **`scripts/add-missing-countries.mjs`**
   - Analysis script to identify missing countries
   - Reports image counts

3. **`scripts/check-missing-countries.mjs`**
   - Compares public folder with portfolio data
   - Identifies gaps

---

## ✅ Verification Checklist

After completing all steps, verify:

- [ ] All 4 countries uploaded to Cloudinary
- [ ] Import script ran successfully
- [ ] `src/lib/data.ts` contains new albums
- [ ] Development server starts without errors
- [ ] Portfolio page shows all 45 albums (41 existing + 4 new)
- [ ] Each new country displays correctly
- [ ] Images load without errors
- [ ] Gallery and lightbox work for new countries
- [ ] No duplicate images exist

---

## 🆘 Need Help?

If you encounter issues:

1. Check the error messages carefully
2. Verify your Cloudinary credentials are correct
3. Ensure all images are in the correct folders
4. Check the browser console for JavaScript errors
5. Review the backup file if you need to restore

---

## 📚 Additional Resources

- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Cloudinary Console](https://console.cloudinary.com/)
- [Project WARP.md](./WARP.md) - Full project documentation
- [Portfolio Cloudinary Update](./PORTFOLIO_CLOUDINARY_UPDATE.md) - Integration details
