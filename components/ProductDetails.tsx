"use client";
import { useActionState, useState } from "react";
import { Minus, Plus, ShoppingCart, Shrub, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useCartStore from "@/store/useCartStore";
import useProductStore from "@/store/useProductStore";
import { DEFAULT_IMAGE_URL } from "@/constants/default";
import { capitalizeFirstChar, formatPrice } from "@/utils";
import Cart from "./Cart";
import useAuthStore from "@/store/useAuthStore";
import useGuestCartStore from "@/store/useGuestCartStore";

interface ProductDetailsProps {
  id: string;
  type: "full" | "view";
  closeModal?: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  id,
  type,
  closeModal,
}) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { products } = useProductStore();
  const [quantity, setQuantity] = useState<number>(0); // Start at 0
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  const addToCart = useCartStore((state) => state.addToCart);

  const guestAddToCart = useGuestCartStore((state) => state.guestAddToCart);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return <p>Product not found</p>;
  }

  const {
    images,
    name,
    price,
    description,
    location,
    quantity: availableQuantity,
    status,
    user,
  } = product;

  const productImages = images?.length ? images : [DEFAULT_IMAGE_URL];
  const displayedImage = productImages[selectedImageIndex] || DEFAULT_IMAGE_URL;
  const fullName = `${capitalizeFirstChar(
    user.firstName
  )} ${capitalizeFirstChar(user.lastName)}`;

  // Adjust quantity but don't go above available stock
  const incrementQuantity = () =>
    setQuantity((prev) => Math.min(prev + 1, availableQuantity || 1));
  const decrementQuantity = () => setQuantity((prev) => Math.max(prev - 1, 0)); // Prevent going below 0

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart(product.id, quantity);
      setQuantity(0);
    }
  };

  const handleGuestAddToCart = () => {
    if (quantity > 0) {
      guestAddToCart({ product, quantity });
      setQuantity(0);
    }
  };

  return (
    <div className="max-w-screen-2xl w-full mx-auto py-4 px-4">
      {type === "view" && (
        <div className="flex justify-between items-center py-1 px-3 mb-2">
          <Cart />
          <button
            className="text-gray-500 hover:text-gray-800"
            onClick={closeModal}
          >
            <X size={35} />
          </button>
        </div>
      )}
      <div
        className={`flex ${
          type === "full" ? "flex-col md:flex-row" : "flex-col"
        } justify-evenly gap-6`}
      >
        <div
          className={`w-full ${
            type === "full" ? "lg:w-[60%]" : "w-full"
          } flex flex-col gap-4`}
        >
          <div
            className={`relative border-[4px] border-green-600 rounded-lg ${
              type === "full" ? "h-96" : "h-60"
            } w-full`}
          >
            <Image
              src={displayedImage}
              alt={name || "Product"}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-lg"
            />
          </div>
          {productImages.length > 1 && type === "full" && (
            <div className="flex flex-row gap-2">
              {productImages.map((img, index) => (
                <div
                  key={index}
                  className="w-1/4 cursor-pointer"
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <Image
                    src={img}
                    alt={`${name} thumbnail`}
                    width={100}
                    height={100}
                    className={`rounded-lg ${
                      index === selectedImageIndex
                        ? "border-2 border-green-500"
                        : ""
                    }`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div
          className={`w-full ${
            type === "full"
              ? "lg:w-[35rem] px-[1rem] lg:px-[2rem] py-6 lg:border-2 border-slate-200 rounded-md"
              : "p-3"
          }`}
        >
          <div>
            <div className="mb-4 space-y-3 md:space-y-4">
              <div className="mb-2 space-y-1">
                <h1 className="text-3xl font-bold">
                  {capitalizeFirstChar(name)}
                </h1>
                <p className="text-slate-600">
                  {capitalizeFirstChar(description)}
                </p>
              </div>
              <p className="text-3xl font-semibold mb-4 text-green-600">
                N {formatPrice(price || 0)}
              </p>
              <p>
                <span className="font-semibold">Location:</span> {location}
              </p>
              <p>
                <span className="font-semibold">Stock:</span>{" "}
                {availableQuantity} pieces available
              </p>
            </div>
          </div>

          {type === "full" ? (
            <div className="flex flex-col space-y-6">
              <div className="flex items-center space-x-4">
                <button
                  onClick={decrementQuantity}
                  className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
                >
                  <Minus size={20} />
                </button>
                <span className="text-xl font-semibold">{quantity}</span>
                <button
                  onClick={incrementQuantity}
                  className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
                >
                  <Plus size={20} />
                </button>
              </div>
              <button
                onClick={
                  isAuthenticated ? handleAddToCart : handleGuestAddToCart
                }
                className="flex items-center justify-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 w-full md:w-auto"
              >
                <ShoppingCart size={20} />
                <span className="font-semibold">Add to Cart</span>
              </button>
            </div>
          ) : (
            <Link href={`/products/${id}`}>
              <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold text-lg">
                View Product
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
