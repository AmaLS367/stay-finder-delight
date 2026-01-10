<div align="center">

# 📊 API & Data Structures

**Complete reference for data types, structures, and data flow in StayFinder**

[← Documentation Home](./README.md) • [Deployment →](./deployment.md)

</div>

---

## 📚 Data Overview

StayFinder uses a **frontend-only architecture** with:
- **Static JSON data** - Listings stored in `src/data/listings.json`
- **LocalStorage** - User data (wishlist, bookings) persisted in browser
- **TypeScript types** - Full type definitions in `src/types/index.ts`

---

## 🏠 Listing Data Structure

### Listing Interface

```typescript
interface Listing {
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
```

### Field Descriptions

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique listing identifier |
| `title` | `string` | Listing title/name |
| `city` | `string` | City name |
| `country` | `string` | Country name |
| `area` | `string` | Neighborhood/area name |
| `type` | `'apartment' \| 'house' \| 'hotel'` | Property type |
| `coords` | `{ lat: number; lng: number }` | Geographic coordinates |
| `pricePerNight` | `number` | Price per night in base currency |
| `rating` | `number` | Average rating (0-5) |
| `reviewsCount` | `number` | Total number of reviews |
| `images` | `string[]` | Array of image URLs |
| `maxGuests` | `number` | Maximum guest capacity |
| `bedrooms` | `number` | Number of bedrooms |
| `beds` | `number` | Number of beds |
| `baths` | `number` | Number of bathrooms |
| `amenities` | `string[]` | Array of amenity IDs |
| `host` | `Host` | Host information object |
| `policies` | `Policies` | Cancellation and house rules |
| `fees` | `Fees` | Additional fees structure |
| `areaHighlights` | `AreaHighlight[]` | Nearby points of interest |
| `reviews` | `Review[]` | Array of review objects |
| `instantBook` | `boolean` | Instant booking available |
| `freeCancellation` | `boolean` | Free cancellation available |
| `description` | `string` | Full listing description |

---

## 👤 Host Interface

```typescript
interface Host {
  name: string;
  avatar: string;
  isSuperhost: boolean;
}
```

### Example

```json
{
  "name": "Marie",
  "avatar": "https://i.pravatar.cc/150?u=marie",
  "isSuperhost": true
}
```

---

## ⭐ Review Interface

```typescript
interface Review {
  id: string;
  authorName: string;
  authorAvatar: string;
  rating: number;
  date: string;
  text: string;
}
```

### Example

```json
{
  "id": "r1",
  "authorName": "John",
  "authorAvatar": "https://i.pravatar.cc/150?u=john",
  "rating": 5,
  "date": "2025-12-15",
  "text": "Amazing location and beautiful apartment!"
}
```

---

## 💰 Fees Interface

```typescript
interface Fees {
  cleaning: number;
  service: number;
  discountPercent: number;
}
```

### Example

```json
{
  "cleaning": 45,
  "service": 25,
  "discountPercent": 10
}
```

### Price Calculation

```typescript
const nights = calculateNights(checkIn, checkOut);
const subtotal = listing.pricePerNight * nights;
const cleaning = listing.fees.cleaning;
const service = listing.fees.service;
const discount = (subtotal * listing.fees.discountPercent) / 100;
const total = subtotal + cleaning + service - discount;
```

---

## 📋 Policies Interface

```typescript
interface Policies {
  cancellation: string;
  houseRules: string[];
}
```

### Example

```json
{
  "cancellation": "Free cancellation within 48 hours",
  "houseRules": ["No smoking", "No parties", "Check-in after 3 PM"]
}
```

---

## 🗺️ AreaHighlight Interface

```typescript
interface AreaHighlight {
  name: string;
  distance: string;
  type: 'restaurant' | 'attraction' | 'transport' | 'shopping' | 'nature';
}
```

### Example

```json
{
  "name": "Eiffel Tower",
  "distance": "0.5 km",
  "type": "attraction"
}
```

### Types

- `'restaurant'` - Restaurants and cafes
- `'attraction'` - Tourist attractions
- `'transport'` - Public transport stations
- `'shopping'` - Shopping areas
- `'nature'` - Parks and nature spots

---

## 📅 Booking Interface

```typescript
interface Booking {
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
```

### Status Values

| Status | Description |
|--------|-------------|
| `'confirmed'` | Active, upcoming booking |
| `'cancelled'` | Cancelled by user |
| `'completed'` | Past booking |

### Booking ID Format

