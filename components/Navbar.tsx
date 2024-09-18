import React from "react";
import Logo from "./Logo";
import Search from "./Search";

import User from "./User";
import Cart from "./Cart";

const Navbar = () => {
  return (
    <div className="w-full overflow-y-hidden border-y-2 border-gray-200 flex flex-col md:flex-row justify-center lg:justify-evenly items-center p-4">
      <Logo />
      <Search />
      <div className="flex items-center gap-10 ">
        <Cart />
        <User />
      </div>
    </div>
  );
};

export default Navbar;
