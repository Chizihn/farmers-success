"use client";

import { useFetchProducts } from "@/hooks/useFetchProducts";
import { useState, useEffect, useCallback } from "react";
import ProductCard from "./ProductCard";
import LoadingState from "./Loading";
import { SlidersHorizontal } from "lucide-react";
import Category from "./Category";
import ProductFilter from "./ProductFilter";
import { AssetType } from "@/types/category";
import { useFetchCategories } from "@/hooks/useFetchCategories";
import MobileProductFilter from "./MobileProductFilter";
import { Product } from "@/types/product";
import Paginator from "./Paginator";

const Products: React.FC = () => {
  const { products, loading, initialized, error } = useFetchProducts();
  const { categories } = useFetchCategories(AssetType.CROP);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [displayProducts, setDisplayProducts] = useState<Product[]>([]);
  const [paginatedProducts, setPaginatedProducts] = useState<Product[]>([]);

  // Initialize display products when products first load
  useEffect(() => {
    if (products?.length > 0) {
      setDisplayProducts(products);
      // Ensure initial pagination is set
      setPaginatedProducts(products.slice(0, 12)); // Assuming 12 items per page
    }
  }, [products]);

  const handleOpenFilter = () => setShowFilter(!showFilter);

  const handleFilteredProductsChange = useCallback(
    (filteredProducts: Product[]) => {
      setDisplayProducts(filteredProducts);
      // Reset pagination when filters change
      setPaginatedProducts(filteredProducts.slice(0, 12));
    },
    []
  );

  // Show loading state until products are initialized
  if (loading || !initialized) return <LoadingState />;

  // (!loading && initialized && !products) || products.length === 0

  if (!loading && !products && initialized) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <p className="text-center text-gray-500">
          No products are currently available. <br />
          Please check back later or refresh the page.
        </p>
      </div>
    );
  }

  // Only show error if we're not loading and there's an error
  if (error) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-red-600 font-medium">
            Error loading products: {error}
          </p>
          <p className="text-gray-600 mt-2">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  return (
    <main>
      <Category categories={categories} />
      <section className="w-full min-h-screen h-full pt-3 flex lg:gap-3 justify-center">
        {/* Desktop Filter */}
        <aside className="hidden lg:flex w-[25rem] h-screen sticky top-0 overflow-y-auto">
          <ProductFilter
            products={products}
            onFilteredProductsChange={handleFilteredProductsChange}
            categories={categories}
          />
        </aside>

        <div className="container space-y-2 h-full overflow-y-auto flex-grow pb-6 ">
          <div className="bg-white p-[0.8rem] shadow-md rounded-lg mb-3 flex flex-col lg:flex-row justify-between items-center">
            <h2 className="text-xl font-semibold mb-4 lg:mb-0">
              Available Products ({displayProducts.length})
            </h2>
            <div className="flex items-center gap-6">
              <button
                className="flex lg:hidden items-center gap-2 text-green-700 hover:text-green-700 transition-colors"
                onClick={handleOpenFilter}
              >
                <SlidersHorizontal size={20} />
                <span className="font-medium">Filter</span>
              </button>
            </div>
          </div>

          {products.length === 0 || displayProducts.length === 0 ? (
            <div className="w-full h-64 flex items-center justify-center">
              <p className="text-gray-500 text-lg">No products found</p>
            </div>
          ) : (
            <>
              <div className="bg-gray-50 w-full h-full max-h-full overflow-y-auto grid gap-6 px-3 lg:px-0 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
                {paginatedProducts.map((product: Product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Add Paginator */}
              <Paginator
                products={displayProducts}
                onPageChange={setPaginatedProducts}
                itemsPerPage={12} // Adjust based on your grid layout
              />
            </>
          )}
        </div>

        {/* Mobile Filter */}
        <MobileProductFilter
          showFilter={showFilter}
          handleOpenFilter={handleOpenFilter}
          products={products}
          categories={categories}
          onFilteredProductsChange={handleFilteredProductsChange}
        />
      </section>
    </main>
  );
};

export default Products;
