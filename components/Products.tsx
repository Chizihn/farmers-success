"use client";

import { useFetchProducts } from "@/hooks/useFetchProducts";
import { useState, useEffect, useCallback } from "react";
import { Product, ProductCategory } from "@/types";
import ProductCard from "./ProductCard";
import LoadingState from "./Loading";
import { SlidersHorizontal } from "lucide-react";
import Category from "./Category";
import MobileProductFilter from "./MobileProductFilter";
import ProductFilter from "./ProductFilter";

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
      <Category />
      <section className="w-full min-h-screen h-full pt-3 flex lg:gap-3 justify-center">
        {/* Desktop Filter */}
        <aside className="hidden lg:flex w-[25rem] h-screen sticky top-0 overflow-y-auto">
          <ProductFilter
            products={products}
            onFilteredProductsChange={handleFilteredProductsChange}
            categories={filterCategories}
          />
        </aside>

        <div className="container space-y-2 h-full overflow-y-auto flex-grow pb-6 ">
          <div className="bg-white p-3 shadow-md rounded-lg mb-2 flex flex-col lg:flex-row justify-between items-center">
            <h2 className="text-xl font-bold mb-4 lg:mb-0">
              Available Products ({displayProducts.length})
            </h2>
            <div className="flex items-center gap-6">
              <button
                className="flex lg:hidden items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
                onClick={handleOpenFilter}
              >
                <SlidersHorizontal size={20} />
                <span className="font-medium">Filter</span>
              </button>
            </div>
          </div>

          {displayProducts.length === 0 ? (
            <div className="w-full h-64 flex items-center justify-center">
              <p className="text-gray-500 text-lg">No products found</p>
            </div>
          ) : (
            <div className="bg-gray-50 w-full h-full max-h-full overflow-y-auto grid gap-6 px-3 lg:px-0 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
        />
      </section>
    </main>
  );
};

export default Products;
