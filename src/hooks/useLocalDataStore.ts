import { useState, useEffect, useCallback } from 'react';
import { ListingItem, ListingStatus } from '../types';
import { defaultListings } from '../data/listings';

const USER_LISTINGS_KEY = 'marketplace-user-listings';
const OVERRIDES_KEY = 'marketplace-default-overrides';

// Stores partial overrides for default listings (e.g. status changes, edits)
type OverridesMap = Record<string, Partial<ListingItem>>;

export function useLocalDataStore() {
  const [userListings, setUserListings] = useState<ListingItem[]>([]);
  const [overrides, setOverrides] = useState<OverridesMap>({});
  const [loading, setLoading] = useState(true);

  // Load user listings and overrides from localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(USER_LISTINGS_KEY);
      if (storedUser) setUserListings(JSON.parse(storedUser));

      const storedOverrides = localStorage.getItem(OVERRIDES_KEY);
      if (storedOverrides) setOverrides(JSON.parse(storedOverrides));
    } catch (e) {
      console.error("Failed to parse stored data", e);
    }
    setLoading(false);
  }, []);

  // Combined listings: defaults (with overrides) first, then user-added
  const listings: ListingItem[] = [
    ...defaultListings.map((item) =>
      overrides[item.id] ? { ...item, ...overrides[item.id], id: item.id } : item
    ),
    ...userListings,
  ];

  const saveUserListings = useCallback((updated: ListingItem[]) => {
    setUserListings(updated);
    localStorage.setItem(USER_LISTINGS_KEY, JSON.stringify(updated));
  }, []);

  const saveOverrides = useCallback((updated: OverridesMap) => {
    setOverrides(updated);
    localStorage.setItem(OVERRIDES_KEY, JSON.stringify(updated));
  }, []);

  const isDefaultListing = (id: string) =>
    defaultListings.some((item) => item.id === id);

  const addListing = (item: ListingItem) => {
    saveUserListings([item, ...userListings]);
  };

  const updateListing = (updatedItem: ListingItem) => {
    if (isDefaultListing(updatedItem.id)) {
      // Store only the changed fields as an override
      const base = defaultListings.find((d) => d.id === updatedItem.id)!;
      const override: Partial<ListingItem> = {};
      for (const key of Object.keys(updatedItem) as (keyof ListingItem)[]) {
        if (updatedItem[key] !== base[key]) {
          (override as any)[key] = updatedItem[key];
        }
      }
      saveOverrides({ ...overrides, [updatedItem.id]: override });
    } else {
      const updated = userListings.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      );
      saveUserListings(updated);
    }
  };

  const deleteListing = (id: string) => {
    if (isDefaultListing(id)) return; // Don't allow deleting default listings
    const updated = userListings.filter((item) => item.id !== id);
    saveUserListings(updated);
  };

  const reorderListings = (newListings: ListingItem[]) => {
    // Reorder only affects user listings order
    const defaultIds = new Set(defaultListings.map((d) => d.id));
    const reorderedUser = newListings.filter((item) => !defaultIds.has(item.id));
    saveUserListings(reorderedUser);
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
