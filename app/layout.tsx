// app/layout.js

import type { Metadata } from "next";
import "./globals.css";
import ApolloProviderWrapper from "@/components/ApolloProviderWrapper";
import { Suspense } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata: Metadata = {
  title: "FarmersSuccess | Grow with us",
  description: "Your comprehensive farming companion",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="max-w-[1400px] w-full mx-auto bg-gray-100 relative">
        <ProtectedRoute>
          <Suspense>
            <ApolloProviderWrapper>
              {children}
              {modal}
            </ApolloProviderWrapper>
          </Suspense>
        </ProtectedRoute>
      </body>
    </html>
  );
}
