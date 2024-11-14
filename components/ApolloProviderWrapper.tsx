"use client";

import { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "../lib/apolloClient";
import useCartStore from "@/store/useCartStore";
import useAuthStore from "@/store/useAuthStore";
// import LoadingState from "./Loading";

interface ApolloProviderWrapperProps {
  children: ReactNode;
}

const ApolloProviderWrapper = ({ children }: ApolloProviderWrapperProps) => {
  const { isAuthenticated } = useAuthStore();
  const { fetchCart } = useCartStore();

  if (isAuthenticated) {
    fetchCart();
  }
  // const { loading } = useAuthStore();
  // useProtectedRoute();
  // const { loading } = useProtectedRoute();
  // if (loading) return <LoadingState />;

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloProviderWrapper;
