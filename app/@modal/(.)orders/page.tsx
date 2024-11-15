"use client";

import OrderList from "@/components/user-orders/OrderList";

export default function OrdersModal() {
  return (
    <section className="min-h-screen h-full ">
      <div className="p-4">
        <OrderList />
      </div>
    </section>
  );
}
