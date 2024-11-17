"use client";

import useProductStore from "@/store/useProductStore";
import { useEffect } from "react";
import { capitalizeWords } from "@/utils";
import ProductCard from "./ProductCard";
import { useFetchProducts } from "@/hooks/useFetchProducts";
import LoadingState from "./Loading";

interface OwnerDetailsProps {
  userId: string;
}

const OwnerDetails = ({ userId }: OwnerDetailsProps) => {
  const { products, loading, initialized, error } = useFetchProducts({
    userId: userId,
  });

  // useEffect(() => {
  //   fetchProducts({ userId: userId });
  // }, [fetchProducts, userId]);

  if (loading || !initialized) return <LoadingState />;
  if (error) return <p>Error loading data</p>;

  if (!products || products.length === 0) return <p>No products found</p>;

  // Destructure owner details from the first product
  const owner = products[0]?.user;

  const fullName = ` ${owner.firstName} ${owner.lastName} `;

  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">
          {capitalizeWords(fullName)} Products
        </h1>
      </div>

      <div className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-all duration-300">
          {products.map((product) => (
            <div
              key={product.id}
              className="transform transition-all duration-300 hover:scale-[1.02]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OwnerDetails;
