import { ReactNode, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = ""; // Restore scrolling
    }

    return () => {
      document.body.style.overflow = ""; // Clean up on unmount
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-[9999]"></div>

      <div className="bg-white w-full lg:w-[30rem] h-screen border-l-[3px] border-gray-300 fixed top-0 right-0  z-[10000] p-3 transition-all duration-300 ease-in-out ">
        {children}
      </div>
    </>
  );
};

export default Modal;
