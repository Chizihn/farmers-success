import { LoaderCircle } from "lucide-react";

const LoadingState = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <LoaderCircle className="animate-spin h-12 w-12 text-green-700" />
    </div>
  );
};

export default LoadingState;
