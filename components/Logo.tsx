import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/" className="cursor-pointer">
      <Image
        src="/images/farmer-success.webp"
        alt="Farmer success logo"
        width={250}
        height={250}
<<<<<<< HEAD
        className="h-auto w-auto"
        priority
=======
>>>>>>> b95be22edf50a55697986b04c5c99be73de60731
      />
    </Link>
  );
};

export default Logo;
