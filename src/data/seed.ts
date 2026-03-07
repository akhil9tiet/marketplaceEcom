import { ListingItem } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { IMAGES } from '../assets/images';

export const seedListings: ListingItem[] = [
  {
    id: uuidv4(),
    title: "Vintage Leather Satchel",
    description: "Handcrafted leather satchel with brass fittings. Perfect for daily commute or weekend getaways. Features a spacious main compartment and multiple pockets.",
    price: 120,
    status: "available",
    imageUrls: [
      IMAGES.SATCHEL_1,
      IMAGES.SATCHEL_2
    ],
    createdAt: Date.now(),
  },
  {
    id: uuidv4(),
    title: "Minimalist Desk Lamp",
    description: "Sleek, modern desk lamp with adjustable brightness and color temperature. Adds a touch of elegance to any workspace.",
    price: 85,
    status: "sold",
    imageUrls: [IMAGES.LAMP],
    createdAt: Date.now() - 100000,
  },
  {
    id: uuidv4(),
    title: "Ceramic Coffee Set",
    description: "Artisan-made ceramic coffee set including a pour-over dripper and two mugs. Glazed in a beautiful matte finish.",
    price: 65,
    status: "available",
    imageUrls: [IMAGES.COFFEE_SET],
    createdAt: Date.now() - 200000,
  },
];
