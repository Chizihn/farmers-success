"use client";
import { useEffect, useState } from "react";
import OTPVerification from "@/components/auth/OtpVerification";
import LoadingState from "@/components/Loading";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";
import { CheckCircle } from "lucide-react";
import { UserProfile } from "@/types";
import NoAccess from "@/components/NoAccess";

const VerifyPhoneSignInOtpPage = () => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const isPhoneVerified = useAuthStore((state) => state.isPhoneVerified);
  const method = useAuthStore((state) => state.method);

  useEffect(() => {
    if (!token) {
      router.replace("/signin");
    }
    setInitialized(true);
  }, [router, token]);

  const handleGoBack = () => {
    router.replace("/");
  };

  if (!token || !initialized) return <LoadingState />;

  if (method !== "phone-signin") {
    return <NoAccess onClick={handleGoBack} />;
  }

  if (isPhoneVerified) {
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

  return <OTPVerification verificationType="verifySignIn" token={token} />;
};

export default VerifyPhoneSignInOtpPage;
