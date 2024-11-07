import React, { useState } from "react";

import { OtpActivity } from "@/types/forms";
import useAuthStore from "@/store/useAuthStore";

interface ResendOtpProps {
  identifier: string;
  activity: OtpActivity;
}

const ResendOtp: React.FC<ResendOtpProps> = ({ identifier, activity }) => {
  const { resendOTP } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleResend = async () => {
    setLoading(true);
    setMessage(null);

    try {
      await resendOTP(identifier, activity);
      setMessage("OTP resent successfully.");
    } catch (error) {
      console.error("Failed to resend OTP:", error);
      setMessage("Failed to resend OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleResend}
        disabled={loading}
        className="text-green-600 hover:text-green-700 transition duration-200"
      >
        {loading ? "Resending..." : "Resend OTP"}
      </button>{" "}
      <br />
      {message && (
        <span className="text-center text-gray-600 mt-2">{message}</span>
      )}
    </>
  );
};

export default ResendOtp;
