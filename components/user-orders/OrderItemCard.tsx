import { OrderItem } from "@/types/order";
import { capitalizeFirstChar } from "@/utils";
import Image from "next/image";
import React from "react";

const OrderItemCard: React.FC<{ item: OrderItem }> = ({ item }) => (
  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
    <div className="relative w-20 h-20 flex-shrink-0">
      <Image
        src={item.product.images[0] || "/placeholder.png"}
        alt={item.product.name}
        fill
        className="object-cover rounded-lg"
      />
    </div>
    <div className="flex-grow">
      <h3 className="font-medium text-gray-900">
        {capitalizeFirstChar(item.product.name)}
      </h3>
      <div className="mt-1 text-sm text-gray-500">
        <span>Quantity: {item.quantity}</span>
        <span className="mx-2">•</span>
        <span>Price: N{item.price.toFixed(2)}</span>
      </div>
    </div>
    <div className="text-right">
      <p className="font-medium text-gray-900">
        N{(item.price * item.quantity).toFixed(2)}
      </p>
    </div>
  </div>
);

export default OrderItemCard;
