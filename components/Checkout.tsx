"use client";
import { useState, useEffect } from "react";
import { Loader } from "lucide-react";
import useCartStore from "@/store/useCartStore";
import { PaystackButton } from "react-paystack";
import { useRouter, useSearchParams } from "next/navigation";
import PaymentSuccess from "./PaymentSuccess";
import PaymentFailure from "./PaymentFailure";

const Checkout: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { cartItems, totalPrice, removeFromCart } = useCartStore();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("status") === "success") {
      clearCart();
    }
  }, [searchParams]);

  const clearCart = () => {
    cartItems.forEach((item) => removeFromCart(item.name));
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!firstName || !lastName || !email || !phone) {
      setError("Please fill in all required fields.");
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
        // Simulate a 50% chance of payment failure
        if (Math.random() < 0.5) {
          router.push("/?checkout&status=success");
        } else {
          router.push("/?checkout&status=failure");
        }
      }
    }, 1500);
  };

  const handlePaystackSuccess = () => {
    console.log("Paystack payment successful");
    router.push("/?checkout&status=success");
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

  if (searchParams.get("status") === "success") {
    return <PaymentSuccess />;
  }

  if (searchParams.get("status") === "failure") {
    return <PaymentFailure />;
  }

  return (
    <div className="w-full h-full overflow-auto p-6 bg-white">
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
        <div className="font-bold mt-2">Total: N{formatPrice(totalPrice)}</div>
      </div>

      <form onSubmit={handlePayment} className="space-y-4 mt-8">
        <h2 className="font-bold text-xl mb-2">Billing Information</h2>

        <div className="flex gap-1">
          <div>
            <label className="block mb-2">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>
        </div>

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
          <label className="block mb-2">Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
            amount={totalPrice * 100}
            firstname={firstName}
            lastname={lastName}
            email={email}
            phone={phone}
            publicKey={process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || ""}
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

export default Checkout;
