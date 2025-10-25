# Asset Loading

This document explains how to access and use the JSON assets in the `cloudinary-assets` and `portolio` directories.

## Directory Structure

The project contains two main directories with JSON asset files:

1. `src/lib/cloudinary-assets/` - Contains Cloudinary asset data organized by region and country
2. `src/lib/portolio/` - Contains portfolio data organized by region (note the typo in directory name)

## API Routes

The following API routes are available to access JSON assets:

### Cloudinary Assets

- Route: `/api/content/assets/cloudinary-assets/*`
- Examples:
  - `/api/content/assets/cloudinary-assets/index.json` - Main index file
  - `/api/content/assets/cloudinary-assets/Africa/Egypt/urls.json` - Egypt URLs
  - `/api/content/assets/cloudinary-assets/clients/Netflix_Logo_RGB/urls.json` - Netflix logo URLs

### Portfolio Assets

- Route: `/api/content/assets/portolio/*`
- Examples:
  - `/api/content/assets/portolio/Africa/urls.json` - Africa portfolio URLs
  - `/api/content/assets/portolio/Asia/urls.json` - Asia portfolio URLs

## Frontend Usage

### Using Utility Functions

The easiest way to access these assets from the frontend is to use the utility functions in `src/lib/assetLoader.ts`:

```typescript
import { loadCloudinaryIndex, loadCloudinaryAsset, loadPortfolioAsset } from '@/lib/assetLoader';

// Load the main cloudinary index
try {
  const index = await loadCloudinaryIndex();
  console.log('Cloudinary index:', index);
} catch (error) {
  console.error('Failed to load cloudinary index:', error);
}

// Load a specific cloudinary asset
try {
  const assetData = await loadCloudinaryAsset('Africa/Egypt/urls.json');
  console.log('Egypt URLs:', assetData);
} catch (error) {
  console.error('Failed to load Egypt URLs:', error);
}

// Load a specific portfolio asset
try {
  const portfolioData = await loadPortfolioAsset('Africa/urls.json');
  console.log('Africa portfolio:', portfolioData);
} catch (error) {
  console.error('Failed to load Africa portfolio:', error);
}
```

### Direct Fetch Requests

You can also directly fetch the assets using standard fetch requests:

```typescript
// Load cloudinary index
const indexResponse = await fetch('/api/content/assets/cloudinary-assets.json');
const index = await indexResponse.json();

// Load a specific cloudinary asset
const assetResponse = await fetch('/api/content/assets/cloudinary-assets/Africa/Egypt/urls.json');
const assetData = await assetResponse.json();

// Load a specific portfolio asset
const portfolioResponse = await fetch('/api/content/assets/portolio/Africa/urls.json');
const portfolioData = await portfolioResponse.json();
```

## Example Implementation

An example component demonstrating how to use these assets can be found in `src/components/AssetExample.tsx`.

## Error Handling

When loading assets, always handle potential errors:

1. Network errors (failed requests)
2. 404 errors (file not found)
3. JSON parsing errors

The utility functions will throw errors that you should catch and handle appropriately in your application.

## Caching

Asset responses are not cached by default. If you need caching, implement it in your frontend code or consider using a service worker.