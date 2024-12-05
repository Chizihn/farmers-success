"use client";
import React from "react";
import Account from "@/components/Account";

const AccountPage = () => {
  return (
    <main className="min-h-screen h-full flex justify-center items-start lg:py-10">
      <div className="max-w-xl w-full bg-white shadow-lg ">
        <Account />
      </div>
    </main>
  );
};

export default AccountPage;
