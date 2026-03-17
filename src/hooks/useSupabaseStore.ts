import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { ListingItem } from '../types';

export function useSupabaseStore() {
  const [listings, setListings] = useState<ListingItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchListings = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Failed to fetch listings:', error);
    } else {
      setListings(data as ListingItem[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  const addListing = async (item: Omit<ListingItem, 'id' | 'created_at' | 'updated_at'>) => {
    const { error } = await supabase.from('listings').insert(item);
    if (!error) await fetchListings();
    return error;
  };

  const updateListing = async (item: ListingItem) => {
    const { error } = await supabase
      .from('listings')
      .update({
        title: item.title,
        description: item.description,
        price: item.price,
        old_price: item.old_price,
        status: item.status,
        image_urls: item.image_urls,
        dim_length: item.dim_length,
        dim_width: item.dim_width,
        dim_height: item.dim_height,
        sort_order: item.sort_order,
      })
      .eq('id', item.id);
    if (!error) await fetchListings();
    return error;
  };

  const deleteListing = async (id: string) => {
    const { error } = await supabase.from('listings').delete().eq('id', id);
    if (!error) await fetchListings();
    return error;
  };

  return { listings, loading, addListing, updateListing, deleteListing, refetch: fetchListings };
}