"use client";

import { Package, Calendar, MapPin, CreditCard } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import LoadingState from "../Loading";
import { useFetchOrders } from "@/hooks/useFetchOrders";
import { capitalizeFirstChar } from "@/utils";

// Main Component
const OrderList: React.FC = () => {
  const { productOrders, loading, error } = useFetchOrders();

  if (loading) return <LoadingState />;

  if (error) {
    return <ErrorState message={error.message} />;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>
      <div className="space-y-4">
        {productOrders.length > 0 ? (
          productOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))
        ) : (
          <NoOrders />
        )}
      </div>
    </div>
  );
};

// Error State Component
const ErrorState: React.FC<{ message: string }> = ({ message }) => (
  <div className="flex flex-col items-center justify-center min-h-screen text-red-500">
    <p className="text-lg font-medium">Error loading orders: {message}</p>
    <Link href="/" className="text-blue-500 mt-4 underline">
      Back to Home
    </Link>
  </div>
);

// Order Card Component
const OrderCard: React.FC<{ order: any }> = ({ order }) => (
  <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition">
    <OrderHeader id={order.id} status={capitalizeFirstChar(order.status)} />
    <OrderDetails order={order} />
  </div>
);

// Order Header Component
const OrderHeader: React.FC<{ id: string; status: string }> = ({
  id,
  status,
}) => (
  <div className="flex justify-between items-center border-b pb-2">
    <h2 className="text-lg font-semibold">Order #{id}</h2>
    <p className={`text-sm font-medium ${getStatusStyle(status)}`}>{status}</p>
  </div>
);

// Order Details Component
const OrderDetails: React.FC<{ order: any }> = ({ order }) => (
  <div className="mt-4 ">
    <OrderItems items={order.orderItems} />
  </div>
);

// Order Items Component
const OrderItems: React.FC<{ items: any[] }> = ({ items }) => (
  <div className="mt-4">
    <h3 className="text-md font-medium mb-2">Order Items:</h3>
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.orderId} className="flex items-start space-x-4">
          <div className="relative w-16 h-16">
            <Image
              src={item.product.images[0] || "/placeholder.png"}
              alt={item.product.name}
              fill
              className="object-cover rounded-md"
              priority
            />
          </div>
          <div>
            <p className="font-medium">
              {capitalizeFirstChar(item.product.name)}
            </p>
            <p className="text-sm text-gray-500">
              Quantity: {item.quantity} | Price: N{item.price.toFixed(2)}
            </p>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

// Info Row Component
const InfoRow: React.FC<{ icon: any; label: string; text: string }> = ({
  icon: Icon,
  label,
  text,
}) => (
  <div className="flex items-start">
    <Icon className="w-5 h-5 text-gray-400 mt-1 mr-3" />
    <div>
      <p className="text-sm font-medium">{label}</p>
      <p className="text-sm text-gray-500">{text}</p>
    </div>
  </div>
);

// No Orders Component
const NoOrders = () => (
  <div className="text-center py-12 rounded-lg">
    <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
    <h3 className="text-lg font-medium text-gray-900">No orders found</h3>
    <p className="mt-2 text-gray-500">You haven’t placed any orders yet.</p>
  </div>
);

// Status Style Utility
const getStatusStyle = (status: string) => {
  const statusStyles: Record<string, string> = {
    completed: "text-green-500",
    pending: "text-yellow-500",
    canceled: "text-red-500",
  };

  return statusStyles[status.toLowerCase()] || "text-gray-500";
};

export default OrderList;
