"use client";
import { SlidersHorizontal, X } from "lucide-react";
import farmproducts from "@/components/data";
import ProductCard from "./ProductCard";
import Category from "./Category";
import Modal from "./ProductModal";
import { useModalStore } from "@/store/useModalStore";
import { useState } from "react";

interface Product {
  id: number;
  imageUrl: string;
  name: string;
  description: string;
  price: number;
  farmName: string;
  location: string;
  stock: number;
  deliveryAvailable: boolean;
}

const Products = () => {
  const { isOpen, closeModal, openModal } = useModalStore();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    openModal();
  };

  return (
    <section className="w-full bg-gray-50 h-auto py-4 flex justify-center">
      <div className="container space-y-8">
        <Category />
        <div className="bg-white p-4 shadow-sm rounded-md flex justify-between items-center">
          <h4 className="text-2xl font-semibold">Available Products</h4>
          <div className="flex items-center gap-[2.5rem] text-xl">
            <button className="flex items-center gap-2">
              <SlidersHorizontal />
              <p>Filter</p>
            </button>
            <div className="flex gap-3 items-center">
              <p>Sort by:</p>
              <select
                name="sort"
                id="sort"
                className="bg-white shadow-md border-[1px] border-gray-300 rounded-md p-2 cursor-pointer"
              >
                <option value="newest">Newest</option>
                <option value="popular">Popular</option>
              </select>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-y-6">
          {farmproducts.map((product: Product) => (
            <ProductCard
              key={product.id}
              image={product.imageUrl}
              alt={product.description}
              name={product.name}
              price={`N ${product.price}`}
              description={product.description}
              farm={product.farmName}
              sold={`${product.stock}`}
              onClick={() => handleProductClick(product)}
            />
          ))}
        </div>
      </div>
      <Modal isOpen={isOpen}>
        <button
          className=" text-gray-500 hover:text-gray-800"
          onClick={closeModal}
        >
          <X />
        </button>

        {selectedProduct && (
          <aside>
            <div className="relative">
              <div className="w-full h-56 relative">
                <img
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.name}
                  className="rounded-lg object-cover w-full h-full"
                />
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <h2 className="text-2xl font-semibold">{selectedProduct.name}</h2>
              <p className="text-lg font-medium text-gray-700">
                {`N ${selectedProduct.price.toFixed(2)} per piece`}
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
                  Stock: {selectedProduct.stock} pieces
                </p>
              </div>
            </div>

            <div className="mt-6">
              <button
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                onClick={closeModal}
              >
                Add to Cart
              </button>
            </div>
          </aside>
        )}
      </Modal>
    </section>
  );
};

export default Products;
