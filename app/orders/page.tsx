import OrderList from "@/components/user-orders/OrderList";

export default function OrdersPage() {
  return (
    <main className="w-full min-h-screen flex justify-center items-start">
      <div className="max-w-3xl w-full bg-white p-4">
        <OrderList />
      </div>
    </main>
  );
}
