"use client";
import useCartStore from "@/store/useCartStore";
import { Plus, Minus, Trash2, X } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useModalStore from "@/store/useModalStore";
import { capitalizeFirstChar } from "@/utils";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import CheckoutModal from "./auth/CheckoutModal";
import useGuestCartStore from "@/store/useGuestCartStore";
import GuestCheckout from "./GuestCheckout";

const CheckoutPage = dynamic(() => import("./Checkout"), { ssr: false });

const GuestCartPage: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const {
    closeModal,
    isCheckoutModalOpen,
    openCheckoutModal,
    closeCheckoutModal,
  } = useModalStore();
  const {
    guestCartItems,
    guestRemoveFromCart,
    guestUpdateQuantity,
    guestTotalPrice,
  } = useGuestCartStore();

  const formatPrice = (price: string | number) => {
    const numPrice = typeof price === "string" ? parseFloat(price) : price;
    return isNaN(numPrice) ? "0.00" : numPrice.toFixed(2);
  };

  const handleCheckout = () => {
    router.push(`${pathname}?checkout`);
  };

  const handleCloseGuestCartPage = () => {
    closeModal();
  };

  const handleDeleteProduct = (id: string) => {
    guestRemoveFromCart(id);
    console.log("deleted", id);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (searchParams.has("checkout")) {
        openCheckoutModal();
      } else {
        closeCheckoutModal();
      }
    }
  }, [pathname, searchParams]);

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Cart</h2>
        <button onClick={handleCloseGuestCartPage}>
          <X size={35} />
        </button>
      </div>

      {guestCartItems.length === 0 ? (
        <div className="flex-grow flex items-center justify-center">
          <p className="text-gray-500 text-lg">Your cart is empty.</p>
        </div>
      ) : (
        <>
          <div className="flex-grow overflow-y-auto p-4">
            {guestCartItems.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center space-x-4 mb-4 pb-4 border-b last:border-b-0"
              >
                <div className="w-[6.5rem] h-[5rem] relative flex-shrink-0 border-[2px] border-green-700 rounded-lg ">
                  <Image
                    src={item.product.images[0]}
                    fill
                    style={{ objectFit: "cover" }}
                    alt={item.product.name}
                    className="rounded-md"
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
                        guestUpdateQuantity(
                          item.product.id,
                          Math.max(0, item.quantity - 1)
                        )
                      }
                      className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="mx-2 min-w-[20px] text-center">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        guestUpdateQuantity(item.product.id, item.quantity + 1)
                      }
                      className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
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
                N{formatPrice(guestTotalPrice)}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              Proceed to Checkout
            </button>
          </div>
          <CheckoutModal isOpen={isCheckoutModalOpen}>
            <GuestCheckout />
          </CheckoutModal>
        </>
      )}
    </div>
  );
};

export default GuestCartPage;
