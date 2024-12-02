import { ArrowLeft, Package } from "lucide-react";

import React from "react";

const OrderErrorState: React.FC<{ message: string; onBack: () => void }> = ({
  message,
  onBack,
}) => (
  <div className="flex flex-col items-center justify-center min-h-screen p-4">
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
        <Package className="w-8 h-8 text-red-600" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        Error Loading Order
      </h3>
      <p className="text-gray-500 mb-4">{message}</p>
      <button
        onClick={onBack}
        className="inline-flex items-center text-sm font-medium text-green-700 hover:text-green-800"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Orders
      </button>
    </div>
  </div>
);

export default OrderErrorState;
