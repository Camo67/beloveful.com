# Image Routing System

This document explains how the image routing system works in the beloveful.com project.

## Overview

The image routing system provides structured URLs to access images organized by region and country. It uses the comprehensive image data system to categorize and display images based on their geographic location.

## URL Structure

The gallery URLs follow this structure:

1. **Main Gallery**: `/gallery` - Shows all regions
2. **Region Gallery**: `/gallery/:region` - Shows all countries in a region
3. **Country Gallery**: `/gallery/:region/:country` - Shows all images from a specific country

Examples:
- `/gallery` - Main gallery page
- `/gallery/North%20America` - North America region page
- `/gallery/North%20America/Chicago` - Chicago country page (displays Chicago images)

## Components

### 1. GalleryPage ([src/pages/GalleryPage.tsx](file:///home/camo/fok/beloveful.com/src/pages/GalleryPage.tsx))

The main gallery page that displays all regions with their country and image counts.

Features:
- Shows all regions in a grid layout
- Displays preview images for each region
- Shows country and image counts for each region
- Links to individual region pages

### 2. RegionPage ([src/pages/RegionPage.tsx](file:///home/camo/fok/beloveful.com/src/pages/RegionPage.tsx))

Displays all countries within a specific region.

Features:
- Shows all countries in the region
- Displays preview images for each country
- Shows image counts for each country
- Links to individual country galleries

### 3. ImageGallery ([src/pages/ImageGallery.tsx](file:///home/camo/fok/beloveful.com/src/pages/ImageGallery.tsx))

Displays images for a specific region or country.

Features:
- Shows all images for the selected region/country
- Uses SimpleImageGrid for image display
- Responsive image grid layout
- Handles both region and country level galleries

## Routing Implementation

The routing is implemented in [App.tsx](file:///home/camo/fok/beloveful.com/src/App.tsx) with the following routes:

```tsx
<Route path="/gallery" element={<GalleryPage />} />
<Route path="/gallery/:region" element={<RegionPage />} />
<Route path="/gallery/:region/:country" element={<ImageGallery />} />
```

## Data Flow

1. **URL Request**: User visits a gallery URL
2. **Parameter Extraction**: Components use `useParams` to extract region/country parameters
3. **Data Lookup**: Components query the `ORGANIZED_IMAGE_DATA` to find matching images
4. **Display**: Images are displayed using the SimpleImageGrid component

## URL Encoding

Region and country names in URLs are URL-encoded to handle special characters:

- Spaces become `%20`
- Other special characters are encoded appropriately

When processing parameters in components, they are decoded using `decodeURIComponent`.

## Navigation

The system provides clear navigation paths:
- From main gallery to regions
- From regions to countries
- From countries to image display
- Back links to navigate upward in the hierarchy

## Example Navigation Flow

1. User visits `/gallery`
   - Sees list of all regions
   
2. User clicks on "North America"
   - Navigates to `/gallery/North%20America`
   - Sees list of all countries in North America
   
3. User clicks on "Chicago"
   - Navigates to `/gallery/North%20America/Chicago`
   - Sees all images from Chicago

## Benefits

1. **Structured URLs**: Easy to understand and share
2. **Hierarchical Navigation**: Clear path from general to specific
3. **SEO Friendly**: URLs describe the content they display
4. **Responsive Design**: Works on all device sizes
5. **Performance**: Efficient data lookup and display

## Testing

You can test the routing system by visiting:

- `/gallery` - Main gallery
- `/gallery/North%20America` - North America region
- `/gallery/North%20America/Chicago` - Chicago images

The system will automatically organize and display images based on the URL structure.