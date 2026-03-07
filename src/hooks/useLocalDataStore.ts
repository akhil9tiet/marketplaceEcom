import { useState, useEffect } from 'react';
import { ListingItem, ListingStatus } from '../types';
import { defaultListings } from '../data/listings';

const STORAGE_KEY = 'whatsapp-gallery-listings';

// Migrate old lowercase status values to new enum values
function migrateStatus(status: string): ListingStatus {
  if (status === 'available' || status === ListingStatus.Available) return ListingStatus.Available;
  if (status === 'sold' || status === ListingStatus.Sold) return ListingStatus.Sold;
  return ListingStatus.Available;
}

export function useLocalDataStore() {
  const [listings, setListings] = useState<ListingItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Load initial data
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Migration: Convert imageUrl to imageUrls if needed, and migrate status enum
        const migrated = parsed.map((item: any) => {
          let migrated = item;
          if (migrated.imageUrl && !migrated.imageUrls) {
            const { imageUrl, ...rest } = migrated;
            migrated = { ...rest, imageUrls: [imageUrl] };
          }
          migrated = { ...migrated, status: migrateStatus(migrated.status) };
          return migrated;
        });
        setListings(migrated);
      } catch (e) {
        console.error("Failed to parse stored listings", e);
        setListings(defaultListings);
      }
    } else {
      setListings(defaultListings);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultListings));
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
