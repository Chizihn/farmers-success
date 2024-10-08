/* eslint-disable @typescript-eslint/no-unused-vars */

import Navbar from "@/components/Navbar";

export default function FarmLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
