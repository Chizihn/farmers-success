"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const RedirectToFarmsPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/farms");
  }, [router]);

  return <p>Redirecting...</p>;
};

export default RedirectToFarmsPage;
