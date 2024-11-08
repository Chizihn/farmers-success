export const handlePaystackClose = () => {
  console.log("Paystack payment modal closed");
};

export const formatPrice = (price: string | number) => {
  const numPrice = typeof price === "string" ? parseFloat(price) : price;
  return isNaN(numPrice) ? "0.00" : numPrice.toFixed(2);
};

export const calculateItemTotal = (
  price: string | number,
  quantity: number
) => {
  const numPrice = typeof price === "string" ? parseFloat(price) : price;
  return isNaN(numPrice) ? 0 : numPrice * quantity;
};
