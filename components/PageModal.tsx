"use client";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
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
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

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

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" />

      {/* Modal Container */}
      <div
        className="fixed top-0 right-0 w-full max-h-screen h-full lg:w-[32rem] bg-white shadow-xl z-50 flex flex-col overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        {isUpdateProfilePage ? null : (
          <div className="absolute top-4 right-4">
            <CloseButton onClick={onClose} />
          </div>
        )}

        {/* Modal Body */}
        <div className="flex-1">{children}</div>
      </div>
    </>
  );
};

export default PageModal;
