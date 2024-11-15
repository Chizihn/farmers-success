import { CreateOrder } from "@/store/useOrderStore";
import { UserProfile } from ".";

export interface OrderState {
  orderItems: UserOrderItem[];
  loading: boolean;
  error: Error | null;
  createOrder: (input: CreateOrder) => Promise<void>;
  fetchOrderItems: (filter: any) => Promise<void>;
}

export enum PaymentMethod {
  Cash_On_Delivery = "cod",
  Online = "in_app",
}

export enum OrderItemState {
  CONFIRMED = "confirmed",
  IN_PROGESS = "in_progress",
  DELIVERED = "delivered",
  RETURNED = "returned",
  CANCELLED = "cancelled",
}

export type Status = {
  createdAt: Date;
  date: string;
  id: string;
  orderItemId: string;
  status: OrderItemState;
  updatedAt: Date;
};

export interface UserOrder {
  address: string;
  amount: number;
  createdAt: string;
  discount: number;
  id: string;
  orderItems: OrderItem[];
  paymentMethod: PaymentMethod;
  updatedAt: string;
  user: UserProfile;
  userId: string;
}
export interface UserOrderItem {
  buyer: UserProfile;
  buyerId: string;
  createdAt: string;
  deliveryInfo: string;
  endDate: string;
  id: string;
  location: string;
  marketPlaceId: string;
  orderId: string;
  order: UserOrder;
  seller: UserProfile;
  sellerId: string;
  startDate: string;
  state: string;
  status: Status[];
  updatedAt: string;
}
export interface OrderItem {
  buyer: UserProfile;
  buyerId: string;
  createdAt: string;
  deliveryInfo: string;
  endDate: string;
  id: string;
  location: string;
  marketPlaceId: string;
  order: UserOrderItem;
  orderId: string;
  seller: UserProfile;
  sellerId: string;
  startDate: string;
  state: string;
  status: Status[];
  updatedAt: string;
}

// interface GetOrderItemsResponse {
//   getOrderItems: OrderItemData[];
// }
