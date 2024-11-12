import React from "react";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import useModalStore from "@/store/useModalStore";

const PaymentSuccess: React.FC = () => {
  const { closeModal, closeCheckoutModal, closePaymentSuccess } =
    useModalStore();

  const handleClose = () => {
    closePaymentSuccess();
    closeModal();
    closeCheckoutModal();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-white p-6 z-[100000]">
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
