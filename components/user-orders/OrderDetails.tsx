import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Truck, Calendar, CreditCard, MapPin } from "lucide-react";
import { formatPaymentMethod } from "@/utils";
import LoadingState from "../Loading";
import useOrderStore from "@/store/useOrderStore";
import OrderErrorState from "./OrderErrorState";
import OrderNotFound from "./OrderNotFound";
import OrderItemCard from "./OrderItemCard";
import OrderInfoCard from "./OrderInfoCard";
import OrderStatus from "./OrderStatus";

interface OrderDetailsProps {
  orderId: string;
  type?: "full" | "view";
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ orderId, type }) => {
  const router = useRouter();
  const { singleOrder, error, loading, initialized, fetchSingleOrder } =
    useOrderStore();

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
    return <OrderErrorState message={error.message} onBack={handleBack} />;
  }

  if (initialized && !singleOrder) {
    return (
      <OrderNotFound
        onBack={handleBack}
        message="The requested order could not be found."
      />
    );
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
                <p className="font-medium">#{singleOrder?.id}</p>
              </div>
              {singleOrder?.status && (
                <OrderStatus status={singleOrder.status} />
              )}
            </div>

            <div
              className={`gap-6 mt-6 ${
                type === "view"
                  ? "flex flex-col"
                  : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              <OrderInfoCard
                icon={<Calendar className="w-5 h-5" />}
                label="Order Date"
                value={
                  singleOrder?.createdAt
                    ? new Date(singleOrder.createdAt).toLocaleDateString()
                    : "N/A"
                }
              />
              <OrderInfoCard
                icon={<CreditCard className="w-5 h-5" />}
                label="Payment Method"
                value={
                  singleOrder?.paymentMethod
                    ? formatPaymentMethod(singleOrder.paymentMethod)
                    : "N/A"
                }
              />
              <OrderInfoCard
                icon={<Truck className="w-5 h-5" />}
                label="Total Amount"
                value={
                  singleOrder?.total
                    ? `N${singleOrder.total.toFixed(2)}`
                    : "N/A"
                }
              />
            </div>
            <div className="mt-8 lg:mt-6">
              <OrderInfoCard
                icon={<MapPin className="w-5 h-5" />}
                label="Shipping Address"
                value={singleOrder?.shippingAddress || "N/A"}
              />
            </div>
          </div>

          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Order Items</h2>
            <div className="space-y-4">
              {singleOrder?.orderItems?.length ? (
                singleOrder.orderItems.map((item) => (
                  <OrderItemCard key={item.orderId} item={item} />
                ))
              ) : (
                <p className="text-sm text-gray-500">
                  This order does not contain any items.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
