"use client";
import { Plus, Minus, Trash2 } from "lucide-react";
import Image from "next/image";
import useModalStore from "@/store/useModalStore";
import { capitalizeFirstChar } from "@/utils";
import useGuestCartStore from "@/store/useGuestCartStore";
import CloseButton from "./ui/CloseButton";
import toast from "react-hot-toast";

const GuestCartPage: React.FC = () => {
  const { closeModal, openCheckoutModal } = useModalStore();
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
    openCheckoutModal();
    closeModal();
  };

  const handleCloseGuestCartPage = () => {
    closeModal();
  };

  const handleDeleteProduct = (id: string) => {
    guestRemoveFromCart(id);
    toast.success("Removed item from cart!");
    console.log("deleted", id);
  };

  return (
    <div className="h-full flex flex-col">
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
                <div className="w-[6.5rem] h-[5rem] relative flex-shrink-0 border-[2px] border-green-700 rounded-lg">
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
                      className="p-1 rounded-lg bg-gray-200 hover:bg-gray-300"
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
                      className="p-1 rounded-lg bg-gray-200 hover:bg-gray-300"
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

          {/* Footer section fixed to the bottom */}
          <div className="border-t p-4 bg-white sticky bottom-0 w-full">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-bold">Total:</span>
              <span className="text-xl font-bold">
                N{formatPrice(guestTotalPrice)}
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
    </div>
  );
};

export default GuestCartPage;
