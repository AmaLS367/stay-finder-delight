import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SearchForm } from '@/components/common/SearchForm';
import { ListingCard } from '@/components/common/ListingCard';
import { parseSearchParams } from '@/lib/queryParams';
import { PROPERTY_TYPES, SORT_OPTIONS, AMENITIES, ITEMS_PER_PAGE } from '@/lib/constants';
import listings from '@/data/listings.json';
import type { Listing, SortOption } from '@/types';

export default function Search() {
  const [searchParams] = useSearchParams();
  const params = parseSearchParams(searchParams.toString());
  const typedListings = listings as Listing[];

  const [showFilters, setShowFilters] = useState(false);
  const [priceMin, setPriceMin] = useState<number | undefined>();
  const [priceMax, setPriceMax] = useState<number | undefined>();
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number | undefined>();
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [instantBook, setInstantBook] = useState(false);
  const [sort, setSort] = useState<SortOption>('recommended');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = [...typedListings];

    if (params.location) {
      result = result.filter(l => 
        l.city.toLowerCase().includes(params.location!.toLowerCase()) ||
        l.country.toLowerCase().includes(params.location!.toLowerCase())
      );
    }

    if (params.guests) {
      result = result.filter(l => l.maxGuests >= params.guests!);
    }

    if (priceMin) result = result.filter(l => l.pricePerNight >= priceMin);
    if (priceMax) result = result.filter(l => l.pricePerNight <= priceMax);
    if (selectedTypes.length) result = result.filter(l => selectedTypes.includes(l.type));
    if (minRating) result = result.filter(l => l.rating >= minRating);
    if (selectedAmenities.length) {
      result = result.filter(l => 
        selectedAmenities.every(a => l.amenities.includes(a))
      );
    }
    if (instantBook) result = result.filter(l => l.instantBook);

    // Sort
    switch (sort) {
      case 'price_asc':
        result.sort((a, b) => a.pricePerNight - b.pricePerNight);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        result.sort((a, b) => b.reviewsCount - a.reviewsCount);
        break;
    }

    return result;
  }, [typedListings, params, priceMin, priceMax, selectedTypes, minRating, selectedAmenities, instantBook, sort]);

  const paginatedResults = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, page]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const clearFilters = () => {
    setPriceMin(undefined);
    setPriceMax(undefined);
    setSelectedTypes([]);
    setMinRating(undefined);
    setSelectedAmenities([]);
    setInstantBook(false);
    setPage(1);
  };

  const hasActiveFilters = priceMin || priceMax || selectedTypes.length || minRating || selectedAmenities.length || instantBook;

  return (
    <Layout>
      <div className="container-custom py-6">
        <SearchForm 
          variant="compact" 
          initialValues={params}
        />
      </div>

      <div className="container-custom pb-16">
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? 'stay' : 'stays'} found
            {params.location && ` in ${params.location}`}
          </p>
          <div className="flex items-center gap-3">
            <select
              value={sort}
              onChange={e => setSort(e.target.value as SortOption)}
              className="px-3 py-2 rounded-lg border border-border bg-background text-sm"
            >
              {SORT_OPTIONS.map(o => (
                <option key={o.id} value={o.id}>{o.label}</option>
              ))}
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </button>
          </div>
        </div>

        {/* Filters panel */}
        {showFilters && (
          <div className="mb-6 p-6 rounded-xl border border-border bg-card">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Price */}
              <div>
                <label className="block text-sm font-medium mb-2">Price range</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceMin || ''}
                    onChange={e => setPriceMin(e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full px-3 py-2 rounded-lg border border-border text-sm"
                  />
                  <span>–</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceMax || ''}
                    onChange={e => setPriceMax(e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full px-3 py-2 rounded-lg border border-border text-sm"
                  />
                </div>
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-medium mb-2">Property type</label>
                <div className="flex flex-wrap gap-2">
                  {PROPERTY_TYPES.map(t => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTypes(prev => 
                        prev.includes(t.id) ? prev.filter(x => x !== t.id) : [...prev, t.id]
                      )}
                      className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                        selectedTypes.includes(t.id)
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'border-border hover:bg-muted'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium mb-2">Minimum rating</label>
                <div className="flex gap-2">
                  {[4, 4.5].map(r => (
                    <button
                      key={r}
                      onClick={() => setMinRating(minRating === r ? undefined : r)}
                      className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                        minRating === r
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'border-border hover:bg-muted'
                      }`}
                    >
                      {r}+ ★
                    </button>
                  ))}
                </div>
              </div>

              {/* Instant book */}
              <div>
                <label className="block text-sm font-medium mb-2">Instant book</label>
                <button
                  onClick={() => setInstantBook(!instantBook)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                    instantBook
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'border-border hover:bg-muted'
                  }`}
                >
                  Instant book only
                </button>
              </div>
            </div>

            {/* Amenities */}
            <div className="mt-6">
              <label className="block text-sm font-medium mb-2">Amenities</label>
              <div className="flex flex-wrap gap-2">
                {AMENITIES.map(a => (
                  <button
                    key={a.id}
                    onClick={() => setSelectedAmenities(prev => 
                      prev.includes(a.id) ? prev.filter(x => x !== a.id) : [...prev, a.id]
                    )}
                    className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                      selectedAmenities.includes(a.id)
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'border-border hover:bg-muted'
                    }`}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="mt-4 text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                <X className="h-4 w-4" /> Clear all filters
              </button>
            )}
          </div>
        )}

        {/* Results */}
        {paginatedResults.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedResults.map(listing => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-10">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                      p === page
                        ? 'bg-primary text-primary-foreground'
                        : 'border border-border hover:bg-muted'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg font-medium mb-2">No stays found</p>
            <p className="text-muted-foreground mb-6">Try adjusting your search or filters</p>
            <button
              onClick={clearFilters}
              className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}
