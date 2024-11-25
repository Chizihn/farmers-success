"use client";
import { capitalizeFirstChar } from "@/utils";
import { UseFormRegisterReturn } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react"; // Import Lucide icons
import { useState } from "react";

interface InputFieldProps {
  type: string;
  placeholder: string;
  register?: UseFormRegisterReturn;
  value?: string;
  label?: string;
  error?: string;
  onChange?: (e: any) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  register,
  value,
  label,
  error,
  onChange,
}) => {
  // State to toggle password visibility
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Toggle the visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="space-y-1">
      {label && <label className="block">{label}</label>}{" "}
      {/* Display label if present */}
      <div className="relative">
        <input
          type={isPasswordVisible && type === "password" ? "text" : type} // Toggle password visibility
          placeholder={placeholder}
          {...register}
          value={value}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-green-600"
          onChange={onChange}
          required
          autoComplete="true"
        />

        {/* Show/hide password icon */}
        {type === "password" && (
          <div
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {isPasswordVisible ? (
              <EyeOff size={20} color="#4A5568" />
            ) : (
              <Eye size={20} color="#4A5568" />
            )}
          </div>
        )}
      </div>
      {/* Display error message */}
      <div className="mt-2">
        {error && <p className="text-red-500">{capitalizeFirstChar(error)}</p>}
      </div>
    </div>
  );
};

export default InputField;
