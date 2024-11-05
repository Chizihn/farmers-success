"use client";
<<<<<<< HEAD
=======

>>>>>>> b95be22edf50a55697986b04c5c99be73de60731
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CartItem {
<<<<<<< HEAD
  id: string;
  name: string;
  price: number;
=======
  name: string;
  price: string | number;
>>>>>>> b95be22edf50a55697986b04c5c99be73de60731
  quantity: number;
  image: string;
}

interface CartStore {
  cartItems: CartItem[];
<<<<<<< HEAD
  totalItems: number;
  totalPrice: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, newQuantity: number) => void;
=======
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemName: string) => void;
  updateQuantity: (itemName: string, newQuantity: number) => void;
  totalItems: () => number;
  totalPrice: () => number;
>>>>>>> b95be22edf50a55697986b04c5c99be73de60731
}

const useCartStore = create<CartStore>()(
  persist(
<<<<<<< HEAD
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
=======
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
>>>>>>> b95be22edf50a55697986b04c5c99be73de60731
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCartStore;
