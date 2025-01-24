"use client";
import LoadingState from "@/components/Loading";
import OrderList, { ErrorState } from "@/components/user-orders/OrderList";
import { useFetchOrders } from "@/hooks/useFetchOrders";
import useOrderStore from "@/store/useOrderStore";
import { useEffect } from "react";
export default function OrdersPage() {
  const {
    productOrders: orders,
    loading,
    initialized,
    error,
    fetchProductOrders,
  } = useOrderStore();

  useEffect(() => {
    if (!initialized) {
      fetchProductOrders();
    }
  }, [fetchProductOrders, initialized]);

  if (!initialized || loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error.message} />;
  }

  return (
    <>
      <main className="bg-white w-full min-h-screen h-full flex justify-center items-start">
        <div className="min-h-screen w-full p-6 relative">
          <OrderList orders={orders} />
        </div>
      </main>
    </>
  );
}
