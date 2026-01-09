// Query parameter utilities

import type { SearchParams, FilterParams, SortOption } from '@/types';

export function buildSearchUrl(params: SearchParams): string {
  const searchParams = new URLSearchParams();
  
  if (params.location) searchParams.set('location', params.location);
  if (params.checkIn) searchParams.set('checkIn', params.checkIn);
  if (params.checkOut) searchParams.set('checkOut', params.checkOut);
  if (params.guests) searchParams.set('guests', params.guests.toString());
  
  return `/search?${searchParams.toString()}`;
}

export function parseSearchParams(searchString: string): SearchParams {
  const params = new URLSearchParams(searchString);
  
  return {
    location: params.get('location') || undefined,
    checkIn: params.get('checkIn') || undefined,
    checkOut: params.get('checkOut') || undefined,
    guests: params.get('guests') ? parseInt(params.get('guests')!, 10) : undefined,
  };
}

export function buildFilterParams(filters: FilterParams): URLSearchParams {
  const params = new URLSearchParams();
  
  if (filters.priceMin) params.set('priceMin', filters.priceMin.toString());
  if (filters.priceMax) params.set('priceMax', filters.priceMax.toString());
  if (filters.type?.length) params.set('type', filters.type.join(','));
  if (filters.minRating) params.set('minRating', filters.minRating.toString());
  if (filters.amenities?.length) params.set('amenities', filters.amenities.join(','));
  if (filters.instantBook) params.set('instantBook', 'true');
  
  return params;
}

export function parseFilterParams(searchString: string): FilterParams {
  const params = new URLSearchParams(searchString);
  
  return {
    priceMin: params.get('priceMin') ? parseInt(params.get('priceMin')!, 10) : undefined,
    priceMax: params.get('priceMax') ? parseInt(params.get('priceMax')!, 10) : undefined,
    type: params.get('type')?.split(',').filter(Boolean) as FilterParams['type'],
    minRating: params.get('minRating') ? parseFloat(params.get('minRating')!) : undefined,
    amenities: params.get('amenities')?.split(',').filter(Boolean),
    instantBook: params.get('instantBook') === 'true',
  };
}

export function buildWishlistShareUrl(ids: string[]): string {
  const encoded = btoa(JSON.stringify(ids));
  return `${window.location.origin}${window.location.pathname}#/wishlist?shared=${encoded}`;
}

export function parseSharedWishlist(searchString: string): string[] | null {
  const params = new URLSearchParams(searchString);
  const shared = params.get('shared');
  
  if (!shared) return null;
  
  try {
    return JSON.parse(atob(shared));
  } catch {
    return null;
  }
}
