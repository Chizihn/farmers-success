import { ReactNode, useEffect } from "react";

interface CheckoutModalProps {
  isOpen: boolean;
  children: ReactNode;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-[9999]"></div>

      <div className="bg-white w-full lg:w-[30rem] max-h-screen fixed top-0 right-0  z-[10000] overflow-y-auto">
        <div className="h-full w-full p-5 ">{children}</div>
      </div>
    </>
  );
};

export default CheckoutModal;
