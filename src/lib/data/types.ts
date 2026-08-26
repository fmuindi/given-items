export type Condition = "Like new" | "Good" | "Fair" | "Working" | "Needs repair";

export type ListingStatus = "available" | "reserved" | "claimed" | "archived";

export type DeliveryType = "Parcel" | "Local delivery" | "Pickup" | "Manual freight";

export type ItemIcon =
  | "appliance"
  | "furniture"
  | "garden"
  | "tools"
  | "electronics"
  | "vehicle"
  | "kitchen";

export type PhotoTone = "navy" | "green" | "amber" | "slate";

export interface Category {
  slug: string;
  name: string;
  blurb: string;
  icon: ItemIcon;
}

export interface Listing {
  id: string;
  slug: string;
  title: string;
  categorySlug: string;
  condition: Condition;
  status: ListingStatus;
  city: string;
  state: string;
  postedLabel: string;
  postedDate: string;
  deliveryType: DeliveryType;
  deliveryEstimateCents: number | null;
  isNew: boolean;
  description: string;
  knownDefects: string[];
  includedParts: string[];
  dimensions: string;
  weight: string;
  photoTone: PhotoTone;
  photoIcon: ItemIcon;
}
