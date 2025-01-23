"use client";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import CloseButton from "./ui/CloseButton";

interface PageModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

const PageModal: React.FC<PageModalProps> = ({ isOpen, children, onClose }) => {
  const pathname = usePathname();
  const isUpdateProfilePage =
    pathname === "/account/update-profile" || pathname.includes("/orders/");

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  // Handle closing animation
  const handleClose = useCallback(() => {
    setIsClosing(true);
    setIsVisible(false);
    onClose(); // Call the onClose prop to update parent state
  }, [onClose]);

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
        {!isUpdateProfilePage && (
          <div className="absolute top-4 right-4">
            <CloseButton onClick={handleClose} />
          </div>
        )}

        {/* Modal Body */}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default PageModal;
