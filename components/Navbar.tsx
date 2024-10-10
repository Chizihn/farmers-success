"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Logo from "./Logo";
import Search from "./Search";
import User from "./User";
import CartPage from "./CartPage";
import RouteModal from "./RouteModal";
import dynamic from "next/dynamic";

const Cart = dynamic(() => import("./Cart"), {
  ssr: false,
});

const CheckoutPage = dynamic(() => import("./Checkout"), {
  ssr: false,
});

const TrackMyOrder = dynamic(() => import("./TrackMyOrder"), {
  ssr: false,
});
const Navbar = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<
    "cart" | "checkout" | "track" | null
  >(null);

  useEffect(() => {
    // Ensure this effect only runs on the client
    if (typeof window !== "undefined") {
      if (searchParams.has("cart")) {
        openModal("cart");
      } else if (searchParams.has("checkout")) {
        openModal("checkout");
      } else if (searchParams.has("track")) {
        openModal("track");
      } else {
        closeModal();
      }
    }
  }, [pathname, searchParams]);

  const openModal = (content: "cart" | "checkout" | "track") => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
    router.push("/");
  };

  const handleCartClick = () => {
    router.push("/?cart");
  };

  const handleCheckoutClose = () => {
    router.push("/?cart");
  };

  const handleTrackOrder = () => {
    router.push("/?track");
  };

  return (
    <>
      <div className="w-full overflow-visible border-y-2 border-gray-200 flex flex-col md:flex-row justify-center lg:justify-between items-center py-3 px-6 gap-x-3">
        <Logo />
        <Search />
        <div className="flex items-center gap-8 lg:gap-8 relative">
          <Cart onClick={handleCartClick} />
          <User onClick={handleTrackOrder} />
        </div>
      </div>
      <RouteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        closeCheckout={handleCheckoutClose}
      >
        {modalContent === "cart" && (
          <CartPage isOpen={isModalOpen} onClose={closeModal} />
        )}
        {modalContent === "checkout" && <CheckoutPage />}
        {modalContent === "track" && <TrackMyOrder />}
      </RouteModal>
    </>
  );
};

export default Navbar;
