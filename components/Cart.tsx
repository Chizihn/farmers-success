"use client";
import { ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import useCartStore from "@/store/useCartStore";
import useModalStore from "@/store/useModalStore";
import useGuestCartStore from "@/store/useGuestCartStore";
import useAuthStore from "@/store/useAuthStore";
import "react-phone-input-2/lib/style.css";

export const Cart: React.FC = () => {
  const { openModal } = useModalStore();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const totalItems = useCartStore((state) => state.totalItems);
  const guestTotalItems = useGuestCartStore((state) => state.guestTotalItems);
  const { fetchCart } = useCartStore();

  const [hasMounted, setHasMounted] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    const fetchCartForAuthUser = async () => {
      try {
        if (isMounted && isAuthenticated) {
          await fetchCart();
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching cart:", error);
        }
      } finally {
        if (isMounted) {
          setHasMounted(true);
        }
      }
    };
    fetchCartForAuthUser();
    return () => {
      isMounted = false;
    };
  }, [fetchCart, isAuthenticated]);

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
        {!hasMounted ? null : (
          <p
            className={`absolute top-[-6px] right-[-7px] md:top-[-10px] md:right-[-10px] 
          bg-red-600 flex justify-center items-center text-white 
          ${
            (isAuthenticated ? totalItems : guestTotalItems) > 99
              ? "w-[25px] h-[25px] md:w-[30px] md:h-[30px] text-[10px] md:text-sm"
              : "w-[15px] h-[15px] md:w-[20px] md:h-[20px] text-xs md:text-sm"
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
        )}
      </button>
    </div>
  );
};

export default Cart;
