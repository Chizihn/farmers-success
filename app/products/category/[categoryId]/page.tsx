import CategoryProducts from "@/components/CategoryProducts";
import React from "react";

export default function CategoryProductPage({
  params,
}: {
  params: { categoryId: string };
}) {
  return <CategoryProducts categoryId={params.categoryId} />;
}
