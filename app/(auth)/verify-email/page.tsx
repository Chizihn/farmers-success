"use client";
import OTPVerification from "@/components/auth/OtpVerification";
import LoadingState from "@/components/Loading";
import useAuthStore from "@/store/useAuthStore";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const VerifyEmailPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const token = useAuthStore((state) => state.token); // Get the token directly from Zustand store
  const [identifier, setIdentifier] = useState<string>("");

  useEffect(() => {
    const retrievedIdentifier = Cookies.get("identifier");
    setIdentifier(retrievedIdentifier as string);
    setLoading(false);
  }, []);

  if (loading) return <LoadingState />;
  if (!token) return redirect("/signin"); // Redirect if no token is found

  return (
    <OTPVerification
      verificationType="verifyEmail"
      identifier={identifier}
      token={token}
    />
  );
};

export default VerifyEmailPage;
