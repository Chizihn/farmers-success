"use client";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { CartItem } from "./useCartStore";

interface GuestCartStore {
  guestCartItems: CartItem[];
  guestTotalItems: number;
  guestTotalPrice: number;
  guestAddToCart: (item: CartItem) => void;
  guestRemoveFromCart: (productId: string) => void;
  guestUpdateQuantity: (productId: string, newQuantity: number) => void;
}

const useGuestCartStore = create<GuestCartStore>()(
  persist(
    (set) => ({
      guestCartItems: [],
      guestTotalItems: 0,
      guestTotalPrice: 0,

      // Add or update an item in the guest cart
      guestAddToCart: (item) =>
        set((state) => {
          const existingItem = state.guestCartItems.find(
            (i) => i.product.id === item.product.id
          );
          const updatedguestCartItems = existingItem
            ? state.guestCartItems.map((i) =>
                i.product.id === item.product.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              )
            : [...state.guestCartItems, item];

          return {
            guestCartItems: updatedguestCartItems,
            guestTotalItems: updatedguestCartItems.reduce(
              (total, i) => total + i.quantity,
              0
            ),
            guestTotalPrice: updatedguestCartItems.reduce(
              (total, i) => total + i.product.price * i.quantity,
              0
            ),
          };
        }),

      // Remove an item from the guest cart
      guestRemoveFromCart: (productId) =>
        set((state) => {
          const updatedguestCartItems = state.guestCartItems.filter(
            (item) => item.product.id !== productId
          );
          return {
            guestCartItems: updatedguestCartItems,
            guestTotalItems: updatedguestCartItems.reduce(
              (total, item) => total + item.quantity,
              0
            ),
            guestTotalPrice: updatedguestCartItems.reduce(
              (total, item) => total + item.product.price * item.quantity,
              0
            ),
          };
        }),

      // Update the quantity of a specific item in the guest cart
      guestUpdateQuantity: (productId, newQuantity) =>
        set((state) => {
          const updatedguestCartItems = state.guestCartItems.map((item) =>
            item.product.id === productId
              ? { ...item, quantity: newQuantity }
              : item
          );
          return {
            guestCartItems: updatedguestCartItems,
            guestTotalItems: updatedguestCartItems.reduce(
              (total, item) => total + item.quantity,
              0
            ),
            guestTotalPrice: updatedguestCartItems.reduce(
              (total, item) => total + item.product.price * item.quantity,
              0
            ),
          };
        }),
    }),
    {
      name: "guest_cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useGuestCartStore;
