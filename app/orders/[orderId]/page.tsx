"use client";

import OrderDetails from "@/components/user-orders/OrderDetails";

export default function OrderDetailsPage({
  params,
}: {
  params: { orderId: string };
}) {
  return (
    <>
      <OrderDetails orderId={params.orderId} />
    </>
  );
}
