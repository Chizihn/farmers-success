"use client";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Loader2, X, Save } from "lucide-react";
import useAuthStore from "@/store/useAuthStore";
import { UPDATE_USER_ACCOUNT } from "@/graphql/mutations";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface UpdateProfileProps {
  type: "full" | "view";
}

const UpdateProfile: React.FC<UpdateProfileProps> = ({ type }) => {
  const router = useRouter();
  const { user } = useAuthStore();
  const [updateUserAccount, { loading }] = useMutation(UPDATE_USER_ACCOUNT);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    address: user?.address || "",
    city: user?.city || "",
    state: user?.state || "",
    dob: user?.dob ? new Date(user.dob).toISOString().split("T")[0] : "",
    gender: user?.gender || "",
    maritalStatus: user?.maritalStatus || "",
    profileImageURL: user?.profileImageURL || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(null);
    setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      await updateUserAccount({
        variables: {
          data: {
            ...formData,
            dob: formData.dob ? new Date(formData.dob) : null,
          },
        },
      });
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      console.log("Profile updated successfully");
    } catch (error) {
      console.log("Profile not updated successfully");
      setError((error as Error).message || "Error updating profile");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const inputClasses =
    "w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500";
  const labelClasses = "block text-sm font-semibold text-gray-600 mb-1";

  const handleViewProfile = () => {
    router.replace("/account");
  };

  const handleCancel = () => {
    window.history.back();
  };
  return (
    <div className=" bg-white overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 text-white">
        <h2 className="text-2xl font-bold">Update Your Profile</h2>
        <p className="text-sm">Update your personal information</p>
      </div>

      {/* Alerts */}
      <div className="p-6 space-y-4">
        {error && (
          <div className="p-4 bg-red-100 border border-red-200 rounded-lg flex items-center text-red-700">
            <X className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}
        {success && (
          <div className="p-4 bg-green-100 border border-green-200 rounded-lg flex justify-between items-center">
            <div className="flex items-center text-green-700">
              <Save className="w-5 h-5 mr-2" />
              Profile updated successfully!
            </div>
            <button
              onClick={handleViewProfile}
              className="bg-green-700 text-white p-2 "
            >
              View
            </button>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Profile Image */}
        {/* <div className="flex items-center gap-4">
          <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100">
            {formData.profileImageURL && (
              <Image
                src={formData.profileImageURL}
                fill
                alt="Profile"
                className="object-cover w-full h-full"
              />
            )}
          </div>
          <div className="flex-1">
            <label className={labelClasses}>Profile Image URL</label>
            <input
              type="text"
              name="profileImageURL"
              value={formData.profileImageURL}
              onChange={handleChange}
              className={inputClasses}
              placeholder="Enter image URL"
            />
          </div>
        </div> */}

        {/* Personal Information */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Personal Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClasses}>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>
            <div>
              <label className={labelClasses}>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>
            <div>
              <label className={labelClasses}>Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>
            <div>
              <label className={labelClasses}>Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={inputClasses}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Address</h3>
          <div>
            <label className={labelClasses}>Street Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClasses}>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>
            <div>
              <label className={labelClasses}>State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end items-center pt-6 border-t mt-6">
          <button
            type="button"
            className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg mr-4 transition"
            onClick={type === "full" ? handleViewProfile : handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
