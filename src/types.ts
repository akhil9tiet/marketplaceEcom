export enum ListingStatus {
  Available = "Available",
  Sold = "Sold",
}

export interface ListingItem {
  id: string;
  title: string;
  description: string;
  price: number;
  status: ListingStatus;
  imageUrls: string[]; // base64 or blob URL
  createdAt: number;
}
