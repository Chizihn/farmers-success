"use client";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

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
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-md hover:bg-gray-100"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        )}

        {/* Modal Body */}
        <div className="flex-1">{children}</div>
      </div>
    </>
  );
};

export default PageModal;
