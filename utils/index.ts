export const createSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

export const formatPrice = (price: string | number) => {
  const numPrice = typeof price === "string" ? parseFloat(price) : price;
  return `${numPrice.toFixed(2)}`;
};

export const formatStock = (stock: string | number) => {
  return typeof stock === "string" ? stock : stock.toString();
};

export const capitalizeFirstChar = (string: any) => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const capitalizeWords = (string: any) => {
  return string.split(" ").map(capitalizeFirstChar).join(" ");
};

// utils/getCategoryPath.ts
export const getCategoryPath = (category: string): string => {
  return category.trim().split(" ")[0].toLowerCase();
};
