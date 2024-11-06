"use client";
import OTPVerification from "@/components/auth/OtpVerification";
import LoadingState from "@/components/Loading";
import useAuthStore from "@/store/useAuthStore";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const VerifyPhoneOtpPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return <LoadingState />;
  if (!token) return redirect("/signin");

  return <OTPVerification verificationType="verifyPhone" token={token} />;
};

export default VerifyPhoneOtpPage;
