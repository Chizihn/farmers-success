import { UserCircle } from "lucide-react";
import React from "react";

const User = () => {
  return (
    <div>
      <button className="transition-colors duration-200 hover:text-green-600">
        <UserCircle size={30} />
      </button>
    </div>
  );
};

export default User;
