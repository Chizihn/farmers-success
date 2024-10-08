import { ChevronLeft, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

interface RouteModalProps {
  isOpen: boolean;
  onClose?: () => void;
  closeCheckout?: () => void;
  children: React.ReactNode;
}

const RouteModal: React.FC<RouteModalProps> = ({
  isOpen,
  onClose,
  closeCheckout,
  children,
}) => {
  const searchParams = useSearchParams();
  const isPageCheckout = searchParams.get("checkout") === "";

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="fixed top-0 right-0 bg-white rounded-lg shadow-lg overflow-hidden w-full md:w-[28rem] xl:w-[30rem] h-full">
        {children}
        {isPageCheckout ? (
          <button
            onClick={closeCheckout}
            className="absolute top-7 right-8 text-xl flex gap-1 items-center text-green-700"
          >
            <ChevronLeft size={30} /> <p>Back</p>
          </button>
        ) : (
          <button
            onClick={onClose}
            className="absolute top-5 right-4 text-black text-xl"
          >
            <X size={30} />
          </button>
        )}
      </div>
    </div>
  );
};

export default RouteModal;
