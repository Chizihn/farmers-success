"use client";
import { useState } from "react";
import { Loader } from "lucide-react";

import useOrderStore, {
  ProductPaymentMethod,
  CreateOrder,
} from "@/store/useOrderStore";
import { useRouter, useSearchParams } from "next/navigation";
import PaymentSuccess from "./PaymentSuccess";
import PaymentFailure from "./PaymentFailure";
import { formatPrice } from "@/utils/checkout";
import CheckoutHeader from "./checkout/CheckoutHeader";
import OrderSummary from "./checkout/OrderSummary";
import useGuestCartStore from "@/store/useGuestCartStore";
import useModalStore from "@/store/useModalStore";

const GuestCheckout: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { closeCheckoutModal, openPaymentSuccess } = useModalStore();

  const {
    guestCartItems,
    guestTotalItems,
    guestTotalPrice,
    guestRemoveFromCart,
  } = useGuestCartStore();
  const { createOrder, loading: orderLoading } = useOrderStore();

  const clearCart = () => {
    guestCartItems.forEach((item) => guestRemoveFromCart(item.product.id));
  };

  if (guestTotalItems === 0) {
    return (
      <div className="flex items-center justify-center w-full h-full p-6 bg-white relative">
        <CheckoutHeader />
        <h1 className="text-2xl font-bold text-gray-500">Your cart is empty</h1>
      </div>
    );
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!firstName || !lastName || !email || !phone || !address) {
      setError("Please fill in all required fields.");
      setIsLoading(false);
      return;
    }

    if (!paymentMethod) {
      setError("Please select a payment method.");
      setIsLoading(false);
      return;
    }

    try {
      // Map cartItems to create a guestCart array of the expected structure
      const guestCart = guestCartItems.map((item) => ({
        productId: item.product.id, // Extract only the product ID
        quantity: item.quantity,
      }));

      const orderData: CreateOrder = {
        email,
        firstName,
        guestCart,
        lastName,
        paymentMethod:
          paymentMethod === "paystack"
            ? ProductPaymentMethod.ONLINE_PAYMENT
            : ProductPaymentMethod.PAYMENT_ON_DELIVERY,
        phoneNumber: phone,
        shippingAddress: address,
      };

      await createOrder(orderData);
      setIsLoading(false);

      if (paymentMethod === "paystack") {
      } else {
        closeCheckoutModal();
        openPaymentSuccess();
        clearCart();
      }
    } catch (error) {
      setError("Failed to create order. Please try again.");
      setIsLoading(false);
      return <PaymentFailure />;
    }
  };

  return (
    <div className="">
      <CheckoutHeader />
      <OrderSummary cartItems={guestCartItems} />
      <div className="font-bold mt-2">
        Total: N{formatPrice(guestTotalPrice)}
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
          <label className="block mb-2">Delivery Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
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
          </select>
        </div>

        {paymentMethod !== "paystack" && (
          <button
            type="submit"
            className="bg-green-600 text-white p-3 rounded-lg w-full flex items-center justify-center"
            disabled={isLoading || orderLoading}
          >
            {isLoading || orderLoading ? (
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

export default GuestCheckout;
