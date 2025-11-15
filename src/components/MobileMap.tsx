import React from 'react';
import LeafletWorldMap from './LeafletWorldMap';

type MobileMapProps = {
  isVisible: boolean;
  openFolder: (folderId: string) => void;
};

function MobileMap({ isVisible, openFolder }: MobileMapProps) {
  if (!isVisible) return null;
  return (
    <div
      className="fixed inset-0 z-30 pointer-events-none" // sits behind drawer; prevent touch capture
      aria-hidden="true"
    >
      <div className="h-full w-full pointer-events-auto">
        <LeafletWorldMap openFolder={openFolder} />
      </div>
    </div>
  );
}

export default MobileMap;