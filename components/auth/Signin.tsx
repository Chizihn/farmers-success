"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Logo from "../Logo";
import useAuthStore from "@/store/useAuthStore";
import {
  emailSigninSchema,
  phoneSigninSchema,
  EmailSigninFormType,
  PhoneSigninFormType,
} from "@/types/forms";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import InputField from "../ui/InputField";

const Signin = () => {
  const router = useRouter();
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  const { signInWithEmail, signInWithPhone, loading, error } = useAuthStore();

  const emailForm = useForm<EmailSigninFormType>({
    resolver: zodResolver(emailSigninSchema),
  });
  const phoneForm = useForm<PhoneSigninFormType>({
    resolver: zodResolver(phoneSigninSchema),
  });

  const handleEmailSignIn = async (data: EmailSigninFormType) => {
    try {
      const { email, password } = data;
      await signInWithEmail(email, password);
      router.push("/");
    } catch (err) {
      console.error("Email signin failed:", err);
    }
  };

  const handlePhoneSignIn = async (data: PhoneSigninFormType) => {
    try {
      const { phoneNumber } = data;
      console.log("inputted phone", phoneNumber);

      // Extract country code and local number
      const countryCodeWithoutPlus = phoneNumber.slice(0, 3); // Assuming it's "+234"
      const localNumber = phoneNumber.slice(3); // Get the local number

      const formattedPhoneNumber = countryCodeWithoutPlus + localNumber;

      await signInWithPhone(formattedPhoneNumber);
      console.log("sent number", formattedPhoneNumber);

      router.push("/verify-otp");
    } catch (err) {
      console.error("Phone signin failed:", err);
    }
  };

  const handleLoginMethodChange = (method: "email" | "phone") => {
    setLoginMethod(method);
    emailForm.reset();
    phoneForm.reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 lg:bg-gray-50">
      <div className="w-full h-full lg:max-w-lg p-6 bg-white lg:shadow-md lg:rounded-lg md:w-[40rem] flex flex-col justify-center items-center gap-2">
        <h1 className="text-2xl font-bold text-green-600 text-center">
          Welcome Back
        </h1>
        <p className="text-gray-600 mb-3 text-center">
          Sign in to access your Farmersuccess Marketplace account with your
          email address or phone number.
        </p>

        <div className="flex justify-center mb-4">
          <button
            type="button"
            className={`px-4 py-2 rounded-l-md ${
              loginMethod === "email"
                ? "bg-green-600 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => handleLoginMethodChange("email")}
          >
            Email Address
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-r-md ${
              loginMethod === "phone"
                ? "bg-green-600 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => handleLoginMethodChange("phone")}
          >
            Phone Number
          </button>
        </div>

        <div className="max-w-sm">
          {loginMethod === "email" ? (
            <form
              onSubmit={emailForm.handleSubmit(handleEmailSignIn)}
              className="space-y-4"
            >
              <InputField
                type="email"
                label="Email"
                placeholder="Enter your email"
                register={emailForm.register("email")}
                error={emailForm.formState.errors.email?.message}
              />

              <InputField
                type="password"
                label="Password"
                placeholder="Enter your password"
                register={emailForm.register("password")}
                error={emailForm.formState.errors.password?.message}
              />

              <div className="mt-3">
                <a
                  href="/forgot-password"
                  className="text-green-600 hover:text-green-700 transition duration-200"
                >
                  Forgot Password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>
          ) : (
            <form
              onSubmit={phoneForm.handleSubmit(handlePhoneSignIn)}
              className="space-y-4"
            >
              <PhoneInput
                country={"ng"}
                onChange={(value) => phoneForm.setValue("phoneNumber", value)}
                inputStyle={{
                  width: "100%",
                  padding: "1.5rem 4rem",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  transition: "border-color 0.2s",
                }}
                containerStyle={{
                  marginBottom: "10px",
                }}
                buttonStyle={{
                  borderRadius: "4px 0 0 4px",
                }}
              />

              <div className="mt-3">
                <a
                  href="/forgot-password"
                  className="text-green-600 hover:text-green-700 transition duration-200"
                >
                  Forgot Password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>
          )}

          {error && <p className="text-red-500 text-center">{error}</p>}

          <div className="mt-6">
            <p className="text-center text-gray-600">
              {"Don't"} have an account?{" "}
              <a
                href="/signup"
                className="text-green-600 hover:text-green-700 transition duration-200"
              >
                Sign up
              </a>
            </p>
          </div>

          <p className="mt-4 text-sm text-gray-500">
            By continuing, you agree to Farmersuccess{`'`}s{" "}
            <a
              href="#"
              className="text-green-600 underline hover:text-green-700"
            >
              Terms and Conditions
            </a>
            . {` `} For further support, visit the Help Center or contact our
            customer service team.
          </p>
        </div>

        <div className="mt-4 flex justify-center">
          <Logo />
        </div>
      </div>
    </div>
  );
};

export default Signin;
