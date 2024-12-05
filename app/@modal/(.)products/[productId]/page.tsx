import ProductDetails from "@/components/ProductDetails";

export default function ProductDetailsModal({
  params,
}: {
  params: { productId: string };
}) {
  return <ProductDetails type="view" id={params.productId} />;
}

{
  /* <ProductDetails type="view" id={params.productId} /> */
}
