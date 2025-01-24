"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "lucide-react";
import { Product } from "@/types/product";
import useProductStore from "@/store/useProductStore";
import { capitalizeFirstChar } from "@/utils";

const ProductSearch: React.FC = () => {
  const router = useRouter();
  const { products } = useProductStore();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [activeSuggestion, setActiveSuggestion] = useState<number>(-1);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [noResultsFound, setNoResultsFound] = useState<boolean>(false);

  const debounce = (func: Function, delay: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  const filterSuggestions = useCallback(
    debounce((term: string) => {
      if (term) {
        setLoading(true);
        setNoResultsFound(false);

        const filtered = products.filter((product) =>
          product.name.toLowerCase().includes(term.toLowerCase().trim())
        );

        // Add a slight delay to simulate loading and improve UX
        setTimeout(() => {
          setSuggestions(filtered);
          setLoading(false);
          setNoResultsFound(filtered.length === 0);
        }, 300);
      } else {
        setSuggestions([]);
        setLoading(false);
        setNoResultsFound(false);
      }
    }, 300),
    [products]
  );

  useEffect(() => {
    filterSuggestions(searchTerm);
  }, [searchTerm, filterSuggestions]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions) return;

    if (e.key === "ArrowDown") {
      setActiveSuggestion((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      setActiveSuggestion((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeSuggestion >= 0 && activeSuggestion < suggestions.length) {
        router.push(`/products/${suggestions[activeSuggestion].id}`);
        setShowSuggestions(false);
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (productId: string) => {
    router.push(`/products/${productId}`);
    setShowSuggestions(false);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="w-full md:w-[50rem] flex gap-3 relative my-4 md:my-0"
    >
      <div className="relative w-full">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowSuggestions(true);
          }}
          onKeyDown={handleKeyDown}
          className="w-full border-2 border-gray-300 p-2 rounded-lg focus:none"
          placeholder="Search product..."
        />
        {showSuggestions && searchTerm.trim() && (
          <ul className="absolute top-full left-0 w-full bg-white border shadow-md z-10 max-h-60 overflow-y-auto">
            {loading ? (
              <li className="p-2 text-gray-500">Loading...</li>
            ) : noResultsFound ? (
              <li className="p-2 text-gray-500">No results found</li>
            ) : suggestions && suggestions.length > 0 ? (
              suggestions.map((product, index) => (
                <li
                  key={product.id}
                  className={`p-2 cursor-pointer  hover:bg-gray-200" ${
                    index === activeSuggestion ? "bg-gray-200" : ""
                  }`}
                  onClick={() => handleSuggestionClick(product.id)}
                >
                  {capitalizeFirstChar(product.name)}
                </li>
              ))
            ) : null}
          </ul>
        )}
      </div>
      <button
        type="submit"
        className="absolute top-0 right-0 flex items-center gap-1 py-3 md:py-2 px-4 md:px-6 bg-green-700 rounded-lg transition-colors duration-150 hover:bg-green-800"
      >
        <SearchIcon className="text-white" size={20} />
        <p className="text-white text-sm md:text-lg">Search</p>
      </button>
    </form>
  );
};

export default ProductSearch;
