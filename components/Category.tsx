import React from "react";
import farmProducts from "./data";

const Category = () => {
  const categories = Array.from(
    new Set(farmProducts.map((product) => product.category))
  );
  return (
    <div>
      <div className="bg-white  p-4 shadow-sm rounded-md flex justify-between items-center gap">
        <h4 className="text-2xl font-semibold">Categories:</h4>
        <ul className="flex gap-3 flex-wrap">
          {categories.map((category, index) => (
            <li
              key={index}
              className="bg-gray-100 text-black py-2 px-5 rounded-3xl text-center font-medium"
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
