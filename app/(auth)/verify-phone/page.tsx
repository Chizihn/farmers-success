"use client";
import OTPVerification from "@/components/auth/OtpVerification";
import useAuthStore from "@/store/useAuthStore";

const VerifyPhoneOtpPage = () => {
  const { token, user } = useAuthStore((state) => ({
    token: state.token,
    user: state.user,
  }));

  if (user?.isPhoneVerified) {
    return (
      <div className="flex items-center justify-center h-full p-6">
        <h1 className="text-2xl font-bold text-green-600">
          Your phone number is already verified!
        </h1>
      </div>
    );
  }

  return (
    <OTPVerification verificationType="verifyPhone" token={token as string} />
  );
};

export default VerifyPhoneOtpPage;
