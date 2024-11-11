"use client";
import { Product } from "@/types";
import Image from "next/image";
import { useFetchProducts } from "@/hooks/useFetchProducts";
import useProductStore from "@/store/useProductStore";

const CategoryProducts: React.FC<{ categoryName: string }> = ({
  categoryName,
}) => {
  const categories = useProductStore((state) => state.categories);
  const category = categories.find((c) => c.name === categoryName);

  const { products } = useFetchProducts({
    type: categoryName,
  });

  if (!products?.length) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            {category?.name}
          </h2>
          <p className="text-center text-gray-600">
            No products available yet for this category.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold text-center">{category?.name}</h2>
        <p className="text-center text-gray-600 mt-2">
          {products.length} {products.length === 1 ? "product" : "products"}{" "}
          available
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product: Product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {/* Product Image */}
            <div className="relative h-48 bg-gray-200">
              {product.images && product.images.length > 0 ? (
                <Image
                  src={product.images[0]}
                  alt={product.description}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                  className="transition-opacity duration-300 hover:opacity-90"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <span className="text-gray-400">No image available</span>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>

              {/* Product Price */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-green-600 font-bold">
                  ${product.price.toFixed(2)}
                </span>
                {product.quantity > 0 ? (
                  <span className="text-sm text-green-500">In Stock</span>
                ) : (
                  <span className="text-sm text-red-500">Out of Stock</span>
                )}
              </div>

              {/* Product Description */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {product.description}
              </p>

              {/* Action Button */}
              <button
                className={`w-full py-2 px-4 rounded-md text-center font-medium transition-colors duration-300
                  ${
                    product.quantity > 0
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                disabled={product.quantity === 0}
              >
                {product.quantity > 0 ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
