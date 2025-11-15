import React from 'react';

type MarkerButtonProps = {
  id: "2" | "3" | "4"; // or string
  folderId: string;
  onOpen: (id: string) => void;
};

export function NumberedMarker({ id, folderId, onOpen }: MarkerButtonProps) {
  return (
    <button
      className="marker-numbered"
      data-id={id}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation(); // avoid map drag/gestures
        onOpen(folderId);
      }}
      onMouseDown={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
      aria-label={`Open folder for marker #${id}`}
    >
      {id}
    </button>
  );
}