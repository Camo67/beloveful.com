# Simple Image System

This document explains how to use the simple image system as an alternative to the complex Cloudinary-based system.

## Overview

The simple image system provides a lightweight alternative to the Cloudinary-based image handling system. It removes all the complex proxying, transformations, and optimization features in favor of direct image loading.

## Components

### 1. Simple Image Library (`src/lib/simple-images.ts`)

This library provides basic functions for handling images:

- `createImageUrl()` - Creates a direct image URL without any proxy or transformation
- `getImageAltText()` - Generates alt text for images
- `buildSimpleSrcSet()` - Creates a basic srcset for responsive images

### 2. Simple Image Grid (`src/components/SimpleImageGrid.tsx`)

A simplified version of the ImageGrid component that uses the simple image system.

### 3. Simple Data Structures (`src/lib/simple-data.ts`)

Provides simplified data structures for albums and projects that don't depend on Cloudinary.

### 4. Simple Image Hook (`src/hooks/useSimpleImages.ts`)

A React hook for tracking image loading status.

## Usage

### Using the Simple Image Grid

```tsx
import SimpleImageGrid from '@/components/SimpleImageGrid';

const MyComponent = () => {
  const images = [
    { 
      desktop: 'https://example.com/image1.jpg',
      mobile: 'https://example.com/image1-mobile.jpg'
    },
    {
      desktop: 'https://example.com/image2.jpg',
      mobile: 'https://example.com/image2-mobile.jpg'
    }
  ];

  return (
    <SimpleImageGrid 
      images={images} 
      maxColumns={3}
      gap={16}
    />
  );
};
```

### Using the Simple Image Hook

```tsx
import { useSimpleImages } from '@/hooks/useSimpleImages';

const MyComponent = () => {
  const imageUrls = [
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg'
  ];
  
  const { loadedImages, loading } = useSimpleImages(imageUrls);
  
  return (
    <div>
      {loading ? (
        <p>Loading images...</p>
      ) : (
        <p>All images loaded!</p>
      )}
    </div>
  );
};
```

### Switching to Simple System in Existing Components

You can also use the existing ImageGrid component with the simple system by setting the `useSimpleSystem` prop to `true`:

```tsx
import ImageGrid from '@/components/ImageGrid';

const MyComponent = () => {
  const images = [
    { 
      desktop: 'https://example.com/image1.jpg',
      mobile: 'https://example.com/image1-mobile.jpg'
    }
  ];

  return (
    <ImageGrid 
      images={images} 
      useSimpleSystem={true}
    />
  );
};
```

## Benefits of the Simple System

1. **No external dependencies** - No need for Cloudinary or other image services
2. **Faster implementation** - Less complex code to understand and maintain
3. **Direct image loading** - Images load directly from their source URLs
4. **Easier debugging** - Fewer layers of abstraction make it easier to identify issues
5. **Reduced bundle size** - Removes complex image processing code

## Limitations

1. **No image optimization** - Images are not automatically optimized for different devices
2. **No proxy caching** - Images are not cached through a proxy server
3. **No responsive transformations** - All devices load the same image size
4. **No lazy loading optimization** - Basic browser lazy loading only

## Migration Path

To migrate from the Cloudinary system to the simple system:

1. Replace imports of image utilities from `@/lib/images` to `@/lib/simple-images`
2. Replace `ImageGrid` with `SimpleImageGrid` or use the `useSimpleSystem` prop
3. Update data structures to match the simple types
4. Remove any Cloudinary-specific configuration

## Testing

You can test the simple image system by visiting `/test-simple-images` in your browser.