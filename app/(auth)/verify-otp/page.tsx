"use client";
import OTPVerification from "@/components/auth/OtpVerification";
import useAuthStore from "@/store/useAuthStore";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const VerifyPhoneSignInOtpPage = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const retrievedToken = Cookies.get("token");

    if (retrievedToken) {
      setToken(retrievedToken);
    } else {
      redirect("/signin");
    }
  }, []);

  // Render OTPVerification only if the token is set
  return token ? (
    <OTPVerification verificationType="verifySignIn" token={token} />
  ) : null;
};

export default VerifyPhoneSignInOtpPage;
