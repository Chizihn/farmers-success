"use client";
import { useCartStore } from "@/store/useCartStore";
import { ShoppingCart } from "lucide-react";

const Cart = () => {
  const totalItems = useCartStore((state) => state.totalItems); // Get the total number of items

  return (
    <div className="relative">
      <ShoppingCart size={30} />
      {totalItems() >= 0 && (
        <span className="absolute top-[-10px] right-[-10px] bg-red-600 w-[20px] h-[20px] rounded-full flex justify-center items-center">
          <p className="text-white">{totalItems()}</p>
        </span>
      )}
    </div>
  );
};

export default Cart;
