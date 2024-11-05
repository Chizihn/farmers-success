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
        className="h-auto w-auto"
        priority
      />
    </Link>
  );
};

export default Logo;
