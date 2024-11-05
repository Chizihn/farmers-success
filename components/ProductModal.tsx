import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-[9999]"></div>

      <div className="bg-white w-full lg:w-[25rem] h-screen fixed top-0 right-0  z-[10000] p-3">
        {children}
      </div>
    </>
  );
};

export default Modal;
