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
    <div
      className={`fixed top-0 left-0 inset-0 z-[1000] flex items-center justify-end 
        bg-black/50 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
    >
      <div
        className={`min-h-screen h-full overflow-y-auto relative w-full 
          lg:max-w-[30rem] bg-white shadow-xl my-4 transform transition-transform 
          duration-300 ${isVisible ? "translate-x-0" : "translate-x-full"}`}
        role="dialog"
        aria-modal="true"
      >
        {/* Content */}
        <div className="pt-4 p-4">{children}</div>
      </div>
    </div>
  );
};

export default CheckoutModal;
