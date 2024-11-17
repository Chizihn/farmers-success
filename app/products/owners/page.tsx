"use client";
import Image from "next/image";
import Link from "next/link";
import { DEFAULT_PROFILE_IMAGE_URL } from "@/constants/default";
import { capitalizeFirstChar } from "@/utils";
import { useFetchOwners } from "@/hooks/useFetchOwners";
import { ProductOwner } from "@/types/product";

const Owners: React.FC = () => {
  const owners = useFetchOwners();

  return (
    <section className="w-full min-h-screen pt-3 bg-gray-50 flex justify-center">
      <aside className="hidden lg:flex w-[20rem] h-screen sticky top-0 overflow-y-auto p-4 bg-white shadow-lg rounded-md">
        <h2 className="text-lg font-semibold mb-4">Filter Section</h2>
        {/* Add your filter UI here */}
      </aside>

      <div className="container space-y-6 h-full overflow-y-auto flex-grow p-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-700">
            List Product Owners
          </h2>
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
                  src={owner.profileImageUrl || DEFAULT_PROFILE_IMAGE_URL}
                  alt={`${owner.firstName} ${owner.lastName}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                  className="rounded-md"
                  priority
                />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-700">
                {capitalizeFirstChar(owner.firstName)}{" "}
                {capitalizeFirstChar(owner.lastName)}
              </h3>

              <Link href={`/products/owners/${owner.id}`}>
                <button className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition-colors font-medium text-sm">
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
