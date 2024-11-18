import { useState } from "react";
import { OtpActivity } from "@/types/forms";
import useSecureStore from "@/store/useSecure";
import toast from "react-hot-toast";

export interface ResendOtpProps {
  activity: OtpActivity;
}

const ResendOtp: React.FC<ResendOtpProps> = ({ activity }) => {
  const { resendOTP, identifier, loading, error } = useSecureStore();
  const [message, setMessage] = useState<string | null>(null);

  const handleResend = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setMessage(null);

    const success = await resendOTP(identifier as string, activity);
    if (success) {
      toast.success("OTP code resent successfully.");
    } else {
      toast.error(error);
    }
  };

  return (
    <>
      <div className="flex gap-1 items-center">
        <p className="text-center text-gray-600">Didn’t receive the code? </p>{" "}
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
