"use client";
import OrderList from "@/components/user-orders/OrderList";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function OrdersPage() {
  return (
    <>
      <main className="w-full min-h-screen h-full flex justify-center items-start">
        <div className="max-w-3xl min-h-screen w-full bg-white p-6 relative">
          <Link
            href="/"
            className="absolute top-8 right-8 font-semibold flex items-center gap-0.5 hover:text-green-600 "
          >
            <ChevronLeft></ChevronLeft>
            Back to home
          </Link>
          <OrderList />
        </div>
      </main>
    </>
  );
}
