import { create } from "zustand";

interface CartItem {
  name: string;
  price: string;
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  totalItems: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  cartItems: [],
  addToCart: (newItem) =>
    set((state) => {
      const existingItem = state.cartItems.find(
        (item) => item.name === newItem.name
      );
      if (existingItem) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.name === newItem.name
              ? { ...item, quantity: item.quantity + newItem.quantity }
              : item
          ),
        };
      } else {
        return { cartItems: [...state.cartItems, newItem] };
      }
    }),
  totalItems: () =>
    get().cartItems.reduce((sum, item) => sum + item.quantity, 0),
}));
