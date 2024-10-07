"use client";
import { useRouter } from "next/navigation";
import Logo from "./Logo";

const CreateAccount = () => {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg md:w-[40rem]">
        {/* Header */}
        <h1 className="text-2xl font-bold text-green-600 mb-4 text-center">
          Create Your Farmers Success Marketplace Account
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Please fill in the details below to create an account.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-600"
          />
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-600"
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-600"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-600"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200"
          >
            Create Account
          </button>
        </form>

        {/* Login Redirect */}
        <div className="mt-6">
          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <a
              href="#"
              className="text-green-600 hover:text-green-700 transition duration-200"
            >
              Log In
            </a>
          </p>
        </div>

        {/* Terms and Conditions */}
        <p className="mt-4 text-sm text-gray-500">
          By continuing, you agree to Farmersuccess’s{" "}
          <a href="#" className="text-green-600 underline hover:text-green-700">
            Terms and Conditions
          </a>
          .
        </p>

        {/* Help Section */}
        <p className="mt-4 text-sm text-gray-500">
          For further support, visit the Help Center or contact our customer
          service team.
        </p>

        {/* Logo */}
        <div className="mt-8 flex justify-center">
          <Logo />
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
