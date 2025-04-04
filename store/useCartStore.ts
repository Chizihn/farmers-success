"use client";
import { create } from "zustand";
import client from "@/lib/apolloClient";
import {
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
} from "@/graphql/mutations";
import { Product } from "@/types/product";
import { GET_PRODUCT_CART } from "@/graphql/queries";
import useGuestCartStore from "./useGuestCartStore";
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartStore {
  cartItems: CartItem[];
  totalItems: number;
  totalPrice: number;
  fetchCart: () => Promise<void>;
  addToCart: (productId: string, quantity: number) => Promise<boolean>;
  removeFromCart: (productId: string) => Promise<boolean>;
  updateQuantity: (itemId: string, newQuantity: number) => void;
  clearCart: () => void;
  mergeGuestCart: () => Promise<void>;
}

const useCartStore = create<CartStore>()((set, get) => ({
  cartItems: [],
  totalItems: 0,
  totalPrice: 0,

  // Fetch cart data from GraphQL
  fetchCart: async () => {
    try {
      const { data } = await client.query({
        query: GET_PRODUCT_CART,
        fetchPolicy: "no-cache",
      });
      const cartData = data.getProductCart;
      console.log("Fetched cart for user", cartData);

      set({
        cartItems: cartData.items,
        totalItems: cartData.totalQuantity,
        totalPrice: cartData.totalAmount,
      });
    } catch (error) {
      console.error("Failed to fetch cart:", error);
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
      await get().fetchCart();
      return true;
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      return false;
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
      await get().fetchCart();
      return true;
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
      return false;
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

  mergeGuestCart: async () => {
    const guestCartStore = useGuestCartStore.getState();

    try {
      // Iterate through guest cart items and add them to the main cart
      for (const guestItem of guestCartStore.guestCartItems) {
        await get().addToCart(guestItem.product.id, guestItem.quantity);
      }

      // Clear the guest cart after merging
      guestCartStore.guestClearCart();
    } catch (error) {
      console.error("Failed to merge guest cart:", error);
    }
  },
}));

export default useCartStore;
