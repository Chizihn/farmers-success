"use client";

import { ReactNode } from "react";
import useProtectedRoute from "@/hooks/useProtectedRoute";
// import LoadingState from "./Loading";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  useProtectedRoute();
  // const { loading } = useProtectedRoute();
  // if (loading) return <LoadingState />;

  return <>{children}</>;
};

export default ProtectedRoute;
