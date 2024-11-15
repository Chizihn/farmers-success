"use client";
import { useEffect } from "react";
import useOrderStore from "@/store/useOrderStore";
import useAuthStore from "@/store/useAuthStore";
import { GetProductOrders } from "@/types/order";

export const useFetchOrders = (initialFilter?: GetProductOrders) => {
  const { productOrders, loading, error, fetchProductOrders } = useOrderStore();
  const token = useAuthStore((state) => state.user);

  useEffect(() => {
    if (token) {
      fetchProductOrders(initialFilter);
    }
  }, [fetchProductOrders, initialFilter, token]);

  return {
    productOrders,
    loading,
    error,
    refetch: fetchProductOrders,
  };
};
