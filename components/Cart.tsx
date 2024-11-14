"use client";
import { ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import useCartStore from "@/store/useCartStore";
import useModalStore from "@/store/useModalStore";
import useGuestCartStore from "@/store/useGuestCartStore";
import useAuthStore from "@/store/useAuthStore";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export const Cart: React.FC = () => {
  const { openModal } = useModalStore();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const totalItems = useCartStore((state) => state.totalItems);
  const guestTotalItems = useGuestCartStore((state) => state.guestTotalItems);

  const [hasMounted, setHasMounted] = useState<boolean>(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleOpenCart = () => {
    openModal();
  };

  return (
    <div>
      <button
        className="flex items-center gap-1 relative transition-colors duration-200 hover:text-green-600"
        onClick={handleOpenCart}
      >
        <ShoppingCart size={28} />
        {hasMounted && (
          <p className="absolute top-[-6px] right-[-7px] md:top-[-10px] md:right-[-10px] bg-red-600 w-[15px] h-[15px] md:w-[20px] md:h-[20px] rounded-full flex justify-center items-center text-white text-xs md:text-sm ">
            <strong>{isAuthenticated ? totalItems : guestTotalItems}</strong>
          </p>
        )}
      </button>
    </div>
  );
};

export default Cart;
