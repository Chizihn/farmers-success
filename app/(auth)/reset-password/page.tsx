"use client";
import ResetPassword from "@/components/auth/ResetPassword";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import LoadingState from "@/components/Loading";
import { redirect } from "next/navigation";
import useSecureStore from "@/store/useSecure";

const ResetPasswordPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);
  const { identifier } = useSecureStore();

  useEffect(() => {
    const retrievedToken = Cookies.get("reset_token") as string | null;
    console.log("identifier from reset", identifier);

    if (retrievedToken) {
      setToken(retrievedToken);
      setLoading(false);
    }
  }, [identifier]);

  if (loading) return <LoadingState />;
  if (!token || !identifier) return redirect("/unauthorized");

  return <ResetPassword token={token} />;
};

export default ResetPasswordPage;
