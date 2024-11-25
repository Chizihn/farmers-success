import OrderList from "@/components/user-orders/OrderList";
export default function OrdersPage() {
  return (
    <>
      <main className="bg-white w-full min-h-screen h-full flex justify-center items-start">
        <div className="min-h-screen w-full p-6 relative">
          <OrderList />
        </div>
      </main>
    </>
  );
}
