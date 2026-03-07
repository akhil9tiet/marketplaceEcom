import React from 'react';
import { cn } from '../../utils/cn';
import { ListingStatus } from '../../types';

interface BadgeProps {
  status: ListingStatus;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ status, className }) => {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide',
        status === ListingStatus.Available
          ? 'bg-green-100 text-green-800'
          : 'bg-amber-100 text-amber-800',
        className
      )}
    >
      {status}
    </span>
  );
};
