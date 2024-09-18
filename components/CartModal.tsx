import { X, Plus, Minus } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import Image from "next/image";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } =
    useCartStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full h-screen lg:h-auto ">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Your Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="h-auto flex flex-col justify-between">
            {cartItems.map((item) => (
              <div
                key={item.name}
                className="w-full grid grid-cols-3 justify-items-center mb-4"
              >
                <div className="flex gap-2">
                  <div>
                    <Image
                      src={item.image}
                      width={50}
                      height={50}
                      objectFit="cover"
                      alt={item.name}
                    />
                  </div>
                  <h3 className="font-semibold">{item.name}</h3>
                </div>
                <div className="flex items-center">
                  <div>
                    <div>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.name,
                            Math.max(0, item.quantity - 1)
                          )
                        }
                        className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.name, item.quantity + 1)
                        }
                        className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.name)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <p className="text-gray-600">{item.price}</p>
              </div>
            ))}
            <div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xl font-bold">
                  Total: N{totalPrice().toFixed(2)}
                </p>
              </div>
              <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
