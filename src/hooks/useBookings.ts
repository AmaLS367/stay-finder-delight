import { useCallback, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS } from '@/lib/constants';
import { isUpcoming, isPast } from '@/lib/dateUtils';
import type { Booking, Listing } from '@/types';

export function useBookings() {
  const [bookings, setBookings] = useLocalStorage<Booking[]>(STORAGE_KEYS.BOOKINGS, []);

  const createBooking = useCallback((
    listing: Listing,
    checkIn: string,
    checkOut: string,
    guests: number,
    totalPrice: number
  ): Booking => {
    const booking: Booking = {
      id: `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      listingId: listing.id,
      listing,
      checkIn,
      checkOut,
      guests,
      totalPrice,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    setBookings(prev => [...prev, booking]);
    return booking;
  }, [setBookings]);

  const cancelBooking = useCallback((bookingId: string) => {
    setBookings(prev => 
      prev.map(b => b.id === bookingId ? { ...b, status: 'cancelled' as const } : b)
    );
  }, [setBookings]);

  const upcomingBookings = useMemo(() => {
    return bookings
      .filter(b => b.status !== 'cancelled' && isUpcoming(b.checkIn))
      .sort((a, b) => new Date(a.checkIn).getTime() - new Date(b.checkIn).getTime());
  }, [bookings]);

  const pastBookings = useMemo(() => {
    return bookings
      .filter(b => isPast(b.checkOut) || b.status === 'cancelled')
      .sort((a, b) => new Date(b.checkIn).getTime() - new Date(a.checkIn).getTime());
  }, [bookings]);

  const getBookingById = useCallback((id: string) => {
    return bookings.find(b => b.id === id);
  }, [bookings]);

  return {
    bookings,
    upcomingBookings,
    pastBookings,
    createBooking,
    cancelBooking,
    getBookingById,
  };
}
