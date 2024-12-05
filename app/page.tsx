"use client";
import Navbar from "@/components/Navbar";

import Products from "@/components/Products";
import VerificationMessage from "@/components/VerificationMessage";

export default function Home() {
  return (
    <>
      <Navbar />
      <VerificationMessage />
      <Products />
    </>
  );
}
