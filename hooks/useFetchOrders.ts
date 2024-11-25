import useOrderStore from "@/store/useOrderStore";
import { useEffect } from "react";

export const useFetchOrders = () => {
  const { productOrders, loading, initialized, error, fetchProductOrders } =
    useOrderStore();

  useEffect(() => {
    if (!initialized) {
      fetchProductOrders();
    }
  }, [fetchProductOrders, initialized]);

  return {
    productOrders,
    loading,
    initialized,
    error,
    refetch: fetchProductOrders,
  };
};
