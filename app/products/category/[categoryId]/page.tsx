"use client";
import CategoryProducts from "@/components/CategoryProducts";

export default function CategoryProductPage({
  params,
}: {
  params: { categoryId: string };
}) {
  return <CategoryProducts categoryId={params.categoryId} />;
}
