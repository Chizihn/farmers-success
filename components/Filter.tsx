"use client";
import { useState, ReactNode, ChangeEvent } from "react";

interface FilterProps {
  title: string;
  children: ReactNode;
}

const Filter: React.FC<FilterProps> = ({ title, children }) => {
  return (
    <div className="w-full h-screen px-4 overflow-hidden sticky top-0 left-0">
      <div className="bg-white p-4 shadow-sm rounded-lg mb-[.4rem] sticky top-0 z-10">
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <div className="bg-white h-full shadow-md p-3 rounded-lg">{children}</div>
    </div>
  );
};

interface ProductFilterProps {
  onFilterChange: (filters: { category: string; priceRange: number[] }) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ onFilterChange }) => {
  const [category, setCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    onFilterChange({ category: e.target.value, priceRange });
  };

  const handlePriceChange = (index: number, value: number) => {
    const newPriceRange = [...priceRange];
    newPriceRange[index] = value;
    setPriceRange(newPriceRange);
    onFilterChange({ category, priceRange: newPriceRange });
  };

  return (
    <Filter title="Filter Products">
      <div className="mb-4">
        <h4 className="text-md font-medium">Category</h4>
        <select
          className="w-full border p-2 rounded-md mt-2"
          value={category}
          onChange={handleCategoryChange}
        >
          <option value="all">All</option>
          <option value="fruits">Fruits</option>
          <option value="vegetables">Vegetables</option>
          <option value="herbs">Herbs</option>
        </select>
      </div>
      <div className="mb-4">
        <h4 className="text-md font-medium">Price Range</h4>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) => handlePriceChange(0, +e.target.value)}
            className="border p-2 w-full rounded-md"
          />
          <span>-</span>
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) => handlePriceChange(1, +e.target.value)}
            className="border p-2 w-full rounded-md"
          />
        </div>
      </div>
    </Filter>
  );
};

interface FarmFilterProps {
  onFilterChange: (filters: { city: string }) => void;
}

const FarmFilter: React.FC<FarmFilterProps> = ({ onFilterChange }) => {
  const [city, setCity] = useState<string>("all");

  const handleCityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCity(e.target.value);
    onFilterChange({ city: e.target.value });
  };

  return (
    <Filter title="Filter Farms">
      <div className="mb-4">
        <h4 className="text-md font-medium">City</h4>
        <select
          className="w-full border p-2 rounded-md mt-2"
          value={city}
          onChange={handleCityChange}
        >
          <option value="all">All Cities</option>
          <option value="Port-harcourt">Port-harcourt</option>
          <option value="Ibadan">Ibadan</option>
          <option value="Lagos">Lagos</option>
          <option value="Benin City">Benin City</option>
          <option value="Kano">Kano</option>
          <option value="Abuja">Abuja</option>
          <option value="Enugu">Enugu</option>
          <option value="Jos">Jos</option>
          <option value="Calabar">Calabar</option>
        </select>
      </div>
    </Filter>
  );
};

export { ProductFilter, FarmFilter };
