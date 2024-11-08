"use client";
import { create } from "zustand";
import client from "@/lib/apolloClient";
import {
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
} from "@/graphql/mutations";
import { Product } from "@/types";
import { GET_PRODUCT_CART } from "@/graphql/queries";
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartStore {
  cartItems: CartItem[];
  totalItems: number;
  totalPrice: number;
  fetchCart: () => Promise<void>;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (itemId: string, newQuantity: number) => void;
  clearCart: () => void;
}

const useCartStore = create<CartStore>()((set, get) => ({
  cartItems: [],
  totalItems: 0,
  totalPrice: 0,

  // Fetch cart data from GraphQL and merge with local storage
  fetchCart: async () => {
    try {
      // Fetch cart from API
      const { data } = await client.query({
        query: GET_PRODUCT_CART,
        fetchPolicy: "no-cache",
      });
      const cartData = data.getProductCart;

      // Retrieve any cart items saved in localStorage for non-signed-in users
      const localStorageCart = JSON.parse(
        localStorage.getItem("guest_cart") || "[]"
      ) as CartItem[];

      // Merge the local storage items with the fetched cart items
      const mergedCartItems = [...cartData.items];
      localStorageCart.forEach((localItem) => {
        const existingItem = mergedCartItems.find(
          (item) => item.product.id === localItem.product.id
        );
        if (existingItem) {
          existingItem.quantity += localItem.quantity;
        } else {
          mergedCartItems.push(localItem);
        }
      });

      // Calculate total quantity and price
      const totalQuantity = mergedCartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
      const totalAmount = mergedCartItems.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      );

      // Update the store state
      set({
        cartItems: mergedCartItems,
        totalItems: totalQuantity,
        totalPrice: totalAmount,
      });

      // Clear guest cart from localStorage after merging
      localStorage.removeItem("guest_cart");
    } catch (error) {
      console.error("Failed to fetch and merge cart:", error);
    }
  },

  // Add item to cart with GraphQL mutation
  addToCart: async (productId, quantity) => {
    try {
      const existingCartItem = get().cartItems.find(
        (item) => item.product.id === productId
      );

      const newQuantity = existingCartItem
        ? existingCartItem.quantity + quantity
        : quantity;

      // Make the GraphQL mutation to add/update the item in the cart
      await client.mutate({
        mutation: ADD_PRODUCT_TO_CART,
        variables: {
          productId,
          quantity: newQuantity,
        },
      });
      return await get().fetchCart();
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  },

  // Remove item from cart with GraphQL mutation
  removeFromCart: async (productId) => {
    try {
      await client.mutate({
        mutation: REMOVE_PRODUCT_FROM_CART,
        variables: { productId },
      });

      set((state) => ({
        cartItems: state.cartItems.filter(
          (item) => item.product.id !== productId
        ),
        totalItems: state.cartItems
          .filter((item) => item.product.id !== productId)
          .reduce((total, item) => total + item.quantity, 0),
        totalPrice: state.cartItems
          .filter((item) => item.product.id !== productId)
          .reduce(
            (total, item) => total + item.product.price * item.quantity,
            0
          ),
      }));
      return await get().fetchCart();
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    }
  },

  // Update item quantity locally
  updateQuantity: (itemId, newQuantity) =>
    set((state) => {
      const updatedCartItems = state.cartItems.map((item) =>
        item.product.id === itemId ? { ...item, quantity: newQuantity } : item
      );
      return {
        cartItems: updatedCartItems,
        totalItems: updatedCartItems.reduce(
          (total, item) => total + item.quantity,
          0
        ),
        totalPrice: updatedCartItems.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        ),
      };
    }),

  // Clear the cart
  clearCart: () =>
    set(() => ({
      cartItems: [],
      totalItems: 0,
      totalPrice: 0,
    })),
}));

export default useCartStore;
