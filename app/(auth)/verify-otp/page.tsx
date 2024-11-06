"use client";
import OTPVerification from "@/components/auth/OtpVerification";
import LoadingState from "@/components/Loading";
import useAuthStore from "@/store/useAuthStore";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const VerifyPhoneSignInOtpPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return <LoadingState />;
  if (!token) return redirect("/signin");
  console.log(token);

  return <OTPVerification verificationType="verifySignIn" token={token} />;
};

export default VerifyPhoneSignInOtpPage;
