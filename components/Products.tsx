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
    return `N ${numPrice.toFixed(2)}`;
  };

  const formatStock = (stock: string | number) => {
    return typeof stock === "string" ? stock : stock.toString();
  };

  return (
    <main>
      <Category />
      <section className="w-full h-full bg-gray-100 py-4 flex justify-center">
        <aside className="hidden lg:flex h-screen">
          <Filter />
        </aside>
        <div className="container space-y-4">
          {/* ... (rest of the code remains the same) ... */}
          <div className="w-full h-auto overflow-y-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 justify-items-center content-center gap-x-2 gap-y-6 px-3 lg:px-0 pb-3">
            {farmProducts.map((product) => (
              <ProductCard
                key={product.id}
                image={product.image}
                alt={product.description}
                name={product.name}
                price={formatPrice(product.price)}
                description={product.description}
                farm={product.farmName}
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
            <aside>
              <div className="relative">
                <div className="w-full h-56 relative">
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <h2 className="text-2xl font-semibold">
                  {selectedProduct.name}
                </h2>
                <p className="text-lg font-medium text-gray-700">
                  {formatPrice(selectedProduct.price)} per piece
                </p>
                <p className="text-sm text-gray-600">
                  {selectedProduct.description}
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">
                    Farm: {selectedProduct.farmName}
                  </span>
                  <span className="text-gray-500 text-sm">
                    Location: {selectedProduct.location}
                  </span>
                </div>

                <div className="mt-2">
                  <p className="text-sm text-green-600">
                    {selectedProduct.deliveryAvailable
                      ? "Delivery Available"
                      : "Delivery Not Available"}
                  </p>
                  <p className="text-sm text-gray-600">
                    Stock: {formatStock(selectedProduct.stock)} pieces
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <Link href={`/${selectedProduct.id}`} target="_blank">
                  <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                    View product
                  </button>
                </Link>
              </div>
            </aside>
          )}
        </Modal>
      </section>
    </main>
  );
};

export default Products;
