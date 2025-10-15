import { useEffect, useCallback } from 'react';

export function useImageProtection() {
  // Prevent common keyboard shortcuts
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Prevent F12 (Dev Tools)
    if (e.key === 'F12') {
      e.preventDefault();
      return false;
    }
    
    // Prevent Ctrl+Shift+I (Dev Tools)
    if (e.ctrlKey && e.shiftKey && e.key === 'I') {
      e.preventDefault();
      return false;
    }
    
    // Prevent Ctrl+Shift+C (Element Inspector)
    if (e.ctrlKey && e.shiftKey && e.key === 'C') {
      e.preventDefault();
      return false;
    }
    
    // Prevent Ctrl+Shift+J (Console)
    if (e.ctrlKey && e.shiftKey && e.key === 'J') {
      e.preventDefault();
      return false;
    }
    
    // Prevent Ctrl+U (View Source)
    if (e.ctrlKey && e.key === 'u') {
      e.preventDefault();
      return false;
    }
    
    // Prevent Ctrl+S (Save Page)
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      return false;
    }
    
    // Prevent Ctrl+A (Select All)
    if (e.ctrlKey && e.key === 'a') {
      e.preventDefault();
      return false;
    }
    
    // Prevent Ctrl+P (Print)
    if (e.ctrlKey && e.key === 'p') {
      e.preventDefault();
      return false;
    }
    
    // Prevent Print Screen
    if (e.key === 'PrintScreen') {
      e.preventDefault();
      return false;
    }
    
    // Prevent Alt+PrintScreen (Alt+PrtScr)
    if (e.altKey && e.key === 'PrintScreen') {
      e.preventDefault();
      return false;
    }
  }, []);

  // Prevent right-click context menu
  const handleContextMenu = useCallback((e: MouseEvent) => {
    e.preventDefault();
    return false;
  }, []);

  // Prevent drag start
  const handleDragStart = useCallback((e: DragEvent) => {
    e.preventDefault();
    return false;
  }, []);

  // Prevent text selection
  const handleSelectStart = useCallback((e: Event) => {
    e.preventDefault();
    return false;
  }, []);

  // Handle touch events for mobile protection
  const handleTouchStart = useCallback((e: TouchEvent) => {
    // Prevent long press on images
    if (e.touches.length > 1) {
      e.preventDefault();
      return false;
    }
  }, []);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    // Prevent context menu on touch end
    e.preventDefault();
    return false;
  }, []);

  // Detect dev tools opening (disabled to prevent slideshow blur)
  useEffect(() => {
    // Temporarily disabled dev tools detection that was causing blur
    // The blur was interfering with normal slideshow display
    
    return () => {
      // Clean up any remaining filters
      document.body.style.filter = 'none';
      const protectedElements = document.querySelectorAll('.protected-container');
      protectedElements.forEach(el => {
        (el as HTMLElement).style.filter = 'none';
      });
    };
  }, []);

  // Disable console functions
  useEffect(() => {
    // Store original functions
    const originalConsole = { ...console };
    
    // Override console functions
    console.log = () => {};
    console.warn = () => {};
    console.error = () => {};
    console.info = () => {};
    console.debug = () => {};
    console.clear = () => {};
    
    return () => {
      // Restore original functions
      Object.assign(console, originalConsole);
    };
  }, []);

  useEffect(() => {
    // Add event listeners
    document.addEventListener('keydown', handleKeyDown, true);
    document.addEventListener('contextmenu', handleContextMenu, true);
    document.addEventListener('dragstart', handleDragStart, true);
    document.addEventListener('selectstart', handleSelectStart, true);
    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchend', handleTouchEnd, { passive: false });

    // Prevent right-click on images specifically
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.addEventListener('contextmenu', handleContextMenu);
      img.addEventListener('dragstart', handleDragStart);
    });

    // Disable print
    window.addEventListener('beforeprint', (e) => {
      e.preventDefault();
      return false;
    });

    // Disable screenshot keys
    window.addEventListener('keyup', (e) => {
      if (e.key === 'PrintScreen') {
        navigator.clipboard?.writeText('');
      }
    });

    return () => {
      // Remove event listeners
      document.removeEventListener('keydown', handleKeyDown, true);
      document.removeEventListener('contextmenu', handleContextMenu, true);
      document.removeEventListener('dragstart', handleDragStart, true);
      document.removeEventListener('selectstart', handleSelectStart, true);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);

      // Remove image-specific listeners
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        img.removeEventListener('contextmenu', handleContextMenu);
        img.removeEventListener('dragstart', handleDragStart);
      });
    };
  }, [handleKeyDown, handleContextMenu, handleDragStart, handleSelectStart, handleTouchStart, handleTouchEnd]);

  // Return utility functions for manual protection
  return {
    protectElement: (element: HTMLElement) => {
      element.addEventListener('contextmenu', handleContextMenu);
      element.addEventListener('dragstart', handleDragStart);
      element.addEventListener('selectstart', handleSelectStart);
      element.style.webkitUserSelect = 'none';
      element.style.userSelect = 'none';
      element.style.webkitTouchCallout = 'none';
      element.draggable = false;
    },
    unprotectElement: (element: HTMLElement) => {
      element.removeEventListener('contextmenu', handleContextMenu);
      element.removeEventListener('dragstart', handleDragStart);
      element.removeEventListener('selectstart', handleSelectStart);
    }
  };
}