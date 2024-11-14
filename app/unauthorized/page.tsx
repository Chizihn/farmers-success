"use client";
import { useRouter } from "next/navigation";

const UnauthorizedPage = () => {
  const router = useRouter();
  const handleGoBack = () => {
    router.replace("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-red-600 mb-4">
        Unauthorized Access
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        You do not have permission to view this page.
      </p>
      <button
        onClick={handleGoBack}
        className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-300"
      >
        Return to home
      </button>
    </div>
  );
};

export default UnauthorizedPage;
