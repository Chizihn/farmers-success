// src/components/ProductFilter.tsx
"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Product } from "@/types";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { capitalizeWords } from "@/utils";
import { usePathname } from "next/navigation";
import { AssetInfoType } from "@/types/category";
import { filterProducts, Filters } from "@/utils/filter";
import useAuthStore from "@/store/useAuthStore";

interface ProductFilterProps {
  products: Product[];
  categories: AssetInfoType[];
  onFilteredProductsChange: (products: Product[]) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  products,
  categories,
  onFilteredProductsChange,
}) => {
  const pathname = usePathname();
  const { isAuthenticated } = useAuthStore();
  const [filters, setFilters] = useState<Filters>({
    city: "",
    state: "",
    type: "",
    minPrice: "",
    maxPrice: "",
    searchTerm: "",
  });
  const isCategoryPage = pathname.startsWith("/products/category");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(
    filters.searchTerm
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(filters.searchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [filters.searchTerm]);

  const filteredProducts = useMemo(
    () => filterProducts(products, filters, debouncedSearchTerm),
    [filters, products, debouncedSearchTerm]
  );

  useEffect(
    () => onFilteredProductsChange(filteredProducts),
    [filteredProducts, onFilteredProductsChange]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleCategorySelect = (option: { value: any }) =>
    setFilters((prev) => ({ ...prev, type: option.value }));
  const clearFilters = () =>
    setFilters({
      city: "",
      state: "",
      type: "",
      minPrice: "",
      maxPrice: "",
      searchTerm: "",
    });

  return (
    <div className="w-full h-screen overflow-hidden sticky top-0 left-0">
      <div className="w-full h-screen overflow-hidden sticky top-0 left-0">
        <div className="bg-white py-3 px-4 shadow-md rounded-lg mb-[.4rem] sticky top-0 z-10">
          <h2 className="text-xl font-semibold">Filter Products</h2>
        </div>

        <div className="bg-white h-full shadow-md p-3 rounded-lg space-y-7">
          <div>
            <input
              type="text"
              name="searchTerm"
              value={filters.searchTerm}
              onChange={handleInputChange}
              placeholder="Search product..."
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={filters.city}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="Filter by city"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={filters.state}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="Filter by state"
                />
              </div>
            </div>

            {!isCategoryPage ||
              (isAuthenticated && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <Dropdown
                    options={categories.map((category) => ({
                      value: category.name,
                      label: capitalizeWords(category.name),
                    }))}
                    onChange={handleCategorySelect}
                    value={filters.type || "Select a category"}
                    placeholder="Select a category"
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              ))}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Price Range
              </label>
              <div className="flex gap-4">
                <input
                  type="number"
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleInputChange}
                  className="w-1/2 p-2 border rounded-md"
                  placeholder="Min price"
                />
                <input
                  type="number"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleInputChange}
                  className="w-1/2 p-2 border rounded-md"
                  placeholder="Max price"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Clear Filters
              </button>
            </div>
          </div>

          <div className="p-4 bg-gray-50">
            <p className="text-sm text-gray-600">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
