import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const CheckoutHeader = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-2xl font-bold text-green-600 text-left">Checkout</h1>{" "}
      <button onClick={() => router.replace("/")} className=" flex gap-1.5">
        <ChevronLeft />
        <span>Back</span>
      </button>
    </div>
  );
};

export default CheckoutHeader;
