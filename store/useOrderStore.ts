import { create } from "zustand";
import client from "@/lib/apolloClient";
import { GET_ORDER_ITEMS } from "@/graphql/queries";
import { CREATE_ORDER } from "@/graphql/mutations";
import { OrderState } from "@/types/order";

export enum ProductPaymentMethod {
  ONLINE_PAYMENT = "online_payment",
  PAYMENT_ON_DELIVERY = "payment_on_delivery",
}

export interface GuestCart {
  productId: string;
  quantity: number;
}

export interface CreateOrder {
  email: string;
  firstName: string;
  guestCart: GuestCart[];
  lastName: string;
  paymentMethod: ProductPaymentMethod;
  phoneNumber: string;
  shippingAddress: string;
}

const useOrderStore = create<OrderState>((set) => ({
  orderItems: [],
  loading: false,
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
    set({ loading: true });
    try {
      const { data } = await client.query({
        query: GET_ORDER_ITEMS,
        variables: { filter },
      });
      set({ orderItems: data.getOrderItems });
    } catch (error) {
      console.error("Error fetching order items:", error);
    } finally {
      set({ loading: false });
    }
  },
}));

export default useOrderStore;
