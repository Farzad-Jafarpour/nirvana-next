import React from "react";
import { Image } from "@chakra-ui/react";
import { BaseUrl } from "@/assets/constants";

export const Logo: React.FC = () => {
  const Url = BaseUrl + "logo.webp";
  return (
    <Image
      src={Url}
      alt="Logo"
      boxSize="40px"
      objectFit="cover"
      borderRadius="5px"
    />
  );
};

export default Logo;
