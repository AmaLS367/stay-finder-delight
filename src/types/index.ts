// StayFinder Types

export interface Host {
  name: string;
  avatar: string;
  isSuperhost: boolean;
}

export interface Review {
  id: string;
  authorName: string;
  authorAvatar: string;
  rating: number;
  date: string;
  text: string;
}

export interface Fees {
  cleaning: number;
  service: number;
  discountPercent: number;
}

export interface Policies {
  cancellation: string;
  houseRules: string[];
}

export interface AreaHighlight {
  name: string;
  distance: string;
  type: 'restaurant' | 'attraction' | 'transport' | 'shopping' | 'nature';
}

export interface Listing {
  id: string;
  title: string;
  city: string;
  country: string;
  area: string;
  type: 'apartment' | 'house' | 'hotel';
  coords: { lat: number; lng: number };
  pricePerNight: number;
  rating: number;
  reviewsCount: number;
  images: string[];
  maxGuests: number;
  bedrooms: number;
  beds: number;
  baths: number;
  amenities: string[];
  host: Host;
  policies: Policies;
  fees: Fees;
  areaHighlights: AreaHighlight[];
  reviews: Review[];
  instantBook: boolean;
  freeCancellation: boolean;
  description: string;
}

export interface Booking {
  id: string;
  listingId: string;
  listing: Listing;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
}

export interface SearchParams {
  location?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
}

export interface FilterParams {
  priceMin?: number;
  priceMax?: number;
  type?: ('apartment' | 'house' | 'hotel')[];
  minRating?: number;
  amenities?: string[];
  instantBook?: boolean;
}

export type SortOption = 'recommended' | 'price_asc' | 'rating' | 'reviews';
