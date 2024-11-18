"use client";
import { useEffect, useState } from "react";
import OTPVerification from "@/components/auth/OtpVerification";
import LoadingState from "@/components/Loading";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";
import { CheckCircle } from "lucide-react";

const VerifyPhoneSignInOtpPage = () => {
  const router = useRouter();
  const { user, phoneVerified } = useAuthStore();
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

  const handleGoBack = () => {
    router.replace("/");
  };

  if (isLoading) return <LoadingState />;

  if (user?.isPhoneVerified && phoneVerified) {
    return (
      <section className="bg-white lg:bg-transparent min-h-screen h-full flex justify-center items-center">
        <div className="bg-white lg:shadow-xl lg:rounded-xl flex flex-col items-center justify-center h-full p-8 gap-4">
          <CheckCircle size={60} className="text-green-700" />
          <h1 className="text-2xl font-bold text-green-700 text-center">
            Your Login has already been verified!
          </h1>
          <button
            onClick={handleGoBack}
            className="px-6 py-3 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 focus:outline-none focus:ring focus:ring-green-300"
          >
            Return to home
          </button>
        </div>
      </section>
    );
  }

  return token ? (
    <OTPVerification verificationType="verifySignIn" token={token} />
  ) : null;
};

export default VerifyPhoneSignInOtpPage;
