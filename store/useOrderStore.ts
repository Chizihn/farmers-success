import { create } from "zustand";
import client from "@/lib/apolloClient";
import { GET_ORDER_ITEMS } from "@/graphql/queries";
import { CREATE_ORDER } from "@/graphql/mutations";
import { OrderState, PaymentMethod } from "@/types/order";
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

const useOrderStore = create<OrderState>((set) => ({
  orderItems: [],
  loading: false,
  error: null,
  createOrder: async (input: CreateOrder) => {
    set({ loading: true });
    try {
      const { data } = await client.mutate({
        mutation: CREATE_ORDER,
        variables: { input },
      });
      console.log("success");

      return data.createOrder;
    } catch (error) {
      console.log("failed");

      console.error("Error creating order:", error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  fetchOrderItems: async (filter) => {
    set({ loading: true, error: null });
    try {
      const { data } = await client.query({
        query: GET_ORDER_ITEMS,
        variables: { filter },
      });
      set({ orderItems: data.getOrderItems });
    } catch (error) {
      set({ loading: false, error: error as Error });
      console.error("Error fetching order items:", error);
    } finally {
      set({ loading: false });
    }
  },
}));

export default useOrderStore;
