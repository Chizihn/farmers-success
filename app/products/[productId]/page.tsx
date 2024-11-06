import ProductDetails from "@/components/ProductDetails";
export default function ProductDetailsPage({
  params,
}: {
  params: { productId: string };
}) {
  return <ProductDetails type="full" id={params.productId} />;
}
