// pages/products/owners.tsx
"use client";

import { useFetchProducts } from "@/hooks/useFetchProducts";
import Image from "next/image";
import Link from "next/link";
import { ProductOwner } from "@/types";

const Owners: React.FC = () => {
  const { products } = useFetchProducts();

  const owners = Array.from(new Set(products.map((product) => product.user)));

  return (
    <section className="w-full min-h-screen pt-3 bg-gray-50 flex justify-center">
      <aside className="hidden lg:flex w-[20rem] h-screen sticky top-0 overflow-y-auto p-4 bg-white shadow-lg rounded-md">
        <h2 className="text-lg font-semibold mb-4">Filter Section</h2>
        {/* Add your filter UI here */}
      </aside>

      <div className="container space-y-6 h-full overflow-y-auto flex-grow p-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-700">Owner Details</h2>
          <p className="text-gray-500">Explore products by different owners</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {owners.map((owner: ProductOwner) => (
            <div
              key={owner.id}
              className="bg-white p-6 shadow-lg rounded-lg w-full text-center transition-transform transform hover:-translate-y-2"
            >
              <div className="relative h-40 mb-4 rounded-lg overflow-hidden">
                <Image
                  src={owner.profileImageUrl}
                  alt={`${owner.firstName} ${owner.lastName}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-700">
                {owner.firstName} {owner.lastName}
              </h3>

              <Link href={`/owners/${owner.id}`}>
                <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors font-medium text-sm">
                  View Owner
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Owners;
