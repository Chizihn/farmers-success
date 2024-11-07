"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchIcon } from "lucide-react";
import { Product } from "@/types";
import useProductStore from "@/store/useProductStore";

const ProductSearch: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { products } = useProductStore();

  const [searchTerm, setSearchTerm] = useState<string>(
    searchParams.get("q") || ""
  );
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  useEffect(() => {
    const term = searchTerm.trim().toLowerCase();
    setFilteredProducts(
      term
        ? products.filter((product) =>
            product.name.toLowerCase().includes(term)
          )
        : products
    );
  }, [searchTerm, products]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (filteredProducts.length > 0) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="w-full md:w-[50rem] flex gap-3 relative my-4 md:my-0"
    >
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full border-2 border-gray-300 p-2 rounded-3xl"
        placeholder="Search products..."
      />
      <button
        type="submit"
        className="absolute top-0 right-0 flex items-center gap-1 py-3 md:py-2 px-4 md:px-6 bg-green-600 rounded-3xl transition-colors duration-150 hover:bg-green-700"
      >
        <SearchIcon className="text-white" size={20} />
        <p className="text-white text-sm md:text-lg">Search</p>
      </button>
    </form>
  );
};

export default ProductSearch;
