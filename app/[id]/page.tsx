"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Minus, Plus, ShoppingCart, Shrub } from "lucide-react";
import Image from "next/image";
import { farmProducts } from "@/components/data";
import useCartStore from "@/store/useCartStore";

const ProductDetails: React.FC = () => {
  const params = useParams();
  const id = params?.id as string;

  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const addToCart = useCartStore((state) => state.addToCart);

  const product = farmProducts.find((p) => p.id === id);

  const productImages = product?.images || [
    product?.image,
    product?.image,
    product?.image,
    product?.image,
  ];

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
        image: product.image,
      });
      setQuantity(1);
    }
  };

  const formatPrice = (price: string | number) => {
    const numPrice = typeof price === "string" ? parseFloat(price) : price;
    return `N ${numPrice.toFixed(2)}`;
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-4">
          <div className="relative h-60 md:h-96">
            <Image
              src={productImages[selectedImageIndex]}
              alt={`${product?.name}`}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
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
        </div>

        <div className="w-full lg:w-[30rem] px-[2rem] flex flex-col justify-between">
          <div>
            <p className="flex gap-1 text-green-600 font-bold mb-3">
              <span>
                <Shrub />
              </span>{" "}
              {product?.farmName}
            </p>
            <div className="mb-4 space-y-6">
              <h1 className="text-3xl font-bold mb-2">{product?.name}</h1>
              <p className="text-3xl font-semibold mb-4">
                {formatPrice(product?.price || 0)}
              </p>
              <p>
                <span className="font-semibold">Location:</span>{" "}
                {product?.location}
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
          <div className="flex flex-col space-y-4">
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
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8 flex flex-col md:flex-row gap-8">
        <section className="w-full md:w-2/3">
          <div className="flex space-x-4 mb-4">
            <h2 className="font-semibold cursor-pointer">Description</h2>
            <h2 className="font-semibold cursor-pointer">Review</h2>
            <h2 className="font-semibold cursor-pointer">About farm</h2>
          </div>
          {/* Add content for Description, Review, and About farm here */}
        </section>
        <aside className="w-full md:w-1/3">
          <h2 className="font-semibold mb-4">Review</h2>
          {/* Add review content here */}
        </aside>
      </div>
    </div>
  );
};

export default ProductDetails;
