"use client";
import { useState } from "react";

const Filter = () => {
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 1000]);

  return (
    <div className="w-full p-4 overflow-y-auto h-full">
      <h2 className="text-xl font-semibold mb-4">Filter Products</h2>
      <div className="mb-4">
        <h4 className="text-md font-medium">Category</h4>
        <select
          className="w-full border p-2 rounded-md mt-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All</option>
          <option value="fruits">Fruits</option>
          <option value="vegetables">Vegetables</option>
        </select>
      </div>
      <div className="mb-4">
        <h4 className="text-md font-medium">Price Range</h4>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
            className="border p-2 w-full rounded-md"
          />
          <span>-</span>
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
            className="border p-2 w-full rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Filter;
