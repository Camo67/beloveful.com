# Mobile Map Implementation

This document explains how the world map has been implemented behind the mobile drawer.

## Overview

The world map is now displayed behind the mobile drawer when it's opened, providing users with a visual context of photography locations even on mobile devices. This implementation enhances the mobile user experience by integrating the map directly into the mobile navigation flow.

## Implementation Details

### 1. Mobile Map Component ([src/components/MobileMap.tsx](file:///home/camo/fok/beloveful.com/src/components/MobileMap.tsx))

A dedicated component was created for the mobile map:

- Based on the existing LeafletWorldMap component
- Adapted for mobile viewport and performance
- Uses the same marker generation logic as the desktop map
- Only renders when the mobile menu is open to conserve resources

### 2. Header Integration ([src/components/Header.tsx](file:///home/camo/fok/beloveful.com/src/components/Header.tsx))

The mobile map was integrated into both header variants (home and default):

- Added as a fixed-position element with z-index below the mobile drawer
- Conditionally rendered based on mobile menu open state
- Works with both the home page (dark theme) and other pages (light/dark theme)

## Features

### Performance Optimizations
- Only renders when the mobile menu is open
- Uses the same clustering and marker logic as the desktop version
- Efficiently handles map interactions and events

### User Experience
- Provides geographic context when browsing navigation options
- Maintains the same marker interactions as the desktop version
- Does not interfere with mobile drawer functionality

### Responsive Design
- Adapts to mobile screen sizes
- Works with both light and dark themes
- Maintains proper z-index layering

## Technical Details

### Z-Index Layering
1. Mobile Map: z-index 30 (behind the drawer)
2. Mobile Drawer Backdrop: z-index 40
3. Mobile Drawer: z-index 50 (in front)

### Conditional Rendering
The map only renders when `isVisible` prop is true, which is tied to the mobile menu open state. This prevents unnecessary resource consumption when the map isn't visible.

### Theme Support
The map automatically adapts to the current theme (light/dark) using the same logic as the desktop version.

## Usage

When a user opens the mobile menu on any page:

1. The mobile map appears behind the menu
2. Markers show photography locations
3. Users can see the geographic distribution of photos
4. Closing the menu hides the map to conserve resources

## Benefits

1. **Enhanced Mobile Experience**: Provides geographic context on mobile devices
2. **Resource Efficiency**: Only loads when needed
3. **Consistent Design**: Matches desktop map functionality
4. **Performance**: Doesn't interfere with menu interactions
5. **Visual Appeal**: Adds visual interest to the mobile navigation

The mobile map implementation maintains the core functionality of the desktop map while optimizing for mobile constraints and user experience patterns.