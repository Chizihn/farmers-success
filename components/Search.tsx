<<<<<<< HEAD
"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "lucide-react";
import { Product } from "@/types";
import useProductStore from "@/store/useProductStore";

const ProductSearch: React.FC = () => {
  const router = useRouter();
  const { products } = useProductStore();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (products) {
      filterProducts();
    }
  }, [products, searchTerm]);

  const filterProducts = useCallback(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [products, searchTerm]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (filteredProducts.length > 0) {
      router.push(`/search?q=${searchTerm}`);
    }
  };

=======
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const Search = () => {
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;

    if (name) {
      router.push(`/search?q=${name}`);
    }
  };
>>>>>>> b95be22edf50a55697986b04c5c99be73de60731
  return (
    <form
      onSubmit={handleSearch}
      className="w-full md:w-[50rem] flex gap-3 relative my-4 md:my-0"
    >
      <input
        type="text"
<<<<<<< HEAD
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full border-2 border-gray-300 p-2  rounded-3xl"
        placeholder="Search products..."
      />
      <button
        type="submit"
        className="absolute top-0 right-0 flex items-center gap-1 py-3 md:py-2 px-4 md:px-6 bg-green-600 rounded-3xl transition-colors duration-150 hover:bg-green-700"
      >
=======
        name="name"
        className="w-full border-2 border-gray-300 p-2  rounded-3xl"
        placeholder="Search..."
      />
      <button className="absolute top-0 right-0 flex items-center gap-1 py-3 md:py-2 px-4 md:px-6 bg-green-600 rounded-3xl transition-colors duration-150 hover:bg-green-700">
>>>>>>> b95be22edf50a55697986b04c5c99be73de60731
        <SearchIcon className="text-white" size={20} />
        <p className="text-white text-sm md:text-lg">Search</p>
      </button>
    </form>
  );
};

<<<<<<< HEAD
export default ProductSearch;
=======
export default Search;
>>>>>>> b95be22edf50a55697986b04c5c99be73de60731
