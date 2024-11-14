"use client";
import OTPVerification from "@/components/auth/OtpVerification";
import useAuthStore from "@/store/useAuthStore";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const VerifyPhoneOtpPage = () => {
  const [token, setToken] = useState<string | null>(null);

  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const retrievedToken = Cookies.get("token");

    if (retrievedToken) {
      setToken(retrievedToken);
    } else {
      redirect("/signin");
    }
  }, []);

  if (user?.isPhoneVerified) {
    return (
      <div className="flex items-center justify-center h-full p-6">
        <h1 className="text-2xl font-bold text-green-600">
          Your phone number is already verified!
        </h1>
      </div>
    );
  }

  return token ? (
    <OTPVerification verificationType="verifyPhone" token={token} />
  ) : null;
};

export default VerifyPhoneOtpPage;
