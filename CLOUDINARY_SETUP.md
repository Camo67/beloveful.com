# Cloudinary Image Import Setup

## Overview
This guide will help you import all images from your Cloudinary account directly into your Beloveful Photography website data structure.

## Step 1: Get Your Cloudinary Credentials

1. **Log into Cloudinary**: Go to https://cloudinary.com/ and log into your account
2. **Go to Dashboard**: Click on "Dashboard" in the left sidebar
3. **Find API Credentials**: You'll see your credentials in the "Account Details" section:
   - **Cloud Name**: `dvwdoezk1` (already configured)
   - **API Key**: A string of numbers (e.g., "123456789012345")
   - **API Secret**: A long string of letters and numbers

## Step 2: Set Environment Variables

Create a `.env` file in your project root with your credentials:

```bash
# Create .env file
touch .env

# Add your credentials (replace with your actual values)
echo "CLOUDINARY_CLOUD_NAME=dvwdoezk1" >> .env
echo "CLOUDINARY_API_KEY=your_api_key_here" >> .env
echo "CLOUDINARY_API_SECRET=your_api_secret_here" >> .env
```

## Step 3: Run the Import Script

```bash
# Load environment variables and run import
source .env && node scripts/import-cloudinary.cjs
```

## Step 4: What the Script Does

The script will:

1. **Connect to Cloudinary** using your API credentials
2. **Fetch ALL images** from your account (may take several minutes)
3. **Organize images** by country/region based on filename patterns:
   - `EGY-xxx` → Egypt (Africa)
   - `HK-xxx` → Hong Kong (Asia)  
   - `ITA-xxx` → Italy (Europe)
   - `CHI-xxx` → Chicago (North America)
   - And many more patterns...
4. **Create data.ts** with complete image URLs
5. **Generate slideshow** with high-quality images
6. **Backup existing data** before making changes

## Step 5: Expected Output

```
🚀 Starting Cloudinary import process...

☁️ Connected to Cloudinary: dvwdoezk1

🔍 Fetching all images from Cloudinary...
📄 Fetching page 1
📸 Found 500 images on this page
📄 Fetching page 2
📸 Found 325 images on this page
✅ Total images fetched: 825

🗂️ Organizing images by country and region...

📊 Organization Results:
   Albums: 25
   Slideshow images: 20
   Total images: 825

🌍 Albums by region:
   Africa: 3 albums
   Asia: 8 albums
   Europe: 7 albums
   Middle East: 2 albums
   North America: 2 albums
   South America: 1 albums
   Oceania: 2 albums

💾 Backup created: src/lib/data.ts.backup.1728901234567
✅ Updated: src/lib/data.ts

🎉 Import completed successfully!
📸 Imported 825 images from Cloudinary
🗂️ Created 25 albums across 7 regions
🎠 Generated slideshow with 20 images
```

## Troubleshooting

### Error: "Missing Cloudinary credentials"
- Make sure your `.env` file is created correctly
- Verify you're using `source .env && node scripts/import-cloudinary.cjs`
- Double-check your API key and secret from Cloudinary dashboard

### Error: "No images found"
- Verify your cloud name is correct (`dvwdoezk1`)
- Check that you have images uploaded to Cloudinary
- Ensure API key has sufficient permissions

### Images not organized correctly
- The script uses filename patterns to detect countries (e.g., `EGY-`, `ITA-`, etc.)
- If your images don't follow this pattern, they'll be placed in "Mixed Countries"
- You can edit the `COUNTRY_MAPPING` in the script to add more patterns

## Manual Alternative

If you prefer to add images manually, you can:

1. Copy the existing image URLs from your current `data.ts`
2. Add new images following the same pattern:
```typescript
{ desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1234567890/your-image.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1234567890/your-image.jpg' }
```

## Security Note

- Never commit your `.env` file to git
- The `.env` file is already in `.gitignore`
- Your API secret should remain private