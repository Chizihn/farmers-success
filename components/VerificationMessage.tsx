import useAuthStore from "@/store/useAuthStore";
import { getVerificationMessage } from "@/utils/auth";
import Link from "next/link";

const VerificationMessage = () => {
  const { user, method, isPhoneVerified } = useAuthStore();

  const verificationInfo = getVerificationMessage(
    method,
    user,
    isPhoneVerified
  );

  // If there's no verification message, don't render anything
  if (!verificationInfo) return null;

  return (
    <div className="bg-slate-100 p-1 px-3 rounded-lg shadow-md">
      <p className="text-lg text-gray-600 text-center ">
        {verificationInfo.message}
        <Link
          href={verificationInfo.route}
          className="text-green-700 hover:text-green-800 font-bold text-center  "
        >
          {"  "}
          {`  `}
          {verificationInfo.buttonText} now
        </Link>
      </p>
    </div>
  );
};

export default VerificationMessage;
