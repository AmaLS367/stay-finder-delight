import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { STORAGE_KEYS } from "@/lib/constants";

export function useWishlist() {
  const [wishlist, setWishlist] = useLocalStorage<string[]>(STORAGE_KEYS.WISHLIST, []);

  const addToWishlist = useCallback(
    (listingId: string) => {
      setWishlist((prev) => {
        if (prev.includes(listingId)) return prev;
        return [...prev, listingId];
      });
    },
    [setWishlist],
  );

  const removeFromWishlist = useCallback(
    (listingId: string) => {
      setWishlist((prev) => prev.filter((id) => id !== listingId));
    },
    [setWishlist],
  );

  const toggleWishlist = useCallback(
    (listingId: string) => {
      setWishlist((prev) => {
        if (prev.includes(listingId)) {
          return prev.filter((id) => id !== listingId);
        }
        return [...prev, listingId];
      });
    },
    [setWishlist],
  );

  const isInWishlist = useCallback(
    (listingId: string) => {
      return wishlist.includes(listingId);
    },
    [wishlist],
  );

  const clearWishlist = useCallback(() => {
    setWishlist([]);
  }, [setWishlist]);

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    clearWishlist,
  };
}
