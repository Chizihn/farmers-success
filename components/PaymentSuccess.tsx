import React from "react";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const PaymentSuccess: React.FC = () => {
  const router = useRouter();

  const handleClose = () => {
    router.push("/");
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-white z-[100000]">
      <CheckCircle className="text-green-500 w-16 h-16 mb-4" />
      <h2 className="text-2xl font-bold text-green-600 mb-2">
        Payment Successful!
      </h2>
      <p className="text-gray-600 mb-4">Thank you for your purchase.</p>
      <button
        onClick={handleClose}
        className="bg-green-600 text-white px-4 py-2 rounded-lg"
      >
        Close
      </button>
    </div>
  );
};

export default PaymentSuccess;
