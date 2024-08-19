import { Box } from "@chakra-ui/react";
import Navbar from "../Navbar/Navbar";
import { colorPalette } from "@/assets/constants";
import Categories from "../Categories/Categories";

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
