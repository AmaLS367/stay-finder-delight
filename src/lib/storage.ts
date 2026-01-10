// LocalStorage helpers

import { STORAGE_KEYS } from "./constants";
import type { Booking, SearchParams } from "@/types";

// Generic storage helpers
export function getStorageItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

export function setStorageItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
}

// Wishlist
export function getWishlist(): string[] {
  return getStorageItem<string[]>(STORAGE_KEYS.WISHLIST, []);
}

export function addToWishlist(listingId: string): void {
  const wishlist = getWishlist();
  if (!wishlist.includes(listingId)) {
    setStorageItem(STORAGE_KEYS.WISHLIST, [...wishlist, listingId]);
  }
}

export function removeFromWishlist(listingId: string): void {
  const wishlist = getWishlist();
  setStorageItem(
    STORAGE_KEYS.WISHLIST,
    wishlist.filter((id) => id !== listingId),
  );
}

export function isInWishlist(listingId: string): boolean {
  return getWishlist().includes(listingId);
}

// Bookings
export function getBookings(): Booking[] {
  return getStorageItem<Booking[]>(STORAGE_KEYS.BOOKINGS, []);
}

export function saveBooking(booking: Booking): void {
  const bookings = getBookings();
  setStorageItem(STORAGE_KEYS.BOOKINGS, [...bookings, booking]);
}

export function updateBookingStatus(bookingId: string, status: Booking["status"]): void {
  const bookings = getBookings();
  const updated = bookings.map((b) => (b.id === bookingId ? { ...b, status } : b));
  setStorageItem(STORAGE_KEYS.BOOKINGS, updated);
}

// Recent searches
export function getRecentSearches(): SearchParams[] {
  return getStorageItem<SearchParams[]>(STORAGE_KEYS.RECENT_SEARCHES, []);
}

export function addRecentSearch(search: SearchParams): void {
  const searches = getRecentSearches();
  const filtered = searches.filter(
    (s) =>
      s.location !== search.location ||
      s.checkIn !== search.checkIn ||
      s.checkOut !== search.checkOut,
  );
  setStorageItem(STORAGE_KEYS.RECENT_SEARCHES, [search, ...filtered].slice(0, 5));
}

// Recently viewed
export function getRecentlyViewed(): string[] {
  return getStorageItem<string[]>(STORAGE_KEYS.RECENTLY_VIEWED, []);
}

export function addRecentlyViewed(listingId: string): void {
  const viewed = getRecentlyViewed();
  const filtered = viewed.filter((id) => id !== listingId);
  setStorageItem(STORAGE_KEYS.RECENTLY_VIEWED, [listingId, ...filtered].slice(0, 10));
}
