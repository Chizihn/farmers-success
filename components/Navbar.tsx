"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Logo from "./Logo";
import Search from "./Search";
import User from "./User";
import Cart from "./Cart";
import CartPage from "./CartPage";
import RouteModal from "./RouteModal";
import CheckoutPage from "./Checkout";

const Navbar = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<"cart" | "checkout" | null>(
    null
  );

  useEffect(() => {
    const cartParam = searchParams.get("cart");
    const checkoutParam = searchParams.get("checkout");

    if (cartParam === "open") {
      openModal("cart");
    } else if (checkoutParam === "open") {
      openModal("checkout");
    } else {
      closeModal();
    }
  }, [pathname, searchParams]);

  const openModal = (content: "cart" | "checkout") => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
    router.push("/");
  };

  const handleCartClick = () => {
    router.push("/?cart=open");
  };

  const handleCheckoutClose = () => {
    router.push("/?cart=open");
  };

  return (
    <>
      <div className="w-full overflow-visible border-y-2 border-gray-200 flex flex-col md:flex-row justify-center lg:justify-between items-center py-3 px-6 gap-x-3">
        <Logo />
        <Search />
        <div className="flex items-center gap-8 lg:gap-8 relative">
          <Cart onClick={handleCartClick} />
          <User />
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
      </RouteModal>
    </>
  );
};

export default Navbar;
