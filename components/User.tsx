"use client";
import useAuthStore from "@/store/useAuthStore";
import { Ellipsis, User2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const User: React.FC = () => {
  const token = useAuthStore((state) => state.token);
  const { logout } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
  };

  // Close modal if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <div className="relative" ref={modalRef}>
      <button
        onClick={toggleModal}
        className={`flex items-center justify-center gap-1.5 transition-colors duration-200 hover:text-green-600 ${
          isModalOpen ? "text-green-600" : "text-black"
        }`}
      >
        <User2 size={25} />
        <p className="text-lg">Account</p>
        <Ellipsis size={15} />
      </button>
      {isModalOpen && (
        <div className="absolute top-full right-[-5px] mt-2 bg-white shadow-md rounded-lg border-[1px] border-gray-200 p-4 w-48 z-50">
          {token ? (
            <div className="space-y-4">
              <Link
                href="/account/"
                className="block mb-2 hover:text-green-600"
              >
                My Account
              </Link>
              <Link href="/orders" className="block mb-2 hover:text-green-600">
                My Orders
              </Link>
              {/* <Link
                href="/track-order"
                className="block mb-2 hover:text-green-600 cursor-pointer"
              >
                Track Order
              </Link> */}
              <button
                className="block w-full text-left hover:text-green-600"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <Link href="/signin" className="block hover:text-green-600">
                Sign in
              </Link>
              {/* <Link
                href="/track-order"
                className="block mb-2 hover:text-green-600 cursor-pointer"
              >
                Track Order
              </Link> */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default User;
