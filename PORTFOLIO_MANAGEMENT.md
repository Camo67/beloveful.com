# Portfolio Management System

This document describes the Cloudinary-based portfolio management system for the Beloveful Travel Photography website.

## Overview

The portfolio management system automatically fetches your travel photography images from Cloudinary and organizes them into country-based albums for your website. It uses intelligent filename parsing and tagging to automatically categorize images by region and country.

## Quick Start

1. **Set up your environment variables** in `.env`:
   ```bash
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

2. **Fetch your portfolio** from Cloudinary:
   ```bash
   npm run portfolio:fetch
   ```

3. **Analyze your current portfolio**:
   ```bash
   npm run portfolio:analyze
   ```

## Available Commands

### Core Commands

- `npm run portfolio:fetch` - Fetch all albums from Cloudinary and regenerate data
- `npm run portfolio:update` - Update existing albums with new images
- `npm run portfolio:analyze` - Analyze current portfolio structure and statistics
- `npm run portfolio:audit` - Audit for missing countries or unassigned images
- `npm run portfolio:tag` - Generate tagging suggestions for Cloudinary images

### Alternative Usage

You can also run the scripts directly:

```bash
# Main portfolio fetch
node scripts/fetch-cloudinary-portfolio.mjs

# Portfolio management commands
node scripts/portfolio-manager.mjs <command>
```

## How It Works

### 1. Image Detection

The system uses multiple strategies to identify which country/region each image belongs to:

**Strategy 1: Filename Prefixes**
- `EGY-123.jpg` → Egypt (Africa)
- `JAP-456.jpg` → Japan (Asia)
- `ITA-789.jpg` → Italy (Europe)

**Strategy 2: Cloudinary Tags**
- Uses existing tags on your Cloudinary images
- Matches tag names against country mappings

**Strategy 3: Pattern Matching**
- Recognizes location names in filenames
- `rome-sunset.jpg` → Italy
- `petra-landscape.jpg` → Jordan

**Strategy 4: Context Analysis**
- Uses Cloudinary folder structure
- Analyzes metadata and context fields

### 2. Country Mappings

The system includes comprehensive mappings for:

- **Africa**: Egypt, Ethiopia, Namibia, South Africa, Kenya, Tanzania, Morocco, etc.
- **Asia**: China, Hong Kong, India, Japan, Myanmar, Nepal, Philippines, Thailand, etc.
- **Middle East**: Israel/Palestine, Jordan, UAE, Turkey, Lebanon, etc.
- **South America**: Argentina, Brazil, Bolivia, Chile, Colombia, Ecuador, Peru, etc.
- **North America**: USA, Canada, Mexico, Guatemala, Costa Rica, etc.
- **Europe**: Italy, France, Greece, Spain, Portugal, Germany, UK, Ireland, etc.
- **Oceania**: Australia, New Zealand, Fiji, Papua New Guinea, etc.
- **Erasing Borders**: Special category for border/migration stories

### 3. Data Generation

The system generates:
- `src/lib/cloudinaryAlbums.ts` - Main portfolio data
- `cloudinary-fetch-report.json` - Debug report with unassigned images
- Organized albums sorted by region and country
- Consistent URL structure for all images

## File Structure

```
scripts/
├── fetch-cloudinary-portfolio.mjs  # Main fetching logic
├── portfolio-manager.mjs           # Management utilities
└── (existing scripts...)

src/lib/
├── cloudinaryAlbums.ts            # Generated portfolio data
├── data.ts                        # TypeScript interfaces
└── (other data files...)
```

## Managing Your Portfolio

### Adding New Countries

1. Add the country prefix to `COUNTRY_MAPPINGS` in `fetch-cloudinary-portfolio.mjs`
2. Upload images to Cloudinary with the appropriate prefix
3. Run `npm run portfolio:fetch` to regenerate

Example:
```javascript
'BRA': { region: 'South America', country: 'Brazil', slug: 'brazil' }
```

### Handling Unassigned Images

1. Run `npm run portfolio:audit` to see any issues
2. Run `npm run portfolio:tag` for tagging suggestions
3. Add appropriate tags in Cloudinary or update filename mappings
4. Re-run `npm run portfolio:fetch`

### Organizing Images in Cloudinary

**Best Practices:**
- Use consistent filename prefixes: `COUNTRY-description.jpg`
- Add country tags to images in Cloudinary
- Organize into folders by region/country when possible
- Use descriptive filenames that include location context

**Examples of Good Filenames:**
- `EGY-pyramids-sunset.jpg`
- `JAP-tokyo-street.jpg` 
- `ITA-venice-canals.jpg`
- `JOR-petra-treasury.jpg`

## Troubleshooting

### Common Issues

**No images found:**
- Check your Cloudinary credentials in `.env`
- Verify your API key has read permissions
- Check that you have images uploaded to Cloudinary

**Images not being assigned to countries:**
- Check filename patterns match the `COUNTRY_MAPPINGS`
- Add country tags to images in Cloudinary
- Run `npm run portfolio:tag` for suggestions

**Duplicate countries appearing:**
- Check for conflicting country mappings
- Ensure consistent slug generation
- Run `npm run portfolio:audit` to identify duplicates

### Debug Information

The system generates detailed debug information:

1. **Console Output**: Real-time progress and statistics
2. **Report File**: `cloudinary-fetch-report.json` with detailed analysis
3. **Audit Tools**: Built-in commands to check portfolio health

### Environment Variables

Required:
- `CLOUDINARY_CLOUD_NAME` - Your Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Your API key
- `CLOUDINARY_API_SECRET` - Your API secret

Optional:
- Set custom rate limits or batch sizes by modifying `CONFIG` in the script

## Advanced Usage

### Custom Country Mappings

You can extend or modify the country mappings by editing the `COUNTRY_MAPPINGS` object in `fetch-cloudinary-portfolio.mjs`. Each mapping includes:

```javascript
'PREFIX': { 
  region: 'Region Name',
  country: 'Country Display Name', 
  slug: 'url-slug' 
}
```

### Batch Processing

For large portfolios, the system automatically:
- Handles pagination (fetches all images)
- Implements rate limiting (100ms between requests)
- Provides progress updates
- Handles API errors gracefully

### Integration with Build Process

You can integrate portfolio updates into your build process:

```json
{
  "scripts": {
    "build": "npm run portfolio:fetch && npm run build:app"
  }
}
```

## API Rate Limits

The system respects Cloudinary's API limits:
- 500 images per request (configurable)
- 100ms delay between requests
- Automatic retry on rate limit errors
- Progress tracking for large collections

## Support

For issues with the portfolio management system:

1. Check the console output for specific error messages
2. Run `npm run portfolio:audit` to identify issues
3. Review the debug report: `cloudinary-fetch-report.json`
4. Verify your Cloudinary credentials and permissions

The system is designed to be robust and provide clear feedback about any issues encountered during the fetch process.