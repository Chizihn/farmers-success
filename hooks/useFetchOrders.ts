// import useOrderStore from "@/store/useOrderStore";
// import { useEffect } from "react";

// export const useFetchOrders = () => {
//   const { productOrders, loading, initialized, error, fetchProductOrders } =
//     useOrderStore();

//   useEffect(() => {
//     if (!initialized) {
//       fetchProductOrders();
//     }
//   }, [fetchProductOrders, initialized]);

//   return {
//     productOrders,
//     loading,
//     initialized,
//     error,
//     refetch: fetchProductOrders,
//   };
// };

import { useEffect } from "react";
import useOrderStore from "@/store/useOrderStore";

export const useFetchOrders = (orderId?: string) => {
  const {
    productOrders,
    singleOrder,
    loading,
    initialized,
    error,
    fetchProductOrders,
    fetchSingleOrder,
  } = useOrderStore();

  // Fetch all product orders if not initialized
  useEffect(() => {
    if (!initialized) {
      fetchProductOrders();
    }
  }, [fetchProductOrders, initialized]);

  // Fetch single order if orderId is provided
  useEffect(() => {
    if (orderId) {
      fetchSingleOrder(orderId).catch(console.error);
    }
  }, [fetchSingleOrder, orderId]);

  return {
    productOrders,
    singleOrder,
    loading,
    initialized,
    error,
    refetchAll: fetchProductOrders,
    refetchSingle: fetchSingleOrder,
  };
};
