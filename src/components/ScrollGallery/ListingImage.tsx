import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ListingItem, ListingStatus } from '../../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ListingImageProps {
  item: ListingItem;
  index: number;
}

export const ListingImage: React.FC<ListingImageProps> = ({ item, index }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null); // Reset touch end
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextImage();
    }
    if (isRightSwipe) {
      prevImage();
    }
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (item.imageUrls.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % item.imageUrls.length);
    }
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (item.imageUrls.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + item.imageUrls.length) % item.imageUrls.length);
    }
  };

  const goToImage = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(idx);
  };

  return (
    <motion.div
      id={item.id}
      className="relative flex min-h-[80vh] w-full items-center justify-center p-4 md:min-h-screen md:p-12"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, margin: "-10%" }}
    >
      <motion.div
        className="group relative aspect-[3/4] w-full max-w-md overflow-hidden rounded-2xl shadow-2xl md:max-w-lg lg:max-w-xl"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4 }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="relative h-full w-full bg-gray-100">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={item.imageUrls[currentImageIndex]}
              alt={item.title}
              className="absolute inset-0 h-full w-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              loading="lazy"
              draggable={false}
            />
          </AnimatePresence>
        </div>

        {item.imageUrls.length > 1 && (
          <>
            {/* Navigation Arrows - Always visible on mobile, hover on desktop */}
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-black opacity-100 shadow-sm transition-all hover:bg-white md:opacity-0 md:group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-black opacity-100 shadow-sm transition-all hover:bg-white md:opacity-0 md:group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Pagination Dots - Clickable */}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2 z-10">
              {item.imageUrls.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => goToImage(idx, e)}
                  className={`h-2 w-2 rounded-full transition-all ${
                    idx === currentImageIndex 
                      ? 'bg-white scale-110' 
                      : 'bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Mobile Overlay Gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
        
        {/* Mobile Text Overlay - Only visible on small screens */}
        <div className="pointer-events-none absolute bottom-0 left-0 w-full p-6 text-white md:hidden">
          <span className={`mb-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide ${
            item.status === ListingStatus.Available
              ? 'bg-green-100 text-green-800'
              : item.status === ListingStatus.Pending
                ? 'bg-orange-100 text-orange-800'
                : 'bg-red-100 text-red-800'
          }`}>
            {item.status}
          </span>
          <h2 className={`text-2xl font-bold ${item.status === ListingStatus.Sold ? 'text-gray-300' : ''}`}>{item.title}</h2>
          <p className="mt-1 text-lg font-medium">
            {item.oldPrice && (
              <span className="line-through text-gray-400 mr-1.5 text-sm">
                {item.oldPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
              </span>
            )}
            {item.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
          </p>
          {item.dimensions && (
            <div className="mt-2 flex gap-1.5">
              <span className="rounded-full bg-white/20 backdrop-blur-sm px-2.5 py-0.5 text-[11px] font-medium text-white">
                L: {item.dimensions.length}"
              </span>
              <span className="rounded-full bg-white/20 backdrop-blur-sm px-2.5 py-0.5 text-[11px] font-medium text-white">
                W: {item.dimensions.width}"
              </span>
              <span className="rounded-full bg-white/20 backdrop-blur-sm px-2.5 py-0.5 text-[11px] font-medium text-white">
                H: {item.dimensions.height}"
              </span>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};
