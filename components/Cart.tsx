"use client";

import { ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import CartModal from "./CartModal";
import useCartStore from "@/store/useCartStore";

export const Cart = () => {
  const { totalItems } = useCartStore();
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [hasMounted, setHasMounted] = useState<boolean>(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <div>
      <button
        onClick={() => setIsCartOpen(true)}
        className="relative transition-colors duration-200 hover:text-green-600"
      >
        <ShoppingCart size={30} />
        {hasMounted && (
          <p className="absolute top-[-5px] right-[-5px] md:top-[-10px] md:right-[-10px] bg-red-600 w-[15px] h-[15px] md:w-[20px] md:h-[20px] rounded-full flex justify-center items-center text-white text-xs md:text-sm ">
            <strong>{totalItems()}</strong>
          </p>
        )}
      </button>
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default Cart;
