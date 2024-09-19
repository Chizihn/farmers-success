"use client";
import { SlidersHorizontal, X } from "lucide-react";
import { farmProducts } from "@/components/data";
import ProductCard from "./ProductCard";
import Category from "./Category";
import Modal from "./ProductModal";
import { useModalStore } from "@/store/useModalStore";
import { useState } from "react";
import Image from "next/image";
import Filter from "./Filter";
import Cart from "./Cart";
import Link from "next/link";
import { ProductDetail } from "@/types";

const Products: React.FC = () => {
  const { isOpen, closeModal, openModal } = useModalStore();
  const [selectedProduct, setSelectedProduct] = useState<ProductDetail | null>(
    null
  );

  const handleProductClick = (product: ProductDetail) => {
    setSelectedProduct(product);
    openModal();
  };

  const formatPrice = (price: string | number) => {
    const numPrice = typeof price === "string" ? parseFloat(price) : price;
    return `${numPrice.toFixed(2)}`;
  };

  const formatStock = (stock: string | number) => {
    return typeof stock === "string" ? stock : stock.toString();
  };

  return (
    <main>
      <Category />
      <section className="w-full min-h-screen h-full pt-3 bg-gray-100 flex justify-center">
        <aside className="hidden lg:flex w-[25rem] h-screen sticky top-0 overflow-y-auto">
          <Filter />
        </aside>
        <div className="container space-y-2 h-full overflow-y-auto flex-grow">
          <div className="bg-white p-3 shadow-md rounded-lg mb-2 flex flex-col lg:flex-row justify-between items-center">
            <h2 className="text-xl font-bold mb-4 lg:mb-0">
              Available Products
            </h2>
            <div className="flex items-center gap-6">
              <button className="flex lg:hidden items-center gap-2 text-green-600 hover:text-green-700 transition-colors ">
                <SlidersHorizontal size={20} />
                <span className="font-medium">Filter</span>
              </button>
              <div className="flex items-center gap-3">
                <label htmlFor="sort" className="font-medium text-gray-700">
                  Sort by:
                </label>
                <select
                  id="sort"
                  className="bg-white border border-gray-300 rounded-md p-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="newest">Newest</option>
                  <option value="popular">Popular</option>
                </select>
              </div>
            </div>
          </div>
          <div className="w-full h-full max-h-full overflow-y-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 justify-items-center content-center gap-x-2 gap-y-6 px-3 lg:px-0">
            {farmProducts.map((product) => (
              <ProductCard
                key={product.id}
                image={`${product.images[0]}`}
                alt={product.description}
                name={product.name}
                price={`N ${formatPrice(product.price)}`}
                description={product.description}
                farm={product.farm.name}
                sold={formatStock(product.stock)}
                onClick={() => handleProductClick(product)}
              />
            ))}
          </div>
        </div>
        <Modal isOpen={isOpen}>
          <div className="flex justify-between items-center p-3">
            <button
              className=" text-gray-500 hover:text-gray-800"
              onClick={closeModal}
            >
              <X />
            </button>
            <Cart />
          </div>
          {selectedProduct && (
            <div className="p-3">
              <div className="relative h-60 mb-4 rounded-lg overflow-hidden">
                <Image
                  src={selectedProduct.images[0]}
                  alt={selectedProduct.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <h3 className="text-2xl font-bold mb-2">
                {selectedProduct.name}
              </h3>
              <p className="text-xl font-semibold text-green-600 mb-4">
                N {formatPrice(selectedProduct.price)} per piece
              </p>
              <p className="text-gray-600 mb-6">
                {selectedProduct.description}
              </p>
              <div className="space-y-3 mb-6">
                <p className="flex justify-between">
                  <span className="font-medium">Farm:</span>
                  <span className="text-green-600">
                    {selectedProduct.farm.name}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span className="font-medium">Location:</span>
                  <span>{`${selectedProduct.farm.city}, ${selectedProduct.farm.country}`}</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-medium">Stock:</span>
                  <span>{formatStock(selectedProduct.stock)} pieces</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-medium">Delivery:</span>
                  <span
                    className={
                      selectedProduct.deliveryAvailable
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {selectedProduct.deliveryAvailable
                      ? "Available"
                      : "Not Available"}
                  </span>
                </p>
              </div>
              <Link href={`/${selectedProduct.id}`} target="_blank">
                <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold text-lg">
                  View Product
                </button>
              </Link>
            </div>
          )}
        </Modal>
      </section>
    </main>
  );
};

export default Products;
