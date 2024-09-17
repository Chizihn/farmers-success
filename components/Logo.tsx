import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div>
      <Image
        src="/images/farmer-success.webp"
        alt="Farmer success logo"
        width={250}
        height={250}
      />
    </div>
  );
};

export default Logo;
