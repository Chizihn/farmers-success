"use client";
import { SlidersHorizontal } from "lucide-react";
import { farmProducts } from "@/components/data";
import ProductCard from "./ProductCard";
import Category from "./Category";
import Modal from "./ProductModal";
import { useModalStore } from "@/store/useModalStore";
import { useState } from "react";
import Filter from "./Filter";
import { ProductDetail } from "@/types";
import { formatPrice, formatStock } from "@/utils";
import MobileFilter from "./MobileFilter";
import ViewProduct from "./ViewProduct";

const Products: React.FC = () => {
  const { isOpen, closeModal, openModal } = useModalStore();
  const [selectedProduct, setSelectedProduct] = useState<ProductDetail | null>(
    null
  );
  const [showFilter, setShowFilter] = useState(false);

  const handleProductClick = (product: ProductDetail) => {
    setSelectedProduct(product);
    openModal();
  };

  const handleOpenFilter = () => {
    setShowFilter(!showFilter);
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
              <button
                className="flex lg:hidden items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
                onClick={handleOpenFilter}
              >
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

          <div className="w-full h-full max-h-full overflow-y-auto grid gap-6 px-3 lg:px-0 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {farmProducts.map((product) => (
              <ProductCard
                key={product.id}
                image={`${product.images[0]}`}
                alt={product.description}
                name={product.name}
                price={`${formatPrice(product.price)}`}
                description={product.description}
                farm={product.farm.name}
                sold={formatStock(product.stock)}
                onClick={() => handleProductClick(product)}
              />
            ))}
          </div>
        </div>

        <Modal isOpen={isOpen}>
          {selectedProduct && (
            <ViewProduct product={selectedProduct} closeModal={closeModal} />
          )}
        </Modal>

        <MobileFilter
          showFilter={showFilter}
          handleOpenFilter={handleOpenFilter}
        />
      </section>
    </main>
  );
};

export default Products;
