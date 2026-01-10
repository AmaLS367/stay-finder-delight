// StayFinder Constants

export const AMENITIES = [
  { id: "wifi", label: "WiFi", icon: "Wifi" },
  { id: "kitchen", label: "Kitchen", icon: "UtensilsCrossed" },
  { id: "parking", label: "Free parking", icon: "Car" },
  { id: "pool", label: "Pool", icon: "Waves" },
  { id: "petFriendly", label: "Pet friendly", icon: "PawPrint" },
  { id: "airConditioning", label: "Air conditioning", icon: "Wind" },
  { id: "washer", label: "Washer", icon: "WashingMachine" },
  { id: "tv", label: "TV", icon: "Tv" },
  { id: "heating", label: "Heating", icon: "Flame" },
  { id: "workspace", label: "Workspace", icon: "Laptop" },
] as const;

export const PROPERTY_TYPES = [
  { id: "apartment", label: "Apartment" },
  { id: "house", label: "House" },
  { id: "hotel", label: "Hotel" },
] as const;

export const SORT_OPTIONS = [
  { id: "recommended", label: "Recommended" },
  { id: "price_asc", label: "Price: low to high" },
  { id: "rating", label: "Rating" },
  { id: "reviews", label: "Most reviewed" },
] as const;

export const RATING_FILTERS = [
  { value: 4, label: "4+ stars" },
  { value: 4.5, label: "4.5+ stars" },
] as const;

export const ITEMS_PER_PAGE = 12;

export const STORAGE_KEYS = {
  WISHLIST: "stayfinder_wishlist",
  BOOKINGS: "stayfinder_bookings",
  RECENT_SEARCHES: "stayfinder_recent_searches",
  RECENTLY_VIEWED: "stayfinder_recently_viewed",
} as const;
