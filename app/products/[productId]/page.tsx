"use client";
import ProductDetails from "@/components/ProductDetails";
import { useParams } from "next/navigation";

export default function ProductDetailsPage() {
  const params = useParams();
  const productId = params.productId as string;
  return <ProductDetails type="full" id={productId} />;
}
