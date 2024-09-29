import React from "react";
import { Image } from "@chakra-ui/react";
import { BaseUrl } from "@/assets/constants";
import Link from "next/link";

export const Logo: React.FC = () => {
  const Url = BaseUrl + "logo.webp";
  return (
    <Link href={"/"}>
      <Image
        src={Url}
        alt="Logo"
        boxSize="40px"
        objectFit="cover"
        borderRadius="5px"
        margin="5px"
      />
    </Link>
  );
};

export default Logo;
