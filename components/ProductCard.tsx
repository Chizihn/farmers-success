import { useState } from "react";
import Image from "next/image";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import useCartStore from "@/store/useCartStore";

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

  sold,
  onClick,
}) => {
  const [quantity, setQuantity] = useState(0);
  const { addToCart } = useCartStore();

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    quantity > 0 && setQuantity((prev) => prev - 1);

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart({ name, price, quantity, image });
      setQuantity(0);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md ">
      <div className="relative h-40 sm:h-50 md:h-58">
        <Image
          src={image}
          alt={alt}
          layout="fill"
          objectFit="cover"
          className="transition-opacity duration-300 hover:opacity-90"
        />
      </div>
      <div className="p-4 space-y-2">
        <div className="flex flex-col lg:flex-row justify-start lg:justify-between items-start lg:items-center">
          <h3
            className="text-md md:text-lg font-semibold text-gray-800 truncate hover:text-green-600 cursor-pointer"
            onClick={onClick}
          >
            {name}
          </h3>
          <span className="text-green-600 font-bold">{price}</span>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2 ">{description}</p>

        <span className="text-xs text-gray-500">Stock: {sold}</span>

        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between mt-4 space-y-2">
          <div className="flex items-center space-x-2">
            <button
              onClick={decrementQuantity}
              className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
            >
              <Minus size={16} />
            </button>
            <span className="w-8 text-center">{quantity}</span>
            <button
              onClick={incrementQuantity}
              className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
            >
              <Plus size={16} />
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            className="flex items-center space-x-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            <ShoppingCart size={16} />
            <span className="text-sm">Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
