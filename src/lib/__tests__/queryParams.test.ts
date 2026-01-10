import { describe, it, expect } from "vitest";
import {
  buildSearchUrl,
  parseSearchParams,
  buildFilterParams,
  parseFilterParams,
  buildWishlistShareUrl,
  parseSharedWishlist,
} from "@/lib/queryParams";

describe("queryParams", () => {
  it("buildSearchUrl builds a stable search url", () => {
    const url = buildSearchUrl({
      location: "Yerevan",
      checkIn: "2026-01-10",
      checkOut: "2026-01-12",
      guests: 3,
    });

    expect(url).toBe("/search?location=Yerevan&checkIn=2026-01-10&checkOut=2026-01-12&guests=3");
  });

  it("parseSearchParams parses search params", () => {
    const parsed = parseSearchParams("location=Paris&checkIn=2026-01-10&guests=2");
    expect(parsed.location).toBe("Paris");
    expect(parsed.checkIn).toBe("2026-01-10");
    expect(parsed.checkOut).toBeUndefined();
    expect(parsed.guests).toBe(2);
  });

  it("buildFilterParams and parseFilterParams roundtrip", () => {
    const params = buildFilterParams({
      priceMin: 100,
      priceMax: 500,
      type: ["apartment", "house"],
      minRating: 4.5,
      amenities: ["wifi", "pool"],
      instantBook: true,
    });

    const parsed = parseFilterParams(params.toString());
    expect(parsed.priceMin).toBe(100);
    expect(parsed.priceMax).toBe(500);
    expect(parsed.type).toEqual(["apartment", "house"]);
    expect(parsed.minRating).toBe(4.5);
    expect(parsed.amenities).toEqual(["wifi", "pool"]);
    expect(parsed.instantBook).toBe(true);
  });

  it("parseSharedWishlist returns null for invalid payload", () => {
    const parsed = parseSharedWishlist("shared=not_base64");
    expect(parsed).toBeNull();
  });

  it("buildWishlistShareUrl produces a decodable shared list", () => {
    window.history.pushState({}, "", "/stay-finder-delight/");

    const ids = ["a", "b", "c"];
    const url = buildWishlistShareUrl(ids);

    expect(url).toContain("#/wishlist?shared=");

    const sharedPart = url.split("shared=")[1];
    const decoded = JSON.parse(atob(sharedPart));

    expect(decoded).toEqual(ids);
  });
});

