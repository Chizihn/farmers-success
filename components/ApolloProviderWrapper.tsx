"use client";

import { ReactNode, Suspense, useCallback, useEffect } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "../lib/apolloClient";
import useAuthStore from "@/store/useAuthStore";
import useCartStore from "@/store/useCartStore";
import useProductStore from "@/store/useProductStore";
import LoadingState from "./Loading";

interface ApolloProviderWrapperProps {
  children: ReactNode;
}

const ApolloProviderWrapper = ({ children }: ApolloProviderWrapperProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { fetchCart } = useCartStore();
  const { initialized, fetchProducts } = useProductStore();
  const fetchAllProducts = useCallback(async () => {
    try {
      if (!initialized) {
        await fetchProducts();
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, [fetchProducts, initialized]);
  const fetchCartForAuthUser = useCallback(async () => {
    try {
      if (isAuthenticated) {
        await fetchCart();
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }, [fetchCart, isAuthenticated]);

  useEffect(() => {
    fetchAllProducts();
    fetchCartForAuthUser();
    console.log("function ran");
  }, [
    fetchAllProducts,
    fetchCart,
    fetchCartForAuthUser,
    fetchProducts,
    isAuthenticated,
  ]);

  return (
    <ApolloProvider client={client}>
      <Suspense fallback={<LoadingState />}>{children}</Suspense>
    </ApolloProvider>
  );
};

export default ApolloProviderWrapper;

{
}
