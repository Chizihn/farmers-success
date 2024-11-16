"use client";
import React from "react";
import Image from "next/image";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  LogOut,
  User,
  FilePenLine,
} from "lucide-react";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { DEFAULT_PROFILE_IMAGE_URL } from "@/constants/default";
import { capitalizeFirstChar, capitalizeWords } from "@/utils";

const Account: React.FC = () => {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const fullName =
    `${user?.firstName || ""} ${user?.lastName || ""}`.trim() ||
    "No name added";

  const handleUpdateProfile = () => {
    router.push("/account/update-profile");
  };
  return (
    <div className="relative">
      {/* Profile Header */}
      <div className="relative h-32 bg-gradient-to-r from-green-600 to-green-700">
        <button
          onClick={() => router.replace("/")}
          className="absolute top-6 left-6 flex items-center text-white hover:text-gray-100 font-semibold transition"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>

        <div className="absolute -bottom-16 left-8">
          <div className="relative w-32 h-32 rounded-full border-4 border-white bg-white shadow-lg">
            <Image
              src={user?.profileImageURL || DEFAULT_PROFILE_IMAGE_URL}
              alt={fullName}
              fill
              className="rounded-full object-cover"
              priority
            />
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="pt-[5.5rem] px-8 pb-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {capitalizeWords(fullName)}
            </h1>
            <p className="text-gray-500">{user?.email}</p>
          </div>

          <button
            className="  text-black font-medium flex items-center gap-1 hover:text-green-600 "
            onClick={handleUpdateProfile}
          >
            <FilePenLine size={25} />
            <p className="text-lg"> Edit</p>
          </button>
        </div>

        <div className="space-y-10 mb-8">
          {/* Contact Information */}
          <section className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <User className="w-5 h-5 text-gray-400" />
              <p>Your Information</p>
            </h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-gray-400 mt-1 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="text-gray-900">
                    {user?.email || "No email added"}
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="w-5 h-5 text-gray-400 mt-1 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="text-gray-900">
                    {user?.phoneNumber || "No phone number added"}
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <CreditCard className="w-5 h-5 text-gray-400 mt-1 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Credit Balance</p>
                  <p className="text-gray-900">
                    N{` `} {user?.credit.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Address Information */}
          <section className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 ">
              <MapPin className="w-5 h-5 text-gray-400" />
              <p>Location</p>
            </h2>
            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-500">Address</p>
                <p className="text-gray-900">
                  {user?.address || "No address added"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">City</p>
                <p className="text-gray-900">
                  {capitalizeFirstChar(user?.city) || "No city added"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">State</p>
                <p className="text-gray-900">
                  {capitalizeFirstChar(user?.state) || "No state added"}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="w-full mb-2 px-4">
        <button
          onClick={logout}
          className="w-full flex justify-center items-center p-4 bg-red-600 text-white hover:bg-red-700 text-center rounded-lg transition"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Account;
