"use client";
import React, { useState, useEffect, useMemo } from "react";
import { X } from "lucide-react";
import { Product } from "@/types";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { capitalizeWords } from "@/utils";
import { AssetInfoType } from "@/types/category";

interface MobileFilterProps {
  showFilter: boolean;
  handleOpenFilter: () => void;
  products: Product[];
  categories: AssetInfoType[];
  onFilteredProductsChange: (products: Product[]) => void;
}

const MobileFilter: React.FC<MobileFilterProps> = ({
  showFilter,
  handleOpenFilter,
  products,
  categories,
  onFilteredProductsChange,
}) => {
  const [filters, setFilters] = useState({
    city: "",
    state: "",
    type: "",
    minPrice: "",
    maxPrice: "",
    searchTerm: "",
  });

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(
    filters.searchTerm
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(filters.searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [filters.searchTerm]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCity =
        !filters.city ||
        product.city.toLowerCase().includes(filters.city.toLowerCase());
      const matchesState =
        !filters.state ||
        product.state.toLowerCase().includes(filters.state.toLowerCase());
      const matchesCategory =
        !filters.type ||
        product.categories.some(
          (category) =>
            category.name.toLowerCase() === filters.type.toLowerCase()
        );
      const matchesMinPrice =
        !filters.minPrice || product.price >= parseFloat(filters.minPrice);
      const matchesMaxPrice =
        !filters.maxPrice || product.price <= parseFloat(filters.maxPrice);
      const matchesSearch =
        !debouncedSearchTerm ||
        product.name
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase()) ||
        product.description
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase());

      return (
        matchesCity &&
        matchesState &&
        matchesCategory &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesSearch
      );
    });
  }, [filters, products, debouncedSearchTerm]);

  useEffect(() => {
    onFilteredProductsChange(filteredProducts);
  }, [filteredProducts, onFilteredProductsChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategorySelect = (option: { value: any }) => {
    setFilters((prev) => ({
      ...prev,
      type: option.value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      city: "",
      state: "",
      type: "",
      minPrice: "",
      maxPrice: "",
      searchTerm: "",
    });
  };

  return (
    <aside
      className={`fixed top-0 right-0 w-64 bg-white h-full z-50 transform ${
        showFilter ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out lg:hidden`}
    >
      <div className="p-4 border-b items-center">
        <button
          onClick={handleOpenFilter}
          className="p-2 rounded-full hover:bg-gray-200"
          aria-label="Close filter"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="p-4 space-y-4">
        <input
          type="text"
          name="searchTerm"
          value={filters.searchTerm}
          onChange={handleInputChange}
          placeholder="Search product..."
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />

        <div className="space-y-2">
          <input
            type="text"
            name="city"
            value={filters.city}
            onChange={handleInputChange}
            placeholder="Filter by city"
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="text"
            name="state"
            value={filters.state}
            onChange={handleInputChange}
            placeholder="Filter by state"
            className="w-full p-2 border rounded-lg"
          />
          <Dropdown
            options={categories.map((category) => ({
              value: category.name,
              label: capitalizeWords(category.name),
            }))}
            onChange={handleCategorySelect}
            value={filters.type || "Select a category"}
            placeholder="Select a category"
            className="w-full"
          />
        </div>

        <div className="flex space-x-2">
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleInputChange}
            placeholder="Min price"
            className="w-1/2 p-2 border rounded-lg"
          />
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleInputChange}
            placeholder="Max price"
            className="w-1/2 p-2 border rounded-lg"
          />
        </div>

        <button
          onClick={clearFilters}
          className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          Clear Filters
        </button>

        <div className="text-sm text-gray-600">
          Showing {filteredProducts.length} of {products.length} products
        </div>
      </div>
    </aside>
  );
};

export default MobileFilter;
