// CheckoutPage.tsx
import React, { useState } from "react";
import { Loader } from "lucide-react";
import useCartStore from "@/store/useCartStore";
import { PaystackButton } from "react-paystack";

const CheckoutPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
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

    setTimeout(() => {
      setIsLoading(false);
      if (paymentMethod === "card") {
        alert("Card payment processed!");
      }
    }, 1500);
  };

  const handlePaystackSuccess = () => {
    console.log("Paystack payment successful");
  };

  const handlePaystackClose = () => {
    console.log("Paystack payment modal closed");
  };

  const formatPrice = (price: string | number) => {
    const numPrice = typeof price === "string" ? parseFloat(price) : price;
    return isNaN(numPrice) ? "0.00" : numPrice.toFixed(2);
  };

  const calculateItemTotal = (price: string | number, quantity: number) => {
    const numPrice = typeof price === "string" ? parseFloat(price) : price;
    return isNaN(numPrice) ? 0 : numPrice * quantity;
  };

  return (
    <div className="w-full p-6">
      <h1 className="text-2xl font-bold text-green-600 mb-4 text-left">
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
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full p-3 border rounded-lg"
          >
            <option value="">Select</option>
            <option value="card">Pay on delivery</option>
            <option value="paystack">Paystack</option>
          </select>
        </div>

        {paymentMethod === "paystack" && (
          <PaystackButton
            amount={totalPrice() * 100}
            email={email}
            publicKey="your-paystack-public-key"
            text="Pay Now"
            onSuccess={handlePaystackSuccess}
            onClose={handlePaystackClose}
            className="bg-green-600 text-white p-3 rounded-lg w-full text-center"
          />
        )}

        {paymentMethod !== "paystack" && (
          <button
            type="submit"
            className="bg-green-600 text-white p-3 rounded-lg w-full flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="animate-spin" size={20} />
            ) : (
              "Confirm Payment"
            )}
          </button>
        )}

        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default CheckoutPage;
