import { useState, useEffect } from 'react';
import { ListingItem } from '../types';
import { seedListings } from '../data/seed';

const STORAGE_KEY = 'whatsapp-gallery-listings';

export function useLocalDataStore() {
  const [listings, setListings] = useState<ListingItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Load initial data
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Migration: Convert imageUrl to imageUrls if needed
        const migrated = parsed.map((item: any) => {
          if (item.imageUrl && !item.imageUrls) {
            const { imageUrl, ...rest } = item;
            return { ...rest, imageUrls: [imageUrl] };
          }
          return item;
        });
        setListings(migrated);
      } catch (e) {
        console.error("Failed to parse stored listings", e);
        setListings(seedListings);
      }
    } else {
      setListings(seedListings);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seedListings));
    }
    setLoading(false);
  }, []);

  // Save changes to localStorage
  const saveListings = (newListings: ListingItem[]) => {
    setListings(newListings);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newListings));
  };

  const addListing = (item: ListingItem) => {
    const updated = [item, ...listings];
    saveListings(updated);
  };

  const updateListing = (updatedItem: ListingItem) => {
    const updated = listings.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    saveListings(updated);
  };

  const deleteListing = (id: string) => {
    const updated = listings.filter((item) => item.id !== id);
    saveListings(updated);
  };

  const reorderListings = (newListings: ListingItem[]) => {
    saveListings(newListings);
  };

  return {
    listings,
    loading,
    addListing,
    updateListing,
    deleteListing,
    reorderListings,
  };
}
