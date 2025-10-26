# Mobile Map Z-Index Fix

This document explains the fix for the mobile map appearing in front of the mobile drawer.

## Issue

The mobile map was appearing in front of the mobile drawer when the menu was opened, despite having a lower z-index value. This was happening because of the DOM element ordering and how CSS stacking contexts work.

## Solution

The solution involved adjusting the z-index values and ensuring proper DOM ordering:

1. Mobile Map: z-index 30 (behind everything)
2. Mobile Drawer Backdrop: z-index 40 (between map and drawer)
3. Mobile Drawer: z-index 50 (in front)

## Changes Made

### 1. Header Component ([src/components/Header.tsx](file:///home/camo/fok/beloveful.com/src/components/Header.tsx))
- Ensured the MobileMap component is rendered before the header and drawer components
- Maintained proper conditional rendering based on menu open state

### 2. MobileMap Component ([src/components/MobileMap.tsx](file:///home/camo/fok/beloveful.com/src/components/MobileMap.tsx))
- Kept z-index at 30 to ensure it's behind other UI elements
- Maintained conditional rendering to only show when menu is open

### 3. MobileDrawer Component ([src/components/MobileDrawer.tsx](file:///home/camo/fok/beloveful.com/src/components/MobileDrawer.tsx))
- Kept backdrop z-index at 40
- Kept drawer z-index at 50 (via CSS class)

## Technical Details

### Z-Index Layering
1. Mobile Map: z-index 30 (behind the drawer)
2. Mobile Drawer Backdrop: z-index 40 (semi-transparent overlay)
3. Mobile Drawer: z-index 50 (in front)

### Conditional Rendering
The map only renders when `isVisible` prop is true, which is tied to the mobile menu open state. This prevents unnecessary resource consumption when the map isn't visible.

### DOM Ordering
The elements are ordered in the DOM as follows:
1. Mobile Map (conditionally rendered)
2. Desktop Header
3. Mobile Header
4. Mobile Drawer

This ensures proper stacking context and layering.

## Testing

The fix can be tested by:
1. Opening the mobile menu on any page
2. Confirming the map appears behind the menu and backdrop
3. Verifying menu interactions work properly
4. Checking that closing the menu hides the map

This fix ensures the mobile map provides geographic context when the menu is open without interfering with menu functionality.