export enum ListingStatus {
  Available = "Available",
  Pending = "Pending",
  Sold = "Sold",
}

export interface ListingItem {
  id: string;
  title: string;
  description: string;
  price: number;
  old_price: number | null;
  status: ListingStatus;
  image_urls: string[];
  dim_length: number | null;
  dim_width: number | null;
  dim_height: number | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}