import type { Metadata } from "next";
import "./globals.css";
import ApolloProviderWrapper from "@/components/ApolloProviderWrapper";
import { Suspense } from "react";

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
    <ApolloProviderWrapper>
      <html lang="en">
        <body id="__next">
          <Suspense>
            {children}
            {modal}
          </Suspense>
        </body>
      </html>
    </ApolloProviderWrapper>
  );
}
