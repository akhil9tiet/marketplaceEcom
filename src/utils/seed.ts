import { supabase } from '../lib/supabase';
import { defaultListings } from '../data/listings';

/**
 * Seeds the Supabase database with all default listings.
 * Run this once from the browser console or by calling it from a component.
 * Example: await seedListings()
 */
export async function seedListings() {
  try {
    console.log('🌱 Starting seed of listings...');
    console.log('📊 Total listings to import:', defaultListings.length);
    
    // Clear existing listings first (optional - remove if you want to keep old data)
    console.log('🗑️  Clearing existing listings...');
    const { error: deleteError } = await supabase
      .from('listings')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all rows

    if (deleteError) {
      console.warn('⚠️  Warning clearing old listings:', deleteError);
    } else {
      console.log('✅ Cleared existing listings');
    }

    // Insert all listings
    console.log('📤 Inserting listings into Supabase...');
    const { data, error } = await supabase
      .from('listings')
      .insert(defaultListings)
      .select();

    if (error) {
      console.error('❌ Error seeding listings:', error);
      console.error('Error details:', {
        code: error?.code,
        message: error?.message,
        details: error?.details,
        hint: error?.hint,
      });
      throw new Error(`Seed failed: ${error?.message || 'Unknown error'}`);
    }

    console.log(`✅ Successfully seeded ${data?.length || 0} listings!`);
    console.table(data?.slice(0, 3)); // Show first 3 for verification
    return data;
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error('❌ Seed error:', errorMsg);
    throw new Error(errorMsg);
  }
}

/**
 * View all listings currently in Supabase
 */
export async function viewListings() {
  try {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .order('sort_order');

    if (error) throw error;
    console.table(data);
    return data;
  } catch (error) {
    console.error('Error fetching listings:', error);
  }
}

/**
 * Check Supabase connection
 */
export async function checkConnection() {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    console.log('✅ Supabase connection successful');
    return true;
  } catch (error) {
    console.error('❌ Supabase connection failed:', error);
    return false;
  }
}
