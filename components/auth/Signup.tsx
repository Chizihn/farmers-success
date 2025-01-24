"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Logo from "../Logo";
import useAuthStore from "@/store/useAuthStore";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import InputField from "../ui/InputField";
import toast from "react-hot-toast";
import { capitalizeFirstChar } from "@/utils";
import useCartStore from "@/store/useCartStore";
import Button from "../ui/Button";
import Link from "next/link";

const Signup = () => {
  const router = useRouter();
  const [signupMethod, setSignupMethod] = useState<"email" | "phone">("email");
  const { signUpWithEmail, signUpWithPhone, loading, error, setError } =
    useAuthStore();

  const cartStore = useCartStore.getState();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await signUpWithEmail(email, password);
    if (success) {
      toast.success("Account created!");
      await cartStore.mergeGuestCart();
      router.push("/verify-email");
    } else {
      toast.error(error as string);
    }
  };

  const handlePhoneSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const formattedPhoneNumber = phoneNumber.replace(/^\+/, "");
    const success = await signUpWithPhone(formattedPhoneNumber);
    if (success) {
      toast.success("Account created!");
      await cartStore.mergeGuestCart();
      router.push("/verify-phone");
    } else {
      toast.error(error as string);
    }
  };

  const handleSignupMethodChange = (method: "email" | "phone") => {
    setSignupMethod(method);
    setEmail("");
    setPassword("");
    setPhoneNumber("");
    setError(null); // Reset error when switching methods
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 lg:bg-gray-50">
      <div className="w-full h-full lg:max-w-xl p-6 bg-white lg:shadow-md lg:rounded-lg md:w-[40rem] flex flex-col justify-center items-center gap-2">
        <h1 className="text-2xl font-bold text-green-700 text-center">
          Create Your Farmers Success Marketplace Account
        </h1>
        <p className="text-gray-600 mb-3 text-center">
          Sign up with either email or phone to create an account.
        </p>

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
            Email Address
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
            Phone Number
          </button>
        </div>

        <div className="max-w-sm">
          {signupMethod === "email" ? (
            <form onSubmit={handleEmailSignUp} className="space-y-4">
              <InputField
                type="email"
                label="Email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputField
                type="password"
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={loading}
                loading={loading}
              >
                Continue
              </Button>
            </form>
          ) : (
            <form onSubmit={handlePhoneSignUp} className="space-y-4">
              <PhoneInput
                country={"ng"}
                value={phoneNumber}
                onChange={(value) => setPhoneNumber(value)}
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

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
                loading={loading}
              >
                Continue
              </Button>
            </form>
          )}

          <div className="mt-6">
            <p className="text-center text-gray-600">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="text-green-600 hover:text-green-700 transition duration-200"
              >
                Sign in
              </Link>
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
            . For further support, visit the Help Center or contact our customer
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
