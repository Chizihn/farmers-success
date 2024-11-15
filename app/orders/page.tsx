import OrderList from "@/components/user-orders/OrderList";

export default function OrdersPage() {
  return (
    <main className="w-full min-h-screen h-full flex justify-center items-start">
      <div className="max-w-3xl min-h-screen w-full bg-white p-6">
        <OrderList />
      </div>
    </main>
  );
}
