import { capitalizeFirstChar } from "@/utils";
import { UseFormRegisterReturn } from "react-hook-form";

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
}) => (
  <div className="space-y-1">
    <label className="block">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      {...register}
      value={value}
      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-green-600"
      onChange={onChange}
      required
      autoComplete="true"
    />
    <div className="mt-2">
      {error && <p className="text-red-500">{capitalizeFirstChar(error)}</p>}
    </div>
  </div>
);

export default InputField;
