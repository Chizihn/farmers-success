import React, { useState, useMemo, useEffect } from "react";
import { Product } from "@/types";
import { X } from "lucide-react";

interface MobileProductFilterProps {
  showFilter: boolean;
  handleOpenFilter: () => void;
  products: Product[];
  onFilteredProductsChange: (filteredProducts: Product[]) => void;
}

const MobileProductFilter: React.FC<MobileProductFilterProps> = ({
  showFilter,
  handleOpenFilter,
  products,
  onFilteredProductsChange,
}) => {
  const [filters, setFilters] = useState({
    city: "",
    state: "",
    type: "",
    minPrice: "",
    maxPrice: "",
    userId: "",
  });

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

      const matchesUserId =
        !filters.userId || product.userId === filters.userId;

      return (
        matchesCity &&
        matchesState &&
        matchesCategory &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesUserId
      );
    });
  }, [products, filters]);

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

  const applyFilter = () => {
    handleOpenFilter(); // Close the filter after applying
  };

  return (
    <aside
      className={`fixed top-0 right-0 w-[80%] bg-white shadow-2xl h-full z-50 transform ${
        showFilter ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out lg:hidden`}
    >
      <div className="flex justify-end p-4 border-b">
        <button onClick={handleOpenFilter}>
          <X className="text-gray-500" size={24} />
        </button>
      </div>
      <div className="p-4 space-y-4">
        <h2 className="text-xl font-semibold mb-4">Filter Products</h2>

        <div>
          <label htmlFor="city" className="block font-medium">
            City
          </label>
          <input
            id="city"
            name="city"
            value={filters.city}
            onChange={handleInputChange}
            className="w-full border p-2 rounded-md"
            placeholder="Enter city"
          />
        </div>

        <div>
          <label htmlFor="state" className="block font-medium">
            State
          </label>
          <input
            id="state"
            name="state"
            value={filters.state}
            onChange={handleInputChange}
            className="w-full border p-2 rounded-md"
            placeholder="Enter state"
          />
        </div>

        <div>
          <label htmlFor="type" className="block font-medium">
            Type
          </label>
          <input
            id="type"
            name="type"
            value={filters.type}
            onChange={handleInputChange}
            className="w-full border p-2 rounded-md"
            placeholder="Enter type"
          />
        </div>

        <div>
          <label htmlFor="userId" className="block font-medium">
            User ID
          </label>
          <input
            id="userId"
            name="userId"
            value={filters.userId}
            onChange={handleInputChange}
            className="w-full border p-2 rounded-md"
            placeholder="Enter user ID"
          />
        </div>

        <div>
          <label className="block font-medium">Price Range</label>
          <div className="flex gap-2">
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleInputChange}
              placeholder="Min price"
              className="w-1/2 border p-2 rounded-md"
            />
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleInputChange}
              placeholder="Max price"
              className="w-1/2 border p-2 rounded-md"
            />
          </div>
        </div>

        <button
          onClick={applyFilter}
          className="bg-green-600 text-white px-4 py-2 rounded-md w-full"
        >
          Apply Filter
        </button>
      </div>
    </aside>
  );
};

export default MobileProductFilter;
