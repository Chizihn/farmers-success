import { create } from "zustand";
import client from "@/lib/apolloClient";
import { GET_ORDER_ITEMS } from "@/graphql/queries";
import { UserProfile } from "@/types";

export enum OrderItemState {
  Confirmed = "confirmed",
  InProgress = "in_progress",
  Delivered = "delivered",
  Returned = "returned",
  Cancelled = "cancelled",
}

export interface Status {
  createdAt: Date;
  date: Date;
  id: string;
  orderItemId: string;
  status: OrderItemState;
  updatedAt: Date;
}

export enum PaymentMethod {
  Cash_On_Delivery = "cod",
  Online = "in_app",
}
export interface UserOrder {
  address: string;
  amount: number;
  createdAt: Date;
  discount: number;
  id: string;
  orderItems: OrderItem;
  paymentMethod: PaymentMethod;
}

export interface OrderItem {
  buyer: UserProfile;
  buyerId: string;
  createdAt: string;
  deliveryInfo: string;
  endDate: Date;
  id: string;
  location: string;
  order: UserOrder;
  orderId: string;
  seller: UserProfile;
  sellerId: string;
  status: Status;
  updatedAt: Date;
}

export interface OrderState {
  orderItems: OrderItem[];
  loading: boolean;
  fetchOrderItems: (filter: any) => Promise<void>;
}

const useOrderStore = create<OrderState>((set) => ({
  orderItems: [],
  loading: false,

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
