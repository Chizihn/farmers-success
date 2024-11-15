import { CreateOrder } from "@/store/useOrderStore";
import { UserProfile } from ".";
import { Product, ProductOwner } from "./product";

export enum PaymentMethod {
  ONLINE_PAYMENT = "online_payment",
  PAYMENT_ON_DELIVERY = "payment_on_delivery",
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
export interface Order {
  id: string;
  user: UserProfile; // User who placed the order
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  shippingAddress: string;
  paymentMethod: string; // e.g., credit card, PayPal
  status: string; // e.g., pending, completed
  total: number; // Total cost of the order
  orderItems: OrderItem[]; // Array of order items
  createdAt: string; // ISO date string
}

export interface OrderItem {
  orderId: string;
  price: number;
  product: Product;
  quantity: number;
}

export interface GetProductOrders {
  createdAt: Date;
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  orderItems: OrderItem[];
  paymentMethod: PaymentMethod;
  phoneNumber: string;
  shippingAddress: string;
  status: Status;
  total: number;
  user: ProductOwner;
}
export enum OrderStatus {
  PROCESSING = "processing",
  CANCELLED = "canceled",
  COMPLETED = "completed",
}

export interface GetOrdersFilter {
  status: OrderStatus;
}

// interface GetOrderItemsResponse {
//   getOrderItems: OrderItemData[];
// }
