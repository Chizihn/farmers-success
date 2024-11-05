// VerifyEmailPage.tsx

"use client";
import OTPVerification from "@/components/auth/OtpVerification";
import LoadingState from "@/components/Loading";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import useAuthStore from "@/store/useAuthStore";

const VerifyPhonePage = () => {
  const token = useAuthStore((state) => state.token);
  const loading = useProtectedRoute();

  if (loading) return <LoadingState />;

  return token ? (
    <OTPVerification verificationType="verifyPhone" token={token} />
  ) : null;
};

export default VerifyPhonePage;
