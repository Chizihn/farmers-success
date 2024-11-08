"use client";
import ResetPassword from "@/components/auth/ResetPassword";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import LoadingState from "@/components/Loading";
import { redirect } from "next/navigation";

const ResetPasswordPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);
  const [identifier, setIdentifier] = useState<string | null>(null);

  useEffect(() => {
    const retrievedToken = Cookies.get("reset_token") as string | null;
    const retrievedIdentifier = Cookies.get("identifier") as string | null;
    if (retrievedToken && retrievedIdentifier) {
      setToken(retrievedToken);
      setIdentifier(retrievedIdentifier);
    }
    setLoading(false);
  }, []);

  if (loading) return <LoadingState />;
  if (!token || !identifier) return redirect("/signin");

  return <ResetPassword identifier={identifier} token={token} />;
};

export default ResetPasswordPage;
