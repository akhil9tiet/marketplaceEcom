import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ListingItem, ListingStatus } from '../../types';
import { Badge } from '../Shared/Badge';

interface OverlayDetailsProps {
  activeItem: ListingItem | null;
}

export const OverlayDetails: React.FC<OverlayDetailsProps> = ({ activeItem }) => {
  if (!activeItem) return null;

  return (
    <div className="fixed left-0 top-0 hidden h-screen w-1/3 flex-col justify-center px-12 py-12 md:flex lg:w-1/4">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeItem.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="space-y-6"
        >
          <div>
            <Badge status={activeItem.status} className="mb-4" />
            <h1 className={`text-4xl font-bold tracking-tight lg:text-5xl ${activeItem.status === ListingStatus.Sold ? 'text-gray-400' : 'text-gray-900'}`}>
              {activeItem.title}
            </h1>
            <p className={`mt-2 text-2xl font-medium ${activeItem.status === ListingStatus.Sold ? 'text-gray-300' : 'text-gray-500'}`}>
              {activeItem.old_price && (
                <span className="line-through text-gray-400 mr-2 text-xl">
                  {activeItem.old_price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </span>
              )}
              {activeItem.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
            </p>
          </div>

          <div className="h-px w-12 bg-gray-300" />

          <p className={`text-lg leading-relaxed ${activeItem.status === ListingStatus.Sold ? 'text-gray-300' : 'text-gray-600'}`}>
            {activeItem.description}
          </p>

          {(activeItem.dim_length || activeItem.dim_width || activeItem.dim_height) && (
            <div className="flex flex-wrap gap-2">
              {activeItem.dim_length && (
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${activeItem.status === ListingStatus.Sold ? 'bg-gray-100 text-gray-400' : 'bg-gray-100 text-gray-700'}`}>
                  L: {activeItem.dim_length}"
                </span>
              )}
              {activeItem.dim_width && (
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${activeItem.status === ListingStatus.Sold ? 'bg-gray-100 text-gray-400' : 'bg-gray-100 text-gray-700'}`}>
                  W: {activeItem.dim_width}"
                </span>
              )}
              {activeItem.dim_height && (
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${activeItem.status === ListingStatus.Sold ? 'bg-gray-100 text-gray-400' : 'bg-gray-100 text-gray-700'}`}>
                  H: {activeItem.dim_height}"
                </span>
              )}
            </div>
          )}

        </motion.div>
      </AnimatePresence>
    </div>
  );
};
