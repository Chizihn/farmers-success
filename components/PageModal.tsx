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
    <>
      <div
        className={`fixed top-0 left-0 inset-0 z-[1000] flex items-center justify-end 
              bg-black/50 transition-opacity duration-300 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
      />

      {/* Modal */}
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
          {/* Header - fixed height */}

          {!isUpdateProfilePage && (
            <div className="absolute top-4 right-4">
              <CloseButton onClick={handleClose} />
            </div>
          )}

          {/* Content - scrollable only when needed */}
          <div className="flex-1 overflow-auto p-4">{children}</div>
        </div>
      </div>
    </>
  );
};

export default PageModal;
