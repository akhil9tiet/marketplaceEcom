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
      {/* Hero Section */}
      <div className="relative z-40 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20 text-center">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Quality Items, Reasonable Prices
          </h1>
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto mb-8">
            All prices listed are fair and reasonable for the condition and quality of each item. Browse the listings below and grab what you need!
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 max-w-xl mx-auto text-left border border-white/10">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-2">
              Pickup Directions
            </h2>
            <p className="text-gray-200 text-sm md:text-base leading-relaxed">
              Please send me a message when you reach <a href="https://maps.google.com/?q=Hazen+High+School,+1101+Hoquiam+Ave+NE,+Renton,+WA+98059" target="_blank" rel="noopener noreferrer" className="font-semibold text-white underline underline-offset-2 hover:text-gray-200">Hazen High School, Renton</a> — 1101 Hoquiam Ave NE, Renton, WA 98059. I will send you the exact address then.
            </p>
          </div>
          <p className="mt-4 text-xs text-gray-400 italic">
            * We are currently working to update the dimensions for all listings. Please check back soon.
          </p>
        </div>
      </div>

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
      <div className="fixed top-0 z-50 w-full bg-white/90 px-6 py-3 backdrop-blur-md transition-all md:hidden border-b border-gray-100">
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
