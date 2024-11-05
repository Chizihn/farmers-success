"use client";
import ResetPassword from "@/components/auth/ResetPassword";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import LoadingState from "@/components/Loading";
import { redirect } from "next/navigation";

const ResetPasswordPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const retrievedToken = Cookies.get("reset_token") as string | null;
    if (retrievedToken) {
      setToken(retrievedToken);
    }
    setLoading(false);
  }, []);

  if (loading) return <LoadingState />;
  if (!token) return redirect("/signin");

  return <ResetPassword token={token} />;
};

export default ResetPasswordPage;
