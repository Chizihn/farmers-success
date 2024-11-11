import { useState } from "react";
import { OtpActivity } from "@/types/forms";
import useSecureStore from "@/store/useSecure";

export interface ResendOtpProps {
  activity: OtpActivity;
}

const ResendOtp: React.FC<ResendOtpProps> = ({ activity }) => {
  const { resendOTP, identifier } = useSecureStore();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleResend = async () => {
    setLoading(true);
    setMessage(null);

    try {
      await resendOTP(identifier, activity);
      setMessage("OTP resent successfully.");
      console.log("identifier from resent otp form", identifier);
      console.log("activity from resend otp form", activity);
    } catch (error) {
      console.error("Failed to resend OTP:", error);
      setMessage("Failed to resend OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex gap-1 items-center">
        <p className="text-center text-gray-600">Didn’t receive an OTP? </p>{" "}
        <button
          onClick={handleResend}
          disabled={loading}
          className="text-green-600 hover:text-green-700 transition duration-200"
        >
          {loading ? "Resending..." : "Resend OTP"}
        </button>{" "}
      </div>

      <br />
      {message && (
        <span className="text-center text-gray-600 mt-2">{message}</span>
      )}
    </>
  );
};

export default ResendOtp;
