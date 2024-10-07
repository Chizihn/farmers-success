"use client";
import React, { useState } from "react";
import Logo from "@/components/Logo";
import { Loader } from "lucide-react";
import useCartStore from "@/store/useCartStore";
import { PaystackButton } from "react-paystack";

const Checkout = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { cartItems, totalPrice } = useCartStore();

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email) {
      setError("Please enter your email address.");
      setIsLoading(false);
      return;
    }

    if (!paymentMethod) {
      setError("Please select a payment method.");
      setIsLoading(false);
      return;
    }

    // Simulate a payment process
    setTimeout(() => {
      setIsLoading(false);
      if (paymentMethod === "card") {
        // Handle card payment logic
        alert("Card payment processed!");
      }
      // Paystack payment is handled by PaystackButton
    }, 1500);
  };

  const handlePaystackSuccess = () => {
    console.log("Paystack payment successful");
    // Handle successful payment (e.g., clear cart, show confirmation)
  };

  const handlePaystackClose = () => {
    console.log("Paystack payment modal closed");
  };

  // Helper function to format price
  const formatPrice = (price: string | number) => {
    const numPrice = typeof price === "string" ? parseFloat(price) : price;
    return isNaN(numPrice) ? "0.00" : numPrice.toFixed(2);
  };

  // Helper function to calculate item total
  const calculateItemTotal = (price: string | number, quantity: number) => {
    const numPrice = typeof price === "string" ? parseFloat(price) : price;
    return isNaN(numPrice) ? 0 : numPrice * quantity;
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>
        <h1 className="text-2xl font-bold text-green-600 mb-4 text-center">
          Checkout
        </h1>

        <div className="mb-4">
          <h2 className="font-semibold mb-2">Order Summary</h2>
          {cartItems.map((item) => (
            <div key={item.name} className="flex justify-between">
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>
                N{formatPrice(calculateItemTotal(item.price, item.quantity))}
              </span>
            </div>
          ))}
          <div className="font-bold mt-2">
            Total: N{formatPrice(totalPrice())}
          </div>
        </div>

        <form onSubmit={handlePayment} className="space-y-4">
          <div>
            <label className="block mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Payment Method</label>
            <div>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                  className="mr-2"
                />
                Card Payment
              </label>
              <label className="flex items-center mt-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="paystack"
                  checked={paymentMethod === "paystack"}
                  onChange={() => setPaymentMethod("paystack")}
                  className="mr-2"
                />
                Pay with Paystack
              </label>
            </div>
          </div>

          {paymentMethod === "card" && (
            <button
              type="submit"
              className="w-full flex items-center justify-center bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="animate-spin" />
              ) : (
                <p>Pay with Card</p>
              )}
            </button>
          )}

          {paymentMethod === "paystack" && (
            <PaystackButton
              publicKey={process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || ""}
              amount={parseFloat(formatPrice(totalPrice())) * 100} // Paystack expects amount in kobo
              email={email}
              onSuccess={handlePaystackSuccess}
              onClose={handlePaystackClose}
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200"
              text="Pay"
            />
          )}
        </form>

        {error && <p className="text-red-600 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default Checkout;
