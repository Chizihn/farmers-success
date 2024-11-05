"use client";
import { Product, ProductCategory } from "@/types";
import { capitalizeWords, getCategoryPath } from "@/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface CategoryProps {
  products: Product[];
}

const Category: React.FC<CategoryProps> = ({ products }) => {
  const pathname = usePathname();
  const categories = Array.from(
    new Set(
      products.flatMap((product: Product) =>
        product.categories.map((category) => category.name)
      )
    )
  );

  return (
    <div>
      <div className="hidden p-3 lg:p-4 shadow-sm rounded-md lg:flex flex-col lg:flex-row justify-center lg:justify-start items-center gap-4 lg:gap-2">
        <h4 className="text-2xl font-semibold">Categories</h4>
        <ul className="flex gap-3 flex-wrap justify-center lg:justify-start">
          {categories.map((category, index) => {
            const categoryPath = getCategoryPath(category);
            const isActive = pathname === `/products/category/${categoryPath}`;

            return (
              <li key={index}>
                <Link href={`/products/category/${categoryPath}`} passHref>
                  <span
                    className={`block py-1 lg:py-2 px-3 lg:px-5 rounded-3xl text-center font-medium cursor-pointer transition-all duration-300 
                      ${
                        isActive
                          ? "bg-green-600 text-white"
                          : "bg-gray-100 text-black hover:bg-green-600 hover:text-white"
                      }`}
                  >
                    {capitalizeWords(category)}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Category;
