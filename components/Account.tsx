"use client";
import useAuthStore from "@/store/useAuthStore";
import Image from "next/image";

const Account: React.FC = () => {
  const { user, logout } = useAuthStore();

  if (!user) return null;

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center mb-4">
        <Image
          src={user.profileImageURL}
          alt={`${user.firstName} ${user.lastName}`}
          className="w-20 h-20 rounded-full mr-4 object-cover"
        />
        <div>
          <h2 className="text-xl font-bold">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600">Phone:</p>
          <p className="font-medium">{user.phoneNumber}</p>
        </div>
        <div>
          <p className="text-gray-600">Address:</p>
          <p className="font-medium">
            {user.address}, {user.city}, {user.state}
          </p>
        </div>

        <div>
          <p className="text-gray-600">Credit:</p>
          <p className="font-medium">{user.credit}</p>
        </div>
        <div>
          <p className="text-gray-600">User Type:</p>
          <p className="font-medium">{user.userType}</p>
        </div>
      </div>

      <button
        onClick={logout}
        className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Account;
