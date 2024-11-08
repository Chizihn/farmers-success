import { CreateOrder } from "@/store/useOrderStore";
import { UserProfile } from ".";

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

export interface OrderState {
  orderItems: OrderItem[];
  loading: boolean;
  createOrder: (input: CreateOrder) => Promise<void>;
  fetchOrderItems: (filter: any) => Promise<void>;
}

interface OrderItem {
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

interface OrderStatus {
  createdAt: string;
  date: string;
  id: string;
  orderItemId: string;
  status: string;
  updatedAt: string;
}

interface Order {
  address: string;
  amount: number;
  createdAt: string;
  discount: number;
  id: string;
  orderItems: OrderItem[];
  paymentMethod: string;
  updatedAt: string;
  user: UserProfile;
  userId: string;
}

interface OrderItemData {
  buyer: UserProfile;
  buyerId: string;
  createdAt: string;
  deliveryInfo: string;
  endDate: string;
  id: string;
  location: string;
  marketPlaceId: string;
  orderId: string;
  order: Order;
  seller: UserProfile;
  sellerId: string;
  startDate: string;
  state: string;
  status: OrderStatus[];
  updatedAt: string;
}

interface GetOrderItemsResponse {
  getOrderItems: OrderItemData[];
}

export type {
  OrderStatus,
  OrderItem,
  Order,
  OrderItemData,
  GetOrderItemsResponse,
};
