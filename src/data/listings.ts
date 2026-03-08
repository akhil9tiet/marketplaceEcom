import { ListingItem, ListingStatus } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { IMAGES } from '../assets/images';

export const defaultListings: ListingItem[] = [
  {
    id: uuidv4(),
    title: "Extendable Solid Wood Dining Set",
    description: "Beautifully crafted solid wood dining table set",
    price: 120,
    status: ListingStatus.Available,
    imageUrls: [
      IMAGES.DINING_1,
      IMAGES.DINING_2
    ],
    createdAt: Date.now(),
  },
  {
    id: uuidv4(),
    title: "Modern Bar Stools",
    description: "Sleek, modern bar stools with comfortable seating and sturdy build. Perfect for kitchen islands or home bars.",
    price: 85,
    status: ListingStatus.Sold,
    imageUrls: [IMAGES.BAR_STOOL_1, IMAGES.BAR_STOOL_2],
    createdAt: Date.now() - 100000,
  },
  {
    id: uuidv4(),
    title: "Rustic Coffee Table",
    description: "Artisan-made rustic coffee table with a natural wood finish. A perfect centerpiece for any living room.",
    price: 65,
    status: ListingStatus.Available,
    imageUrls: [IMAGES.COFFEE_TABLE],
    createdAt: Date.now() - 200000,
  },
  {
    id: uuidv4(),
    title: "Entryway Accent Chair",
    description: "Elegant accent chair ideal for entryways or reading nooks. Upholstered with premium fabric.",
    price: 95,
    status: ListingStatus.Available,
    imageUrls: [IMAGES.ENTRY_CHAIR],
    createdAt: Date.now() - 300000,
  },
];
