"use client";
import { DEFAULT_PROFILE_IMAGE_URL } from "@/constants/default";
import useAuthStore from "@/store/useAuthStore";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Account: React.FC = () => {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  if (!user) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Account</h1>
        <button
          onClick={() => router.replace("/")}
          className="text-blue-500 hover:text-blue-600 transition"
        >
          Back
        </button>
      </div>
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-36 h-36 rounded-full mb-4">
          <Image
            src={user.profileImageURL || DEFAULT_PROFILE_IMAGE_URL}
            alt={`${user.firstName || "No first name"} ${
              user.lastName || "No last name"
            }`}
            fill
            className="rounded-full"
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex gap-4">
          <div>
            <p className="text-gray-600">First name:</p>
            <p className="font-medium">{user.firstName || "No first name"}</p>
          </div>
          <div>
            <p className="text-gray-600">Last name:</p>
            <p className="font-medium">{user.lastName || "No last name"}</p>
          </div>
        </div>
        <div>
          <p className="text-gray-600">Phone:</p>
          <p className="font-medium">
            {user.phoneNumber || "No phone number added"}
          </p>
        </div>
        <div>
          <p className="text-gray-600">Email address:</p>
          <p className="font-medium">{user.email || "No email added"}</p>
        </div>
        <div>
          <p className="text-gray-600"> Address:</p>
          <p className="font-medium">{user.address || "No address added"}</p>
        </div>
        <div>
          <p className="text-gray-600">City:</p>
          <p className="font-medium">{user.city || "No city added"}</p>
        </div>
        <div>
          <p className="text-gray-600">State:</p>
          <p className="font-medium">{user.state || "No state added"}</p>
        </div>
        <div>
          <p className="text-gray-600">Credit:</p>
          <p className="font-medium">
            {user.credit != null ? user.credit : "No credit added"}
          </p>
        </div>
      </div>
      <button
        onClick={logout}
        className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Account;
