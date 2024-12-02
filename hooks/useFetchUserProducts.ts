"use client";
import useProductStore from "@/store/useProductStore";
import { useEffect } from "react";

export const useFetchUserProducts = (userId: string) => {
  const { products, loading, error, initialized, fetchProducts } =
    useProductStore();
  useEffect(() => {
    fetchProducts({ userId: userId });
  }, [fetchProducts, userId]);
  return {
    products,
    loading,
    initialized,
    error,
    refetch: fetchProducts,
  };
};
