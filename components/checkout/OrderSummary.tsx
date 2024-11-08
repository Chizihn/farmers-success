import { CartItem } from "@/store/useCartStore";
import { capitalizeFirstChar, formatPrice } from "@/utils";
import { calculateItemTotal } from "@/utils/checkout";
import React from "react";

export interface OrderSummaryProps {
  cartItems: CartItem[];
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ cartItems }) => {
  return (
    <div className="mb-4 space-y-2">
      <h2 className="font-semibold mb-2">Order Summary</h2>
      {cartItems.map((item) => (
        <div key={item.product.id} className="flex justify-between">
          <span>
            {capitalizeFirstChar(item.product.name)} x {item.quantity}
          </span>
          <span>
            N
            {formatPrice(calculateItemTotal(item.product.price, item.quantity))}
          </span>
        </div>
      ))}
    </div>
  );
};

export default OrderSummary;
