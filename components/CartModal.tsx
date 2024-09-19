import useCartStore from "@/store/useCartStore";
import { X, Plus, Minus, Trash2 } from "lucide-react";
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
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-bold">Your Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
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
                  key={item.name}
                  className="flex items-center space-x-4 mb-4 pb-4 border-b last:border-b-0"
                >
                  <div className="w-[6.5rem] h-[5rem] relative flex-shrink-0">
                    <Image
                      src={item.image}
                      layout="fill"
                      objectFit="cover"
                      alt={item.name}
                      className="rounded-md"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-600">N{item.price}</p>
                    <div className="flex items-center mt-1">
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
                      <span className="mx-2 min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.name, item.quantity + 1)
                        }
                        className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.name)}
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
                <span className="text-xl font-bold">N{totalPrice()}</span>
              </div>
              <button className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-colors duration-200">
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartModal;
