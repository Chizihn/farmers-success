import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const RedirectToFarms = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/farms");
  });
  return <></>;
};
