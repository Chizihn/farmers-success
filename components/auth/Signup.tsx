"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneInput from "react-phone-input-2";

import Logo from "../Logo";
import useAuthStore from "@/store/useAuthStore";
import {
  emailSignupSchema,
  phoneSignupSchema,
  EmailSignupFormType,
  PhoneSignupFormType,
} from "@/types/forms";
import InputField from "../ui/InputField";

const Signup = () => {
  const router = useRouter();
  const [signupMethod, setSignupMethod] = useState<"email" | "phone">("email");
  const { signUpWithEmail, signUpWithPhone, loading, error } = useAuthStore();
  const [phoneNumber, setPhoneNumber] = useState("");

  // Separate form handlers for email and phone
  const emailForm = useForm<EmailSignupFormType>({
    resolver: zodResolver(emailSignupSchema),
  });

  const phoneForm = useForm<PhoneSignupFormType>({
    resolver: zodResolver(phoneSignupSchema),
  });

  const onSubmit = async (data: EmailSignupFormType | PhoneSignupFormType) => {
    try {
      if (signupMethod === "email") {
        const { email, password } = data as EmailSignupFormType;
        await signUpWithEmail(email, password);
      } else {
        const countryCodeWithoutPlus = phoneNumber
          ?.replace("+", "")
          .slice(0, 2);
        const localNumber = phoneNumber?.slice(3);
        const formattedPhoneNumber = countryCodeWithoutPlus + localNumber;

        await signUpWithPhone(formattedPhoneNumber);
      }
      router.push("/");
    } catch (err) {
      console.error("Signup failed:", error);
    }
  };

  const handleSignupMethodChange = (method: "email" | "phone") => {
    setSignupMethod(method);
    emailForm.reset();
    phoneForm.reset();
  };

  return (
    <div className="flex items-center justify-center w-full h-screen lg:bg-gray-50">
      <div className="w-full lg:max-w-lg p-6 bg-white lg:shadow-md lg:rounded-lg md:w-[40rem] flex flex-col justify-center items-center gap-2">
        <div>
          <h1 className="text-2xl font-bold text-green-600 mb-2 text-center">
            Create Your Farmers Success Marketplace Account
          </h1>
          <p className="text-gray-600 mb-4 text-center">
            Please fill in the details below to create an account.
          </p>
        </div>

        <div className="flex justify-center mb-4">
          <button
            type="button"
            className={`px-4 py-2 rounded-l-md ${
              signupMethod === "email"
                ? "bg-green-600 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => handleSignupMethodChange("email")}
          >
            Sign up with email
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-r-md ${
              signupMethod === "phone"
                ? "bg-green-600 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => handleSignupMethodChange("phone")}
          >
            Sign up with phone
          </button>
        </div>

        <div className="max-w-sm">
          {signupMethod === "email" ? (
            <form
              onSubmit={emailForm.handleSubmit(onSubmit)}
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
                error={emailForm.formState.errors.email?.message}
              />

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200"
                disabled={loading}
              >
                {loading ? "Signing up..." : "Continue"}
              </button>
            </form>
          ) : (
            <form
              onSubmit={phoneForm.handleSubmit(onSubmit)}
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
              {phoneForm.formState.errors.phoneNumber && (
                <p className="text-red-500">
                  {phoneForm.formState.errors.phoneNumber.message}
                </p>
              )}
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200"
                disabled={loading}
              >
                {loading ? "Signing up..." : "Continue"}
              </button>
            </form>
          )}

          {error && <p className="text-red-500 text-center">{error}</p>}

          <div className="mt-6">
            <p className="text-center text-gray-600">
              Already have an account?{" "}
              <a
                href="/signin"
                className="text-green-600 hover:text-green-700 transition duration-200"
              >
                Sign in
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
            . {` `}
            For further support, visit the Help Center or contact our customer
            service team.
          </p>
        </div>

        <div className="mt-4 flex justify-center">
          <Logo />
        </div>
      </div>
    </div>
  );
};

export default Signup;
