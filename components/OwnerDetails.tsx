"use client";

import { useEffect, useState, useCallback } from "react";
import { capitalizeWords } from "@/utils";
import ProductCard from "./ProductCard";
import ProductFilter from "./ProductFilter";
import MobileProductFilter from "./MobileProductFilter";
import LoadingState from "./Loading";
import Paginator from "./Paginator";
import { Product } from "@/types/product";
import { useFetchCategories } from "@/hooks/useFetchCategories";
import { AssetType } from "@/types/category";
import { SlidersHorizontal } from "lucide-react";
import useProductStore from "@/store/useProductStore";
import { useRouter } from "next/navigation";

interface OwnerDetailsProps {
  userId?: string; // Optional for owner-specific details
}

const OwnerDetails = ({ userId }: OwnerDetailsProps) => {
  const router = useRouter();
  const { products, loading, initialized, error, fetchProducts } =
    useProductStore();

  const [displayProducts, setDisplayProducts] = useState<Product[]>([]);
  const { categories } = useFetchCategories(AssetType.CROP);
  const [paginatedProducts, setPaginatedProducts] = useState<Product[]>([]);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    fetchProducts({ userId: userId });
  }, [fetchProducts, userId]);

  useEffect(() => {
    if (products?.length > 0) {
      setDisplayProducts(products);
    }
  }, [products]);

  const handleOpenFilter = () => setShowFilter(!showFilter);

  const handleFilteredProductsChange = useCallback(
    (filteredProducts: Product[]) => {
      setDisplayProducts(filteredProducts);
    },
    []
  );

  const owner = userId ? products[0]?.user : null;
  const fullName = owner ? `${owner.firstName} ${owner.lastName}` : null;
  // const handleViewProduct = (id: string) => {
  //   router.push()
  // }

  if (loading || !initialized) return <LoadingState />;
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

  if (!products || products.length === 0)
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">No products found</p>
      </div>
    );

  return (
    <section className="w-full min-h-screen h-full pt-3 flex lg:gap-3 justify-center">
      {/* Desktop Filter */}

      <aside className="hidden lg:flex w-[25rem] h-screen sticky top-0 overflow-y-auto">
        <ProductFilter
          products={products}
          onFilteredProductsChange={handleFilteredProductsChange}
          categories={categories}
        />
      </aside>

      <div className="container space-y-2 h-full overflow-y-auto flex-grow pb-6">
        <div className="bg-white p-[0.8rem] shadow-md rounded-lg mb-3 flex flex-col lg:flex-row justify-between items-center">
          <h2 className="text-xl font-semibold mb-4 lg:mb-0">
            {`${capitalizeWords(fullName)}'s Products`}{" "}
            {`(${displayProducts.length})`}
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

        <div className="bg-gray-50 w-full h-full max-h-full overflow-y-auto grid gap-6 px-3 lg:px-0 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          {(paginatedProducts.length > 0
            ? paginatedProducts
            : displayProducts
          ).map((product: Product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <Paginator
          products={displayProducts}
          onPageChange={setPaginatedProducts}
          itemsPerPage={12}
        />
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
  );
};

export default OwnerDetails;
