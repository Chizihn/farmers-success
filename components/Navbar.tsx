"use client";
import Logo from "./Logo";
import Search from "./Search";
import User from "./User";
import Cart from "./Cart";
import Modal from "./ProductModal";
import useModalStore from "@/store/useModalStore";
import CartPage from "./CartPage";
import useAuthStore from "@/store/useAuthStore";
import GuestCartPage from "./GuestCartPage";
import CheckoutModal from "./CheckoutModal";
import GuestCheckout from "./GuestCheckout";
import Checkout from "./Checkout";
import PaymentSuccess from "./PaymentSuccess";

const Navbar = () => {
  const { isModalOpen, isCheckoutModalOpen, isPaymentSuccess } =
    useModalStore();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <>
      <div className="bg-white w-full overflow-visible border-y-2 border-gray-200 shadow-md rounded-b-lg rounded-sm flex flex-col md:flex-row justify-center lg:justify-between items-center py-3 px-6 gap-x-3">
        <Logo />
        <Search />
        <div className="flex items-center gap-8 lg:gap-8 relative">
          <Cart />
          <User />
        </div>
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen}>
          {isAuthenticated ? <CartPage /> : <GuestCartPage />}
        </Modal>
      )}
      {isCheckoutModalOpen && (
        <CheckoutModal isOpen={isCheckoutModalOpen}>
          {isAuthenticated ? <Checkout /> : <GuestCheckout />}
        </CheckoutModal>
      )}

      {isPaymentSuccess && (
        <CheckoutModal isOpen={isPaymentSuccess}>
          <PaymentSuccess />
        </CheckoutModal>
      )}
    </>
  );
};

export default Navbar;
