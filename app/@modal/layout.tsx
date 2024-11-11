"use client";
import { usePathname, useRouter } from "next/navigation";
import PageModal from "@/components/PageModal";

export default function ModalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  // List of paths where the modal should be shown
  const modalPaths = [
    "/track-order",
    "/signin",
    "/signup",
    "/account",
    "/account/",
    "/account/update-profile",
    "/update-profile",
    "/orders",
  ];

  // Check if the current path should open the modal
  const isModalVisible = modalPaths.includes(pathname);

  const handleCloseModal = () => {
    router.replace("/");
  };

  return (
    <>
      {/* Render PageModal only if the pathname matches */}
      <PageModal isOpen={isModalVisible} onClose={handleCloseModal}>
        {children}
      </PageModal>
    </>
  );
}
