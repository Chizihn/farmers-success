import useModalStore from "@/store/useModalStore";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const CheckoutHeader = () => {
  const { closeCheckoutModal, openModal } = useModalStore();
  const handleModals = () => {
    closeCheckoutModal();
    openModal();
  };
  return (
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-2xl font-bold text-green-700 text-left">Checkout</h1>{" "}
      <button onClick={handleModals} className=" flex gap-1.5">
        <ChevronLeft />
        <span>Back</span>
      </button>
    </div>
  );
};

export default CheckoutHeader;
