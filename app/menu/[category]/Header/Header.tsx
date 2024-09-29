import { Box } from "@chakra-ui/react";

import { colorPalette } from "@/assets/constants";
import Categories from "../Categories/Categories";
import Navbar from "@/app/components/Navbar";

const Header: React.FC = () => {
  const headerStyle = {
    backgroundColor: colorPalette.primary,
    borderBottom: "1px solid #000",
  };

  return (
    <Box style={headerStyle}>
      <Navbar />
      <Categories />
    </Box>
  );
};

export default Header;
