"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, ForgotPasswordFormType } from "@/types/forms";

import Logo from "../Logo";
import useSecureStore from "@/store/useSecure";

const ForgotPassword = () => {
  const router = useRouter();
  const { forgotPassword, loading, error } = useSecureStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormType>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormType) => {
    try {
      await forgotPassword(data.email);
      router.push("/reset-password");
      console.log("OTP sent");
    } catch (err) {
      console.error("Password reset failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen lg:bg-gray-50">
      <div className="w-full lg:max-w-lg p-6 bg-white lg:shadow-md lg:rounded-lg md:w-[40rem] flex flex-col justify-center items-center gap-2">
        <div>
          <h1 className="text-2xl font-bold text-green-600 mb-4 text-center">
            Reset Your Password
          </h1>
          <p className="text-gray-600 mb-6 text-center">
            Enter your email to receive a password reset link.
          </p>
        </div>

        <div className="max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-600"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200"
              disabled={loading}
            >
              {loading ? "Sending reset code..." : "Send Reset code"}
            </button>
            {error && <p className="text-red-500 text-center">{error}</p>}
          </form>

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
