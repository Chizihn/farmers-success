"use client";

import { ReactNode, Suspense, useCallback, useEffect } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "../lib/apolloClient";
import useAuthStore from "@/store/useAuthStore";
import useCartStore from "@/store/useCartStore";
import { Loader } from "./Loader";

interface ApolloProviderWrapperProps {
  children: ReactNode;
}

const ApolloProviderWrapper = ({ children }: ApolloProviderWrapperProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { fetchCart } = useCartStore();
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
    console.log("function ran");
    fetchCartForAuthUser();
  }, [fetchCart, fetchCartForAuthUser, isAuthenticated]);

  return (
    <ApolloProvider client={client}>
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </ApolloProvider>
  );
};

export default ApolloProviderWrapper;

{
}
