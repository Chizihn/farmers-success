"use client";
import { useEffect } from "react";
import useProductStore from "@/store/useProductStore";
import { AssetType } from "@/types/category";
import useAuthStore from "@/store/useAuthStore";

export const useFetchCategories = (assetType: AssetType) => {
  const { categories, loading, error, fetchCategories } = useProductStore();

  useEffect(() => {
    fetchCategories(assetType);
  }, [fetchCategories, assetType]);

  return {
    categories,
    loading,
    error,
    refetch: () => fetchCategories(assetType),
  };
};
