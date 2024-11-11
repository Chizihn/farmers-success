"use client";
import { useQuery } from "@apollo/client";
import { GET_ORDER_ITEM } from "@/graphql/queries";
import { useParams, useRouter } from "next/navigation";
import {
  Loader2,
  ArrowLeft,
  Package,
  MapPin,
  Calendar,
  Clock,
  Truck,
  CreditCard,
  User,
  Home,
} from "lucide-react";

const OrderItem = () => {
  const params = useParams();
  const router = useRouter();
  const orderItemId = params.id as string;

  const { data, loading, error } = useQuery(GET_ORDER_ITEM, {
    variables: { orderItemId },
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-red-500">
        <p>Error loading order: {error.message}</p>
      </div>
    );
  }

  const orderItem = data?.getOrderItem;
  if (!orderItem) return null;

  const latestStatus = orderItem.status.sort(
    (a: any, b: any) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )[0];

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
    <div className="max-w-[1400px] mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Orders
        </button>
        <span
          className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(
            latestStatus.status
          )}`}
        >
          {latestStatus.status}
        </span>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Order Summary */}
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Order #{orderItem.orderId}
          </h1>
          <p className="text-gray-500">
            Placed on {new Date(orderItem.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Order Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Delivery Information */}
          <div className="space-y-6">
            <div className="flex items-start">
              <Truck className="w-5 h-5 text-gray-400 mt-1 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  Delivery Information
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {orderItem.deliveryInfo}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <MapPin className="w-5 h-5 text-gray-400 mt-1 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-gray-900">Location</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {orderItem.location}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Calendar className="w-5 h-5 text-gray-400 mt-1 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  Service Duration
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {new Date(orderItem.startDate).toLocaleDateString()} -
                  {new Date(orderItem.endDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Order and Payment Details */}
          <div className="space-y-6">
            <div className="flex items-start">
              <CreditCard className="w-5 h-5 text-gray-400 mt-1 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  Payment Details
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Method: {orderItem.order.paymentMethod}
                </p>
                <p className="text-sm text-gray-500">
                  Amount: ${orderItem.order.amount}
                </p>
                {orderItem.order.discount > 0 && (
                  <p className="text-sm text-green-600">
                    Discount: -${orderItem.order.discount}
                  </p>
                )}
                <p className="mt-1 text-sm font-medium text-gray-900">
                  Total: ${orderItem.order.amount - orderItem.order.discount}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Home className="w-5 h-5 text-gray-400 mt-1 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  Delivery Address
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {orderItem.order.address}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Status Timeline */}
        <div className="p-6 bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Order Timeline
          </h3>
          <div className="space-y-6">
            {orderItem.status
              .sort(
                (a: any, b: any) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .map((status: any) => (
                <div key={status.id} className="flex items-start">
                  <Clock className="w-5 h-5 text-gray-400 mt-1 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {status.status}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(status.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="p-6 border-t grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Seller Information */}
          <div className="flex items-start">
            <User className="w-5 h-5 text-gray-400 mt-1 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-gray-900">
                Seller Information
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {orderItem.seller.name}
              </p>
              <p className="text-sm text-gray-500">
                Email: {orderItem.seller.email}
              </p>
            </div>
          </div>

          {/* Buyer Information */}
          <div className="flex items-start">
            <User className="w-5 h-5 text-gray-400 mt-1 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-gray-900">
                Buyer Information
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {orderItem.buyer.name}
              </p>
              <p className="text-sm text-gray-500">
                Email: {orderItem.buyer.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
