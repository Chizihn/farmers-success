"use client";
import { ShoppingCart } from "lucide-react";
import useCartStore from "@/store/useCartStore";
import useModalStore from "@/store/useModalStore";
import useGuestCartStore from "@/store/useGuestCartStore";
import useAuthStore from "@/store/useAuthStore";
import "react-phone-input-2/lib/style.css";

interface Props {
  color?: "black" | "white";
}

export const Cart: React.FC<Props> = ({ color = "black" }) => {
  const { openModal } = useModalStore();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const totalItems = useCartStore((state) => state.totalItems);
  const guestTotalItems = useGuestCartStore((state) => state.guestTotalItems);

  const handleOpenCart = () => {
    openModal();
  };

  return (
    <div>
      <button
        className="flex items-center gap-1 relative transition-colors duration-200 hover:text-green-600"
        onClick={handleOpenCart}
      >
        <ShoppingCart
          size={28}
          className={`${color === "white" ? "text-white" : "text-black"}`}
        />

        <p
          className={`absolute ${
            color === "white"
              ? "top-[-12px] right-[-15px] lg:top-[-17px] lg:right-[-20px]"
              : "top-[-6px] right-[-7px] md:top-[-10px] md:right-[-10px]"
          } 
          bg-red-600 flex justify-center items-center text-white 
          ${
            (isAuthenticated ? totalItems : guestTotalItems) > 99
              ? "w-[25px] h-[25px] md:w-[30px] md:h-[30px] text-[10px] md:text-sm"
              : "w-[20px] h-[20px] md:w-[25px] md:h-[25px] text-xs md:text-sm"
          } rounded-full`}
        >
          <strong>
            {(isAuthenticated ? totalItems : guestTotalItems) > 99
              ? "99+"
              : isAuthenticated
              ? totalItems
              : guestTotalItems}
          </strong>
        </p>
      </button>
    </div>
  );
};

export default Cart;
