import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Users, Minus, Plus } from 'lucide-react';
import { getDefaultCheckIn, getDefaultCheckOut, getLocalTodayISODate } from '@/lib/dateUtils';
import { buildSearchUrl } from '@/lib/queryParams';
import listings from '@/data/listings.json';

interface SearchFormProps {
  variant?: 'hero' | 'compact';
  initialValues?: {
    location?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: number;
  };
}

export function SearchForm({ variant = 'hero', initialValues }: SearchFormProps) {
  const navigate = useNavigate();
  const [location, setLocation] = useState(initialValues?.location || '');
  const [checkIn, setCheckIn] = useState(initialValues?.checkIn || getDefaultCheckIn());
  const [checkOut, setCheckOut] = useState(initialValues?.checkOut || getDefaultCheckOut());
  const [guests, setGuests] = useState(initialValues?.guests || 2);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  const cities = useMemo(() => {
    const uniqueCities = [...new Set(listings.map(l => l.city))];
    return uniqueCities.map(city => {
      const listing = listings.find(l => l.city === city);
      return { city, country: listing?.country || '' };
    });
  }, []);

  const filteredCities = cities.filter(c =>
    c.city.toLowerCase().includes(location.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = buildSearchUrl({ location, checkIn, checkOut, guests });
    navigate(url);
  };

  const isHero = variant === 'hero';

  return (
    <form onSubmit={handleSubmit} className={isHero ? 'w-full' : ''}>
      <div className={`
        ${isHero 
          ? 'flex flex-col md:flex-row gap-3 md:gap-0 md:items-center p-4 md:p-2 bg-white rounded-2xl shadow-lg border border-border'
          : 'flex flex-wrap gap-3 items-end'
        }
      `}>
        {/* Location */}
        <div className={`relative flex-1 ${isHero ? 'md:border-r md:border-border md:pr-4 md:mr-4' : ''}`}>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5 px-1">
            Location
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              onFocus={() => setShowLocationDropdown(true)}
              onBlur={() => setTimeout(() => setShowLocationDropdown(false), 200)}
              placeholder="Where to?"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted/50 border-0 text-sm focus:ring-2 focus:ring-ring focus:bg-background transition-colors"
            />
            {showLocationDropdown && filteredCities.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border rounded-lg shadow-lg z-50 max-h-48 overflow-auto">
                {filteredCities.map(c => (
                  <button
                    key={c.city}
                    type="button"
                    onClick={() => {
                      setLocation(c.city);
                      setShowLocationDropdown(false);
                    }}
                    className="w-full px-4 py-2.5 text-left hover:bg-muted flex items-center gap-2 text-sm"
                  >
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    {c.city}, {c.country}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Check-in */}
        <div className={`flex-1 ${isHero ? 'md:border-r md:border-border md:pr-4 md:mr-4' : ''}`}>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5 px-1">
            Check in
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="date"
              value={checkIn}
              onChange={e => setCheckIn(e.target.value)}
              min={getLocalTodayISODate()}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted/50 border-0 text-sm focus:ring-2 focus:ring-ring focus:bg-background transition-colors"
            />
          </div>
        </div>

        {/* Check-out */}
        <div className={`flex-1 ${isHero ? 'md:border-r md:border-border md:pr-4 md:mr-4' : ''}`}>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5 px-1">
            Check out
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="date"
              value={checkOut}
              onChange={e => setCheckOut(e.target.value)}
              min={checkIn || getLocalTodayISODate()}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted/50 border-0 text-sm focus:ring-2 focus:ring-ring focus:bg-background transition-colors"
            />
          </div>
        </div>

        {/* Guests */}
        <div className="flex-1">
          <label className="block text-xs font-medium text-muted-foreground mb-1.5 px-1">
            Guests
          </label>
          <div className="flex items-center gap-3 px-3 py-1.5 rounded-lg bg-muted/50">
            <Users className="h-4 w-4 text-muted-foreground" />
            <button
              type="button"
              onClick={() => setGuests(Math.max(1, guests - 1))}
              className="p-1 hover:bg-background rounded"
              aria-label="Decrease guests"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-8 text-center text-sm font-medium">{guests}</span>
            <button
              type="button"
              onClick={() => setGuests(Math.min(16, guests + 1))}
              className="p-1 hover:bg-background rounded"
              aria-label="Increase guests"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className={`
            flex items-center justify-center gap-2 bg-primary text-primary-foreground font-medium rounded-xl transition-colors hover:bg-primary/90
            ${isHero ? 'px-6 py-3 md:ml-2' : 'px-4 py-2.5'}
          `}
        >
          <Search className="h-4 w-4" />
          <span>Search</span>
        </button>
      </div>
    </form>
  );
}
