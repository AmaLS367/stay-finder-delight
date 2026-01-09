import { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Heart, Share, Check, MapPin, Users, Bed, Bath, X, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { formatPrice, formatGuests, pluralize } from '@/lib/formatters';
import { calculateNights, isValidDateRange, getDefaultCheckIn, getDefaultCheckOut, generateICSContent, downloadICSFile } from '@/lib/dateUtils';
import { useWishlist } from '@/hooks/useWishlist';
import { useBookings } from '@/hooks/useBookings';
import { addRecentlyViewed } from '@/lib/storage';
import { AMENITIES } from '@/lib/constants';
import listings from '@/data/listings.json';
import type { Listing as ListingType } from '@/types';

export default function Listing() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const listing = (listings as ListingType[]).find(l => l.id === id);

  const [checkIn, setCheckIn] = useState(getDefaultCheckIn());
  const [checkOut, setCheckOut] = useState(getDefaultCheckOut());
  const [guests, setGuests] = useState(2);
  const [showModal, setShowModal] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [reviewFilter, setReviewFilter] = useState<number | null>(null);

  const { isInWishlist, toggleWishlist } = useWishlist();
  const { createBooking } = useBookings();

  useEffect(() => {
    if (id) addRecentlyViewed(id);
  }, [id]);

  const priceDetails = useMemo(() => {
    if (!listing) return null;
    const nights = calculateNights(checkIn, checkOut);
    const subtotal = listing.pricePerNight * nights;
    const cleaning = listing.fees.cleaning;
    const service = listing.fees.service;
    const discount = listing.fees.discountPercent > 0 ? (subtotal * listing.fees.discountPercent) / 100 : 0;
    const total = subtotal + cleaning + service - discount;
    return { nights, subtotal, cleaning, service, discount, total };
  }, [listing, checkIn, checkOut]);

  const filteredReviews = useMemo(() => {
    if (!listing) return [];
    if (!reviewFilter) return listing.reviews;
    return listing.reviews.filter(r => r.rating >= reviewFilter);
  }, [listing, reviewFilter]);

  if (!listing) {
    return (
      <Layout>
        <div className="container-custom py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Listing not found</h1>
          <button onClick={() => navigate('/search')} className="text-primary hover:underline">
            Browse all stays
          </button>
        </div>
      </Layout>
    );
  }

  const handleReserve = () => {
    if (!isValidDateRange(checkIn, checkOut)) {
      alert('Please select valid dates');
      return;
    }
    if (guests > listing.maxGuests) {
      alert(`Maximum ${listing.maxGuests} guests allowed`);
      return;
    }
    setShowModal(true);
  };

  const handleConfirmBooking = () => {
    if (!priceDetails) return;
    createBooking(listing, checkIn, checkOut, guests, priceDetails.total);
    setBookingComplete(true);
  };

  const handleAddToCalendar = () => {
    const ics = generateICSContent(
      `Stay at ${listing.title}`,
      `${listing.city}, ${listing.country}`,
      checkIn,
      checkOut,
      `Your booking at ${listing.title}. ${guests} guests.`
    );
    downloadICSFile(ics, `stayfinder-${listing.id}.ics`);
  };

  const getAmenityLabel = (id: string) => AMENITIES.find(a => a.id === id)?.label || id;

  return (
    <Layout>
      <div className="container-custom py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{listing.title}</h1>
            <div className="flex items-center gap-3 mt-2 text-sm">
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-foreground" />
                {listing.rating.toFixed(2)}
              </span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground">{listing.reviewsCount} reviews</span>
              <span className="text-muted-foreground">·</span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {listing.city}, {listing.country}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigator.clipboard.writeText(window.location.href)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors text-sm"
            >
              <Share className="h-4 w-4" /> Share
            </button>
            <button
              onClick={() => toggleWishlist(listing.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors text-sm"
            >
              <Heart className={`h-4 w-4 ${isInWishlist(listing.id) ? 'fill-red-500 text-red-500' : ''}`} />
              Save
            </button>
          </div>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-10 rounded-xl overflow-hidden">
          <div className="md:col-span-2 md:row-span-2">
            <button onClick={() => { setLightboxIndex(0); setShowLightbox(true); }} className="w-full h-full">
              <img src={listing.images[0]} alt="" className="w-full h-full object-cover aspect-square md:aspect-auto" />
            </button>
          </div>
          {listing.images.slice(1, 5).map((img, idx) => (
            <button key={idx} onClick={() => { setLightboxIndex(idx + 1); setShowLightbox(true); }} className="hidden md:block">
              <img src={img} alt="" className="w-full h-full object-cover aspect-square" />
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Host */}
            <div className="flex items-center justify-between pb-6 border-b border-border">
              <div>
                <h2 className="text-xl font-semibold">
                  {listing.type.charAt(0).toUpperCase() + listing.type.slice(1)} hosted by {listing.host.name}
                </h2>
                <div className="flex items-center gap-3 mt-2 text-muted-foreground text-sm">
                  <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {listing.maxGuests} guests</span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><Bed className="h-4 w-4" /> {pluralize(listing.bedrooms, 'bedroom')}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><Bath className="h-4 w-4" /> {pluralize(listing.baths, 'bath')}</span>
                </div>
              </div>
              <div className="relative">
                <img src={listing.host.avatar} alt={listing.host.name} className="w-14 h-14 rounded-full object-cover" />
                {listing.host.isSuperhost && (
                  <span className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">★</span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="py-6 border-b border-border">
              <h3 className="text-lg font-semibold mb-3">About this place</h3>
              <p className="text-muted-foreground leading-relaxed">{listing.description}</p>
            </div>

            {/* Amenities */}
            <div className="py-6 border-b border-border">
              <h3 className="text-lg font-semibold mb-4">Amenities</h3>
              <div className="grid grid-cols-2 gap-3">
                {listing.amenities.map(a => (
                  <div key={a} className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-muted-foreground" />
                    <span>{getAmenityLabel(a)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Area highlights */}
            <div className="py-6 border-b border-border">
              <h3 className="text-lg font-semibold mb-4">Area highlights</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {listing.areaHighlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-sm">{h.name}</p>
                      <p className="text-xs text-muted-foreground">{h.distance}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="py-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Star className="h-5 w-5 fill-foreground" />
                  {listing.rating.toFixed(2)} · {listing.reviewsCount} reviews
                </h3>
                <div className="flex gap-2">
                  {[5, 4, 3].map(r => (
                    <button
                      key={r}
                      onClick={() => setReviewFilter(reviewFilter === r ? null : r)}
                      className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                        reviewFilter === r ? 'bg-primary text-primary-foreground' : 'border-border hover:bg-muted'
                      }`}
                    >
                      {r}+ ★
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredReviews.map(r => (
                  <div key={r.id} className="p-4 rounded-lg border border-border">
                    <div className="flex items-center gap-3 mb-3">
                      <img src={r.authorAvatar} alt={r.authorName} className="w-10 h-10 rounded-full" />
                      <div>
                        <p className="font-medium">{r.authorName}</p>
                        <p className="text-xs text-muted-foreground">{r.date}</p>
                      </div>
                      <div className="ml-auto flex items-center gap-1 text-sm">
                        <Star className="h-3 w-3 fill-foreground" /> {r.rating}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 p-6 rounded-xl border border-border bg-card shadow-sm">
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-2xl font-bold">{formatPrice(listing.pricePerNight)}</span>
                <span className="text-muted-foreground">/ night</span>
              </div>

              <div className="border border-border rounded-lg overflow-hidden mb-4">
                <div className="grid grid-cols-2">
                  <div className="p-3 border-r border-b border-border">
                    <label className="block text-xs font-medium mb-1">Check in</label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={e => setCheckIn(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full text-sm bg-transparent"
                    />
                  </div>
                  <div className="p-3 border-b border-border">
                    <label className="block text-xs font-medium mb-1">Check out</label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={e => setCheckOut(e.target.value)}
                      min={checkIn}
                      className="w-full text-sm bg-transparent"
                    />
                  </div>
                </div>
                <div className="p-3">
                  <label className="block text-xs font-medium mb-1">Guests</label>
                  <select
                    value={guests}
                    onChange={e => setGuests(Number(e.target.value))}
                    className="w-full text-sm bg-transparent"
                  >
                    {Array.from({ length: listing.maxGuests }, (_, i) => i + 1).map(n => (
                      <option key={n} value={n}>{formatGuests(n)}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={handleReserve}
                className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors mb-4"
              >
                Reserve
              </button>

              {priceDetails && priceDetails.nights > 0 && (
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>{formatPrice(listing.pricePerNight)} × {priceDetails.nights} nights</span>
                    <span>{formatPrice(priceDetails.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cleaning fee</span>
                    <span>{formatPrice(priceDetails.cleaning)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service fee</span>
                    <span>{formatPrice(priceDetails.service)}</span>
                  </div>
                  {priceDetails.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({listing.fees.discountPercent}%)</span>
                      <span>-{formatPrice(priceDetails.discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-semibold pt-2 border-t border-border">
                    <span>Total</span>
                    <span>{formatPrice(priceDetails.total)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {showLightbox && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={() => setShowLightbox(false)}>
          <button className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-full">
            <X className="h-6 w-6" />
          </button>
          <button
            onClick={e => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + listing.images.length) % listing.images.length); }}
            className="absolute left-4 p-2 text-white hover:bg-white/10 rounded-full"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <img
            src={listing.images[lightboxIndex]}
            alt=""
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={e => e.stopPropagation()}
          />
          <button
            onClick={e => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % listing.images.length); }}
            className="absolute right-4 p-2 text-white hover:bg-white/10 rounded-full"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        </div>
      )}

      {/* Booking modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => { setShowModal(false); setBookingComplete(false); }}>
          <div className="bg-background rounded-xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">{bookingComplete ? 'Booking confirmed!' : 'Confirm booking'}</h3>
              <button onClick={() => { setShowModal(false); setBookingComplete(false); }} className="p-1 hover:bg-muted rounded">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex gap-4">
                <img src={listing.images[0]} alt="" className="w-20 h-20 rounded-lg object-cover" />
                <div>
                  <p className="font-medium">{listing.title}</p>
                  <p className="text-sm text-muted-foreground">{listing.city}, {listing.country}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Check in</p>
                  <p className="font-medium">{checkIn}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Check out</p>
                  <p className="font-medium">{checkOut}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Guests</p>
                  <p className="font-medium">{formatGuests(guests)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Total</p>
                  <p className="font-medium">{priceDetails && formatPrice(priceDetails.total)}</p>
                </div>
              </div>
            </div>

            {!bookingComplete ? (
              <button
                onClick={handleConfirmBooking}
                className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Save booking
              </button>
            ) : (
              <div className="space-y-3">
                <button
                  onClick={handleAddToCalendar}
                  className="w-full py-3 border border-border rounded-lg font-medium hover:bg-muted transition-colors flex items-center justify-center gap-2"
                >
                  <Calendar className="h-4 w-4" /> Add to calendar
                </button>
                <button
                  onClick={() => navigate('/trips')}
                  className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  View my trips
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
}
