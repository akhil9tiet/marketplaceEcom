import React from 'react';
import { ScrollGallery } from '../components/ScrollGallery/ScrollGallery';
import { useLocalDataStore } from '../hooks/useLocalDataStore';

export const Home: React.FC = () => {
  const { listings, loading } = useLocalDataStore();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-black" />
      </div>
    );
  }

  return <ScrollGallery items={listings} />;
};
