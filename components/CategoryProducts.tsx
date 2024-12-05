"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useFetchProducts } from "@/hooks/useFetchProducts";
import { useFetchCategories } from "@/hooks/useFetchCategories";
import { AssetType } from "@/types/category";
import { capitalizeFirstChar } from "@/utils";
import ProductCard from "./ProductCard";
import Category from "./Category";
import { LoaderCircle } from "lucide-react";
import { Product } from "@/types/product";

interface CategoryProductsProps {
  categoryId: string;
}

const CategoryProducts: React.FC<CategoryProductsProps> = ({ categoryId }) => {
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Fetch data using custom hooks
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useFetchCategories(AssetType.CROP);

  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useFetchProducts();

  // Memoized values
  const category = useMemo(
    () => categories.find((c) => c.id === categoryId),
    [categories, categoryId]
  );

  const categoryProducts = useMemo(
    () =>
      products.filter((product) =>
        product.categories.some((c) => c.categoryId === categoryId)
      ),
    [products, categoryId]
  );

  const categoryName = capitalizeFirstChar(category?.name) as string;

  // Handle initial loading state
  useEffect(() => {
    if (!categoriesLoading && !productsLoading) {
      setTimeout(() => setIsInitialLoad(false), 300);
    }
  }, [categoriesLoading, productsLoading]);

  // Error component
  const ErrorDisplay = ({ message }: { message: string }) => (
    <div className="flex flex-col items-center justify-center p-8 bg-red-50 rounded-lg">
      <p className="text-red-600 font-medium text-lg mb-2">
        Something went wrong
      </p>
      <p className="text-red-500 text-center">{message}</p>
    </div>
  );

  // Loading component
  const LoadingDisplay = () => (
    <div className="flex flex-col items-center justify-center p-8">
      <LoaderCircle className="animate-spin h-12 w-12 text-green-700" />
    </div>
  );

  // Empty state component
  const EmptyState = ({ name }: { name: string }) => (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg">
      <p className="text-gray-600 text-lg mb-2">No products available</p>
      <p className="text-gray-500 text-center">
        Check back later for updates to {name}
      </p>
    </div>
  );

  // Product grid component
  const ProductGrid = useCallback(
    ({ products }: { products: Product[] }) => (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-all duration-300 px-4 lg:px-0">
        {products.map((product) => (
          <div
            key={product.id}
            className="transform transition-all duration-300 hover:scale-[1.02]"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    ),
    []
  );

  // Header component
  const CategoryHeader = useCallback(
    ({ name, count }: { name?: string; count: number }) => (
      <div className="bg-white p-6 rounded-lg shadow-lg mb-4 transition-all duration-300">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          {capitalizeFirstChar(name || "Products")}
        </h2>
        <p className="text-center text-gray-600 mt-0">
          {count} {count === 1 ? "product" : "products"} available
        </p>
      </div>
    ),
    []
  );

  // Main content
  const MainContent = () => {
    if (categoriesError || productsError) {
      return (
        <ErrorDisplay
          message={categoriesError?.message || productsError?.message || ""}
        />
      );
    }

    if (isInitialLoad || categoriesLoading || productsLoading) {
      return <LoadingDisplay />;
    }

    if (!categoryProducts.length) {
      return <EmptyState name={categoryName} />;
    }

    return (
      <>
        <CategoryHeader name={category?.name} count={categoryProducts.length} />
        <ProductGrid products={categoryProducts} />
      </>
    );
  };

  return (
    <div className="">
      <div className="">
        <Category categories={categories} />
      </div>
      <div className="py-1">
        <MainContent />
      </div>
    </div>
  );
};

export default CategoryProducts;
