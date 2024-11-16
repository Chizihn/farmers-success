"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Product } from "@/types/product";
import useProductStore from "@/store/useProductStore";

import ProductCard from "@/components/ProductCard";

const SearchPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { products } = useProductStore();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const term = searchParams.get("q")?.trim().toLowerCase() || "";
    setSearchTerm(term);
    setFilteredProducts(
      term
        ? products?.filter((product) =>
            product.name.toLowerCase().includes(term)
          ) || []
        : products || []
    );
  }, [searchParams, products]);

  return (
    <div className="bg-gray-50 container mx-auto">
      {searchTerm ? (
        <>
          <div className="bg-white p-3 shadow-md rounded-lg mb-2 flex flex-col lg:flex-row justify-between items-center">
            <h2 className="text-xl font-bold mb-4 lg:mb-0">
              Search result for {`"${searchTerm}"`}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="text-center mt-8">
              <h2 className="text-2xl font-bold">No products found</h2>
              <p className="text-gray-500">
                Try searching for a different term or browse our catalog.
              </p>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-md mt-4 hover:bg-green-800"
                onClick={() => router.push("/")}
              >
                Go to Home
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="h-full flex justify-center items-center p-5 mt-8">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl text-center">
              {" "}
              You haven’t searched for anything yet. Try searching for a product
              or browse our catalog.
            </h2>
            <div className="flex justify-center ">
              <button
                className="bg-green-600 text-white p-4 rounded-md mt-4 hover:bg-green-800 font-semibold "
                onClick={() => router.push("/")}
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
