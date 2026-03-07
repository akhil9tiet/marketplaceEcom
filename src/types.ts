export interface ListingItem {
  id: string;
  title: string;
  description: string;
  price: number;
  status: "available" | "sold";
  imageUrls: string[]; // base64 or blob URL
  createdAt: number;
}
