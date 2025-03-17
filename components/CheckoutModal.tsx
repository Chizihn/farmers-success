import { ReactNode, useCallback, useEffect, useState } from "react";

interface CheckoutModalProps {
  isOpen: boolean;
  children: ReactNode;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, children }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  // Handle closing animation
  const handleClose = useCallback(() => {
    setIsClosing(true);
    setIsVisible(false);

    // Wait for animation to complete before actually closing
    setTimeout(() => {
      setIsClosing(false);
    }, 300); // Match this with your transition duration
  }, []);

  // Handle escape key press
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    if (isOpen) {
      setIsVisible(true);
      setIsClosing(false);
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [handleClose, isOpen]);

  // Don't render anything if the modal is not open and not in closing state
  if (!isOpen && !isClosing) return null;

  return (
    <>
      <div
        className={`fixed top-0 left-0 inset-0 z-[1000] flex items-center justify-end 
        bg-black/50 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`fixed top-0 right-0 z-[1000] max-h-screen h-full w-full 
           lg:max-w-[30rem] bg-white shadow-xl transform transition-all
           duration-300 flex flex-col overflow-auto ${
             isVisible
               ? "translate-x-0 opacity-100"
               : "translate-x-full opacity-0"
           }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="h-full w-full">
          {/* Content */}
          <div className="flex-1 overflow-auto pt-4 p-4">{children}</div>
        </div>
      </div>
    </>
  );
};

export default CheckoutModal;
