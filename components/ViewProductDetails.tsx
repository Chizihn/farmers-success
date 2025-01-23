"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import useProductStore from "@/store/useProductStore";
import { DEFAULT_IMAGE_URL } from "@/constants/default";
import { capitalizeFirstChar, formatPrice } from "@/utils";
import LoadingState from "./Loading";
import Cart from "./Cart";

interface ViewProductDetailsProps {
  id: string;
}

const ViewProductDetails: React.FC<ViewProductDetailsProps> = ({ id }) => {
  const { product, loading, initialized, error, fetchProduct } =
    useProductStore();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  useEffect(() => {
    if (id) {
      useProductStore.setState({ product: null });
      fetchProduct(id);
    }
  }, [fetchProduct, id]);

  if (loading && !initialized) {
    return <LoadingState />;
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

  if (!loading && !product && initialized) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <p>We could not find the product you were looking for.</p>
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
  const displayedImage = productImages[selectedImageIndex] || DEFAULT_IMAGE_URL;

  const hanldeProductPage = () => {
    window.location.reload();
  };

  return (
    <div className="max-w-screen-2xl w-full mx-auto bg-white py-4 px-4">
      <div className="py-2 px-2">
        <Cart />
      </div>
      <div className="flex flex-col justify-evenly gap-6">
        <div className="w-full flex flex-col gap-4">
          <div className="relative border-[4px] border-green-600 rounded-lg h-[330px] w-full">
            <Image
              src={displayedImage}
              alt={name || "Product"}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>

        <div className="w-full p-3">
          <div>
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
                <span className="font-semibold">Stock:</span>{" "}
                {availableQuantity} pieces available
              </p>
            </div>
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
};

export default ViewProductDetails;
