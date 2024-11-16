"use client";
import { Package } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import LoadingState from "../Loading";
import { capitalizeFirstChar } from "@/utils";
import useOrderStore from "@/store/useOrderStore";
import useAuthStore from "@/store/useAuthStore";
import { useEffect, useState } from "react";

const OrderList: React.FC = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const {
    productOrders: orders,
    fetchProductOrders,
    loading,
    error,
  } = useOrderStore();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProductOrders().catch(console.error);
      setIsInitialized(true);
    }
  }, [fetchProductOrders, isAuthenticated]);

  if (loading || !isInitialized) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error.message} />;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>
      <div className="space-y-4">
        {orders.length === 0 ? (
          <div className="text-center py-12 rounded-lg">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">
              No orders found
            </h3>
            <p className="mt-2 text-gray-500">
              You haven{}t placed any orders yet.
            </p>
          </div>
        ) : (
          orders.map((order) => (
            <OrderCard key={order.id} order={order} orderId={order.id} />
          ))
        )}
      </div>
    </div>
  );
};

const ErrorState: React.FC<{ message: string }> = ({ message }) => (
  <div className="flex flex-col items-center justify-center min-h-screen text-red-500">
    <p className="text-lg font-medium">Error loading orders: {message}</p>
    <Link href="/" className="text-blue-500 mt-4 underline">
      Back to Home
    </Link>
  </div>
);

const OrderCard: React.FC<{ order: any; orderId: string }> = ({
  order,
  orderId,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition">
      <OrderHeader id={order.id} status={capitalizeFirstChar(order.status)} />
      <OrderDetails order={order} />
      <div className="mt-2">
        <Link href={`/orders/${orderId}`}>
          <button className="w-full bg-green-700 text-white font-bold py-3 rounded-lg hover:bg-green-800 transition-colors duration-200">
            View order
          </button>
        </Link>
      </div>
    </div>
  );
};

const OrderHeader: React.FC<{ id: string; status: string }> = ({
  id,
  status,
}) => (
  <div className="flex justify-between items-center border-b pb-2">
    <h2 className="text-lg font-semibold">Order #{id}</h2>
    <p className={`text-sm font-medium ${getStatusStyle(status)}`}>{status}</p>
  </div>
);

const OrderDetails: React.FC<{ order: any }> = ({ order }) => (
  <div className="mt-4 ">
    <OrderItems items={order.orderItems} />
  </div>
);

const OrderItems: React.FC<{ items: any[] }> = ({ items }) => (
  <div className="mt-4">
    <ul className="space-y-2">
      {items.map((item) => (
        <li
          key={item.orderId}
          className="flex items-start space-x-4 shadow-md "
        >
          <div className="relative w-16 h-16 border-[1px]  ">
            <Image
              src={item.product.images[0] || "/placeholder.png"}
              alt={item.product.name}
              fill
              className="object-cover rounded-md"
              priority
            />
          </div>
          <div>
            <p className="font-semibold">
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

const getStatusStyle = (status: string) => {
  const statusStyles: Record<string, string> = {
    completed: "text-green-700",
    pending: "text-yellow-500",
    canceled: "text-red-500",
  };

  return statusStyles[status.toLowerCase()] || "text-gray-500";
};

export default OrderList;
