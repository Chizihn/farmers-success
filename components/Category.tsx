"use client";

import { capitalizeWords, getCategoryPath } from "@/utils";
import { usePathname, useRouter } from "next/navigation";
import Dropdown from "react-dropdown"; // Ensure Dropdown is imported
import { useState } from "react";
import { AssetInfoType } from "@/types/category";

interface CategoryProps {
  categories: AssetInfoType[];
}

const Category: React.FC<CategoryProps> = ({ categories }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategory = (categoryId: string) => {
    router.push(`/products/category/${categoryId}`);
  };

  const handleCategorySelect = (option: { value: string }) => {
    setSelectedCategory(option.value);
    const categoryPath = getCategoryPath(option.value);
    handleCategory(categoryPath);
  };

  return (
    <>
      <div className="bg-white p-3 lg:p-4 shadow-lg rounded-md flex flex-col justify-center items-center gap-4">
        <h2 className="text-xl lg:text-3xl font-semibold">All Categories</h2>

        {/* Desktop Category List */}
        <div className="hidden lg:flex">
          <ul className="flex gap-3 flex-wrap justify-center lg:justify-start">
            {categories.map((category, index) => {
              const categoryPath = getCategoryPath(category.name);
              const id = category.id;
              const isActive = pathname === `/products/category/${id}`;

              return (
                <li key={index}>
                  <button
                    onClick={() => handleCategory(id)}
                    className={`block py-1 lg:py-2 px-3 lg:px-5 rounded-3xl text-center font-medium cursor-pointer transition-all duration-300 
                      ${
                        isActive
                          ? "bg-green-600 text-white"
                          : "bg-gray-100 text-black hover:bg-green-600 hover:text-white"
                      }`}
                  >
                    {capitalizeWords(category.name)}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Mobile Dropdown */}
        <div className="flex lg:hidden w-full">
          <Dropdown
            options={categories.map((category) => ({
              value: category.name,
              label: capitalizeWords(category.name),
            }))}
            onChange={handleCategorySelect}
            value={selectedCategory || "Select a category"}
            placeholder="Select a category"
            className="w-full p-2 border rounded-md"
          />
        </div>
      </div>
    </>
  );
};

export default Category;
