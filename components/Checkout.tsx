"use client";
import { useState, useEffect } from "react";
import { Loader } from "lucide-react";
import useCartStore from "@/store/useCartStore";
import useAuthStore from "@/store/useAuthStore";
import useOrderStore, { CreateOrder } from "@/store/useOrderStore";
// import { PaystackButton } from "react-paystack";
import { formatPrice } from "@/utils/checkout";
import CheckoutHeader from "./checkout/CheckoutHeader";
import OrderSummary from "./checkout/OrderSummary";
import useModalStore from "@/store/useModalStore";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { PaymentMethod } from "@/types/order";
import InputField from "./ui/InputField";

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
  const { user, token } = useAuthStore();
  const { createOrder, loading: orderLoading } = useOrderStore();

  const { closeCheckoutModal, openPaymentSuccess } = useModalStore();

  useEffect(() => {
    if (typeof window !== null && token && user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setPhone(user.phoneNumber);
      setAddress(user.address);
    }
  }, [token, user]);

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

    const formattedPhoneNumber = "+" + phone;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !formattedPhoneNumber ||
      !address
    ) {
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
            ? PaymentMethod.ONLINE_PAYMENT
            : PaymentMethod.PAYMENT_ON_DELIVERY,
        phoneNumber: formattedPhoneNumber,
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
    <div className="px-1">
      <CheckoutHeader />
      <OrderSummary cartItems={cartItems} />
      <div className="font-bold mt-2">Total: N{formatPrice(totalPrice)}</div>

      <form onSubmit={handlePayment} className="space-y-4 mt-8">
        <h2 className="font-bold text-xl mb-2">Billing Information</h2>

        <div className="flex gap-1">
          <div>
            <InputField
              type="text"
              label="First name"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <InputField
              type="text"
              value={lastName}
              label="Last name"
              placeholder="Last name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

        <div>
          <InputField
            type="email"
            value={email}
            label="Email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-2">Phone Number</label>

          <PhoneInput
            country={"ng"}
            value={phone}
            onChange={(value: any) => setPhone(value)}
            inputStyle={{
              width: "100%",
              padding: "1.5rem 4rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
              transition: "border-color 0.2s",
            }}
            containerStyle={{
              marginBottom: "10px",
            }}
            buttonStyle={{
              borderRadius: "4px 0 0 4px",
            }}
          />
        </div>

        <div>
          <InputField
            type="text"
            value={address}
            label="Delivery Address"
            placeholder="Delivery address"
            onChange={(e) => setAddress(e.target.value)}
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
            className="bg-green-700 font-semibold text-white p-3 rounded-lg w-full flex items-center justify-center"
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
