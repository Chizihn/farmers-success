"use client";
import { useCartStore } from "@/store/useCartStore";
import { ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import CartModal from "./CartModal";

export const Cart = () => {
  const totalItems = useCartStore((state) => state.totalItems);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [hasMounted, setHasMounted] = useState<boolean>(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <div>
      <button onClick={() => setIsCartOpen(true)} className="relative">
        <ShoppingCart size={30} />
        <p className="absolute top-[-5px] right-[-5px] md:top-[-10px] md:right-[-10px] bg-red-600 w-[15px] h-[15px] md:w-[20px] md:h-[20px] rounded-full flex justify-center items-center text-white text-xs md:text-sm">
          {totalItems() > 0 ? (
            <strong className="">{totalItems()}</strong>
          ) : (
            <strong>0</strong>
          )}
        </p>
      </button>
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default Cart;
