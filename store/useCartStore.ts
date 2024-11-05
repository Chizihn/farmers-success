"use client";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartStore {
  cartItems: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, newQuantity: number) => void;
}

const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cartItems: [],
      totalItems: 0,
      totalPrice: 0,

      addToCart: (item) => {
        set((state) => {
          const existingItem = state.cartItems.find((i) => i.id === item.id);
          let updatedCartItems;

          if (existingItem) {
            updatedCartItems = state.cartItems.map((i) =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            );
          } else {
            updatedCartItems = [...state.cartItems, item];
          }

          return {
            cartItems: updatedCartItems,
            totalItems: updatedCartItems.reduce(
              (total, item) => total + item.quantity,
              0
            ),
            totalPrice: updatedCartItems.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            ),
          };
        });
      },

      removeFromCart: (itemId) =>
        set((state) => {
          const updatedCartItems = state.cartItems.filter(
            (item) => item.id !== itemId
          );
          return {
            cartItems: updatedCartItems,
            totalItems: updatedCartItems.reduce(
              (total, item) => total + item.quantity,
              0
            ),
            totalPrice: updatedCartItems.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            ),
          };
        }),

      updateQuantity: (itemId, newQuantity) =>
        set((state) => {
          const updatedCartItems = state.cartItems.map((item) =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
          );
          return {
            cartItems: updatedCartItems,
            totalItems: updatedCartItems.reduce(
              (total, item) => total + item.quantity,
              0
            ),
            totalPrice: updatedCartItems.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            ),
          };
        }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCartStore;
