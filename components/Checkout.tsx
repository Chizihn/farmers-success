"use client";
import { useState, useEffect } from "react";
import { Loader } from "lucide-react";
import useCartStore from "@/store/useCartStore";
import useAuthStore from "@/store/useAuthStore";
import useOrderStore, {
  ProductPaymentMethod,
  CreateOrder,
} from "@/store/useOrderStore";
// import { PaystackButton } from "react-paystack";
import { useRouter, useSearchParams } from "next/navigation";
import PaymentSuccess from "./PaymentSuccess";
import PaymentFailure from "./PaymentFailure";
import { formatPrice } from "@/utils/checkout";
import CheckoutHeader from "./checkout/CheckoutHeader";
import OrderSummary from "./checkout/OrderSummary";
import useModalStore from "@/store/useModalStore";

const Checkout: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { cartItems, totalItems, totalPrice, clearCart } = useCartStore();
  const { user, isAuthenticated } = useAuthStore();
  const { createOrder, loading: orderLoading } = useOrderStore();

  const { closeCheckoutModal, openPaymentSuccess } = useModalStore();

  useEffect(() => {
    if (typeof window !== null && isAuthenticated && user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setPhone(user.phoneNumber);
      setAddress(user.address);
    }
  }, [isAuthenticated, user]);

  if (totalItems === 0) {
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
      const guestCart = cartItems.map((item) => ({
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

      // Call the createOrder function from useOrderStore
      await createOrder(orderData);
      setIsLoading(false);
      if (paymentMethod === "paystack") {
        // Handle online payment with Paystack
        // If Paystack succeeds, handlePaystackSuccess will redirect
      } else {
        closeCheckoutModal();
        openPaymentSuccess();
        clearCart();
      }
    } catch (error) {
      setError("Failed to create order. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full overflow-auto py-4 px-6 bg-white relative">
      <CheckoutHeader />
      <OrderSummary cartItems={cartItems} />
      <div className="font-bold mt-2">Total: N{formatPrice(totalPrice)}</div>

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
            placeholder="23491123456789"
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

export default Checkout;
