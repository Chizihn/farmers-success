"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "../Logo";
import useAuthStore from "@/store/useAuthStore";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import InputField from "../ui/InputField";
import toast from "react-hot-toast";
import { capitalizeFirstChar } from "@/utils";
import useCartStore from "@/store/useCartStore";
import Link from "next/link";
import Button from "../ui/Button";
import { Loader } from "../Loader";
import LoadingState from "../Loading";

const Signin = () => {
  const router = useRouter();
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  const { signInWithEmail, signInWithPhone, loading, error, setError } =
    useAuthStore();

  const cartStore = useCartStore.getState();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const loginError = capitalizeFirstChar(error);
  let pageLoading = false;

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all required fields.");
    }
    const success = await signInWithEmail(email, password);
    if (success) {
      pageLoading = true;
      toast.success("Signed in!");
      await cartStore.mergeGuestCart();
      router.push("/");
    } else {
      toast.error(loginError || "Invalid credentials");
    }
  };

  const handlePhoneSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    const formattedPhoneNumber = phoneNumber;
    if (!formattedPhoneNumber) {
      toast.error("Please fill in the required field.");
    }
    const success = await signInWithPhone(formattedPhoneNumber);
    console.log(formattedPhoneNumber);

    if (success) {
      pageLoading = true;
      toast.success("Signed in!");
      await cartStore.mergeGuestCart();
      router.push("/verify-otp");
    } else {
      toast.error(loginError || "Invalid phone number");
    }
  };

  const handleLoginMethodChange = (method: "email" | "phone") => {
    setLoginMethod(method);
    setEmail("");
    setPassword("");
    setPhoneNumber("");
    setError(null);
  };

  if (pageLoading) return <LoadingState />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 lg:bg-gray-50">
      <div className="w-full h-full lg:max-w-xl p-6 bg-white lg:shadow-md lg:rounded-lg md:w-[40rem] flex flex-col justify-center items-center gap-2">
        <h1 className="text-2xl font-bold text-green-700 text-center">
          Welcome To Farmer Success Marketplace
        </h1>
        <p className="text-gray-600 mb-3 text-center">
          You can sign in to access your account with your email address or
          phone number.
        </p>

        <div className="flex justify-center mb-4">
          <button
            type="button"
            className={`px-4 py-2 rounded-l-md ${
              loginMethod === "email"
                ? "bg-green-700 text-white"
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
                ? "bg-green-700 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => handleLoginMethodChange("phone")}
          >
            Phone Number
          </button>
        </div>

        <div className="max-w-sm">
          {loginMethod === "email" ? (
            <form onSubmit={handleEmailSignIn} className="space-y-4">
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
              <div className="mt-3">
                <Link
                  href="/forgot-password"
                  className="text-green-600 hover:text-green-700 transition duration-200"
                >
                  Forgot Password?
                </Link>
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={loading}
                loading={loading}
              >
                Sign in
              </Button>
            </form>
          ) : (
            <form onSubmit={handlePhoneSignIn} className="space-y-4">
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
              {"Don't"} have an account?{" "}
              <Link
                href="/signup"
                className="text-green-600 hover:text-green-700 transition duration-200"
              >
                Sign up
              </Link>
            </p>
          </div>

          <p className="mt-4 text-sm text-gray-500">
            By continuing, you agree to Farmersuccess{`'`}s{" "}
            <a
              href="https://farmersuccess.com/terms-of-use"
              target="_blank"
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
