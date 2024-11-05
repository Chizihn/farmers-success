"use client";
import useAuthStore from "@/store/useAuthStore";
import { Ellipsis, User2 } from "lucide-react";
import { useState } from "react";

const User: React.FC = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { logout } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
  };
  return (
    <div className="relative">
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
          {isAuthenticated ? (
            <div className="space-y-4">
              <a href="/my-account" className="block mb-2 hover:text-green-600">
                My Account
              </a>
              <a className="block mb-2 hover:text-green-600 cursor-pointer">
                Track Order
              </a>
              <button
                className="block w-full text-left hover:text-green-600"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <a href="/signin" className="block mb-2 hover:text-green-600">
                Log in
              </a>
              <a className="block mb-2 hover:text-green-600 cursor-pointer">
                Track Order
              </a>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default User;
