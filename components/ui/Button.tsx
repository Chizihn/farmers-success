import { LoaderCircle } from "lucide-react";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  style?: React.CSSProperties;
  variant?: "primary" | "secondary" | "gray" | "homepage" | "danger";
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  loading = false,
  className = "",
  style = {},
  variant = "primary",
  ...props
}) => {
  const variantClasses = {
    primary: "bg-[#15803d] hover:bg-[#166534] text-white",
    secondary: "bg-[#FF6F61] text-white",
    gray: "bg-gray-200 hover:bg-gray-300 text-black ",
    homepage: "bg-[#eab308] hover:bg-[#d8a200] text-black",
    danger: "bg-red-600 hover:bg-red-700 text-white ",
  };

  return (
    <button
      type={type}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      className={`${disabled ? "opacity-50 cursor-not-allowed" : ""} ${
        variantClasses[variant]
      }  flex-1 lg:flex-none shadow-sm flex gap-1.5 items-center justify-center py-2 text-md rounded-md transition-colors duration-300 font-semibold ${className} `}
      style={style}
      {...props}
    >
      {loading ? (
        <LoaderCircle className="animate-spin h-5 w-5 text-white" />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
