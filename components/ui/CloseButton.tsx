import { X } from "lucide-react";
import React from "react";

interface CloseButtonProps {
  onClick: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => {
  return (
    <button
      className="h-8 w-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-500  transition-all duration-200 ease-in-out"
      onClick={onClick}
      aria-label="Close"
    >
      <X size={24} />
    </button>
  );
};

export default CloseButton;
