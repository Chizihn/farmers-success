"use client";

import { ReactNode, useEffect } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "../lib/apolloClient";
// import Footer from "./Footer";

interface ApolloProviderWrapperProps {
  children: ReactNode;
}

const ApolloProviderWrapper = ({ children }: ApolloProviderWrapperProps) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloProviderWrapper;

{
  /* <div className="min-h-screen h-full flex flex-col justify-between">
        <div>{children}</div>
        <Footer />
      </div> */
}
