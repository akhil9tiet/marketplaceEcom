import React, { useMemo } from 'react';
import { ListingItem } from '../../types';
import { ListingImage } from './ListingImage';
import { OverlayDetails } from './OverlayDetails';
import { useActiveSection } from '../../hooks/useActiveSection';

interface ScrollGalleryProps {
  items: ListingItem[];
}

export const ScrollGallery: React.FC<ScrollGalleryProps> = ({ items }) => {
  const itemIds = useMemo(() => items.map((item) => item.id), [items]);
  const activeId = useActiveSection(itemIds);
  
  const activeItem = useMemo(
    () => items.find((item) => item.id === activeId) || items[0],
    [items, activeId]
  );

  if (items.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-500">
        No items to display.
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-white">
      {/* Desktop Overlay - Fixed on the left */}
      <OverlayDetails activeItem={activeItem} />

      {/* Scrollable Content - Pushed to the right on desktop */}
      <div className="md:ml-[33%] md:w-[67%] lg:ml-[25%] lg:w-[75%]">
        <div className="flex flex-col gap-0 pb-24 pt-20 md:pb-0 md:pt-0">
          {items.map((item, index) => (
            <ListingImage key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
      
      {/* Mobile Sticky Header - Only visible on small screens */}
      <div className="fixed top-0 z-50 w-full bg-white/90 px-6 py-4 backdrop-blur-md transition-all md:hidden border-b border-gray-100">
         <div className="flex justify-between items-center">
            <span className="font-bold text-lg truncate pr-4">{activeItem?.title}</span>
            <span className="font-mono text-sm bg-black text-white px-2 py-1 rounded">
              {activeItem?.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
            </span>
         </div>
      </div>
    </div>
  );
};
