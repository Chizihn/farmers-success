<<<<<<< HEAD
"use client";
import Navbar from "@/components/Navbar";

import Products from "@/components/Products";
import { useRouter, useSearchParams } from "next/navigation";
import ReactModal from "react-modal";
import ProductDetails from "@/components/ProductDetails";

ReactModal.setAppElement("#__next");

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay
    zIndex: 9999,
  },
  content: {
    top: "0",
    right: "0",
    padding: "0",
    border: "none",
    background: "transparent",
    maxHeight: "100vh",
    width: "100%",
    maxWidth: "25rem",
  },
};

export default function Home() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");

  const closeModal = () => {
    router.push("/");
  };

  return (
    <>
      <ReactModal
        isOpen={!!productId}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={true}
        contentLabel="Product Modal"
        style={customStyles}
      >
        <div className="bg-white w-full h-screen lg:w-[25rem] fixed top-0 right-0 z-[10000] rounded-lg shadow-xl overflow-hidden">
          {productId && (
            <ProductDetails
              type="view"
              id={productId}
              closeModal={closeModal}
            />
          )}
        </div>
      </ReactModal>
=======
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
>>>>>>> b95be22edf50a55697986b04c5c99be73de60731
      <Navbar />
      <Products />
    </>
  );
}
