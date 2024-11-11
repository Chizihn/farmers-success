import CategoryProducts from "@/components/CategoryProducts";
import React from "react";

export default function CategoryProductPage({
  params,
}: {
  params: { category: string };
}) {
  return <CategoryProducts categoryName={params.category} />;
}
