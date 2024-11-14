"use client";
import { useEffect, useState } from "react";
import OTPVerification from "@/components/auth/OtpVerification";
import LoadingState from "@/components/Loading";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const VerifyPhoneSignInOtpPage = () => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const retrievedToken = Cookies.get("token");
    if (retrievedToken) {
      setToken(retrievedToken);
      setIsLoading(false);
    } else {
      router.replace("/signin");
    }
  }, [router]);
  if (isLoading) return <LoadingState />;

  // Render OTPVerification only if the token is set
  return token ? (
    <OTPVerification verificationType="verifySignIn" token={token} />
  ) : null;
};

export default VerifyPhoneSignInOtpPage;
