import { capitalizeFirstChar } from "@/utils";

const OrderStatus: React.FC<{ status: string }> = ({ status }) => {
  // const statusColors = {
  //   completed: "bg-green-50 text-green-700 border-green-200",
  //   pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
  //   canceled: "bg-red-50 text-red-700 border-red-200",
  // };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium border $`}>
      {capitalizeFirstChar(status)}
    </span>
  );
};

export default OrderStatus;
