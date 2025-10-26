# API Removal Documentation

This document explains the removal of the API call in the use-erasing-borders hook and the switch to static data.

## Overview

The API call to `/api/collections/erasing-borders` has been removed from the `useErasingBorders` hook. The hook now directly uses static data from the `PROJECTS` array in the `data.ts` file.

## Changes Made

### 1. Updated use-erasing-borders Hook ([src/hooks/use-erasing-borders.ts](file:///home/camo/fok/beloveful.com/src/hooks/use-erasing-borders.ts))

- Removed the try/catch block that attempted to fetch data from the API
- Removed the API response type interface (`ApiResponse`)
- Simplified the query function to directly access local data
- Maintained the same data transformation and limiting logic

## Benefits

1. **Eliminates Proxy Errors**: Removes the vite proxy error for `/api/collections/erasing-borders`
2. **Improved Performance**: No network requests needed for loading the Erasing Borders project
3. **Simplified Architecture**: Removes dependency on backend API for this feature
4. **Better Reliability**: No risk of network failures or API downtime affecting the project display
5. **Faster Loading**: Data loads directly from the client bundle

## Technical Details

### Previous Implementation
The hook previously:
1. Attempted to fetch data from `/api/collections/erasing-borders`
2. Fell back to local data if the API call failed
3. Required a proxy configuration in vite.config.ts

### New Implementation
The hook now:
1. Directly accesses data from the `PROJECTS` array in `data.ts`
2. Transforms and limits the data as before
3. Requires no network requests or proxy configuration

## Data Flow

1. `prefix-mapped.json` is imported in `data.ts`
2. `data.ts` processes this data into the `PROJECTS` array
3. `use-erasing-borders.ts` accesses the "erasing-borders" project from `PROJECTS`
4. The hook returns the images for use in components

## Testing

The change can be tested by:
1. Visiting the Projects page (`/projects`)
2. Viewing the Erasing Borders project page (`/projects/erasing-borders`)
3. Confirming that images are displayed correctly
4. Verifying no network requests are made to the API endpoint

This change makes the application more self-contained and eliminates the dependency on the backend API for the Erasing Borders project images.