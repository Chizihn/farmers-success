"use client";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import React from "react";
import LoadingState from "@/components/Loading";
import Account from "@/components/Account";

const AccountPage = () => {
  const { loading, initialized } = useProtectedRoute();

  if (loading || !initialized) return <LoadingState />;

  // Only render the page content if routes are initialized
  return <Account />;
};

export default AccountPage;
