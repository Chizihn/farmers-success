"use client";

import OrderDetails from "@/components/user-orders/OrderDetails";

export default function OrderDetailsModal({
  params,
}: {
  params: { orderId: string };
}) {
  return (
    <>
      <OrderDetails type="view" orderId={params.orderId} />
    </>
  );
}
