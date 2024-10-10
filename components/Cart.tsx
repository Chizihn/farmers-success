"use client";
import { ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import useCartStore from "@/store/useCartStore";

interface CartProps {
  onClick: () => void;
}

export const Cart: React.FC<CartProps> = ({ onClick }) => {
  const totalItems = useCartStore((state) => state.totalItems);
  const [hasMounted, setHasMounted] = useState<boolean>(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <div>
      <button
        onClick={onClick}
        className="flex items-center gap-1 relative transition-colors duration-200 hover:text-green-600"
      >
        <ShoppingCart size={28} />
        {hasMounted && (
          <p className="absolute top-[-6px] right-[-7px] md:top-[-10px] md:right-[-10px] bg-red-600 w-[15px] h-[15px] md:w-[20px] md:h-[20px] rounded-full flex justify-center items-center text-white text-xs md:text-sm ">
            <strong>{totalItems()}</strong>
          </p>
        )}
      </button>
    </div>
  );
};

export default Cart;
