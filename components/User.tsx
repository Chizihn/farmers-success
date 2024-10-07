"use client";
import { Ellipsis, User2 } from "lucide-react";
import { useState } from "react";

const isLoggedIn = false;

const User = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div className="relative z-20">
      <button
        onClick={toggleModal}
        className="flex items-center justify-center gap-1.5 transition-colors duration-200 hover:text-green-600"
      >
        <User2 size={25} />
        <p className="text-lg">Account</p>
        <Ellipsis size={15} />
      </button>

      {isModalOpen && (
        <div className="absolute top-0 right-[-20px] bg-red-500 shadow-md rounded-lg p-4 w-48 h-48 z-{10000}">
          {isLoggedIn ? (
            <>
              <a href="/my-account" className="block mb-2 hover:text-green-600">
                My Account
              </a>
              <a
                href="/track-order"
                className="block mb-2 hover:text-green-600"
              >
                Track My Order
              </a>
              <button
                className="block w-full text-left hover:text-green-600"
                onClick={() => {
                  // Handle logout logic here
                  console.log("Logging out...");
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <a href="/login" className="block mb-2 hover:text-green-600">
                Log in
              </a>
              <a href="/track-order" className="block hover:text-green-600">
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
