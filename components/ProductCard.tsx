"use client";
import { useState } from "react";
import Image from "next/image";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import useCartStore from "@/store/useCartStore";
import { Product } from "@/types";
import { DEFAULT_IMAGE_URL } from "@/constants/default";
import Link from "next/link";
import { capitalizeFirstChar } from "@/utils";
import { useRouter } from "next/navigation";
import useGuestCartStore from "@/store/useGuestCartStore";
import useAuthStore from "@/store/useAuthStore";

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();
  const {
    id,
    images,
    name,
    price,
    description,
    quantity: availableQuantity,
  } = product;
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { addToCart } = useCartStore();
  const { guestAddToCart } = useGuestCartStore();

  const [quantity, setQuantity] = useState<number>(0);

  const image = images.length > 0 ? images[0] : DEFAULT_IMAGE_URL;

  const incrementQuantity = () => {
    if (quantity < availableQuantity) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = async () => {
    if (quantity > 0 && quantity <= availableQuantity) {
      addToCart(id, quantity);
      setQuantity(0);
    }
  };

  const handleGuestAddToCart = async () => {
    if (quantity > 0 && quantity <= availableQuantity) {
      guestAddToCart({ product, quantity });
      setQuantity(0);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md flex flex-col h-full">
      <div className="relative w-full h-48 bg-gray-200">
        <Image
          src={image}
          alt={description}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
          className="transition-opacity duration-300 hover:opacity-90"
          priority
        />
      </div>

      <div className="flex flex-col justify-between p-4 flex-grow">
        <div className="flex flex-col justify-start items-start space-y-2">
          <Link
            href={`/?productId=${id}`}
            as={`/products/${id}`}
            className="block group"
            onClick={(e) => {
              e.preventDefault();
              router.push(`/?productId=${id}`);
            }}
          >
            <h3 className="text-md md:text-lg font-semibold text-gray-800 truncate hover:text-green-600 cursor-pointer">
              {capitalizeFirstChar(name)}
            </h3>
          </Link>
          <span className="text-green-600 font-bold">N {price}</span>
          <p className="text-sm text-gray-600 line-clamp-2">
            {capitalizeFirstChar(description)}
          </p>
          <p className="text-sm text-gray-600 line-clamp-2">
            Available: <span>{availableQuantity}</span>
          </p>
        </div>

        <div className="flex flex-wrap flex-row md:flex-col lg:flex-row justify-between md:justify-center lg:justify-between items-center mt-4 space-y-2">
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

          {isAuthenticated ? (
            <button
              onClick={handleAddToCart}
              className="flex items-center space-x-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              <ShoppingCart size={16} />
              <span className="text-sm">Add to Cart</span>
            </button>
          ) : (
            <button
              onClick={handleGuestAddToCart}
              className="flex items-center space-x-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              <ShoppingCart size={16} />
              <span className="text-sm">Add to Cart</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
