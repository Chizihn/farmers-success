import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Truck, Calendar, CreditCard, MapPin } from "lucide-react";
import { formatPaymentMethod } from "@/utils";
import useOrderStore from "@/store/useOrderStore";
import OrderErrorState from "./OrderErrorState";
import OrderNotFound from "./OrderNotFound";
import OrderItemCard from "./OrderItemCard";
import OrderInfoCard from "./OrderInfoCard";
import OrderStatus from "./OrderStatus";
import LoadingState from "../Loading";

interface OrderDetailsProps {
  orderId: string;
  type?: "full" | "view";
}

const OrderDetails: React.FC<OrderDetailsProps> = ({
  orderId,
  type = "full",
}) => {
  const router = useRouter();
  const {
    singleOrder,
    productOrders,
    error,
    loading,
    initialized,
    fetchSingleOrder,
  } = useOrderStore();

  const [localOrder, setLocalOrder] = useState(() =>
    type === "view" ? productOrders.find((order) => order.id === orderId) : null
  );

  useEffect(() => {
    if (type === "full" && orderId) {
      setLocalOrder(null);
      fetchSingleOrder(orderId).catch(console.error);
    }
  }, [orderId, type, fetchSingleOrder]);

  const handleBack = () => {
    if (type === "view") {
      router.back(); // Navigate back for "view" type
    } else {
      window.location.href = "/orders"; // Redirect to the orders page for "full" type
    }
  };

  // Determine which order to display: fetched or local
  const order = type === "view" ? localOrder : singleOrder;

  if (type === "view" && !localOrder) {
    return (
      <OrderNotFound
        onBack={handleBack}
        message="The requested order could not be found locally."
      />
    );
  }

  if ((!localOrder && !initialized) || loading) {
    return <LoadingState />;
  }

  if (error) {
    return <OrderErrorState message={error.message} onBack={handleBack} />;
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
        <>
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
                  <p className="font-medium">#{order?.id}</p>
                </div>
                {order?.status && <OrderStatus status={order.status} />}
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
                    order?.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : "N/A"
                  }
                />
                <OrderInfoCard
                  icon={<CreditCard className="w-5 h-5" />}
                  label="Payment Method"
                  value={
                    order?.paymentMethod
                      ? formatPaymentMethod(order.paymentMethod)
                      : "N/A"
                  }
                />
                <OrderInfoCard
                  icon={<Truck className="w-5 h-5" />}
                  label="Total Amount"
                  value={order?.total ? `N${order.total.toFixed(2)}` : "N/A"}
                />
              </div>
              <div className="mt-8 lg:mt-6">
                <OrderInfoCard
                  icon={<MapPin className="w-5 h-5" />}
                  label="Shipping Address"
                  value={order?.shippingAddress || "N/A"}
                />
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-lg font-semibold mb-4">Order Items</h2>
              <div className="space-y-4">
                {order?.orderItems?.length ? (
                  order.orderItems.map((item) => (
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
        </>
      </div>
    </div>
  );
};

export default OrderDetails;
