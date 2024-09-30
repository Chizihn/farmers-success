import { X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { createSlug, formatPrice, formatStock } from "@/utils";
import { ProductDetail } from "@/types";
import Cart from "./Cart";

interface ViewProductProps {
  product: ProductDetail;
  closeModal: () => void;
}

const ViewProduct: React.FC<ViewProductProps> = ({ product, closeModal }) => {
  return (
    <>
      <div className="flex justify-between items-center p-3">
        <button
          className="text-gray-500 hover:text-gray-800"
          onClick={closeModal}
        >
          <X />
        </button>
        <Cart />
      </div>

      <div className="p-3">
        <div className="relative h-60 mb-4 rounded-lg overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
        <p className="text-xl font-semibold text-green-600 mb-4">
          N {formatPrice(product.price)} per piece
        </p>
        <p className="text-gray-600 mb-6">{product.description}</p>
        <div className="space-y-3 mb-6">
          <p className="flex justify-between">
            <span className="font-medium">Farm:</span>
            <Link
              href={`/farms/${createSlug(product.farm.name)}`}
              target="_blank"
              className="text-green-600 font-medium"
            >
              {product.farm.name}
            </Link>
          </p>
          <p className="flex justify-between">
            <span className="font-medium">Location:</span>
            <span>{`${product.farm.city}, ${product.farm.country}`}</span>
          </p>
          <p className="flex justify-between">
            <span className="font-medium">Stock:</span>
            <span>{formatStock(product.stock)} pieces</span>
          </p>
          <p className="flex justify-between">
            <span className="font-medium">Delivery:</span>
            <span
              className={
                product.deliveryAvailable ? "text-green-600" : "text-red-600"
              }
            >
              {product.deliveryAvailable ? "Available" : "Not Available"}
            </span>
          </p>
        </div>
        <Link href={`/${product.id}`} target="_blank">
          <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold text-lg">
            View Product
          </button>
        </Link>
      </div>
    </>
  );
};

export default ViewProduct;
