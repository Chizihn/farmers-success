import { UserProfile } from ".";

interface OrderStatus {
  createdAt: string;
  date: string;
  id: string;
  orderItemId: string;
  status: string;
  updatedAt: string;
}

interface OrderItem {
  buyer: UserProfile;
  buyerId: string;
  createdAt: string;
  deliveryInfo: string;
  endDate: string;
  id: string;
  location: string;
  marketPlaceId: string;
  orderId: string;
  seller: UserProfile;
  sellerId: string;
  startDate: string;
  state: string;
  status: OrderStatus[];
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
