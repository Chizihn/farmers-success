"use client";
import Image from "next/image";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useModalStore } from "@/store/useModalStore";
import Modal from "./ProductModal";

interface ProductCardProps {
  image: string;
  alt: string;
  name: string;
  price: string;
  description: string;
  farm: string;
  sold: string;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  alt,
  name,
  price,
  description,
  farm,
  sold,
  onClick,
}) => {
  const [quantity, setQuantity] = useState(0);
  const addToCart = useCartStore((state) => state.addToCart);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    quantity > 0 && setQuantity((prev) => prev - 1);

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart({ name, price, quantity });
      setQuantity(0);
    }
  };

  return (
    <div className="w-[22rem] h-[28rem] bg-white rounded-[1.5rem] ">
      <div className="bg-gray-100">
        <Image
          src={image}
          layout="responsive"
          width={320}
          height={230}
          alt={alt}
        />
      </div>
      <div className="py-4 px-3 space-y-2">
        <h3
          className="text-xl font-semibold cursor-pointer hover:text-green-600"
          onClick={onClick}
        >
          {name}
        </h3>
        <p>{description}</p>
        <p className="text-black font-medium">{price}</p>
        <div className="flex justify-between">
          <p className="text-sm text-gray-600">Farm: {farm}</p>
          <p className="text-sm text-gray-600">Stock: {sold}</p>
        </div>
      </div>

      <div className="mt-4 px-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={decrementQuantity}
            className="bg-gray-200 p-3 rounded-md hover:bg-gray-300"
          >
            <Minus className="text-slate-500" size={15} />
          </button>
          <p>{quantity}</p>
          <button
            onClick={incrementQuantity}
            className="bg-gray-200 p-3 rounded-md hover:bg-gray-300"
          >
            <Plus className="text-slate-500" size={15} />
          </button>
        </div>

        <button
          onClick={handleAddToCart}
          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
