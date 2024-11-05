import { redirect } from "next/navigation";

export default function CategoryRedirect() {
  redirect("/products");
  return null;
}
