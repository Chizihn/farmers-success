// app/[...slug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function CatchAllPage() {
  notFound();
}
