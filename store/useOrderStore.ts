import { create } from "zustand";
import client from "@/lib/apolloClient";
import { GET_PRODUCT_ORDERS, GET_USER_ORDER_ITEMS } from "@/graphql/queries";
import { CREATE_ORDER } from "@/graphql/mutations";
import {
  GetProductOrders,
  Order,
  OrderItem,
  PaymentMethod,
} from "@/types/order";
import { Product } from "@/types/product";

export interface GuestCart {
  productId: string;
  quantity: number;
}

export interface CreateOrder {
  email: string;
  firstName: string;
  guestCart: GuestCart[];
  lastName: string;
  paymentMethod: PaymentMethod;
  phoneNumber: string;
  shippingAddress: string;
}

export interface OrderState {
  productOrders: Order[];
  loading: boolean;
  error: Error | null;
  createOrder: (input: CreateOrder) => Promise<void>;
  fetchProductOrders: (filter?: GetProductOrders) => Promise<void>;
}

const useOrderStore = create<OrderState>((set) => ({
  orderItems: [],

  productOrders: [],
  loading: false,
  error: null,

  createOrder: async (input: CreateOrder) => {
    set({ loading: true });
    try {
      const { data } = await client.mutate({
        mutation: CREATE_ORDER,
        variables: { input },
      });
      console.log("Order created successfully:", data.createOrder);
    } catch (error) {
      console.error("Error creating order:", error);
      set({ error: error as Error });
      throw error; // Rethrow to handle further if needed
    } finally {
      set({ loading: false });
    }
  },

  // fetchOrderItems: async (filter = {}) => {
  //   set({ loading: true, error: null });
  //   try {
  //     const { data } = await client.query({
  //       query: GET_ORDER_ITEMS,
  //       variables: { filter },
  //       fetchPolicy: "no-cache",
  //     });
  //     set({ orderItems: data.getOrderItems });
  //   } catch (error) {
  //     console.error("Error fetching order items:", error);
  //     set({ error: error as Error });
  //   } finally {
  //     set({ loading: false });
  //   }
  // },

  fetchProductOrders: async (filter) => {
    set({ loading: true, error: null });
    try {
      const { data } = await client.query({
        query: GET_PRODUCT_ORDERS,
        variables: { input: filter },
        fetchPolicy: "network-only",
      });
      set({ productOrders: data.getProductOrders });
      console.log(data.getProductOrders);
    } catch (error) {
      console.error("Error fetching product orders:", error);
      set({ error: error as Error });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useOrderStore;
