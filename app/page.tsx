import React, { Suspense } from "react";
import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("@/components/Navbar"), {
  suspense: true,
  loading: () => <div>Loading Navbar...</div>,
});
const Products = dynamic(() => import("@/components/Products"), {
  suspense: true,
  loading: () => <div>Loading Products...</div>,
});

export default function Home() {
  return (
    <>
      <Navbar />
      <Products />
    </>
  );
}
