"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";

export default function FarmLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const Navbar = dynamic(() => import("@/components/Navbar"), {
    suspense: true,
    loading: () => <div>Loading Navbar...</div>,
  });

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
