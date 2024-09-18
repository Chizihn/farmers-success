import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CartItem {
  name: string;
  price: string | number;
  quantity: number;
  image: string;
}

interface CartState {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemName: string) => void;
  updateQuantity: (itemName: string, newQuantity: number) => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
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
      removeFromCart: (itemName) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.name !== itemName),
        })),
      updateQuantity: (itemName, newQuantity) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.name === itemName && newQuantity > 0
              ? { ...item, quantity: newQuantity }
              : item
          ),
        })),
      totalItems: () =>
        get().cartItems.reduce((sum, item) => sum + item.quantity, 0),
      totalPrice: () =>
        get().cartItems.reduce(
          (sum, item) =>
            sum + parseFloat(item.price.toString()) * item.quantity,
          0
        ),
    }),
    {
      name: "cart-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCartStore;
