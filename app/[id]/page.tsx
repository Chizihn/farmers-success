"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Minus, Plus, ShoppingCart, Shrub } from "lucide-react";
import Image from "next/image";
import { farmProducts } from "@/components/data";
import useCartStore from "@/store/useCartStore";
import Link from "next/link";
import { createSlug } from "@/utils";
import ReviewsSummary from "@/components/ReviewBar";

const ProductDetails: React.FC = () => {
  const params = useParams();
  const id = params?.id as string;

  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("Description");
  const addToCart = useCartStore((state) => state.addToCart);

  const product = farmProducts.find((p) => p.id === id);

  const productImages = Array.isArray(product?.images)
    ? product.images
    : product?.images[0]
    ? [product.images[0]]
    : [];

  const incrementQuantity = () => {
    const maxStock = product?.stock
      ? typeof product.stock === "string"
        ? parseInt(product.stock)
        : product.stock
      : 1;
    setQuantity((prev) => Math.min(prev + 1, maxStock));
  };

  const decrementQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1));

  const handleAddToCart = () => {
    if (product && quantity > 0) {
      addToCart({
        name: product.name,
        price:
          typeof product.price === "string"
            ? parseFloat(product.price)
            : product.price,
        quantity,
        image: product.images[0],
      });
      setQuantity(1);
    }
  };

  const formatPrice = (price: string | number) => {
    const numPrice = typeof price === "string" ? parseFloat(price) : price;
    return `${numPrice.toFixed(2)}`;
  };

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

  return (
    <div className="max-w-screen-2xl w-full mx-auto py-6 px-4">
      <div className="flex flex-col md:flex-row justify-evenly gap-6">
        <div className="w-full lg:w-[60%] flex flex-col gap-4">
          <div className="relative h-[12rem] md:h-96">
            <Image
              src={`${productImages[selectedImageIndex]}`}
              alt={`${product?.name}`}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div className="flex flex-row gap-2">
            {productImages.length > 1 && (
              <div className="flex flex-row gap-2">
                {productImages.map((img, index) => (
                  <div
                    key={index}
                    className="w-1/4 cursor-pointer"
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <Image
                      src={img}
                      alt={`${product?.name} thumbnail`}
                      width={100}
                      height={100}
                      layout="responsive"
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
        </div>

        <div className="w-full lg:w-[35rem] px-[1rem] lg:px-[2rem] py-6 flex flex-col justify-between border-2 border-slate-200 rounded-md">
          <div>
            <Link
              href={`/farms/${createSlug(product!.farm.name)}`}
              className="flex gap-1 text-green-600 hover:text-green-700 font-bold mb-1 lg:mb-3"
            >
              <span>
                <Shrub />
              </span>{" "}
              {product?.farm.name}
            </Link>
            <div className="mb-4 space-y-3 md:space-y-6">
              <div className="mb-2 space-y-1">
                <h1 className="text-3xl font-bold">{product?.name}</h1>
                <p className="text-slate-600">{product?.description}</p>
              </div>
              <p className="text-3xl font-semibold mb-4">
                N {formatPrice(product?.price || 0)}
              </p>

              <p>
                <span className="font-semibold">Location:</span>{" "}
                {`${product?.farm.city}, ${product?.farm.country}`}
              </p>
              <p>
                <span className="font-semibold">Stock:</span> {product?.stock}{" "}
                pieces available
              </p>
              <p>
                <span className="font-semibold">Delivery:</span>
                {product?.deliveryAvailable ? " Available" : " Not Available"}
              </p>
            </div>
          </div>
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
              onClick={handleAddToCart}
              className="flex items-center justify-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 w-full md:w-auto"
            >
              <ShoppingCart size={20} />
              <span className="font-semibold">Add to Cart</span>
            </button>
          </div>
        </div>
      </div>

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
              <p className="text-slate-700">{product!.farm.about}</p>
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
          {activeTab === "About Farm" && (
            <div>
              <p className="text-slate-700">{product!.farm.about}</p>
            </div>
          )}
        </section>

        <aside className="w-full md:w-1/3">
          <h2 className="font-semibold mb-4"></h2>
          <ReviewsSummary />
        </aside>
      </div>
    </div>
  );
};

export default ProductDetails;
