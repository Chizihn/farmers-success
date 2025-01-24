import { create } from "zustand";
import client from "@/lib/apolloClient";
import { GET_PRODUCT_ORDER_BY_ID, GET_PRODUCT_ORDERS } from "@/graphql/queries";
import { CREATE_ORDER } from "@/graphql/mutations";
import { GetProductOrders, Order, PaymentMethod } from "@/types/order";

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
  singleOrder: Order | null;
  loading: boolean;
  error: Error | null;
  initialized?: boolean;
  setInitialized?: (initialized: boolean) => void;
  createOrder: (input: CreateOrder) => Promise<void>;
  fetchProductOrders: (filter?: GetProductOrders) => Promise<void>;
  fetchSingleOrder: (orderId: string) => Promise<void>;
}

const useOrderStore = create<OrderState>((set) => ({
  orderItems: [],
  productOrders: [],
  singleOrder: null,
  loading: false,
  error: null,
  initialized: false,
  setInitialized: (initialized) => {
    set({ initialized });
  },

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
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  fetchProductOrders: async (filter) => {
    set({ loading: true, error: null });
    try {
      const { data } = await client.query({
        query: GET_PRODUCT_ORDERS,
        variables: { input: filter },
      });
      set({ productOrders: data.getProductOrders });
    } catch (error) {
      console.error("Error fetching product orders:", error);
      set({ error: error as Error });
    } finally {
      set({ loading: false, initialized: true });
    }
  },
  fetchSingleOrder: async (orderId: string) => {
    console.log("fetchSingleOrder called with ID:", orderId);
    set({ loading: true, error: null });

    try {
      console.log("Making GraphQL query...");
      const { data } = await client.query({
        query: GET_PRODUCT_ORDER_BY_ID,
        variables: { orderId },
        fetchPolicy: "cache-first",
      });

      console.log("Query response:", data);

      if (!data || !data.getProductOrderById) {
        throw new Error("No order data returned from server");
      }

      set({
        singleOrder: data.getProductOrderById,
      });
    } catch (error) {
      console.error("Error in fetchSingleOrder:", error);
      set({
        error: error as Error,
      });
    } finally {
      set({ loading: false, initialized: true });
    }
  },
}));

export default useOrderStore;
