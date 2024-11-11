"use client";
import { useQuery } from "@apollo/client";
import { GET_ORDER_ITEMS } from "@/graphql/queries";
import { Package, Calendar, MapPin, AlertCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { OrderStatus } from "@/types/order";
import LoadingState from "../Loading";
import useOrderStore from "@/store/useOrderStore";

const OrderList: React.FC = () => {
  const { orderItems, loading, error } = useOrderStore();

  if (loading) return <LoadingState />;

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-red-500">
        <AlertCircle className="w-8 h-8 mb-2" />
        <p>Error loading orders: {error.message}</p>
        <Link href="/" className="text-blue-500 mt-4 underline">
          Back to Home
        </Link>
      </div>
    );
  }

  const getLatestStatus = (statuses: OrderStatus[]) => {
    return statuses.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )[0];
  };

  const getStatusColor = (status: string) => {
    const colors = {
      PENDING: "bg-yellow-100 text-yellow-800",
      CONFIRMED: "bg-blue-100 text-blue-800",
      COMPLETED: "bg-green-100 text-green-800",
      CANCELLED: "bg-red-100 text-red-800",
      default: "bg-gray-100 text-gray-800",
    };
    return colors[status as keyof typeof colors] || colors.default;
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>
      <div className="space-y-4">
        {orderItems.map((item) => {
          const latestStatus = getLatestStatus(item.status);

          return (
            <Link
              href={`/orders/${item.id}`}
              key={item.id}
              className="block bg-white rounded-lg shadow-sm hover:shadow-md transition"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      latestStatus.status
                    )}`}
                  >
                    {latestStatus.status}
                  </span>
                  <p className="text-lg font-semibold">
                    ${item.order.amount - item.order.discount}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <InfoRow
                    icon={Package}
                    label="Delivery Info"
                    text={item.deliveryInfo}
                  />
                  <InfoRow
                    icon={MapPin}
                    label="Location"
                    text={item.location}
                  />
                  <InfoRow
                    icon={Calendar}
                    label="Duration"
                    text={`${formatDate(item.startDate)} - ${formatDate(
                      item.endDate
                    )}`}
                  />
                </div>

                <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Image
                      src={
                        item.seller.profileImageURL || "/placeholder-avatar.png"
                      }
                      alt={`${item.seller.firstName} ${item.seller.lastName}`}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="ml-3">
                      <p className="text-sm font-medium">Seller</p>
                      <p className="text-sm text-gray-500">
                        {item.seller.firstName} {item.seller.lastName}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">Payment Method</p>
                    <p className="text-sm text-gray-500">
                      {item.order.paymentMethod}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}

        {orderItems.length === 0 && <NoOrders />}
      </div>
    </div>
  );
};

// Utility Component for consistent row layout
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

// Utility Component for No Orders Found
const NoOrders = () => (
  <div className="text-center py-12 rounded-lg">
    <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
    <h3 className="text-lg font-medium text-gray-900">No orders found</h3>
    <p className="mt-2 text-gray-500">You havent placed any orders yet.</p>
  </div>
);

// Helper function to format date
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString();
};

export default OrderList;
