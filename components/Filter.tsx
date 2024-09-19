"use client";
import { useState } from "react";

const Filter = () => {
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 1000]);

  return (
    <div className="w-full h-full px-4 overflow-y-auto sticky top-0 left-0">
      <div className="bg-white p-4 shadow-sm rounded-lg mb-[.4rem]  sticky top-0 z-10">
        <h2 className="text-xl font-semibold">Filter Products</h2>
      </div>
      <div className="bg-white h-[90vh] shadow-md p-3 rounded-lg">
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
    </div>
  );
};

export default Filter;
