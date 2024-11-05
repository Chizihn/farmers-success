"use client";
<<<<<<< HEAD

import { useFetchProducts } from "@/hooks/useFetchProducts";
import { useState, useEffect, useCallback } from "react";
import { Product, ProductCategory } from "@/types";
import ProductCard from "./ProductCard";
import LoadingState from "./Loading";
import { SlidersHorizontal } from "lucide-react";
import Category from "./Category";
import MobileProductFilter from "./MobileProductFilter";
import ProductFilter from "./ProductFilter";
import Link from "next/link";

const Products: React.FC = () => {
  const { products, loading, error } = useFetchProducts();
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [displayProducts, setDisplayProducts] = useState<Product[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize display products when products first load
  useEffect(() => {
    if (products?.length > 0) {
      setDisplayProducts(products);
      setIsInitialized(true);
    }
  }, [products]);

  const handleOpenFilter = () => setShowFilter(!showFilter);

  const handleFilteredProductsChange = useCallback(
    (filteredProducts: Product[]) => {
      setDisplayProducts(filteredProducts);
    },
    []
  );

  // Show loading state until products are initialized
  if (loading || !isInitialized) {
    return <LoadingState />;
  }

  // Only show error if we're not loading and there's an error
  if (error) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-red-600 font-medium">
            Error loading products: {error.message}
          </p>
          <p className="text-gray-600 mt-2">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  const filterCategories: ProductCategory[] = Array.from(
    new Set(
      products.flatMap((product) =>
        product.categories.map((category) => category.categoryId)
      )
    )
  ).map((categoryId) => {
    return products
      .flatMap((product) => product.categories)
      .find((category) => category.categoryId === categoryId)!;
  });

  // Only render main content when we have products and aren't loading
  return (
    <main>
      <Link href="/checkout">click</Link>
      <Category products={products} />
      <section className="w-full min-h-screen h-full pt-3 bg-gray-100 flex justify-center">
        {/* Desktop Filter */}
        <aside className="hidden lg:flex w-[25rem] h-screen sticky top-0 overflow-y-auto">
          <ProductFilter
            products={products}
            onFilteredProductsChange={handleFilteredProductsChange}
            categories={filterCategories}
          />
=======
import { SlidersHorizontal } from "lucide-react";
import { farmProducts } from "@/components/data";
import ProductCard from "./ProductCard";
import Category from "./Category";
import Modal from "./ProductModal";
import { useModalStore } from "@/store/useModalStore";
import { useState } from "react";
import { ProductFilter } from "./Filter";
import { ProductDetail } from "@/types";
import { formatPrice, formatStock } from "@/utils";
import MobileFilter from "./MobileFilter";
import ViewProduct from "./ViewProduct";

const Products: React.FC = () => {
  const { isOpen, closeModal, openModal } = useModalStore();
  const [selectedProduct, setSelectedProduct] = useState<ProductDetail | null>(
    null
  );
  const [showFilter, setShowFilter] = useState<boolean>(false);

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
      <Category />
      <section className="w-full min-h-screen h-full pt-3 bg-gray-100 flex justify-center">
        <aside className="hidden lg:flex w-[25rem] h-screen sticky top-0 overflow-y-auto">
          <ProductFilter onFilterChange={handleProductFilterChange} />
>>>>>>> b95be22edf50a55697986b04c5c99be73de60731
        </aside>

        <div className="container space-y-2 h-full overflow-y-auto flex-grow pb-6 pr-2">
          <div className="bg-white p-3 shadow-md rounded-lg mb-2 flex flex-col lg:flex-row justify-between items-center">
            <h2 className="text-xl font-bold mb-4 lg:mb-0">
<<<<<<< HEAD
              Available Products ({displayProducts.length})
=======
              Available Products
>>>>>>> b95be22edf50a55697986b04c5c99be73de60731
            </h2>
            <div className="flex items-center gap-6">
              <button
                className="flex lg:hidden items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
                onClick={handleOpenFilter}
              >
                <SlidersHorizontal size={20} />
                <span className="font-medium">Filter</span>
              </button>
<<<<<<< HEAD
            </div>
          </div>

          {displayProducts.length === 0 ? (
            <div className="w-full h-64 flex items-center justify-center">
              <p className="text-gray-500 text-lg">No products found</p>
            </div>
          ) : (
            <div className="w-full h-full max-h-full overflow-y-auto grid gap-6 px-3 lg:px-0 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {displayProducts.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

        {/* Mobile Filter */}
        <MobileProductFilter
          showFilter={showFilter}
          handleOpenFilter={handleOpenFilter}
          products={products}
          onFilteredProductsChange={handleFilteredProductsChange}
=======

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
          filterType="product"
          onChange={handleProductFilterChange}
>>>>>>> b95be22edf50a55697986b04c5c99be73de60731
        />
      </section>
    </main>
  );
};

export default Products;
