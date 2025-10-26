n # Workshop Images Documentation

This document explains how to work with workshop images in the beloveful.com project.

## Structure

Workshop images are stored in the Cloudinary asset structure:
```
src/lib/cloudinary-assets/Workshop Photos/
```

Each workshop image or set of images is organized in subdirectories with accompanying metadata files:
- `urls.json` - Contains image metadata and URLs for a specific image/set
- `assets.csv` - CSV format of image data
- `urls.txt` - Plain text list of URLs

## Generated Files

The system generates these consolidated files:

1. `src/lib/cloudinary-assets/all-workshop-images.json` - A comprehensive JSON file containing metadata for all workshop images
2. `src/lib/workshopImages.ts` - TypeScript module for accessing workshop images with type safety

## Scripts

### Generate Workshop Images Data

To regenerate the consolidated workshop images data, run:

```bash
npm run workshop:generate
```

This script:
1. Traverses all directories under `src/lib/cloudinary-assets/Workshop Photos/`
2. Collects image metadata from all `urls.json` files
3. Generates `src/lib/cloudinary-assets/all-workshop-images.json`

## Usage in Code

### Import all workshop images:

```typescript
import workshopImages from '@/lib/workshopImages';
```

### Find a specific image:

```typescript
import { getWorkshopImageByName } from '@/lib/workshopImages';

const image = getWorkshopImageByName('Copy of CHI-3');
```

### Filter images by format:

```typescript
import { getWorkshopImagesByFormat } from '@/lib/workshopImages';

const jpgImages = getWorkshopImagesByFormat('jpg');
```

## Data Structure

Each workshop image object contains:

```typescript
interface WorkshopImage {
  filename: string;    // Image filename without extension
  url: string;         // Full Cloudinary URL
  format: string;      // File format (jpg, png, etc.)
  width: string;       // Image width in pixels
  height: string;      // Image height in pixels
  bytes: string;       // File size in bytes
}
```

## Adding New Workshop Images

1. Add new images to the appropriate directory under `src/lib/cloudinary-assets/Workshop Photos/`
2. Ensure each image or set has a `urls.json` file with proper metadata
3. Run `npm run workshop:generate` to update the consolidated data file