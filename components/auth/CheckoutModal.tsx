import { ReactNode } from "react";

interface CheckoutModalProps {
  isOpen: boolean;
  children: ReactNode;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-0 z-[9999]"></div>

      <div className="bg-white w-full lg:w-[30rem] h-screen fixed top-0 right-0  z-[10000] p-3">
        {children}
      </div>
    </>
  );
};

export default CheckoutModal;
