import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Shield, Clock, Heart, Star } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SearchForm } from "@/components/common/SearchForm";
import { ListingCard } from "@/components/common/ListingCard";
import listings from "@/data/listings.json";
import type { Listing } from "@/types";

export default function Home() {
  const typedListings = listings as Listing[];

  const trendingDestinations = useMemo(() => {
    const cityMap = new Map<
      string,
      { city: string; country: string; image: string; count: number }
    >();
    typedListings.forEach((l) => {
      if (!cityMap.has(l.city)) {
        cityMap.set(l.city, { city: l.city, country: l.country, image: l.images[0], count: 1 });
      } else {
        cityMap.get(l.city)!.count++;
      }
    });
    return Array.from(cityMap.values()).slice(0, 6);
  }, [typedListings]);

  const featuredStays = useMemo(() => {
    return [...typedListings].sort((a, b) => b.rating - a.rating).slice(0, 6);
  }, [typedListings]);

  const benefits = [
    {
      icon: Shield,
      title: "Secure booking",
      description: "Your payment and personal data are protected",
    },
    {
      icon: Clock,
      title: "Free cancellation",
      description: "Flexible booking with free cancellation options",
    },
    { icon: Heart, title: "Verified stays", description: "Every property is reviewed for quality" },
    { icon: Star, title: "Top-rated hosts", description: "Stay with experienced, trusted hosts" },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 md:py-32 bg-gradient-to-b from-muted/50 to-background">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              Find your perfect stay
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover unique homes, apartments, and hotels around the world
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <SearchForm variant="hero" />
          </div>
        </div>
      </section>

      {/* Trending destinations */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Trending destinations</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {trendingDestinations.map((dest) => (
              <Link
                key={dest.city}
                to={`/search?location=${encodeURIComponent(dest.city)}`}
                className="group relative aspect-[4/5] rounded-xl overflow-hidden"
              >
                <img
                  src={dest.image}
                  alt={dest.city}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-semibold">{dest.city}</h3>
                  <p className="text-sm text-white/80">{dest.count} stays</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured stays */}
      <section className="py-16 bg-muted/30">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Featured stays</h2>
            <Link to="/search" className="text-sm font-medium hover:underline">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredStays.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Why book with us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="text-center p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
                  <b.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
