"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CartItem {
  name: string;
  price: string | number;
  quantity: number;
  image: string;
}

interface CartStore {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemName: string) => void;
  updateQuantity: (itemName: string, newQuantity: number) => void;
  totalItems: () => number;
  totalPrice: () => number;
}

const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],
      addToCart: (item) =>
        set((state) => {
          const existingItem = state.cartItems.find(
            (i) => i.name === item.name
          );
          if (existingItem) {
            return {
              cartItems: state.cartItems.map((i) =>
                i.name === item.name
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          } else {
            return { cartItems: [...state.cartItems, item] };
          }
        }),
      removeFromCart: (itemName) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.name !== itemName),
        })),
      updateQuantity: (itemName, newQuantity) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.name === itemName ? { ...item, quantity: newQuantity } : item
          ),
        })),
      totalItems: () =>
        get().cartItems.reduce((total, item) => total + item.quantity, 0),
      totalPrice: () =>
        get().cartItems.reduce(
          (total, item) =>
            total + parseFloat(item.price.toString()) * item.quantity,
          0
        ),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCartStore;
