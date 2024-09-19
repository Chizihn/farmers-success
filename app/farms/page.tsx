"use client";
import Image from "next/image";
import Link from "next/link";
import { farmProducts } from "@/components/data";
import { createSlug } from "@/utils";

const Farms: React.FC = () => {
  const farms = Array.from(
    new Set(farmProducts.map((product) => product.farm))
  );

  return (
    <section className="w-full min-h-screen h-full pt-3 bg-gray-100 flex justify-center">
      <div className="container space-y-6 h-full overflow-y-auto flex-grow">
        <div className="bg-white p-3 shadow-md rounded-lg mb-2 flex flex-col lg:flex-row justify-between items-center">
          <h2 className="text-xl font-bold mb-4 lg:mb-0">Our Farms</h2>
        </div>
        <div className="w-full h-full max-h-full overflow-y-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 justify-items-center content-center gap-x-2 gap-y-6 px-3 lg:px-0">
          {farms.map((farm) => (
            <div
              key={farm.id}
              className="bg-white p-4 shadow-lg rounded-lg w-full max-w-xs text-center"
            >
              <div className="relative h-40 mb-4 rounded-lg overflow-hidden">
                <Image
                  src={`${farm.image}`}
                  alt={farm.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <h3 className="text-lg font-bold mb-2">{farm.name}</h3>
              <p className="text-gray-600 mb-2">
                {farm.city}, {farm.country}
              </p>
              <Link href={`/farms/${createSlug(farm.name)}`}>
                <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors font-medium text-sm">
                  View Farm
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Farms;
