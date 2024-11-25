"use client";
import OTPVerification from "@/components/auth/OtpVerification";
import LoadingState from "@/components/Loading";
import NoAccess from "@/components/NoAccess";
import useAuthStore from "@/store/useAuthStore";
import { UserProfile } from "@/types";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const VerifyEmailPage = () => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user) as UserProfile;
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

  if (method !== "email") {
    return <NoAccess onClick={handleGoBack} />;
  }

  if (user.isEmailVerified) {
    return (
      <section className="bg-white lg:bg-transparent min-h-screen flex justify-center items-center">
        <div className="bg-white lg:shadow-xl lg:rounded-xl flex flex-col items-center justify-center p-8 gap-4">
          <CheckCircle size={60} className="text-green-700" />
          <h1 className="text-2xl font-bold text-green-700 text-center">
            Your email has already been verified!
          </h1>
          <button
            onClick={handleGoBack}
            className="px-6 py-3 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 focus:outline-none focus:ring focus:ring-green-300"
          >
            Return to Home
          </button>
        </div>
      </section>
    );
  }

  return <OTPVerification verificationType="verifyEmail" token={token} />;
};

export default VerifyEmailPage;
