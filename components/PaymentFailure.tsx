import React from "react";
import { XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const PaymentFailure: React.FC = () => {
  const router = useRouter();

  const handleClose = () => {
    router.push("/?checkout");
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-white z-[100000]">
      <XCircle className="text-red-500 w-16 h-16 mb-4" />
      <h2 className="text-2xl font-bold text-red-600 mb-2">Payment Failed</h2>
      <p className="text-gray-600 mb-4">
        There was an error processing your payment. Please try again.
      </p>
      <button
        onClick={handleClose}
        className="bg-red-600 text-white px-4 py-2 rounded-lg"
      >
        Back to Checkout
      </button>
    </div>
  );
};

export default PaymentFailure;
