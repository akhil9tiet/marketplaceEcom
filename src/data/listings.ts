import { ListingItem, ListingStatus } from '../types';
import { IMAGES } from '../assets/images';

export const defaultListings: ListingItem[] = [
  {
    id: "default-dining-set",
    title: "Extendable Solid Wood Dining Table Set",
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
    id: "default-bar-stools",
    title: "Modern Bar Stools",
    description: "Sleek, modern bar stools with comfortable seating and sturdy build. Perfect for kitchen islands or home bars.",
    price: 25,
    status: ListingStatus.Sold,
    imageUrls: [IMAGES.BAR_STOOL_1, IMAGES.BAR_STOOL_2],
    createdAt: Date.now() - 100000,
  },
  {
    id: "default-coffee-table",
    title: "Rustic Coffee Table",
    description: "Artisan-made rustic coffee table with a natural wood finish. A perfect centerpiece for any living room.",
    price: 35,
    status: ListingStatus.Available,
    imageUrls: [IMAGES.COFFEE_TABLE],
    createdAt: Date.now() - 200000,
  },
  {
    id: "default-entry-chair",
    title: "Entryway Accent Chair",
    description: "Elegant accent chair ideal for entryways or reading nooks. Upholstered with premium fabric.",
    price: 25,
    status: ListingStatus.Available,
    imageUrls: [IMAGES.ENTRY_CHAIR],
    createdAt: Date.now() - 300000,
  },
  {
    id: "default-accent-chair",
    title: "Accent Chair",
    description: "Stylish accent chair with a modern silhouette. Adds a pop of character to any room.",
    price: 45,
    status: ListingStatus.Available,
    imageUrls: [IMAGES.ACCENT_CHAIR],
    createdAt: Date.now(),
  },
  {
    id: "default-lamp",
    title: "Minimalist Desk Lamp",
    description: "Sleek, modern desk lamp with adjustable brightness and warm lighting. Adds a touch of elegance to any workspace.",
    price: 15,
    status: ListingStatus.Available,
    imageUrls: [IMAGES.LAMP, IMAGES.LAMP_2],
    createdAt: Date.now() - 400000,
  },
  {
    id: "default-metal-stool",
    title: "Industrial Metal Stool",
    description: "Sturdy industrial-style metal stool with a raw finish. Great for kitchens, workshops, or as a plant stand.",
    price: 20,
    status: ListingStatus.Available,
    imageUrls: [IMAGES.METAL_STOOL],
    createdAt: Date.now() - 500000,
  },
];
