import React from "react";
import farmProducts from "./data";

const Category = () => {
  const categories = Array.from(
    new Set(farmProducts.map((product) => product.category))
  );
  return (
    <div>
      <div className="bg-white  p-3 lg:p-4 shadow-sm rounded-md flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-4 lg:gap-2">
        <h4 className="text-2xl font-semibold">Categories</h4>
        <ul className="flex gap-3 flex-wrap justify-center lg:justify-start">
          {categories.map((category, index) => (
            <li
              key={index}
              className="bg-gray-100 text-black py-1 lg:py-2 px-3 lg:px-5 rounded-3xl text-center font-medium cursor-pointer transition-all 300ms hover:bg-green-600 hover:text-white"
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Category;
