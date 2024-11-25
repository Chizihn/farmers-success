"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "../Logo";
import useSecureStore from "@/store/useSecure";
import InputField from "../ui/InputField";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const router = useRouter();
  const { forgotPassword, loading, error } = useSecureStore();
  const [email, setEmail] = useState<string>("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please fill the required field.");
    }
    try {
      const success = await forgotPassword(email);
      if (success) {
        toast.success("OTP sent successfully.");
        router.push("/reset-password");
      }
    } catch (err) {
      console.error("Password reset failed:", err);
      toast.error("Password reset failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 lg:bg-gray-50">
      <div className="w-full lg:max-w-lg p-6 bg-white lg:shadow-md lg:rounded-lg md:w-[40rem] flex flex-col justify-center items-center gap-2">
        <h1 className="text-2xl font-bold text-green-700 mb-1 text-center">
          Forgot Your Password
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Enter your email to receive a 4-digit code to reset your password.
        </p>

        <div className="max-w-sm">
          <form onSubmit={onSubmit} className="space-y-4">
            <InputField
              type="email"
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              type="submit"
              className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition duration-200"
              disabled={loading}
            >
              {loading ? "Sending code..." : "Send code"}
            </button>
          </form>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <div className="mt-6">
            <p className="text-center text-gray-600">
              Remembered your password?{" "}
              <a
                href="/signin"
                className="text-green-600 hover:text-green-700 transition duration-200"
              >
                Sign in
              </a>
            </p>
          </div>

          <p className="mt-4 text-sm text-gray-500">
            By continuing, you agree to Farmersuccess’s{" "}
            <a
              href="#"
              className="text-green-600 underline hover:text-green-700"
            >
              Terms and Conditions
            </a>
            .
          </p>

          <p className="mt-4 text-sm text-gray-500">
            For further support, visit the Help Center or contact our customer
            service team.
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <Logo />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
