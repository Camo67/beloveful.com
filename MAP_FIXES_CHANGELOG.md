# Map Fixes Changelog

## Key Features Restored

The following core features have been restored:

1. **Interactive Markers**: Clickable markers that navigate to album pages.
2. **Clustering**: Grouped markers for better performance when displaying many locations.
3. **Theme Support**: Automatic light/dark mode based on site theme.
4. **Responsive Design**: Optimized for all device sizes.
5. **Smooth Animations**: Fade effects during zooming and panning.
6. **Proper Error Handling**: Type-safe mappings with runtime assertions.

## Overview
This update addresses issues with map interactions and UI stability during map usage. The changes ensure that all countries and markers correctly open their associated folders, and that the header remains visible and interactive during all map actions.

## Files Modified

### 1. src/lib/map-markers.ts
- Added coordinates for previously missing countries:
  - Argentina: [-38.4161, -63.6167]
  - Jordan: [30.5852, 36.2384]
  - India: [20.5937, 78.9629]
  - Spain: [40.4637, -3.7492]
  - Puerto Rico: [18.2002, -66.6645]
- Updated the coordinate mapping to ensure all countries have proper positioning

### 2. src/components/LeafletWorldMap.tsx
- Fixed click handlers for markers to use React Router's navigate function instead of window.location.assign for better SPA navigation
- Improved marker click handling to ensure consistent behavior across all markers
- Maintained existing clustering and visual functionality

### 3. src/components/Header.tsx
- Updated z-index values to ensure header stays above map elements
- Changed positioning to fixed for home variant and sticky for default variant
- Increased z-index of social icons and navigation elements to prevent overlap

## Testing Notes

### Countries Fixed
- ✅ Argentina: Now correctly responds to clicks and opens the proper folder
- ✅ Jordan: Now correctly responds to clicks and opens the proper folder
- ✅ Existing working countries (Morocco, Egypt, Ethiopia, South Africa, Namibia, Nepal, Thailand, Vietnam, Hong Kong, Japan) remain functional

### Numbered Points
- ✅ Markers #2, #3, #4 now respond on first click
- ✅ Split behavior on click has been prevented
- ✅ Gesture threshold has been improved for clean UX

### Coordinates & Mapping
- ✅ All countries now use the correct latitude/longitude values as specified
- ✅ Folder mapping has been verified and corrected where needed
- ✅ Visual positioning of markers and polygons now aligns with geographic coordinates

### UI/Header
- ✅ Header and dropdown remain visible during all map interactions
- ✅ Header stays mounted during map zoom/pan operations
- ✅ Dropdown remains interactive during map interactions

## Technical Implementation Details

### Coordinate System
The following coordinate mapping was implemented:
```typescript
export const COUNTRY_COORDS = {
  ARG: { lat: -38.4161, lng: -63.6167 }, // Argentina
  JOR: { lat: 30.5852,  lng: 36.2384  }, // Jordan
  IND: { lat: 20.5937,  lng: 78.9629  }, // India
  ESP: { lat: 40.4637,  lng: -3.7492  }, // Spain
  PRI: { lat: 18.2002,  lng: -66.6645 }, // Puerto Rico
};
```

### Folder Mapping
The following folder mapping was verified:
```typescript
export const COUNTRY_FOLDER_MAP: Record<string, string> = {
  ARG: 'folder-argentina',
  JOR: 'folder-jordan',
  IND: 'folder-india',
  ESP: 'folder-spain',
  PRI: 'folder-puerto-rico',
  MAR: 'folder-morocco',
  EGY: 'folder-egypt',
  ETH: 'folder-ethiopia',
  ZAF: 'folder-south-africa',
  NAM: 'folder-namibia',
  NPL: 'folder-nepal',
  THA: 'folder-thailand',
  VNM: 'folder-vietnam',
  HKG: 'folder-hong-kong',
  JPN: 'folder-japan',
};
```

### CSS Changes
Updated header CSS for proper layering:
```css
.app-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,.08);
}
.app-header--fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
.map-container {
  position: relative;
  z-index: 0;
}
```

## Definition of Done
All acceptance criteria have been tested and pass on:
- ✅ Chrome
- ✅ Firefox
- ✅ Mobile browser (Safari on iOS)

The map now provides a consistent, reliable user experience with all interactive elements working as expected.

## Recent Changes

### 2025-10-28
- Fixed marker positions for Chicago and New York.
- Corrected Asia region boundaries.
- Restored functionality for Argentina and Jordan folders.
- Ensured pointer events work correctly on all interactive elements.
- Added polygon support for country click events.
- Improved hit detection using ISO codes and coordinates.
