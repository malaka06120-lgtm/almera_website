"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface WishlistItem {
  productId: string;
  name: string;
  slug: string;
  image: string;
  price: number;
}

interface WishlistState {
  items: WishlistItem[];
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
  toggle: (item: WishlistItem) => void;
  remove: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      hasHydrated: false,
      setHasHydrated: (value) => set({ hasHydrated: value }),
      toggle: (item) =>
        set((state) => {
          const exists = state.items.some(
            (i) => i.productId === item.productId
          );
          return {
            items: exists
              ? state.items.filter((i) => i.productId !== item.productId)
              : [...state.items, item],
          };
        }),
      remove: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        })),
      isWishlisted: (productId) =>
        get().items.some((i) => i.productId === productId),
    }),
    {
      name: "almera-wishlist",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
