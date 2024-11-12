"use client";
import OTPVerification from "@/components/auth/OtpVerification";

import useAuthStore from "@/store/useAuthStore";

const VerifyPhoneSignInOtpPage = () => {
  const token = useAuthStore((state) => state.token);

  return (
    <OTPVerification verificationType="verifySignIn" token={token as string} />
  );
};

export default VerifyPhoneSignInOtpPage;
