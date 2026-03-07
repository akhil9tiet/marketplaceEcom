import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps {
  status: 'available' | 'sold';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ status, className }) => {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide',
        status === 'available'
          ? 'bg-green-100 text-green-800'
          : 'bg-red-100 text-red-800',
        className
      )}
    >
      {status}
    </span>
  );
};