```typescript
const bookingId = `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
// Example: "booking_1704067200000_abc123xyz"
```

---

## 🔍 Search Parameters

```typescript
interface SearchParams {
  location?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
}
```

### URL Format

```
/#/search?location=Paris&checkIn=2024-01-15&checkOut=2024-01-20&guests=2
```

---

## 🎛️ Filter Parameters

```typescript
interface FilterParams {
  priceMin?: number;
  priceMax?: number;
  type?: ('apartment' | 'house' | 'hotel')[];
  minRating?: number;
  amenities?: string[];
  instantBook?: boolean;
}
```

---

## 🏷️ Amenities

Available amenity IDs (from `src/lib/constants.ts`):

| ID | Label | Icon |
|----|-------|------|
| `wifi` | WiFi | Wifi |
| `kitchen` | Kitchen | UtensilsCrossed |
| `parking` | Free parking | Car |
| `pool` | Pool | Waves |
| `petFriendly` | Pet friendly | PawPrint |
| `airConditioning` | Air conditioning | Wind |
| `washer` | Washer | WashingMachine |
| `tv` | TV | Tv |
| `heating` | Heating | Flame |
| `workspace` | Workspace | Laptop |

---

## 📦 Data Storage

### LocalStorage Keys

```typescript
export const STORAGE_KEYS = {
  WISHLIST: 'stayfinder_wishlist',
  BOOKINGS: 'stayfinder_bookings',
  RECENT_SEARCHES: 'stayfinder_recent_searches',
  RECENTLY_VIEWED: 'stayfinder_recently_viewed',
} as const;
```

### Storage Schema

#### Wishlist

```json
{
  "stayfinder_wishlist": ["listing-1", "listing-2", "listing-3"]
}
```

**Type:** `string[]` (array of listing IDs)

#### Bookings

```json
{
  "stayfinder_bookings": [
    {
      "id": "booking_1704067200000_abc123",
      "listingId": "paris-1",
      "listing": { /* full Listing object */ },
      "checkIn": "2024-01-15",
      "checkOut": "2024-01-20",
      "guests": 2,
      "totalPrice": 500,
      "status": "confirmed",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

**Type:** `Booking[]`

---

## 🔄 Data Flow

### Listing Data Flow

```mermaid
graph LR
    A[listings.json] --> B[Import]
    B --> C[Type Cast]
    C --> D[Pages]
    D --> E[Components]
    E --> F[Display]
```

### User Data Flow

```mermaid
sequenceDiagram
    participant User
    participant Component
    participant Hook
    participant LocalStorage
    
    User->>Component: Action
    Component->>Hook: Update
    Hook->>LocalStorage: Save
    LocalStorage->>Hook: Confirm
    Hook->>Component: State update
    Component->>User: UI update
```

### Search Flow

```mermaid
graph TB
    A[User Input] --> B[SearchForm]
    B --> C[buildSearchUrl]
    C --> D[URL Query Params]
    D --> E[Search Page]
    E --> F[parseSearchParams]
    F --> G[Filter Listings]
    G --> H[Display Results]
```

---

## 📝 Type Definitions

### Complete Type File

Location: `src/types/index.ts`

```typescript
export interface Host { /* ... */ }
export interface Review { /* ... */ }
export interface Fees { /* ... */ }
export interface Policies { /* ... */ }
export interface AreaHighlight { /* ... */ }
export interface Listing { /* ... */ }
export interface Booking { /* ... */ }
export interface SearchParams { /* ... */ }
export interface FilterParams { /* ... */ }
export type SortOption = 'recommended' | 'price_asc' | 'rating' | 'reviews';
```

---

## 🎯 Data Validation

### Type Safety

All data is validated through TypeScript:

```typescript
// Type assertion when importing JSON
import listings from '@/data/listings.json';
const typedListings = listings as Listing[];

// Type checking in functions
function filterListings(listings: Listing[]): Listing[] {
  // TypeScript ensures correct structure
}
```

### Runtime Validation

For user input, consider using Zod schemas:

```typescript
import { z } from 'zod';

const searchParamsSchema = z.object({
  location: z.string().optional(),
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  guests: z.number().min(1).max(16).optional(),
});
```

---

## 📊 Data Examples

### Complete Listing Example

```json
{
  "id": "paris-1",
  "title": "Elegant Parisian Apartment near Eiffel Tower",
  "city": "Paris",
  "country": "France",
  "area": "7th Arrondissement",
  "type": "apartment",
  "coords": { "lat": 48.8584, "lng": 2.2945 },
  "pricePerNight": 185,
  "rating": 4.92,
  "reviewsCount": 324,
  "images": [
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"
  ],
  "maxGuests": 4,
  "bedrooms": 2,
  "beds": 2,
  "baths": 1,
  "amenities": ["wifi", "kitchen", "airConditioning"],
  "host": {
    "name": "Marie",
    "avatar": "https://i.pravatar.cc/150?u=marie",
    "isSuperhost": true
  },
  "policies": {
    "cancellation": "Free cancellation within 48 hours",
    "houseRules": ["No smoking", "No parties"]
  },
  "fees": {
    "cleaning": 45,
    "service": 25,
    "discountPercent": 10
  },
  "areaHighlights": [
    {
      "name": "Eiffel Tower",
      "distance": "0.5 km",
      "type": "attraction"
    }
  ],
  "reviews": [
    {
      "id": "r1",
      "authorName": "John",
      "authorAvatar": "https://i.pravatar.cc/150?u=john",
      "rating": 5,
      "date": "2025-12-15",
      "text": "Amazing location!"
    }
  ],
  "instantBook": true,
  "freeCancellation": true,
  "description": "Experience Paris like a local..."
}
```

---

## 🔧 Data Utilities

### Formatters

Location: `src/lib/formatters.ts`

```typescript
formatPrice(amount: number): string
formatGuests(count: number): string
pluralize(word: string, count: number): string
```

### Date Utils

Location: `src/lib/dateUtils.ts`

```typescript
calculateNights(checkIn: string, checkOut: string): number
isUpcoming(date: string): boolean
isPast(date: string): boolean
getDefaultCheckIn(): string
getDefaultCheckOut(): string
```

### Query Params

Location: `src/lib/queryParams.ts`

```typescript
buildSearchUrl(params: SearchParams): string
parseSearchParams(query: string): SearchParams
```

---

## 🎨 Data Visualization

### Listing Data Structure

```mermaid
graph TB
    A[Listing] --> B[Basic Info]
    A --> C[Location]
    A --> D[Pricing]
    A --> E[Features]
    A --> F[Host]
    A --> G[Reviews]
    
    B --> B1[title, type, description]
    C --> C1[city, country, coords]
    D --> D1[pricePerNight, fees]
    E --> E1[amenities, bedrooms, beds]
    F --> F1[name, avatar, isSuperhost]
    G --> G1[rating, reviewsCount, reviews[]]
```

---

<div align="center">

**Next:** Learn about [Deployment](./deployment.md) →

</div>

