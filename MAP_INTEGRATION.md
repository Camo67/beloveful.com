# Map Integration in Travel Portfolio

This document explains how the world map has been integrated into the Travel Portfolio page.

## Overview

The world map has been integrated directly into the Travel Portfolio page as a header section, replacing the standalone map page. This provides visitors with an immediate visual overview of all photography locations.

## Implementation Details

### 1. Map Markers Generation ([src/lib/map-markers.ts](file:///home/camo/fok/beloveful.com/src/lib/map-markers.ts))

A new utility function was created to generate map markers from album data:

- Takes album data as input
- Maps country names to geographic coordinates
- Creates markers with:
  - Position (latitude/longitude)
  - Title (country and region)
  - Image preview (first image from the album)
  - Link to the album page

### 2. Portfolio Page Integration ([src/pages/Portfolio.tsx](file:///home/camo/fok/beloveful.com/src/pages/Portfolio.tsx))

The map was integrated into the Portfolio page with these features:

- Added a card-based container for the map
- Included show/hide toggle functionality
- Connected to album data to generate markers
- Maintained responsive design
- Preserved all existing portfolio functionality

### 3. Removed Standalone Map Route

The standalone `/map` route was removed since the map is now integrated into the portfolio page.

## Features

### Interactive Map
- Click on markers to navigate to country galleries
- Clustered markers for better performance with many locations
- Dark/light mode support based on site theme
- Smooth zooming and panning animations

### User Controls
- Show/hide toggle to conserve space
- Informative tooltips on markers
- Clear visual indication of photography locations

### Performance Optimizations
- Markers only generated when album data is loaded
- Efficient clustering of nearby locations
- Lazy loading of map components

## Data Mapping

Coordinates are mapped for these locations:
- Egypt
- Ethiopia
- Morocco
- Namibia
- South Africa
- Hong Kong
- Japan
- Myanmar
- Nepal
- Thailand
- Vietnam
- Jordan
- Chicago
- New York
- Argentina

Additional locations default to map center (20, 0).

## Usage

The map automatically appears at the top of the Travel Portfolio page. Users can:

1. View all photography locations on the world map
2. Toggle the map visibility with the "Show Map"/"Hide Map" button
3. Click on markers to navigate directly to country galleries
4. Use scroll wheel to zoom in/out
5. Drag the map to pan to different regions

## Benefits

1. **Improved User Experience**: Immediate visual context of photography locations
2. **Better Navigation**: Direct access to country galleries from the map
3. **Space Efficiency**: Integrated solution vs. separate page
4. **Consistent Design**: Matches the overall site aesthetic
5. **Performance**: Optimized loading and interaction

The integration makes it easier for visitors to explore the photography collection geographically while maintaining access to all existing portfolio features.