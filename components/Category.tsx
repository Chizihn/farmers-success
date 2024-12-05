"use client";

import { capitalizeWords, getCategoryPath } from "@/utils";
import { usePathname, useRouter } from "next/navigation";
import Dropdown from "react-dropdown";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AssetInfoType } from "@/types/category";

interface CategoryProps {
  categories: AssetInfoType[];
}

const Category: React.FC<CategoryProps> = ({ categories }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showLeftScroll, setShowLeftScroll] = useState<boolean>(false);
  const [showRightScroll, setShowRightScroll] = useState<boolean>(false);

  const activeCategoryRef = useRef<HTMLButtonElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleCategory = (categoryId: string) => {
    router.push(`/products/category/${categoryId}`);
  };

  const handleCategorySelect = (option: { value: string }) => {
    setSelectedCategory(option.value);
    const categoryPath = getCategoryPath(option.value);
    handleCategory(categoryPath);
  };

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = 200;
      const newScrollLeft =
        containerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      containerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  const checkScrollButtons = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setShowLeftScroll(scrollLeft > 0);
      setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    if (activeCategoryRef.current) {
      activeCategoryRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
      });
    }
    checkScrollButtons();
  }, [pathname]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollButtons);
      checkScrollButtons();
      return () => container.removeEventListener("scroll", checkScrollButtons);
    }
  }, []);

  // Update selectedCategory based on pathname
  useEffect(() => {
    const activeCategory = categories.find(
      (category) => `/products/category/${category.id}` === pathname
    );
    setSelectedCategory(activeCategory ? activeCategory.name : null);
  }, [pathname, categories]);

  return (
    <>
      <div className="bg-white p-3 lg:p-6 shadow-lg rounded-lg flex flex-col justify-center items-center gap-3">
        <h2 className="text-xl lg:text-3xl font-semibold text-gray-800">
          Categories
        </h2>

        {/* Desktop Category List */}
        <div className="hidden lg:flex items-center w-full relative px-[3rem]">
          {showLeftScroll && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-[-10px] z-10 p-2 bg-white/90 rounded-full shadow-lg hover:bg-gray-50 transition-all"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
          )}

          <div
            ref={containerRef}
            className="flex overflow-x-auto w-full scroll-smooth scroll hide-scrollbar no-scrollbar"
            onScroll={checkScrollButtons}
          >
            <ul className="flex gap-3 px-4 mx-auto mb-2">
              {categories.map((category) => {
                const id = category.id;
                const isActive = pathname === `/products/category/${id}`;

                return (
                  <li key={id}>
                    <button
                      ref={isActive ? activeCategoryRef : null}
                      onClick={() => handleCategory(id)}
                      className={`
                      py-3 px-6 
                      rounded-full 
                      text-center 
                      font-medium 
                      text-sm
                      transition-all 
                      duration-300 
                      whitespace-nowrap
                      hover:scale-105
                      ${
                        isActive
                          ? "bg-green-600 text-white shadow-lg"
                          : "bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-700"
                      }
                    `}
                    >
                      {capitalizeWords(category.name)}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {showRightScroll && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-[-10px] z-10 p-2 bg-white/90 rounded-full shadow-lg hover:bg-gray-50 transition-all"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          )}
        </div>

        {/* Mobile Dropdown */}
        <div className="flex lg:hidden w-full">
          <Dropdown
            options={categories.map((category) => ({
              value: category.name,
              label: capitalizeWords(category.name),
            }))}
            onChange={handleCategorySelect}
            value={
              selectedCategory
                ? {
                    value: selectedCategory,
                    label: capitalizeWords(selectedCategory),
                  }
                : "Select a category"
            }
            placeholder="Select a category"
            className="w-full p-2 border rounded-md"
          />
        </div>
      </div>
    </>
  );
};

export default Category;
