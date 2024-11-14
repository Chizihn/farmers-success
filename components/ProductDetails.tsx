"use client";
import { useState } from "react";
import { Minus, Plus, ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import useCartStore from "@/store/useCartStore";
import useProductStore from "@/store/useProductStore";
import { DEFAULT_IMAGE_URL } from "@/constants/default";
import { capitalizeFirstChar, formatPrice } from "@/utils";
import Cart from "./Cart";
import useAuthStore from "@/store/useAuthStore";
import useGuestCartStore from "@/store/useGuestCartStore";
import LoadingState from "./Loading";
import Link from "next/link";
import ReviewsSummary from "./ReviewBar";

const mockReviews = [
  {
    id: 1,
    name: "John Doe",
    rating: 5,
    comment: "The tomatoes were fresh and flavorful! I loved the quality.",
  },
  {
    id: 2,
    name: "Jane Smith",
    rating: 4,
    comment: "Great quality, but I wish the delivery was a bit faster.",
  },
];

interface ProductDetailsProps {
  id: string;
  type: "full" | "view";
  closeModal?: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ id, type }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { products } = useProductStore();
  const [quantity, setQuantity] = useState<number>(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<string>("Description");

  const addToCart = useCartStore((state) => state.addToCart);

  const guestAddToCart = useGuestCartStore((state) => state.guestAddToCart);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return <LoadingState />;
  }

  const {
    images,
    name,
    price,
    description,
    location,
    quantity: availableQuantity,
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

  const hanldeProductPage = () => {
    window.location.reload();
  };

  return (
    <div className="max-w-screen-2xl w-full mx-auto bg-white py-4 px-4">
      {type === "view" && (
        <div className="py-2 px-2">
          <Cart />
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
              type === "full" ? "h-[450px]" : "h-[330px]"
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
            <>
              <p className="mb-4">
                <span className="font-semibold">Product owner:</span>{" "}
                <Link
                  href={`/products/owners/${user.id}`}
                  className="text-green-600 font-semibold"
                >
                  {fullName}
                </Link>
              </p>
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
            </>
          ) : (
            <button
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold text-lg"
              onClick={hanldeProductPage}
            >
              View Product
            </button>
          )}
        </div>
      </div>
      {type === "full" && (
        <div className="mt-[3rem] flex flex-col md:flex-row gap-8">
          <section className="w-full md:w-2/3">
            <div className="flex justify-start space-x-4 mb-4">
              {["Description", "Review", "About Farm"].map((tab) => (
                <h2
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`font-semibold text-xl cursor-pointer transition-all duration-100 ease ${
                    activeTab === tab ? "border-b-4 border-green-600" : ""
                  }`}
                >
                  {tab}
                </h2>
              ))}
            </div>

            {activeTab === "Description" && (
              <div>
                <p className="text-slate-700">{product.description}</p>
              </div>
            )}
            {activeTab === "Review" && (
              <div className="space-y-4">
                {mockReviews.map((review) => (
                  <div key={review.id} className="border-b pb-4">
                    <p className="font-bold">{review.name}</p>
                    <p className="text-yellow-500">
                      {`⭐`.repeat(review.rating)}
                    </p>
                    <p>{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
            {activeTab === "About Owner" && (
              <div>
                <p className="text-slate-700">
                  {product!.user.firstName} is here
                </p>
              </div>
            )}
          </section>

          <aside className="w-full md:w-1/3">
            <h2 className="font-semibold mb-4"></h2>
            <ReviewsSummary />
          </aside>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
