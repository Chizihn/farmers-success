"use client";

import LoadingState from "@/components/Loading";
import { DEFAULT_IMAGE_URL } from "@/constants/default";
import useProductStore from "@/store/useProductStore";
import { capitalizeFirstChar, formatPrice } from "@/utils";
import Image from "next/image";

export default function ProductDetailsModal({
  params,
}: {
  params: { productId: string };
}) {
  const { products, loading, initialized, error } = useProductStore();
  const product = products.find((p) => p.id === params.productId);

  if (loading) return <LoadingState />;

  if (!loading && !product && initialized) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <p>We could not find the product you were looking for.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Error Loading Product
          </h3>
          <p className="text-gray-500 mb-4">{error}</p>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const {
    images,
    name,
    price,
    description,
    location,
    quantity: availableQuantity,
  } = product;

  const productImages = images?.length ? images : [DEFAULT_IMAGE_URL];
  const displayedImage = productImages[0] || DEFAULT_IMAGE_URL;

  const hanldeProductPage = () => {
    window.location.reload();
  };

  return (
    <div className="max-w-screen-2xl w-full mx-auto bg-white py-4 px-4 mt-10">
      <div className="flex flex-col justify-evenly gap-6">
        <div className="w-full flex flex-col gap-4">
          <div className="relative border-[4px] border-green-600 rounded-lg h-[330px] w-full">
            <Image
              src={displayedImage}
              alt={name || "Product"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
              className="transition-opacity duration-300 hover:opacity-90"
              loading="lazy"
            />
          </div>
        </div>

        <div className="p-3">
          <div className="mb-4 space-y-3 md:space-y-4">
            <div className="mb-2 space-y-1">
              <h1 className="text-3xl font-bold">
                {capitalizeFirstChar(name)}
              </h1>
              <p className="text-slate-600">
                {capitalizeFirstChar(description)}
              </p>
            </div>
            <p className="text-3xl font-black mb-4 text-green-800">
              N {formatPrice(price || 0)}
            </p>
            <p>
              <span className="font-semibold">Location:</span> {location}
            </p>
            <p>
              <span className="font-semibold">Stock:</span> {availableQuantity}{" "}
              pieces available
            </p>
          </div>

          <button
            className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 transition-colors font-semibold text-lg"
            onClick={hanldeProductPage}
          >
            View Product
          </button>
        </div>
      </div>
    </div>
  );
}
