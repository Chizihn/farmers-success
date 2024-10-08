"use client";
import { useParams } from "next/navigation";
import { farmProducts } from "@/components/data";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import { ProductFilter } from "@/components/Filter";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import Modal from "@/components/ProductModal";
import { useModalStore } from "@/store/useModalStore";
import { ProductDetail } from "@/types";
import { createSlug, formatPrice, formatStock } from "@/utils";
import MobileFilter from "@/components/MobileFilter";
import ViewProduct from "@/components/ViewProduct";

const GetFarm: React.FC = () => {
  const params = useParams();
  const slug = params?.name as string;
  const { isOpen, closeModal, openModal } = useModalStore();
  const [selectedProduct, setSelectedProduct] = useState<ProductDetail | null>(
    null
  );
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const farmProduct = farmProducts.find(
    (product) => createSlug(product.farm.name) === slug
  );

  if (!farmProduct) {
    return <p>Farm not found.</p>;
  }

  const farm = farmProduct.farm;
  const filterFarmProducts = farmProducts.filter(
    (product) => product.farm.id === farm.id
  );
  const handleProductClick = (product: ProductDetail) => {
    setSelectedProduct(product);
    openModal();
  };
  const handleOpenFilter = () => {
    setShowFilter(!showFilter);
  };

  const handleProductFilterChange = () => {};

  return (
    <main>
      <section className="w-full min-h-screen h-full pt-3 bg-gray-100 flex justify-center">
        <aside className="hidden lg:flex w-[25rem] h-screen sticky top-0 overflow-y-auto">
          <ProductFilter onFilterChange={handleProductFilterChange} />
        </aside>
        <div className="container space-y-2 h-full overflow-y-auto flex-grow">
          <div className="bg-white p-3 shadow-md rounded-lg mb-2">
            <h1 className="text-2xl font-bold">{farm.name}</h1>
          </div>

          <div className="bg-white p-4 shadow-md rounded-lg mb-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative h-64 w-full md:w-1/2 rounded-lg overflow-hidden">
                <Image
                  src={farm.image}
                  alt={farm.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="w-full md:w-1/2">
                <p className="text-gray-600 mb-2">
                  Location: {farm.city}, {farm.country}
                </p>
                <p className="mb-4">{farm.about}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-2 shadow-md rounded-lg mb-2 flex flex-col lg:flex-row justify-between items-center">
            <h2 className="text-lg font-bold mb-2 lg:mb-0">
              Products from {farm.name}
            </h2>
            <div className="flex items-center gap-6">
              <button
                className="flex lg:hidden items-center gap-2 text-green-600 hover:text-green-700 transition-colors "
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

          <div className="w-full h-full max-h-full overflow-y-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 justify-items-start content-center gap-x-2 gap-y-6 px-3 lg:px-0">
            {filterFarmProducts.map((product) => (
              <ProductCard
                key={product.id}
                image={`${product.images[0]}`}
                alt={product.description}
                name={product.name}
                price={` ${formatPrice(product.price)}`}
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
          filterType="product"
          onChange={handleProductFilterChange}
        />
      </section>
    </main>
  );
};

export default GetFarm;
