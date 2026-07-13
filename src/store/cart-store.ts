"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  hasHydrated: boolean;
  setOpen: (open: boolean) => void;
  setHasHydrated: (value: boolean) => void;
  addItem: (item: CartItem) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: () => number;
  totalItems: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      hasHydrated: false,
      setOpen: (open) => set({ isOpen: open }),
      setHasHydrated: (value) => set({ hasHydrated: value }),
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.variantId === item.variantId
          );
          if (existing) {
            const nextQuantity = Math.min(
              existing.quantity + item.quantity,
              existing.stockQuantity
            );
            return {
              items: state.items.map((i) =>
                i.variantId === item.variantId
                  ? { ...i, quantity: nextQuantity }
                  : i
              ),
              isOpen: true,
            };
          }
          return { items: [...state.items, item], isOpen: true };
        }),
      removeItem: (variantId) =>
        set((state) => ({
          items: state.items.filter((i) => i.variantId !== variantId),
        })),
      updateQuantity: (variantId, quantity) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              i.variantId === variantId
                ? {
                    ...i,
                    quantity: Math.max(
                      1,
                      Math.min(quantity, i.stockQuantity)
                    ),
                  }
                : i
            )
            .filter((i) => i.quantity > 0),
        })),
      clearCart: () => set({ items: [] }),
      subtotal: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      totalItems: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    {
      name: "almera-cart",
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
