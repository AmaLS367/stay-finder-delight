import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ChevronLeft, ChevronRight, Star, Zap } from 'lucide-react';
import { formatPrice } from '@/lib/formatters';
import { useWishlist } from '@/hooks/useWishlist';
import type { Listing } from '@/types';

interface ListingCardProps {
  listing: Listing;
}

export function ListingCard({ listing }: ListingCardProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isSaved = isInWishlist(listing.id);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage(prev => (prev + 1) % listing.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage(prev => (prev - 1 + listing.images.length) % listing.images.length);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(listing.id);
  };

  return (
    <Link to={`/listing/${listing.id}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted">
        <img
          src={listing.images[currentImage]}
          alt={listing.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />

        {/* Navigation arrows */}
        {listing.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}

        {/* Dots */}
        {listing.images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {listing.images.slice(0, 5).map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  idx === currentImage ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}

        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          className="absolute right-3 top-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
          aria-label={isSaved ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={`h-4 w-4 ${isSaved ? 'fill-red-500 text-red-500' : 'text-foreground'}`}
          />
        </button>

        {/* Tags */}
        <div className="absolute left-3 top-3 flex gap-2">
          {listing.instantBook && (
            <span className="flex items-center gap-1 px-2 py-1 bg-white/90 rounded-full text-xs font-medium">
              <Zap className="h-3 w-3" /> Instant
            </span>
          )}
        </div>
      </div>

      <div className="mt-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-medium line-clamp-1">{listing.title}</h3>
          <div className="flex items-center gap-1 shrink-0">
            <Star className="h-4 w-4 fill-foreground" />
            <span className="text-sm">{listing.rating.toFixed(2)}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-0.5">
          {listing.city}, {listing.country}
        </p>
        <p className="mt-1.5">
          <span className="font-semibold">{formatPrice(listing.pricePerNight)}</span>
          <span className="text-muted-foreground"> / night</span>
        </p>
      </div>
    </Link>
  );
}
