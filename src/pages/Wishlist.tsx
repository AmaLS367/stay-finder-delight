import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Share, Heart, Search } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { ListingCard } from "@/components/common/ListingCard";
import { useWishlist } from "@/hooks/useWishlist";
import { parseSharedWishlist, buildWishlistShareUrl } from "@/lib/queryParams";
import listings from "@/data/listings.json";
import type { Listing } from "@/types";

export default function Wishlist() {
  const [searchParams] = useSearchParams();
  const { wishlist, clearWishlist } = useWishlist();
  const typedListings = listings as Listing[];

  const sharedIds = parseSharedWishlist(searchParams.toString());
  const isSharedView = !!sharedIds;

  const displayIds = isSharedView ? sharedIds : wishlist;

  const savedListings = useMemo(() => {
    return displayIds
      .map((id) => typedListings.find((l) => l.id === id))
      .filter((l): l is Listing => !!l);
  }, [displayIds, typedListings]);

  const handleShare = () => {
    const url = buildWishlistShareUrl(wishlist);
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
  };

  return (
    <Layout>
      <div className="container-custom py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              {isSharedView ? "Shared wishlist" : "My wishlist"}
            </h1>
            <p className="text-muted-foreground mt-1">
              {savedListings.length} {savedListings.length === 1 ? "stay" : "stays"} saved
            </p>
          </div>
          {!isSharedView && wishlist.length > 0 && (
            <div className="flex gap-3">
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors text-sm"
              >
                <Share className="h-4 w-4" /> Share list
              </button>
              <button
                onClick={clearWishlist}
                className="flex items-center gap-2 px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-sm"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {savedListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {savedListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-lg font-medium mb-2">
              {isSharedView ? "This wishlist is empty" : "No saved stays yet"}
            </p>
            <p className="text-muted-foreground mb-6">
              {isSharedView
                ? "The stays in this list may have been removed"
                : "Start exploring and save your favorite places!"}
            </p>
            <Link
              to="/search"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              <Search className="h-4 w-4" /> Explore stays
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
}
