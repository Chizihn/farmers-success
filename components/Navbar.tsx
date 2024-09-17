import React from "react";
import Logo from "./Logo";
import Search from "./Search";

import User from "./User";
import Cart from "./Cart";

const Navbar = () => {
  return (
    <div className="w-full border-y-2 border-gray-200 flex justify-evenly items-center p-4">
      <Logo />
      <Search />
      <div className="flex gap-8 items-center">
        <Cart />
        <User />
      </div>
    </div>
  );
};

export default Navbar;
