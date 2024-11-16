"use client";
import OTPVerification from "@/components/auth/OtpVerification";
import LoadingState from "@/components/Loading";
import useAuthStore from "@/store/useAuthStore";
import Cookies from "js-cookie";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const VerifyEmailPage = () => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const user = useAuthStore((state) => state.user);

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

  const handleGoBack = () => {
    router.replace("/");
  };

  if (user?.isEmailVerified) {
    return (
      <section className="bg-white lg:bg-transparent min-h-screen h-full flex justify-center items-center">
        <div className="bg-white lg:shadow-xl lg:rounded-xl flex flex-col items-center justify-center h-full p-8 gap-4">
          <CheckCircle size={60} className="text-green-700" />
          <h1 className="text-2xl font-bold text-green-700 text-center">
            Your email has already been verified!
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

  // Render OTPVerification only if the token is set
  return token ? (
    <OTPVerification verificationType="verifyEmail" token={token} />
  ) : null;
};

export default VerifyEmailPage;
