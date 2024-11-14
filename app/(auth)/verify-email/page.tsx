"use client";
import OTPVerification from "@/components/auth/OtpVerification";
import useAuthStore from "@/store/useAuthStore";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const VerifyEmailPage = () => {
  const [token, setToken] = useState<string | null>(null);

  const user = useAuthStore((state) => state.user);
  const { logout } = useAuthStore();

  useEffect(() => {
    const retrievedToken = Cookies.get("token");

    if (retrievedToken) {
      setToken(retrievedToken);
    } else {
      redirect("/signin"); // Redirect after logging out
      logout(); // Logout first
    }
  }, [logout]);

  if (user?.isEmailVerified) {
    return (
      <div className="flex items-center justify-center h-full p-6">
        <h1 className="text-2xl font-bold text-green-600">
          Your email is already verified!
        </h1>
      </div>
    );
  }

  // Render OTPVerification only if the token is set
  return token ? (
    <OTPVerification verificationType="verifyEmail" token={token} />
  ) : null;
};

export default VerifyEmailPage;
