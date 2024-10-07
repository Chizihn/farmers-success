"use client";
import Logo from "@/components/Logo";
import { Items, OrderFile, orders } from "@/components/orders";
import { Loader } from "lucide-react";
import { useState } from "react";

const TrackMyOrder = () => {
  const [orderId, setOrderId] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [orderDetails, setOrderDetails] = useState<OrderFile | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const foundOrder = orders.find(
      (order) => order.orderId === orderId && order.email === email
    );

    setTimeout(() => {
      setIsLoading(false);

      if (foundOrder) {
        setOrderDetails(foundOrder);
        setError("");
      } else {
        setError("Order not found. Please check your details and try again.");
        setOrderDetails(null);
      }
    }, 1500); // Simulate a loading delay
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>
        <h1 className="text-2xl font-bold text-green-600 mb-4 text-center">
          Track Order
        </h1>
        <p className="text-center text-gray-600 mb-4">
          Enter your Order ID and Email to track your order.
        </p>

        {/* Input Fields */}
        <form onSubmit={handleTrackOrder} className="space-y-4">
          <input
            type="text"
            placeholder="Order ID"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-600"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-600"
          />
          <button
            className="w-full flex items-center justify-center bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="animate-spin" />
            ) : (
              <p>Track Order</p>
            )}
          </button>
        </form>

        {/* Error Message */}
        {error && <p className="text-red-600 mt-4">{error}</p>}

        {orderDetails && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-700">
              Order #{orderDetails.orderId}
            </h2>
            <p className="text-gray-600">
              Status:{" "}
              <span className="font-semibold">{orderDetails.status}</span>
            </p>
            <p className="text-gray-600">Date: {orderDetails.date}</p>

            <h3 className="mt-4 text-lg font-semibold">Items:</h3>
            <ul className="mt-2 space-y-2">
              {orderDetails.items.map((item: Items, index: number) => (
                <li key={index} className="text-gray-600">
                  {item.quantity} x {item.name} - ₦{item.price}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackMyOrder;
