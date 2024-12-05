"use client";
import useAuthStore from "@/store/useAuthStore";
import useCartStore from "@/store/useCartStore";
import { Plus, Minus, Trash2 } from "lucide-react";
import Image from "next/image";
import useModalStore from "@/store/useModalStore";
import { capitalizeFirstChar } from "@/utils";
import CloseButton from "./ui/CloseButton";
import { deletedFromCartFailure, deletedFromCartSuccess } from "@/utils/toast";

const CartPage: React.FC = () => {
  const { closeModal, openCheckoutModal } = useModalStore();
  const { cartItems, removeFromCart, updateQuantity, totalPrice } =
    useCartStore();
  const { user, method, isPhoneVerified } = useAuthStore();

  const formatPrice = (price: string | number) => {
    const numPrice = typeof price === "string" ? parseFloat(price) : price;
    return isNaN(numPrice) ? "0.00" : numPrice.toFixed(2);
  };

  const handleCheckout = () => {
    openCheckoutModal();
  };

  const handleCloseCartPage = () => {
    closeModal();
  };

  const handleDeleteProduct = async (id: string) => {
    const success = await removeFromCart(id);
    if (success) {
      deletedFromCartSuccess();
    } else {
      deletedFromCartFailure();
    }
  };

  const getVerificationMessage = () => {
    switch (method) {
      case "email":
        if (!user?.isEmailVerified) {
          return {
            message: "You need to verify your email address to view your cart.",
            route: "/verify-email",
            buttonText: "Verify Email",
          };
        }
        break;

      case "phone-signup":
        if (!user?.isPhoneVerified) {
          return {
            message:
              "You need to verify your phone number to access your cart.",
            route: "/verify-phone",
            buttonText: "Verify Phone",
          };
        }
        break;

      case "phone-signin":
        if (isPhoneVerified) {
          return {
            message:
              "You need to verify your login session to access your cart.",
            route: "/verify-otp",
            buttonText: "Verify",
          };
        }
        break;

      default:
        return null;
    }
    return null;
  };

  const verificationInfo = getVerificationMessage();

  return (
    <div className="h-full flex flex-col">
      {verificationInfo ? (
        <div className="p-4 bg-red-100 text-red-700 rounded-lg mb-4">
          <p>{verificationInfo.message}</p>
          <button
            onClick={() => (window.location.href = verificationInfo.route)}
            className="mt-3 w-full bg-green-700 text-white font-semibold py-3 rounded-lg hover:bg-green-800 transition-colors duration-200"
          >
            {verificationInfo.buttonText}
          </button>
        </div>
      ) : (
        <>
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-2xl font-bold">Your Cart</h2>
            <CloseButton onClick={handleCloseCartPage} />
          </div>

          {cartItems.length === 0 ? (
            <div className="flex-grow flex items-center justify-center">
              <p className="text-gray-500 text-lg">Your cart is empty.</p>
            </div>
          ) : (
            <>
              <div className="flex-grow overflow-y-auto p-4">
                {cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center space-x-4 mb-4 pb-4 border-b last:border-b-0"
                  >
                    <div className="w-[6.5rem] h-[5rem] relative flex-shrink-0 border-[2px] border-green-700 rounded-lg">
                      <Image
                        src={item.product.images[0]}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{ objectFit: "cover" }}
                        alt={item.product.name}
                        className="rounded-md"
                        priority
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-semibold text-lg">
                        {capitalizeFirstChar(item.product.name)}
                      </h3>
                      <p className="text-gray-600">
                        N{formatPrice(item.product.price)}
                      </p>
                      <div className="flex items-center mt-1">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              Math.max(0, item.quantity - 1)
                            )
                          }
                          className="p-1 rounded-xl bg-gray-200 hover:bg-gray-300"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="mx-2 min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="p-1 rounded-xl bg-gray-200 hover:bg-gray-300"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteProduct(item.product.id)}
                      className="text-red-500 hover:text-red-700 p-2"
                    >
                      <Trash2 size={22} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="border-t p-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold">Total:</span>
                  <span className="text-xl font-bold">
                    N{formatPrice(totalPrice)}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-green-700 text-white font-semibold py-3 rounded-lg hover:bg-green-800 transition-colors duration-200"
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CartPage;
