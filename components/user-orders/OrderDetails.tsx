import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Package,
  ArrowLeft,
  Truck,
  Calendar,
  CreditCard,
  MapPin,
} from "lucide-react";
import { capitalizeFirstChar, formatPaymentMethod } from "@/utils";
import LoadingState from "../Loading";
import useOrderStore from "@/store/useOrderStore";
import { OrderItem } from "@/types/order";

interface OrderDetailsProps {
  orderId: string;
  type?: "full" | "view";
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ orderId, type }) => {
  const router = useRouter();
  const {
    singleOrder: order,
    loading,
    error,
    initialized,
    fetchSingleOrder,
  } = useOrderStore();

  useEffect(() => {
    if (orderId) {
      fetchSingleOrder(orderId).catch(console.error);
    }
  }, [orderId, fetchSingleOrder]);

  const handleBack = () => {
    router.back();
  };

  if (loading && !initialized) return <LoadingState />;

  if (error) {
    return <ErrorState message={error.message} onBack={handleBack} />;
  }

  if (!order) {
    return <NotFoundState onBack={handleBack} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <button
            onClick={handleBack}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Orders
          </button>
        </div>
        <div className="mb-3 px-6">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">
            Order Details
          </h1>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-medium">#{order.id}</p>
              </div>
              <OrderStatus status={order.status} />
            </div>

            <div
              className={` gap-6 mt-6 ${
                type === "view"
                  ? "flex flex-col"
                  : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              <InfoCard
                icon={<Calendar className="w-5 h-5" />}
                label="Order Date"
                value={new Date(order.createdAt).toLocaleDateString()}
              />
              <InfoCard
                icon={<CreditCard className="w-5 h-5" />}
                label="Payment Method"
                value={formatPaymentMethod(order.paymentMethod)}
              />
              <InfoCard
                icon={<Truck className="w-5 h-5" />}
                label="Total Amount"
                value={`N${order.total.toFixed(2)}`}
              />
            </div>
            <div className="mt-8 lg:mt-6">
              <InfoCard
                icon={<MapPin className="w-5 h-5" />}
                label="Shipping Address"
                value={order.shippingAddress}
              />
            </div>
          </div>

          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.orderItems.map((item) => (
                <OrderItemCard key={item.orderId} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrderStatus: React.FC<{ status: string }> = ({ status }) => {
  const statusColors = {
    completed: "bg-green-50 text-green-700 border-green-200",
    pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
    canceled: "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium border $`}>
      {capitalizeFirstChar(status)}
    </span>
  );
};

const InfoCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
}> = ({ icon, label, value }) => (
  <div className="flex space-x-3">
    <div className="flex-shrink-0 text-gray-400">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium text-gray-900">{value}</p>
    </div>
  </div>
);

const OrderItemCard: React.FC<{ item: OrderItem }> = ({ item }) => (
  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
    <div className="relative w-20 h-20 flex-shrink-0">
      <Image
        src={item.product.images[0] || "/placeholder.png"}
        alt={item.product.name}
        fill
        className="object-cover rounded-lg"
      />
    </div>
    <div className="flex-grow">
      <h3 className="font-medium text-gray-900">
        {capitalizeFirstChar(item.product.name)}
      </h3>
      <div className="mt-1 text-sm text-gray-500">
        <span>Quantity: {item.quantity}</span>
        <span className="mx-2">•</span>
        <span>Price: N{item.price.toFixed(2)}</span>
      </div>
    </div>
    <div className="text-right">
      <p className="font-medium text-gray-900">
        N{(item.price * item.quantity).toFixed(2)}
      </p>
    </div>
  </div>
);

const ErrorState: React.FC<{ message: string; onBack: () => void }> = ({
  message,
  onBack,
}) => (
  <div className="flex flex-col items-center justify-center min-h-screen p-4">
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
        <Package className="w-8 h-8 text-red-600" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        Error Loading Order
      </h3>
      <p className="text-gray-500 mb-4">{message}</p>
      <button
        onClick={onBack}
        className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Orders
      </button>
    </div>
  </div>
);

const NotFoundState: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <div className="flex flex-col items-center justify-center min-h-screen p-4">
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
        <Package className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        Order Not Found
      </h3>
      <p className="text-gray-500 mb-4">
        The order you{`'`}re looking for doesn{`'`}t exist or has been removed.
      </p>
      <button
        onClick={onBack}
        className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Orders
      </button>
    </div>
  </div>
);

export default OrderDetails;
