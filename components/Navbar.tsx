"use client";
import Logo from "./Logo";
import Search from "./Search";
import User from "./User";
import Cart from "./Cart";
import Modal from "./ProductModal";
import useModalStore from "@/store/useModalStore";
import CartPage from "./CartPage";

const Navbar = () => {
  const { isModalOpen } = useModalStore();

  return (
    <>
      <div className="w-full overflow-visible border-y-2 border-gray-200 flex flex-col md:flex-row justify-center lg:justify-between items-center py-3 px-6 gap-x-3">
        <Logo />
        <Search />
        <div className="flex items-center gap-8 lg:gap-8 relative">
          <Cart />
          <User />
        </div>
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen}>
          <CartPage />
        </Modal>
      )}
    </>
  );
};

export default Navbar;
