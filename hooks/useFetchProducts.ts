"use client";
import { useEffect } from "react";
import useProductStore from "@/store/useProductStore";
import { GetProductsFilter } from "@/types";

export const useFetchProducts = (initialFilter?: GetProductsFilter) => {
  const { products, loading, initialized, error, fetchProducts } =
    useProductStore();

  useEffect(() => {
    if (!initialized || !initialFilter) {
      fetchProducts(initialFilter || {});
    }
  }, [fetchProducts, initialFilter, initialized]);

  return {
    products,
    loading,
    initialized,
    error,
    refetch: fetchProducts, 
  };
};
