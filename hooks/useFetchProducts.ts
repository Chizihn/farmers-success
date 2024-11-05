"use client";
import { useEffect } from "react";
import useProductStore from "@/store/useProductStore";
import { GetProductsFilter } from "@/types";

export const useFetchProducts = (initialFilter?: GetProductsFilter) => {
  const { products, loading, error, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts(initialFilter);
  }, [fetchProducts, initialFilter]);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
  };
};
