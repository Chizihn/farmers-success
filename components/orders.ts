export const orders = [
  {
    orderId: "ORD12345",
    email: "www.chizihn@gmail.com",
    status: "Delivered",
    date: "2024-10-05",
    items: [
      { name: "Farm Produce", quantity: "2", price: "5000" },
      { name: "Dairy Products", quantity: "1", price: "2500" },
    ],
  },
  {
    orderId: "ORD67890",
    email: "johndoe@gmail.com",
    status: "Processing",
    date: "2024-10-03",
    items: [
      { name: "Organic Vegetables", quantity: "3", price: "3000" },
      { name: "Honey", quantity: "1", price: "1500" },
    ],
  },
];

export interface Items {
  name: string;
  quantity: string;
  price: string;
}

export interface OrderFile {
  orderId: string;
  email: string;
  status: string;
  date: string;
  items: Items[];
}
