"use client";

import { ReactNode, useEffect } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "../lib/apolloClient";
import useProtectedRoute from "@/hooks/useProtectedRoute";

interface ApolloProviderWrapperProps {
  children: ReactNode;
}

const ApolloProviderWrapper = ({ children }: ApolloProviderWrapperProps) => {
  useProtectedRoute();

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloProviderWrapper;
