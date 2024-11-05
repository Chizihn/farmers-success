// VerifyEmailPage.tsx

"use client";
import OTPVerification from "@/components/auth/OtpVerification";
import LoadingState from "@/components/Loading";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const VerifyPhoneOtpPage = () => {
  const [token, setToken] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const authToken = Cookies.get("token");
    if (authToken) {
      setToken(authToken);
      setLoading(false);
    }
  }, []);

  if (loading) return <LoadingState />;

  return token ? (
    <OTPVerification verificationType="verifySignIn" token={token} />
  ) : null;
};

export default VerifyPhoneOtpPage;
