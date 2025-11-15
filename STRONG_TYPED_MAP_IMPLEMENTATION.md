# Strongly Typed Map Implementation

This document explains the new strongly-typed map implementation that ensures consistent behavior between desktop and mobile maps while preventing mapping errors.

## Overview

The new implementation introduces a type-safe system for handling country mappings, coordinates, and folder associations. This prevents common issues like:

- "Can't find folder" errors
- "Wrong country" mappings
- Inconsistent behavior between desktop and mobile maps

## Implementation Details

### 1. Types ([src/types/map.ts](file:///home/camo/fok/beloveful.com/src/types/map.ts))

Defined strongly-typed interfaces and enums for:
- Country codes (ISO 3166-1 alpha-3)
- Latitude/longitude coordinates
- Folder IDs
- Country feature properties

### 2. Mappings ([src/lib/map-mappings.ts](file:///home/camo/fok/beloveful.com/src/lib/map-mappings.ts))

Centralized single source of truth for:
- Country coordinates (using city-level centers for better zoom/centering)
- Country to folder mappings

### 3. Utilities ([src/lib/map-utils.ts](file:///home/camo/fok/beloveful.com/src/lib/map-utils.ts))

Helper functions for:
- Safely resolving country codes from map features
- Getting folder IDs for countries
- Getting coordinates for countries
- Runtime assertions to catch mapping errors during development

### 4. Component Updates

Both [LeafletWorldMap.tsx](file:///home/camo/fok/beloveful.com/src/components/LeafletWorldMap.tsx) and [MobileMap.tsx](file:///home/camo/fok/beloveful.com/src/components/MobileMap.tsx) were updated to:
- Use the new type-safe utilities
- Properly handle click events with stopPropagation
- Navigate to the correct folders using the openFolder prop

### 5. Numbered Markers ([src/components/NumberedMarker.tsx](file:///home/camo/fok/beloveful.com/src/components/NumberedMarker.tsx))

Created a dedicated component for numbered markers that:
- Prevents accidental "split" behavior
- Properly handles events with stopPropagation
- Uses consistent styling

## Benefits

1. **Type Safety**: Compile-time checking prevents many mapping errors
2. **Consistency**: Both desktop and mobile maps use the same mappings
3. **Maintainability**: Centralized mappings make updates easier
4. **Reliability**: Runtime assertions catch errors during development
5. **Performance**: More efficient lookups with typed keys

## CSS Layering

Added proper CSS layering in [src/index.css](file:///home/camo/fok/beloveful.com/src/index.css):
```css
.app-header { position: sticky; top: 0; z-index: 1000; }
.drawer-backdrop { z-index: 40; }
.drawer-panel    { z-index: 50; }
.mobile-map      { z-index: 30; }
```

This ensures the header/dropdown always stays visible and doesn't overlap with the map.

## Testing

Unit tests were added in [src/lib/__tests__/map-utils.test.ts](file:///home/camo/fok/beloveful.com/src/lib/__tests__/map-utils.test.ts) to verify:
- Country code resolution from map features
- Fallback mechanisms for name-based lookups

## Usage

The implementation ensures that when a user clicks on a map marker or country polygon:
1. The correct country code is identified
2. The appropriate folder ID is retrieved
3. The user is navigated to the correct page using the openFolder function

This happens consistently across both desktop and mobile implementations.

## Fault Tracing

When issues occur, you can check:

1. **Feature data**: Inspect a click on Argentina/Jordan in DevTools → verify `iso_a3` is present and equals `ARG`/`JOR`.
2. **Propagation**: Confirm `stopPropagation()` runs in both polygon and marker click handlers.
3. **Mapping coverage**: Temporarily call `assertMapped(code)` in dev. If it throws, add the country to `COUNTRY_FOLDER_MAP` and `COUNTRY_COORDS`.
4. **Mobile drawer**: With the drawer open, verify the map container has **lower z-index** and doesn't steal gestures.