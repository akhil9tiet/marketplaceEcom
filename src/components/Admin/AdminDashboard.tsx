import React, { useState } from 'react';
import { UploadForm } from './UploadForm';
import { ListingsTable } from './ListingsTable';
import { ListingItem, ListingStatus } from '../../types';
import { Link } from 'react-router-dom';
import { ArrowLeft, LayoutDashboard, Loader } from 'lucide-react';
import { useSupabaseStore } from '@/src/hooks/useSupabaseStore';
import { seedListings } from '../../utils/seed';

export const AdminDashboard: React.FC = () => {
  const { listings, addListing, deleteListing, updateListing, refetch } = useSupabaseStore();
  const [editingItem, setEditingItem] = React.useState<ListingItem | null>(null);
  const [isSeeding, setIsSeeding] = useState(false);

  const handleToggleStatus = (item: ListingItem) => {
    updateListing({
      ...item,
      status: item.status === ListingStatus.Available ? ListingStatus.Sold : ListingStatus.Available,
    });
  };

  const handleSeedData = async () => {
    if (!confirm('This will replace all existing listings with 31 default listings. Continue?')) return;
    
    try {
      setIsSeeding(true);
      console.log('Starting seed process...');
      await seedListings();
      console.log('Seed complete, refreshing listings...');
      await refetch();
      setEditingItem(null);
      alert('✅ Seeding complete! All 31 listings imported to Supabase.');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error('Seed error:', errorMessage);
      alert('❌ Seed failed:\n\n' + errorMessage + '\n\nCheck the browser console (F12) for more details.');
    } finally {
      setIsSeeding(false);
    }
  };

  const handleFormSubmit = (item: ListingItem) => {
    if (editingItem) {
      updateListing(item);
      setEditingItem(null);
    } else {
      addListing(item);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">Manage your gallery listings</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleSeedData}
              disabled={isSeeding}
              className="inline-flex items-center rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-green-400"
              title="Import 31 default listings to Supabase"
            >
              {isSeeding ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Seeding...
                </>
              ) : (
                <>
                  🌱 Seed Listings
                </>
              )}
            </button>
            <Link
              to="/"
              className="inline-flex items-center rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Gallery
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column: Upload Form */}
          <div className="lg:col-span-1">
            <UploadForm 
              onSubmit={handleFormSubmit} 
              initialData={editingItem}
              onCancelEdit={() => setEditingItem(null)}
            />
          </div>

          {/* Right Column: Listings Table */}
          <div className="lg:col-span-2">
            <ListingsTable
              items={listings}
              onDelete={deleteListing}
              onToggleStatus={handleToggleStatus}
              onEdit={setEditingItem}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
